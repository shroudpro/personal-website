# Shroud Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/Version-v0.2.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/Vue-3.x-brightgreen.svg" alt="Vue 3">
  <img src="https://img.shields.io/badge/Vite-7.x-646CFF.svg" alt="Vite">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/Markdown-Content-black.svg" alt="Markdown">
  <img src="https://img.shields.io/badge/Netlify-Auto%20Deploy-00C7B7.svg" alt="Netlify">
</p>

**Shroud Portfolio** 是一个静态个人博客 + 作品集网站，用于对外展示个人介绍、项目作品、成长经历、成就记录和阶段性思考，也作为本地维护的成长记录。内容通过本地 Markdown / TypeScript 文件更新，推送到 GitHub 后由 Netlify 自动部署。

---

## 🌐 网站入口

- 线上访问：https://shroud-personal-portfolio.netlify.app
- Netlify 项目：`shroud-personal-portfolio`

---

## ✨ 核心特性

- 静态部署：构建产物为 `dist`，访客只浏览内容。
- Markdown 内容维护：Experience、Project、Blog / Notes 均通过本地 Markdown 管理。
- 项目作品展示：首页展示精选项目，详情页渲染项目 Markdown。
- 成长记录时间线：Experience 从 Markdown frontmatter 生成时间线。
- Blog / Notes：成长记录页以 Experience Markdown 为主，额外展示 notes/blog 小记录。
- 静态 UI 中英文切换：只切换导航、标题、按钮、提示和空状态。
- Netlify 自动部署：GitHub push 后自动构建并发布。

---

## 📝 当前版本功能

- 首页：Hero、About、Experience、Projects、Achievements、Blog / Notes。
- 项目详情页：`/project/:id`，从 Project Markdown 渲染。
- 成长记录列表与详情：`/blog`、`/blog/:slug`，同时支持 experiences 和 notes。
- Markdown 项目内容：`src/content/projects`。
- Markdown 成长记录：`src/content/experiences`。
- Markdown Blog / Notes：`src/content/notes`。
- Achievement TS 数据：`src/data/achievements.ts`。
- Contact 静态信息：Email、GitHub、Resume、Status、Location 合并到 About。
- GitHub README 导入脚本：本地生成 Project Markdown 草稿。

---

## 📂 项目结构

```text
PersonalWebsite/
├── backend/                       # 未来扩展 / 历史实验代码，当前静态站不依赖
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── schema/
│   │   └── service/
│   ├── tests/
│   └── pyproject.toml
├── public/
│   ├── favicon.png
│   └── images/
│       ├── doodles/               # PNG 手绘装饰素材
│       └── texture/               # 纸感纹理
├── scripts/
│   └── import-github-project.ts   # 本地 GitHub README 导入脚本
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── project/
│   │   └── sections/
│   ├── content/
│   │   ├── experiences/           # Experience Markdown
│   │   ├── notes/                 # Blog / Notes Markdown
│   │   ├── projects/              # Project Markdown
│   │   ├── index.ts               # 内容集合读取与校验
│   │   ├── markdown.ts            # frontmatter 与 Markdown 解析
│   │   └── types.ts
│   ├── data/
│   │   ├── achievements.ts        # 成就数据
│   │   ├── nav.ts
│   │   └── profile.ts
│   ├── i18n/
│   ├── pages/
│   ├── router/
│   └── styles/
├── netlify.toml
├── package.json
├── 产品开发文档.md
└── README.md
```

---

## 🛠️ 环境依赖

在开始运行前，请确保本地具备：

- Node.js 18 或更高版本
- npm
- Git
- Netlify 账号

当前版本不需要 Python / FastAPI / 数据库作为运行或部署依赖。`backend/` 仅作为未来扩展或历史实验代码保留。

---

## 🚀 本地运行教程

### 1. 安装依赖

```bash
npm install
```

如果依赖需要严格按锁文件安装，可以使用：

```bash
npm ci
```

### 2. 启动开发服务

```bash
npm run dev
```

Vite 会在终端输出本地访问地址，默认监听 `127.0.0.1`。

### 3. 运行测试

```bash
npm run test
```

### 4. 类型检查

```bash
npm run typecheck
```

类型检查使用 `vue-tsc -b`，建议在本地提交前执行。

### 5. 生产构建

```bash
npm run build
```

构建产物输出到 `dist`。该命令通过 `node ./node_modules/vite/bin/vite.js build` 运行 Vite，用于兼容 Netlify 自动部署环境中 `.bin` 可执行文件权限异常的情况。

---

## 🧩 内容维护指南

### 新增 Experience

在 `src/content/experiences` 新建 Markdown 文件，例如：

```md
---
title: "AI PPT 生成系统阶段记录"
period: "2026-05"
role: "AI Application Developer"
category: "Project Learning"
summary: "记录从需求拆解到 MVP 实现的阶段过程。"
tags:
  - AI Application
  - Vue3
sortOrder: 10
isPublished: true
---

这里写成长记录正文。
```

Experience 是成长记录页的主要内容来源。`/blog` 会完整渲染已发布 Experience Markdown 的正文，`/blog/:slug` 也可以打开单条 Experience 详情。

`isPublished: false` 的内容不会展示，`sortOrder` 越小越靠前。

### 新增 Project

在 `src/content/projects` 新建 Markdown 文件。`id` 会用于详情页路由：

```md
---
id: "ai-ppt-generator"
title: "AI PPT Generator"
type: "AI Web Application"
summary: "一个面向论文和文档的 AI 演示文稿生成系统。"
stack:
  - Vue3
  - LLM API
featured: true
coverDoodle: "/images/doodles/browser-plant.png"
githubUrl: ""
demoUrl: ""
sortOrder: 10
isPublished: true
---

## Overview

项目概览。

## My Role

- 我的职责。

## Core Features

- 核心功能。

## Tech Stack

- 技术栈。

## Challenges & Solutions

- 难点与解决方案。

## Result

项目结果。
```

首页只展示前三个 `featured: true` 且 `isPublished: true` 的项目。

### 新增 Blog / Notes

在 `src/content/notes` 新建 Markdown 文件：

```md
---
slug: "static-portfolio-reset"
title: "静态作品集改造记录"
date: "2026-05-04"
summary: "记录项目从后端主线回退到静态站的原因。"
tags:
  - Portfolio
sortOrder: 10
isPublished: true
---

这里写正文。
```

Notes / Blog 适合记录更短的阶段想法、工具使用笔记或临时复盘，会作为成长记录页中的补充记录展示。

### 修改 Achievement

成就记录维护在：

```text
src/data/achievements.ts
```

只记录可以对外展示的阶段成果，图标继续使用 `public/images/doodles` 下的 PNG 素材。

### 使用 GitHub README 导入脚本

```bash
npm run import:github -- https://github.com/owner/repo
```

脚本会读取公开 README，生成 `src/content/projects/*.md` 草稿。生成后必须人工检查，默认不会自动发布，`isPublished` 为 `false`。

如果本地需要 GitHub Token，只能放在环境变量：

```bash
GITHUB_TOKEN=your_token
```

不要把 token 写入仓库。

---

## 🚢 Netlify 自动部署说明

1. 将本项目推送到 GitHub 仓库。
2. 在 Netlify 中选择 **Add new site**，连接该 GitHub 仓库。
3. 构建设置使用：
   - Build command：`npm run build`
   - Publish directory：`dist`
4. `netlify.toml` 已包含 SPA fallback：

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

5. 后续每次 push 到绑定分支，Netlify 会自动构建并发布。

当前版本不需要配置 Netlify 环境变量，不需要配置后端部署或数据库部署。

`npm run build` 在 CI 中只运行 Vite 静态构建，并且直接通过 Node 执行 Vite 入口文件，不依赖 `node_modules/.bin/vite` 的执行权限。本地提交前如需完整检查，请先运行：

```bash
npm run test
npm run typecheck
npm run build
```

### 手动覆盖生产部署

如果需要在本地手动重新部署并覆盖当前生产站点，按下面流程执行：

```powershell
# 1. 确认 Netlify CLI 登录状态和当前绑定站点
$env:npm_config_cache='.npm-cache-local'
npx netlify status

# 2. 本地检查和构建
npm run test
npm run typecheck
npm run build

# 3. 将 dist 覆盖部署到生产环境
$env:npm_config_cache='.npm-cache-local'
npx netlify deploy --prod --dir=dist
```

当前项目已绑定到 Netlify 站点 `shroud-personal-portfolio`。手动生产部署成功后，CLI 会输出：

```text
Production URL: https://shroud-personal-portfolio.netlify.app
```

---

## ❓ 常见问题

**Q: 为什么没有后端？**  
A: 当前目标是静态个人博客 + 作品集。内容由本地 Markdown / TypeScript 文件维护，推送后重新部署即可，部署复杂度和维护成本更低。

**Q: 如何新增项目？**  
A: 在 `src/content/projects` 新建 Markdown，补齐 frontmatter 和正文。如果希望首页展示，设置 `featured: true`、`isPublished: true`，并调整 `sortOrder`。

**Q: 如何新增成长记录？**  
A: 主要经历放在 `src/content/experiences`，会在 `/blog` 中完整渲染 Markdown 正文。短笔记或临时复盘放在 `src/content/notes`，会作为补充小记录展示。新增后运行 `npm run test` 和 `npm run build`。

**Q: 为什么修改内容后线上没变化？**  
A: 请确认修改已提交并 push 到 Netlify 绑定的 GitHub 分支，同时检查 Netlify 的最新构建是否成功。

**Q: README 自动导入失败怎么办？**  
A: 先确认仓库链接是公开 GitHub 仓库，格式为 `https://github.com/owner/repo`。如果 GitHub API 额度不足，可在本地设置 `GITHUB_TOKEN` 环境变量后重试。

**Q: 后端目录还需要部署吗？**  
A: 不需要。当前版本不部署 FastAPI，不配置 PostgreSQL，也不依赖 `DATABASE_URL` 或 `API_WRITE_TOKEN`。这些只属于未来扩展或历史实验语境。

---

## 📄 开源协议或说明

当前项目用于个人展示和学习记录，开源协议可后续补充。
