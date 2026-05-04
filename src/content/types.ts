export interface MarkdownBlock {
  type: 'heading' | 'paragraph' | 'list'
  level?: number
  text?: string
  items?: string[]
}

export interface MarkdownDocument<TFrontmatter> {
  slug: string
  frontmatter: TFrontmatter
  blocks: MarkdownBlock[]
  rawBody: string
}

export interface ExperienceFrontmatter {
  title: string
  period: string
  role: string
  category: string
  summary: string
  tags: string[]
  sortOrder: number
  isPublished: boolean
}

export interface ProjectFrontmatter {
  id: string
  title: string
  type: string
  summary: string
  stack: string[]
  featured: boolean
  coverDoodle: string
  githubUrl: string
  demoUrl: string
  sortOrder: number
  isPublished: boolean
}

export interface NoteFrontmatter {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  sortOrder: number
  isPublished: boolean
}

export interface ExperienceContent extends ExperienceFrontmatter {
  slug: string
  blocks: MarkdownBlock[]
}

export interface ProjectExternalLinks {
  github?: string
  demo?: string
}

export interface ProjectAction {
  label: string
  href: string
}

export interface ProjectContent extends ProjectFrontmatter {
  slug: string
  blocks: MarkdownBlock[]
  links?: ProjectExternalLinks
}

export interface NoteContent extends NoteFrontmatter {
  blocks: MarkdownBlock[]
}
