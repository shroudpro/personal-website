import type { MarkdownBlock, MarkdownDocument } from './types'

type FrontmatterValue = string | number | boolean | string[]

function parseScalar(value: string): FrontmatterValue {
  const trimmed = value.trim()
  if (trimmed === 'true') {
    return true
  }
  if (trimmed === 'false') {
    return false
  }
  if (/^-?\d+$/.test(trimmed)) {
    return Number(trimmed)
  }
  return trimmed.replace(/^["']|["']$/g, '')
}

function parseFrontmatterBlock(block: string): Record<string, FrontmatterValue> {
  const result: Record<string, FrontmatterValue> = {}
  const lines = block.split(/\r?\n/)

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? ''
    const pair = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/)
    if (!pair) {
      continue
    }

    const key = pair[1]
    const rawValue = pair[2]
    if (!key || rawValue === undefined) {
      continue
    }
    if (rawValue.trim()) {
      result[key] = parseScalar(rawValue)
      continue
    }

    const items: string[] = []
    while (index + 1 < lines.length && /^\s+-\s+/.test(lines[index + 1] ?? '')) {
      index += 1
      items.push((lines[index] ?? '').replace(/^\s+-\s+/, '').replace(/^["']|["']$/g, ''))
    }
    result[key] = items
  }

  return result
}

export function parseMarkdownBlocks(markdown: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = []
  const lines = markdown.split(/\r?\n/)
  let paragraph: string[] = []
  let listItems: string[] = []

  function flushParagraph(): void {
    if (!paragraph.length) {
      return
    }
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') })
    paragraph = []
  }

  function flushList(): void {
    if (!listItems.length) {
      return
    }
    blocks.push({ type: 'list', items: listItems })
    listItems = []
  }

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      flushParagraph()
      flushList()
      continue
    }

    const heading = trimmed.match(/^(#{2,3})\s+(.+)$/)
    if (heading) {
      flushParagraph()
      flushList()
      blocks.push({ type: 'heading', level: heading[1]?.length ?? 2, text: heading[2] ?? '' })
      continue
    }

    const listItem = trimmed.match(/^-\s+(.+)$/)
    if (listItem) {
      flushParagraph()
      listItems.push(listItem[1] ?? '')
      continue
    }

    flushList()
    paragraph.push(trimmed)
  }

  flushParagraph()
  flushList()

  return blocks
}

export function parseMarkdownDocument<TFrontmatter>(
  slug: string,
  source: string,
): MarkdownDocument<TFrontmatter> {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    throw new Error(`Markdown 文件缺少 frontmatter: ${slug}`)
  }

  const frontmatter = parseFrontmatterBlock(match[1] ?? '') as TFrontmatter
  const rawBody = (match[2] ?? '').trim()

  return {
    slug,
    frontmatter,
    rawBody,
    blocks: parseMarkdownBlocks(rawBody),
  }
}

export function getBlocksByHeading(blocks: MarkdownBlock[], headingText: string): MarkdownBlock[] {
  const startIndex = blocks.findIndex(
    (block) => block.type === 'heading' && block.text?.toLowerCase() === headingText.toLowerCase(),
  )
  if (startIndex < 0) {
    return []
  }

  const result: MarkdownBlock[] = []
  const startBlock = blocks[startIndex]
  if (!startBlock) {
    return result
  }

  for (let index = startIndex + 1; index < blocks.length; index += 1) {
    const block = blocks[index]
    if (!block) {
      continue
    }
    if (block.type === 'heading' && block.level === startBlock.level) {
      break
    }
    result.push(block)
  }

  return result
}
