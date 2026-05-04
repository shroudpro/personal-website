import { describe, expect, it } from 'vitest'
import { messages } from './messages'

describe('static UI i18n messages', () => {
  it('中英文静态 UI 文案应存在可见差异', () => {
    expect(messages.zh.nav.about).toBe('关于我')
    expect(messages.en.nav.about).toBe('About')
    expect(messages.zh.section.projectsTitle).toBe('精选项目')
    expect(messages.en.section.projectsTitle).toBe('Selected Projects')
    expect(messages.zh.action.viewWork).toBe('查看作品')
    expect(messages.en.action.viewWork).toBe('View My Work')
  })
})
