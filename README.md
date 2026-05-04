# Shroud 个人作品集网站

这是一个基于 Vue3 + Vite + TypeScript 与 FastAPI 的个人自用内容管理型作品集网站。前台保持纸感、手绘、极简视觉风格，用于展示个人简介、AI 应用项目、经历、成就和静态联系方式；后端提供 Experience、Project、Achievement 的公开读取接口和个人写入接口。

项目不包含访客注册、访客登录、完整账号系统、可视化后台、评论、点赞、访问统计或真实 Contact 表单提交。

## 技术栈

- Vue3
- Vite
- TypeScript
- Vue Router
- CSS Variables + 原生 CSS
- API 数据源 + 本地 fallback
- PNG 裁切装饰素材
- FastAPI
- Pydantic
- SQLAlchemy
- SQLite 本地 fallback / PostgreSQL 生产数据库

## 本地运行

```bash
npm install
npm run dev
```

默认开发服务由 Vite 启动，终端会输出本地访问地址。

## 后端运行

```bash
cd backend
uvicorn app.main:app --reload
```

本地未配置 `DATABASE_URL` 时使用 SQLite fallback。生产环境应配置 PostgreSQL，例如 Supabase Postgres 或 Neon Postgres。

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

后端测试：

```bash
pytest backend/tests
```

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
backend/
  app/
    api/            请求解析和路由
    core/           配置和写入令牌校验
    model/          SQLAlchemy ORM 模型
    repository/     数据库访问
    schema/         Pydantic 请求和响应模型
    service/        业务逻辑
  tests/            后端接口测试
```

## 数据维护方式

站点内容集中维护在 `src/data` 下：

- `profile.ts`：姓名、简介、联系方式、能力标签
- `nav.ts`：侧边导航和锚点
- `projects.ts`：项目卡片和详情页内容
- `experiences.ts`：经历时间线
- `achievements.ts`：成就统计和卡片

前端会优先读取 `VITE_API_BASE_URL` 指向的公开 API；当 API 不可用或未配置时，自动回退到 `src/data` 的本地数据，避免页面空白。

动态内容中 Project、Experience、Achievement 的具体内容暂不做中英文翻译；中英文切换只作用于导航、标题、按钮、提示、Contact 标签和空状态等静态 UI 文案。

## 联系方式策略

- Email 和 GitHub 已配置为真实可用链接。
- Resume 当前为占位禁用状态，不提供假下载链接。
- Contact 模块只展示静态信息，不渲染可提交表单。

## 环境变量

前端：

```txt
VITE_API_BASE_URL=https://your-api-domain.example.com
```

后端：

```txt
DATABASE_URL=postgresql+psycopg://user:password@host:5432/dbname
API_WRITE_TOKEN=一段足够长的个人写入令牌
GITHUB_TOKEN=可选，用于提高 GitHub API 额度
CORS_ORIGINS=http://localhost:5173,https://your-netlify-site.netlify.app
```

`API_WRITE_TOKEN` 只能放在后端环境变量和个人 API 工具中，不能写入前端代码。

## Netlify 部署

项目已提供 `netlify.toml`：

- 构建命令：`npm run build`
- 发布目录：`dist`
- Vue Router history 路由回退：`/*` 到 `/index.html`
- 不配置 Netlify Functions

部署时在 Netlify 选择本仓库即可，构建设置会自动读取 `netlify.toml`。

## 后端部署建议

后端应独立部署到 Render、Railway、Fly.io 或其他支持 Python 服务的平台，并配置：

- `DATABASE_URL`：生产 PostgreSQL 连接字符串
- `API_WRITE_TOKEN`：个人写入令牌
- `GITHUB_TOKEN`：可选
- `CORS_ORIGINS`：Netlify 前端域名和本地开发地址

部署后，把后端公开地址写入 Netlify 的 `VITE_API_BASE_URL` 环境变量。
