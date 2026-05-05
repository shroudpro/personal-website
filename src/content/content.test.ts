import { describe, expect, it } from 'vitest'
import {
  experiences,
  getFeaturedProjects,
  getJournalEntryBySlug,
  getNoteBySlug,
  getProjectById,
  journalEntries,
  notes,
  projects,
  validateContentCollections,
} from './index'

describe('markdown content collections', () => {
  it('过滤未发布内容并按 sortOrder 升序展示', () => {
    expect(experiences.every((item) => item.isPublished)).toBe(true)
    expect(projects.every((item) => item.isPublished)).toBe(true)
    expect(notes.every((item) => item.isPublished)).toBe(true)

    expect(experiences.map((item) => item.sortOrder)).toEqual(
      [...experiences].map((item) => item.sortOrder).sort((a, b) => a - b),
    )
    expect(projects.map((item) => item.sortOrder)).toEqual(
      [...projects].map((item) => item.sortOrder).sort((a, b) => a - b),
    )
    expect(notes.map((item) => item.sortOrder)).toEqual(
      [...notes].map((item) => item.sortOrder).sort((a, b) => a - b),
    )
  })

  it('只返回前三个已发布精选项目', () => {
    const featuredProjects = getFeaturedProjects()

    expect(featuredProjects).toHaveLength(3)
    expect(featuredProjects.every((project) => project.featured && project.isPublished)).toBe(true)
  })

  it('可以通过 Markdown frontmatter 的 id 和 slug 读取详情', () => {
    expect(getProjectById('ai-ppt-generator')?.title).toBe('AI PPT Generator')
    expect(getProjectById('missing-project')).toBeUndefined()
    expect(getNoteBySlug('static-portfolio-reset')?.title).toBe('静态作品集改造记录')
    expect(getNoteBySlug('missing-note')).toBeUndefined()
  })

  it('成长记录集合以 experiences 为主，并保留 Markdown 正文内容', () => {
    expect(journalEntries.slice(0, experiences.length).every((entry) => entry.source === 'experience')).toBe(
      true,
    )

    const experienceEntry = getJournalEntryBySlug('2026-04-frontend-refactor')
    const noteEntry = getJournalEntryBySlug('static-portfolio-reset')

    expect(experienceEntry?.source).toBe('experience')
    expect(experienceEntry?.blocks.some((block) => block.type === 'heading' && block.text === '记录')).toBe(
      true,
    )
    expect(experienceEntry?.blocks.some((block) => block.type === 'paragraph')).toBe(true)
    expect(noteEntry?.source).toBe('note')
  })

  it('构建期校验会覆盖必填字段和 PNG 装饰图', () => {
    expect(validateContentCollections()).toEqual([])
    expect(projects.every((project) => project.coverDoodle.endsWith('.png'))).toBe(true)
  })
})
