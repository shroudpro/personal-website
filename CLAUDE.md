# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # 启动 Vite 开发服务器 (127.0.0.1)
npm run build     # vue-tsc 类型检查 + Vite 生产构建
npm run test      # 运行所有 Vitest 测试
npm run preview   # 预览生产构建
npm run import:github -- https://github.com/owner/repo  # 从 GitHub README 导入项目草稿
```

## Project Overview

静态个人博客 + 作品集网站（Vue 3 + Vite + TypeScript）。内容通过本地 Markdown 文件维护，Git push 后由 Netlify 自动部署。

## Architecture

### 路由结构 (`src/router/index.ts`)

- `/` — 首页（单页滚动：Hero → About → Experience → Projects → Achievements → Notes）
- `/project/:id` — 项目详情页
- `/blog` — Blog / Notes 列表页
- `/blog/:slug` — Blog / Notes 详情页

### 内容系统 (`src/content/`)

核心是 Vite `import.meta.glob` 懒加载 + 自建 Markdown 解析器。不依赖任何 CMS 或外部数据源。

- `types.ts` — 定义 `ExperienceContent`、`ProjectContent`、`NoteContent` 等接口
- `markdown.ts` — 自建 frontmatter 解析 + 简单的 heading/paragraph/list 分块
- `index.ts` — 构建时读取 `content/{experiences,projects,notes}/*.md`，按 `isPublished` 和 `sortOrder` 过滤排序，导出查询函数（`getProjectById`、`getFeaturedProjects`、`getNoteBySlug` 等）

**三种内容类型的 Markdown 文件**：
- `src/content/experiences/*.md` — 成长经历时间线
- `src/content/projects/*.md` — 项目展示（frontmatter 含 `coverDoodle` PNG 路径）
- `src/content/notes/*.md` — Blog / Notes

### 组件结构 (`src/components/`)

- `common/` — 通用组件：DoodleImage、MarkdownBlocks、SectionTitle、TagList、TextArrowLink、WatercolorBlob
- `layout/` — AppLayout（主布局）、SidebarNav（侧边导航）
- `project/` — ProjectHero、ProjectOverview、ProjectFeatureGrid、ProjectChallengeList
- `sections/` — 首页各区块组件，与路由页面一一对应

### i18n (`src/i18n/messages.ts` + `src/composables/use-locale.ts`)

- 仅切换 UI 文案（导航、按钮、标题、空状态提示），不翻译内容
- 语言偏好存储在 `localStorage` 的 `portfolio-locale` key
- 无 i18n 库依赖，纯对象 + computed

### 样式体系 (`src/styles/`)

- `variables.css` — CSS 自定义属性（颜色、字体、间距、阴影等设计 Token）
- `base.css` — 全局 reset 与基础样式
- `typography.css` — 正文/标题排版
- `layout.css` — 页面布局（侧边栏 + 内容区）
- `responsive.css` — 响应式适配

### 设计素材 (`public/images/`)

- `doodles/` — PNG 手绘装饰素材，作为项目封面和页面装饰
- `texture/` — 纸感纹理背景

### 测试

- `src/content/content.test.ts` — 验证内容集合的正确性（过滤、排序、必填字段、封面 PNG）
- `src/i18n/messages.test.ts` — i18n 消息结构完整性
- `src/data/projects.test.ts` — 项目数据辅助函数
- 使用 Vitest 运行，无需额外配置

### 部署

- `netlify.toml` — Build command: `npm run build`，Publish directory: `dist`，含 SPA fallback redirect
- 无需后端、无需数据库、无需环境变量
