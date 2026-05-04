import { describe, expect, it } from 'vitest'
import { getFeaturedProjects, getProjectActions, getProjectById } from './projects'
import { achievements } from './achievements'
import { profile } from './profile'

describe('projects data helpers', () => {
  it('只返回前三个精选项目', () => {
    const featuredProjects = getFeaturedProjects()

    expect(featuredProjects).toHaveLength(3)
    expect(featuredProjects.every((project) => project.featured)).toBe(true)
  })

  it('可以通过 id 读取项目详情', () => {
    const project = getProjectById('ai-ppt-generator')

    expect(project?.title).toBe('AI PPT Generator')
  })

  it('未知 id 返回 undefined', () => {
    expect(getProjectById('missing-project')).toBeUndefined()
  })

  it('项目和成就装饰图使用 PNG 素材', () => {
    const projectDoodles = getFeaturedProjects().map((project) => project.coverDoodle)
    const achievementDoodles = achievements.map((achievement) => achievement.icon)

    expect([...projectDoodles, ...achievementDoodles].every((path) => path.endsWith('.png'))).toBe(
      true,
    )
  })

  it('联系方式只启用真实 Email 和 GitHub，Resume 保持禁用', () => {
    const email = profile.contactLinks.find((link) => link.label === 'Email')
    const github = profile.contactLinks.find((link) => link.label === 'GitHub')
    const resume = profile.contactLinks.find((link) => link.label === 'Resume')

    expect(email).toMatchObject({
      value: 'shroudmail233@Gmail.com',
      href: 'mailto:shroudmail233@Gmail.com',
      enabled: true,
    })
    expect(github).toMatchObject({
      value: 'github.com/shroudpro',
      href: 'https://github.com/shroudpro',
      enabled: true,
    })
    expect(resume).toMatchObject({
      value: '简历待补充',
      href: '',
      enabled: false,
    })
  })

  it('没有真实链接的项目不生成 GitHub 或 Demo 操作入口', () => {
    const project = getProjectById('ai-ppt-generator')

    expect(project).toBeDefined()
    expect(getProjectActions(project!)).toEqual([])
  })
})
