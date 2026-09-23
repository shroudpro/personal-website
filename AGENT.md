# 项目开发进度说明

更新时间：2026-09-23

## 当前目标

本项目当前主线是基于 Vue3 + Vite + TypeScript 的静态个人博客 + 作品集网站，用于对外展示 Shroud 的个人介绍、项目作品、成长经历、成就记录和阶段性思考，也作为本地维护的成长记录。

当前版本不开发线上后端、不接线上数据库、不做登录、不做可视化后台、不做在线 CRUD、不做评论、点赞、访问统计或真实 Contact 表单。访客只浏览内容，不写入任何数据。

## 当前内容维护方式

1. Experience 使用 Markdown 维护：
   - 目录：`src/content/experiences`
   - 每条记录通过 frontmatter 提供 `title`、`period`、`role`、`category`、`summary`、`tags`、`sortOrder`、`isPublished`。

2. Project 使用 Markdown 维护：
   - 目录：`src/content/projects`
   - 项目列表和详情页都来自 Markdown frontmatter 与正文。
   - 首页只展示前三个 `featured: true` 且 `isPublished: true` 的项目。

3. Blog / Notes 使用 Markdown 维护：
   - 目录：`src/content/notes`
   - 作为成长记录页中的补充小记录，不替代主要经历。
   - 路由：`/blog`、`/blog/:slug`。

4. Achievement 使用 TypeScript 数据维护：
   - 文件：`src/data/achievements.ts`
   - 用于记录可对外展示的阶段成果。

5. 静态 UI 中英文切换：
   - 文案文件：`src/i18n/messages.ts`
   - 只切换导航、section 标题、按钮、提示、空状态等静态文案。
   - 不翻译 Markdown 正文、项目详情、成长记录正文和成就描述。

6. 项目经历素材：
   - 已将 5 个项目的精简素材写入 `src/content/projects` 和 `src/content/experiences`。
   - 新增项目：Talk Kids、Wardrobe、Quartus MCP、数学建模竞赛求解与论文生成模板、ContractAI。
   - 新增经历：Windows 本地 AI 语音应用适配、Quartus MCP 工具开发、数学建模 AI 工作流模板、合同审核 AI 工作流、AI 衣橱工作流。
   - 项目 Markdown 使用 `id`、`title`、`period`、`type`、`summary`、`stack`、`featured`、`coverDoodle`、`githubUrl`、`demoUrl`、`sortOrder`、`isPublished`；`period` 格式为 `YYYY-MM` 或日期范围。
   - 经历 Markdown 使用 `title`、`period`、`role`、`category`、`summary`、`tags`、`sortOrder`、`isPublished`。
   - 新增项目默认 `featured: false`，不替换首页现有的前三个精选项目；内容仍会被构建期内容集合读取。
   - Projects 与 Experiences 按 `period` 的结束月份、开始月份从新到旧排序；同期内容用 `sortOrder` 升序稳定排序。Notes 仍按 `sortOrder` 升序。

## 已完成内容

1. 项目骨架
   - 已初始化 Vue3 + Vite + TypeScript 项目。
   - 已配置 Vue Router，包含 `/`、`/project/:id`、`/blog`、`/blog/:slug`。
   - 已建立 `src/components`、`src/content`、`src/data`、`src/pages`、`src/router`、`src/styles`、`public/images` 等目录结构。

2. 页面结构
   - 首页结构：Home / Hero、About、Experience、Projects、Achievements、Blog / Notes。
   - 固定左侧 Sidebar 保留，导航加入 Blog / Notes 入口。
   - Contact 独立模块已取消，Email、GitHub、Resume、Status、Location 合并到 About 静态信息区。
   - Resume 当前保持禁用占位，不提供假下载。

3. 内容系统
   - 已实现 Vite `import.meta.glob` 构建期读取 Markdown。
   - 已实现 frontmatter 解析、Markdown 结构化渲染、必填字段校验测试。
   - 已支持 `isPublished: false` 内容不展示。
   - 已支持 `sortOrder` 控制展示顺序。

4. 项目详情
   - `ProjectDetailPage` 根据 `/project/:id` 从 Project Markdown 读取内容。
   - 支持 Overview、My Role、Core Features、Tech Stack、Challenges & Solutions、Result。
   - 缺失章节时展示稳定空状态，不导致页面崩溃。

5. Blog / Notes
   - 首页展示最近 3 条统一成长记录，优先来自 `src/content/experiences`。
   - `/blog` 先完整渲染已发布 experiences 的 Markdown 正文，再展示 notes/blog 小记录。
   - `/blog/:slug` 同时支持 experience 和 note 的 Markdown 正文。

6. GitHub README 本地导入
   - 已新增 `scripts/import-github-project.ts`。
   - 命令：`npm run import:github -- https://github.com/owner/repo`
   - 生成 Project Markdown 草稿，默认 `isPublished: false`。
   - 默认不覆盖已有文件，除非显式追加 `--overwrite`。

7. 视觉与样式
   - 保留暖白纸感、极简留白、固定左侧导航、衬线标题、手绘 PNG 装饰图风格。
   - 样式继续使用 CSS Variables + 原生 CSS。
   - 未引入大型 UI 组件库。

8. 部署配置
   - `netlify.toml` 使用 `npm run build`，该命令通过 `node ./node_modules/vite/bin/vite.js build` 运行 Vite，避免 Netlify 执行 `node_modules/.bin` 脚本时出现权限问题。
   - 发布目录为 `dist`。
   - 已保留 SPA fallback：`/*` 到 `/index.html`。
   - 当前版本不需要 Netlify 环境变量。

9. 当前内容状态
   - 新增的 5 个项目和 5 条经历已设置为 `isPublished: true`，正文已明确 MVP、Alpha、模板开发和未完成能力等边界。
   - 数学建模项目当前只能描述为模板开发与示例输入阶段，不能表述为已完成预测模型或竞赛论文。
   - Talk Kids、Wardrobe、Quartus MCP 和 ContractAI 均保留本地实验、真实设备验证、生产部署或测试覆盖等限制说明。

## 后端目录说明

`backend/` 目录当前保留为历史实验代码 / 未来扩展参考，不属于当前静态站主线。当前版本不部署 FastAPI 后端，不配置数据库，也不依赖任何线上 CRUD API。

## 验证要求

每次涉及代码或内容系统修改后，应运行：

```bash
npm run test
npm run typecheck
npm run build
rg "Your Name|Awesome Company|Lorem Ipsum" src README.md
rg "\.svg" src index.html
rg "FastAPI|PostgreSQL|DATABASE_URL|API_WRITE_TOKEN|Render|Neon|Supabase" README.md 产品开发文档.md
```

最后一条检查不是要求完全没有这些词，而是确认它们只出现在“未来扩展”或“非当前目标”语境里，不能作为当前运行或部署依赖出现。

当前内容专项验证也应运行：

```bash
npm run test -- src/content/content.test.ts src/data/projects.test.ts src/i18n/messages.test.ts
```

说明：完整 `npm run test` 会递归扫描工作区中的 `.agents/skills/impeccable-main/tests`。该目录包含 Bun/AI 运行时测试，当前项目依赖未提供 `bun:test` 和 `ai`，因此完整命令可能因工作区外部测试失败；内容专项测试、`npm run typecheck` 和 `npm run build` 才是本项目内容修改的直接验证依据。
