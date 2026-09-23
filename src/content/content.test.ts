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
  it('项目与经历按 period 从新到旧展示，同期内容按 sortOrder 稳定排序', () => {
    expect(experiences.every((item) => item.isPublished)).toBe(true)
    expect(projects.every((item) => item.isPublished)).toBe(true)
    expect(notes.every((item) => item.isPublished)).toBe(true)

    expect(experiences.map((item) => item.slug)).toEqual([
      '2026-07-wardrobe',
      '2026-06-mathematical-modeling-template',
      '2026-06-contract-ai',
      '2026-05-ai-ppt-learning',
      '2026-05-math-modeling-engineering',
      '2026-05-codex-iteration-workflow',
      '2026-05-quartus-mcp',
      '2026-04-talk-kids',
      '2026-04-study-monitor',
      '2026-04-cultural-ai-platform',
      '2026-04-frontend-refactor',
      '2026-03-competition-review',
    ])
    expect(projects.map((item) => item.id)).toEqual([
      'wardrobe',
      'mathematical-modeling-ai-template',
      'contract-ai',
      'ai-ppt-generator',
      'quartus-mcp',
      'talk-kids',
      'cultural-ai-creation-platform',
      'study-monitor',
    ])
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
