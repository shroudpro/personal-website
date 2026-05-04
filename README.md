# Shroud 个人作品集网站

这是一个基于 Vue3 + Vite + TypeScript 的静态个人作品集网站，用于展示个人简介、AI 应用项目、经历、成就和联系方式。项目不包含后端、数据库、登录、后台管理或真实表单提交。

## 技术栈

- Vue3
- Vite
- TypeScript
- Vue Router
- CSS Variables + 原生 CSS
- 本地静态数据
- PNG 裁切装饰素材

## 本地运行

```bash
npm install
npm run dev
```

默认开发服务由 Vite 启动，终端会输出本地访问地址。

## 构建

```bash
npm run build
```

构建产物输出到 `dist` 目录。

## 测试

```bash
npm run test
```

当前测试覆盖项目数据读取、精选项目数量、PNG 装饰素材路径、联系方式和项目外链策略。

## 目录结构

```txt
public/
  images/
    doodles/        PNG 手绘装饰素材
    texture/        纸感纹理
src/
  components/
    common/         通用展示组件
    layout/         页面布局和侧边导航
    project/        项目详情页组件
    sections/       首页六个 section
  data/             本地内容数据
  pages/            页面入口
  router/           Vue Router 配置
  styles/           全局样式与响应式样式
```

## 数据维护方式

站点内容集中维护在 `src/data` 下：

- `profile.ts`：姓名、简介、联系方式、能力标签
- `nav.ts`：侧边导航和锚点
- `projects.ts`：项目卡片和详情页内容
- `experiences.ts`：经历时间线
- `achievements.ts`：成就统计和卡片

更新页面内容时优先修改这些数据文件，避免把内容散落写在组件里。

## 联系方式策略

- Email 和 GitHub 已配置为真实可用链接。
- Resume 当前为占位禁用状态，不提供假下载链接。
- Contact 表单仅用于静态展示，点击发送按钮只显示提示，不会提交网络请求。

## Netlify 部署

项目已提供 `netlify.toml`：

- 构建命令：`npm run build`
- 发布目录：`dist`
- Vue Router history 路由回退：`/*` 到 `/index.html`
- 不配置 Netlify Functions

部署时在 Netlify 选择本仓库即可，构建设置会自动读取 `netlify.toml`。
