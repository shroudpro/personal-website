import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

interface ParsedRepository {
  owner: string
  repo: string
}

function parseRepositoryUrl(input: string): ParsedRepository {
  const url = new URL(input)
  if (url.hostname !== 'github.com') {
    throw new Error('只支持 github.com 仓库链接')
  }

  const [owner, repo] = url.pathname.replace(/^\/|\/$/g, '').split('/')
  if (!owner || !repo) {
    throw new Error('仓库链接格式应为 https://github.com/owner/repo')
  }

  return { owner, repo: repo.replace(/\.git$/, '') }
}

function toKebabCase(value: string): string {
  return value
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

function getTitle(readme: string, fallback: string): string {
  const heading = readme.match(/^#\s+(.+)$/m)
  return heading?.[1]?.trim() || fallback
}

function getSummary(readme: string): string {
  const lines = readme
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && !line.startsWith('![') && !line.startsWith('<'))

  return lines[0]?.replace(/\*\*/g, '') || '请人工补充项目简介。'
}

function getListAfterHeading(readme: string, headingKeywords: string[]): string[] {
  const lines = readme.split(/\r?\n/)
  const headingIndex = lines.findIndex((line) => {
    const normalized = line.toLowerCase()
    return headingKeywords.some((keyword) => normalized.includes(keyword.toLowerCase()))
  })
  if (headingIndex < 0) {
    return []
  }

  const items: string[] = []
  for (let index = headingIndex + 1; index < lines.length; index += 1) {
    const line = lines[index]?.trim() ?? ''
    if (/^#{1,6}\s+/.test(line)) {
      break
    }
    const item = line.match(/^[-*]\s+(.+)$/)
    if (item?.[1]) {
      items.push(item[1].replace(/\*\*/g, '').trim())
    }
  }

  return items.slice(0, 8)
}

async function fetchReadme({ owner, repo }: ParsedRepository): Promise<string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.raw',
    'User-Agent': 'personal-portfolio-import-script',
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, { headers })
  if (!response.ok) {
    throw new Error(`读取 README 失败: GitHub API ${response.status}`)
  }

  return response.text()
}

function buildProjectMarkdown(repositoryUrl: string, repository: ParsedRepository, readme: string): string {
  const title = getTitle(readme, repository.repo)
  const id = toKebabCase(repository.repo)
  const stack = getListAfterHeading(readme, ['技术栈', 'tech stack', 'built with'])
  const features = getListAfterHeading(readme, ['核心特性', 'features', '功能'])
  const stackLines = (stack.length ? stack : ['请人工补充技术栈']).map((item) => `  - ${item}`).join('\n')
  const featureLines = (features.length ? features : ['请人工补充核心功能']).map((item) => `- ${item}`).join('\n')

  return `---
id: "${id}"
title: "${title.replace(/"/g, '\\"')}"
type: "Imported GitHub Project"
summary: "${getSummary(readme).replace(/"/g, '\\"')}"
stack:
${stackLines}
featured: false
coverDoodle: "/images/doodles/browser-plant.png"
githubUrl: "${repositoryUrl}"
demoUrl: ""
sortOrder: 999
isPublished: false
---

## Overview

${getSummary(readme)}

## My Role

- 请人工补充你的职责。

## Core Features

${featureLines}

## Tech Stack

${(stack.length ? stack : ['请人工补充技术栈']).map((item) => `- ${item}`).join('\n')}

## Challenges & Solutions

- 请人工补充项目难点和解决方案。

## Result

请人工检查 README 解析结果，补充真实结果后再将 isPublished 改为 true。
`
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const overwrite = args.includes('--overwrite')
  const repositoryUrl = args.find((arg) => !arg.startsWith('--'))

  if (!repositoryUrl) {
    throw new Error('用法: npm run import:github -- https://github.com/owner/repo [--overwrite]')
  }

  const repository = parseRepositoryUrl(repositoryUrl)
  const readme = await fetchReadme(repository)
  const markdown = buildProjectMarkdown(repositoryUrl, repository, readme)
  const contentDir = join(process.cwd(), 'src', 'content', 'projects')
  const targetPath = join(contentDir, `${toKebabCase(repository.repo)}.md`)

  mkdirSync(contentDir, { recursive: true })
  if (existsSync(targetPath) && !overwrite) {
    throw new Error(`目标文件已存在: ${targetPath}。如需覆盖，请追加 --overwrite。`)
  }

  writeFileSync(targetPath, markdown, 'utf8')
  console.log(`已生成项目 Markdown 草稿: ${targetPath}`)
  console.log('请人工检查内容，确认无误后再将 isPublished 改为 true。')
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
})
