---
id: "contract-ai"
title: "ContractAI（合同智审）"
period: "2026-06"
type: "AI 辅助合同审核 Web 应用"
summary: "面向企业法务的合同上传、AI 风险分级、人工复核与报告生成工作台。"
stack:
  - "React 18 + TypeScript"
  - "FastAPI + SQLAlchemy"
  - "LangGraph"
  - "DeepSeek Chat"
  - "SQLite + SSE"
featured: false
coverDoodle: "/images/doodles/browser-plant.png"
githubUrl: ""
demoUrl: ""
sortOrder: 44
isPublished: true
---

## Overview

ContractAI 面向企业合同初审场景，将 PDF/DOCX 上传、文本解析、字段提取、风险扫描、人工复核和审核报告串成可追踪流程。项目已形成从上传到报告的可演示 MVP，但尚未达到生产可用或完整验收状态。

## My Role

全栈开发与 AI 工作流集成，覆盖前端审核工作台、后端 API、数据库模型、LangGraph 流程、LLM 治理、任务队列和测试。

## Core Features

- 支持 PDF/DOCX 上传、完整性校验、文本提取和结构化字段识别。
- 使用 HIGH、MEDIUM、LOW 风险等级路由自动处理、批量确认或人工审核。
- 支持高风险逐条决策、中风险批量确认、幂等提交和角色权限。
- 通过 SSE 推送解析、扫描、决策、报告和失败状态。
- 支持合同文本/PDF 预览、风险证据高亮、JSON/PDF 报告和管理员配置。

## Tech Stack

- React 18、TypeScript、Vite、Tailwind CSS
- FastAPI、SQLAlchemy 2.0、Pydantic、Uvicorn
- LangGraph、SQLite checkpoint、SQLite 任务表
- DeepSeek Chat、PyPDF2、python-docx、SSE、pytest

## Challenges & Solutions

- LLM 输出可能不是合法结构化结果：使用 Pydantic schema、超时、重试、限流、失败降级和脱敏审计。
- 高风险审核会中断并需要恢复：用 LangGraph interrupt/resume 和 SQLite checkpoint 保存流程状态。
- 后台任务失败可能让页面无提示卡住：增加任务状态、尝试次数、锁释放、失败重试和 SSE 错误事件。
- 审核结论需要对应原文证据：保存页码、段落索引、字符偏移和高亮锚点。

## Result

项目文档记录上传到报告的主链路已跑通，管理后台、合同预览、风险证据高亮、SQLite checkpoint、LLM 治理和任务队列已接入；测试记录为 24 passed，前端构建成功。扫描件 OCR、生产级队列与数据库、企业级认证、多租户和正式 PDF 排版仍未完成。
