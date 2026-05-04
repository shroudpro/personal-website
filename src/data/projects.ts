export interface ProjectChallenge {
  title: string
  solution: string
}

export interface ProjectExternalLinks {
  github?: string
  demo?: string
}

export interface ProjectAction {
  label: string
  href: string
}

export interface ProjectItem {
  id: string
  title: string
  type: string
  summary: string
  overview: string
  stack: string[]
  coverDoodle: string
  featured: boolean
  role: string[]
  features: string[]
  challenges: ProjectChallenge[]
  result: string
  links?: ProjectExternalLinks
}

export const projects: ProjectItem[] = [
  {
    id: 'ai-ppt-generator',
    title: 'AI PPT Generator',
    type: 'AI Web Application',
    summary:
      '一个面向论文和文档的 AI 演示文稿生成系统，支持内容解析、页面规划和可编辑 PPTX 输出。',
    overview:
      '该项目面向需要快速整理论文、报告和长文档的用户，将原始内容解析为演示结构，再生成可继续编辑的页面结果。',
    stack: ['Vue3', 'FastAPI', 'LLM API', 'PPTX', 'Editable Output'],
    coverDoodle: '/images/doodles/browser-plant.png',
    featured: true,
    role: ['产品流程设计', '前端页面实现', 'AI 生成流程设计', '可编辑输出方案设计'],
    features: ['文档内容解析', '页面结构规划', '版式生成', 'PPTX / 可编辑输出'],
    challenges: [
      {
        title: '生成结果结构不稳定',
        solution: '使用固定字段 schema 约束输出，并在渲染层加入兜底规则。',
      },
      {
        title: '设计感和可编辑性冲突',
        solution: '将视觉元素拆分为文本、形状、图片和背景层，避免整页图片化。',
      },
    ],
    result:
      '完成了从文档输入、页面规划到可编辑输出的 MVP 流程，可用于课程展示、项目答辩和后续产品化验证。',
  },
  {
    id: 'cultural-ai-creation-platform',
    title: 'Cultural AI Creation Platform',
    type: 'AI Creative Product',
    summary:
      '一个结合汉字文化解析与文生图能力的传统文化创意平台，用于生成海报、包装和文创视觉方案。',
    overview:
      '项目围绕传统文化内容表达，将汉字含义、文化语义和视觉提示词组织为可生成的创意方案。',
    stack: ['Vue3', 'FastAPI', 'ModelScope API', 'Prompt Engineering'],
    coverDoodle: '/images/doodles/chair.png',
    featured: true,
    role: ['页面流程设计', '前端架构实现', '生图 API 接入方案', '项目包装与展示材料整理'],
    features: ['汉字文化解析', '提示词组织', '海报视觉生成', '文创方案展示'],
    challenges: [
      {
        title: '文化语义难以直接转化为画面',
        solution: '将文字拆分为意象、材料、构图和色彩字段，再组合为稳定提示词。',
      },
      {
        title: '生成效果需要保持统一气质',
        solution: '用固定风格词和展示模板控制输出，降低每次生成的视觉波动。',
      },
    ],
    result:
      '形成了从文化输入到视觉方案展示的完整原型，适合用于传统文化创新项目展示和答辩说明。',
  },
  {
    id: 'study-monitor',
    title: 'Study Monitor',
    type: 'Computer Vision System',
    summary:
      '一个基于摄像头、YOLO 检测和本地 LLM 解释的学习状态分析原型，用于记录和展示学习行为状态。',
    overview:
      '项目尝试把视觉检测结果转化为更容易理解的学习状态记录，用于观察专注、离席和行为变化。',
    stack: ['YOLO', 'Ollama', 'Qwen', 'Vue', 'Python'],
    coverDoodle: '/images/doodles/phone.png',
    featured: true,
    role: ['视觉检测流程设计', '状态展示页面实现', '本地模型解释流程整理', '实验记录与展示材料编写'],
    features: ['摄像头画面采集', '学习行为检测', '本地 LLM 解释', '状态历史展示'],
    challenges: [
      {
        title: '检测结果和真实学习状态存在偏差',
        solution: '把检测结果作为辅助信号展示，并保留状态解释和人工判断空间。',
      },
      {
        title: '本地模型调用链路较长',
        solution: '拆分检测、解释和展示流程，先保证单步结果可观察，再组合为完整原型。',
      },
    ],
    result:
      '完成了可演示的学习状态监测 MVP，能够展示计算机视觉与本地大模型结合的应用思路。',
  },
]

export function getFeaturedProjects(limit = 3): ProjectItem[] {
  return projects.filter((project) => project.featured).slice(0, limit)
}

export function getProjectById(id: string): ProjectItem | undefined {
  return projects.find((project) => project.id === id)
}

export function getProjectActions(project: ProjectItem): ProjectAction[] {
  const actions: ProjectAction[] = []

  if (project.links?.github) {
    actions.push({
      label: 'View GitHub',
      href: project.links.github,
    })
  }

  if (project.links?.demo) {
    actions.push({
      label: 'View Demo',
      href: project.links.demo,
    })
  }

  return actions
}
