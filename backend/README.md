# Personal Portfolio Content API

这是个人作品集网站的 FastAPI 后端，用于个人自用内容管理。它提供 Experience、Project、Achievement 的公开读取接口和带写入令牌保护的 CRUD 接口，并支持从 GitHub README 解析项目草稿。

## 本地启动

```bash
cd backend
uvicorn app.main:app --reload
```

默认会使用 SQLite fallback：`sqlite:///./portfolio.db`。生产环境必须配置 PostgreSQL。

## 环境变量

```txt
DATABASE_URL=postgresql+psycopg://user:password@host:5432/dbname
API_WRITE_TOKEN=一段足够长的个人写入令牌
GITHUB_TOKEN=可选，用于提高 GitHub API 额度
CORS_ORIGINS=http://localhost:5173,https://your-netlify-site.netlify.app
```

说明：

- `DATABASE_URL` 未设置时仅用于本地开发的 SQLite fallback。
- `API_WRITE_TOKEN` 只放在后端环境变量和个人 API 工具中，不能写入前端代码。
- `GITHUB_TOKEN` 可选，不设置时仍会尝试访问公开仓库 README。

## API

公开读取接口：

```txt
GET /api/experiences
GET /api/projects
GET /api/projects/{slug}
GET /api/achievements
```

写入接口需要请求头：

```txt
Authorization: Bearer <API_WRITE_TOKEN>
```

写入接口：

```txt
POST /api/experiences
PATCH /api/experiences/{id}
DELETE /api/experiences/{id}

POST /api/projects
PATCH /api/projects/{id}
DELETE /api/projects/{id}

POST /api/achievements
PATCH /api/achievements/{id}
DELETE /api/achievements/{id}
```

GitHub README 解析接口：

```txt
POST /api/projects/import/github
```

请求体：

```json
{
  "repoUrl": "https://github.com/owner/repo"
}
```

## 测试

在项目根目录运行：

```bash
pytest backend/tests
```

测试覆盖公开读取、写入令牌拒绝、携带令牌创建 Experience、非法 GitHub 仓库 URL 的清晰错误。
