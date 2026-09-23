---
id: "wardrobe"
title: "Wardrobe｜本地优先 AI 衣橱"
period: "2026-07 — 2026-08"
type: "AI 应用 / 本地优先 Web 应用"
summary: "将衣物照片识别、生成、审核并整理为可编辑、可组合的本地 AI 衣橱。"
stack:
  - "React 19"
  - "Vite 6"
  - "Node.js + Sharp"
  - "OpenAI Responses / Images API"
  - "DashScope Images API"
featured: true
coverDoodle: "/images/doodles/browser-plant.png"
githubUrl: "https://github.com/tandpfun/wardrobe"
demoUrl: ""
sortOrder: 41
isPublished: true
---

## Overview

Wardrobe 是一个本地优先的 AI 衣橱应用：从照片中识别衣物，经过裁剪、衣物净图和上身效果图审核后保存到本地衣橱，并支持编辑元数据和组合穿搭。项目已形成可本地运行的原型，正式线上部署仍需独立后端、持久化和密钥管理。

## My Role

AI 图像工作流与本地应用开发，覆盖导入审核、图片处理、图像 provider、穿搭服务、任务恢复和测试。

## Core Features

- 从单件衣物或整套穿搭照片中识别类别、颜色、标签和边界框。
- 对裁剪图、透明衣物图和上身效果图执行分阶段人工审核、放弃和重新生成。
- 使用 Sharp 清理色键背景、处理边缘溢色并输出透明 PNG。
- 支持衣橱筛选、元数据编辑、图片取色和自由搭配工作区。
- 使用本地 JSON/PNG 保存衣物和任务，支持服务重启后恢复未完成任务。
- 通过 provider 抽象支持 DashScope 和 OpenAI 图片生成，并加入串行限流。

## Tech Stack

- React 19、Vite 6、Node.js 22+
- Sharp、IPX、`@unpic/react`
- OpenAI Responses / Images API、DashScope Images API
- JSON/PNG 本地存储、Service Worker、GitHub Actions

## Challenges & Solutions

- 生成衣物图可能出现色键污染：使用 Sharp 做色差判断、去溢色、透明画布重排和污染像素验证，并提供本地清理预览。
- 不同图片 provider 的请求格式和限流规则不同：用 provider 工厂统一业务接口，在 DashScope provider 内串行排队并设置最小间隔。
- 图像生成耗时长且可能被服务重启打断：用 `job.json` 持久化 pending、processing、review 和 failed 等阶段并支持恢复。
- 生成结果需要人工确认：在裁剪、衣物图、上身图和穿搭图阶段分别提供批准、放弃和重新生成入口。

## Result

项目文档和测试记录显示，衣橱画廊、三阶段导入审核、上身效果图、自由搭配、PWA 缓存和本地文件落盘流程已形成，当前 `npm test` 通过 16 项测试。正式部署、全浏览器回归和真实样本质量评估仍需继续完成。
