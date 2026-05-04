import { parseMarkdownDocument } from './markdown'
import type {
  ExperienceContent,
  ExperienceFrontmatter,
  NoteContent,
  NoteFrontmatter,
  ProjectAction,
  ProjectContent,
  ProjectFrontmatter,
} from './types'

const experienceModules = import.meta.glob('./experiences/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const projectModules = import.meta.glob('./projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const noteModules = import.meta.glob('./notes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function filenameToSlug(path: string): string {
  return path.split('/').pop()?.replace(/\.md$/, '') ?? path
}

function bySortOrder<T extends { sortOrder: number }>(left: T, right: T): number {
  return left.sortOrder - right.sortOrder
}

function buildExperiences(): ExperienceContent[] {
  return Object.entries(experienceModules)
    .map(([path, source]) => {
      const document = parseMarkdownDocument<ExperienceFrontmatter>(filenameToSlug(path), source)
      return {
        slug: document.slug,
        blocks: document.blocks,
        ...document.frontmatter,
      }
    })
    .filter((item) => item.isPublished)
    .sort(bySortOrder)
}

function buildProjects(): ProjectContent[] {
  return Object.entries(projectModules)
    .map(([path, source]) => {
      const document = parseMarkdownDocument<ProjectFrontmatter>(filenameToSlug(path), source)
      const links = {
        github: document.frontmatter.githubUrl || undefined,
        demo: document.frontmatter.demoUrl || undefined,
      }
      return {
        slug: document.slug,
        blocks: document.blocks,
        links,
        ...document.frontmatter,
      }
    })
    .filter((item) => item.isPublished)
    .sort(bySortOrder)
}

function buildNotes(): NoteContent[] {
  return Object.entries(noteModules)
    .map(([path, source]) => {
      const document = parseMarkdownDocument<NoteFrontmatter>(filenameToSlug(path), source)
      return {
        blocks: document.blocks,
        ...document.frontmatter,
      }
    })
    .filter((item) => item.isPublished)
    .sort(bySortOrder)
}

export const experiences = buildExperiences()
export const projects = buildProjects()
export const notes = buildNotes()

export function getFeaturedProjects(limit = 3): ProjectContent[] {
  return projects.filter((project) => project.featured).slice(0, limit)
}

export function getProjectById(id: string): ProjectContent | undefined {
  return projects.find((project) => project.id === id || project.slug === id)
}

export function getProjectActions(project: ProjectContent): ProjectAction[] {
  const actions: ProjectAction[] = []

  if (project.links?.github) {
    actions.push({ label: 'View GitHub', href: project.links.github })
  }

  if (project.links?.demo) {
    actions.push({ label: 'View Demo', href: project.links.demo })
  }

  return actions
}

export function getProjectRouteId(project: ProjectContent): string {
  return project.id
}

export function getRecentNotes(limit = 3): NoteContent[] {
  return notes.slice(0, limit)
}

export function getNoteBySlug(slug: string): NoteContent | undefined {
  return notes.find((note) => note.slug === slug)
}

function hasStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

export function validateContentCollections(): string[] {
  const errors: string[] = []

  for (const item of experiences) {
    if (!item.title || !item.period || !item.role || !item.category || !item.summary) {
      errors.push(`Experience 缺少必填字段: ${item.slug}`)
    }
    if (!hasStringArray(item.tags)) {
      errors.push(`Experience tags 必须是字符串数组: ${item.slug}`)
    }
  }

  for (const item of projects) {
    if (!item.id || !item.title || !item.type || !item.summary || !item.coverDoodle) {
      errors.push(`Project 缺少必填字段: ${item.slug}`)
    }
    if (!hasStringArray(item.stack)) {
      errors.push(`Project stack 必须是字符串数组: ${item.slug}`)
    }
    if (!item.coverDoodle.endsWith('.png')) {
      errors.push(`Project coverDoodle 必须使用 PNG: ${item.slug}`)
    }
  }

  for (const item of notes) {
    if (!item.slug || !item.title || !item.date || !item.summary) {
      errors.push(`Note 缺少必填字段: ${item.slug}`)
    }
    if (!hasStringArray(item.tags)) {
      errors.push(`Note tags 必须是字符串数组: ${item.slug}`)
    }
  }

  return errors
}

export type {
  ExperienceContent,
  NoteContent,
  ProjectAction,
  ProjectContent,
  ProjectFrontmatter,
} from './types'
