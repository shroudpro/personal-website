export interface AchievementItem {
  title: string
  description: string
  icon: string
}

export const achievementStat = {
  value: '10+',
  label: 'Project Iterations',
  description:
    '围绕 AI 应用、前端系统、数据分析和竞赛项目，持续完成可运行原型、文档和展示材料。',
}

export const achievements: AchievementItem[] = [
  {
    title: 'AI Application Builder',
    description:
      '完成多个 AI 应用方向原型，包括 PPT 生成、文化文创、法律问答和学习状态监测。',
    icon: '/images/doodles/trophy.png',
  },
  {
    title: 'Competition Project Experience',
    description: '具备从选题、MVP、文档、答辩到展示材料的完整项目推进经验。',
    icon: '/images/doodles/branch.png',
  },
  {
    title: 'Engineering Documentation',
    description: '习惯输出 PRD、技术设计、目录结构、实验报告和部署说明。',
    icon: '/images/doodles/heart-people.png',
  },
]
