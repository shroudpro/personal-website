export interface ContactLink {
  label: string
  value: string
  href: string
  enabled: boolean
}

export const profile = {
  name: 'Shroud',
  logoText: 'S',
  headline: 'I build AI ideas into working systems.',
  heroIntro:
    '我是一名关注 AI 智能应用开发的开发者，擅长将想法拆解为可运行的 MVP、前端交互页面和项目展示系统，用AI赋能应用开发。',
  aboutIntro: [
    '目前专注于AI智能应用开发，擅长用AI赋能各种领域，熟练使用并开发Agent应用，喜欢将抽象的想法落地，转化为可迭代、可展示、可运行的产品',
    '相比只写功能，我更关注项目的完整表达：用户场景、页面流程、技术架构、核心亮点和最终展示效果。',
  ],
  handwritten: {
    hero: 'Simplicity is the ultimate sophistication.',
    achievement: 'Keep building, keep learning.',
  },
  contactIntro:
    '如果你想了解我的项目、交流 AI 应用开发、前端工程实践或竞赛项目构建，可以通过以下方式联系我。',
  contactNotice: '当前为静态展示表单，请通过邮箱联系我。',
  status: 'BUPT在读,欢迎交流合作',
  location: 'China/Beijing',
  contactLinks: [
    {
      label: 'Email',
      value: 'shroudmail233@Gmail.com',
      href: 'mailto:shroudmail233@Gmail.com',
      enabled: true,
    },
    {
      label: 'GitHub',
      value: 'github.com/shroudpro',
      href: 'https://github.com/shroudpro',
      enabled: true,
    },
    {
      label: 'Resume',
      value: '简历待补充',
      href: '',
      enabled: false,
    },
  ] satisfies ContactLink[],
  capabilityTags: [
    {
      title: 'AI Application',
      description: '将 LLM、生图 API、视觉识别等能力接入具体产品流程。',
    },
    {
      title: 'Frontend Engineering',
      description: '使用 Vue / React 构建清晰、稳定、可维护的前端页面。',
    },
    {
      title: 'Product Thinking',
      description: '从需求、用户、场景和展示效果反推项目结构。',
    },
    {
      title: 'Rapid MVP',
      description: '在有限时间内完成可运行原型、技术文档和答辩材料。',
    },
  ],
}
