export interface ExperienceItem {
  period: string
  role: string
  org: string
  description: string
}

export const experiences: ExperienceItem[] = [
  {
    period: '2026',
    role: 'AI Application Developer',
    org: 'AI PPT Generation System',
    description:
      '构建面向论文和文档的 AI 演示文稿生成系统，完成内容解析、页面规划、可编辑输出和项目展示流程设计。',
  },
  {
    period: '2026',
    role: 'Frontend & Product Developer',
    org: 'Cultural AI Creation Platform',
    description:
      '参与传统文化 AI 文创平台设计，负责页面流程、前端架构、生图 API 接入方案和项目包装。',
  },
  {
    period: '2025 - 2026',
    role: 'CS Student / Project Builder',
    org: 'Academic & Competition Projects',
    description:
      '持续完成 AI 应用、计算机视觉、数学建模、数据分析和前端系统方向的课程与竞赛项目。',
  },
]
