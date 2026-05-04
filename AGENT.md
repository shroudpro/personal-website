# 项目开发进度说明

更新时间：2026-05-04

## 当前目标

本项目是一个基于 Vue3 + Vite + TypeScript + FastAPI 的个人自用内容管理型作品集网站，用于展示 Shroud 的个人简介、AI 应用项目、经历、成就和联系方式。网站不包含访客注册、访客登录、完整账号系统、可视化后台、评论、点赞、访问统计或真实 Contact 表单提交。

## 已完成内容

1. 项目骨架
   - 已在当前根目录初始化 Vue3 + Vite + TypeScript 项目。
   - 已配置 Vue Router，包含首页 `/` 和项目详情页 `/project/:id`。
   - 已建立 `src/components`、`src/pages`、`src/data`、`src/router`、`src/styles`、`public/images` 等目录结构。

2. 页面结构
   - 首页已实现六个 section：Home / Hero、About、Experience、Projects、Achievements、Contact。
   - 已实现固定左侧 Sidebar，包含 eye-logo、导航、社交占位和版权信息。
   - 已实现通用项目详情页，根据 `projects.ts` 中的 `id` 渲染项目内容。

3. 数据驱动
   - 站点内容集中维护在 `src/data` 下：
     - `profile.ts`
     - `nav.ts`
     - `projects.ts`
     - `experiences.ts`
     - `achievements.ts`
   - 首页项目区只展示前三个 `featured: true` 项目。
   - Contact 已配置真实 Email 和 GitHub，Resume 保持占位禁用，不生成假下载链接。

4. 视觉与样式
   - 已实现暖白纸感背景、极简留白、细线分割、衬线标题、中文正文、手写英文点缀和淡粉米色水彩底纹。
   - 已完成桌面端固定 Sidebar 与移动端顶部导航的响应式适配。
   - 样式使用 CSS Variables + 原生 CSS，没有引入大型 UI 组件库。

5. PNG 素材迁移
   - 已取消页面中对 SVG 装饰素材的引用。
   - 已从 `design.png` 中裁切并抠出 PNG 装饰素材，迁移到 `public/images/doodles`。
   - 已将纸感纹理切换为 `public/images/texture/paper-noise.png`。
   - 已将 favicon 切换为 `public/favicon.png`。

## 当前 PNG 素材清单

- `public/images/doodles/eye-logo.png`
- `public/images/doodles/hero-eye.png`
- `public/images/doodles/desk-scene.png`
- `public/images/doodles/mountain.png`
- `public/images/doodles/phone.png`
- `public/images/doodles/browser-plant.png`
- `public/images/doodles/chair.png`
- `public/images/doodles/branch.png`
- `public/images/doodles/coffee-hand.png`
- `public/images/doodles/trophy.png`
- `public/images/doodles/heart-people.png`
- `public/images/texture/paper-noise.png`
- `public/favicon.png`

## 验证记录

- 已新增测试，约束项目和成就装饰图必须使用 PNG 素材。
- 后续每次修改后应运行：
  - `npm run test`
  - `npm run build`
  - `rg "\\.svg" src index.html`
  - 模板占位关键词检查

6. 部署准备
   - 已新增 `netlify.toml`，构建命令为 `npm run build`，发布目录为 `dist`。
   - 已配置 Vue Router history fallback，所有路径回退到 `/index.html`。
   - 已新增 `README.md`，说明项目定位、技术栈、运行方式、构建方式、目录结构、数据维护方式和 Netlify 部署方式。

7. 内容管理升级
   - 已新增静态 UI 中英文切换，语言状态保存在 `localStorage`。
   - Contact 已从表单改为静态信息展示，包含 Email、GitHub、Resume、Status、Location。
   - 已新增 FastAPI 后端骨架，遵守 `api / service / repository / schema / model` 分层。
   - 已实现 Experience、Project、Achievement 的公开读取接口和写入令牌保护的 CRUD 接口。
   - 已实现 GitHub README 规则解析创建 Project 的接口，写入令牌由后端环境变量校验。
   - 前端 Experience、Projects、Achievements 和 ProjectDetail 已接入 API，并保留本地 fallback 数据。

## 后续建议

- 补充真实 Resume 文件后，再把 `profile.ts` 中 Resume 链接的 `enabled` 改为 `true`。
- 生产部署后，在 Netlify 配置 `VITE_API_BASE_URL`，在后端平台配置 `DATABASE_URL`、`API_WRITE_TOKEN`、可选 `GITHUB_TOKEN`。
- 如需进一步贴近样板图，可以继续微调 PNG 裁切边缘、素材尺寸和 section 中的位置。
