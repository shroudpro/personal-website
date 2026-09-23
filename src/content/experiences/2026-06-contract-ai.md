---
title: "从合同审核 MVP 到可恢复的 AI 工作流"
period: "2026-06"
role: "全栈开发与 AI 工作流集成"
category: "AI 应用 / 工程化"
summary: "围绕合同风险审核主链路，完成前后端集成、HITL 工作流和局部工程化治理。"
tags:
  - "合同审核"
  - "HITL 工作流"
  - "LLM 工程化"
sortOrder: 43
isPublished: true
---

## 记录

ContractAI 面向企业合同初审场景，将合同上传、文本解析、字段提取、AI 风险扫描、人工复核和报告输出串成可追踪流程。项目使用 React、FastAPI、SQLAlchemy 和 LangGraph 建立审核工作台与可恢复工作流，并通过 SSE 推送解析、扫描、决策和报告状态。

工程化重点是把不稳定的模型输出和后台任务纳入明确状态。项目加入 Pydantic schema 校验、超时、重试、限流、失败降级和脱敏审计；使用 LangGraph interrupt/resume 与 SQLite checkpoint 处理人工审核中断；使用 SQLite 任务表、锁释放、失败重试和 SSE 错误事件处理后台任务异常。

最终形成了可演示的上传到报告 MVP，支持高风险逐条审核、中风险批量确认、证据高亮和报告下载。扫描件 OCR、生产级队列与数据库、企业级认证、多租户和正式 PDF 排版仍未完成。

## 收获

- AI 应用的可用性取决于 schema、重试、降级、限流和审计边界，而不只是模型能力。
- HITL 流程需要同时设计中断、恢复、幂等、权限和责任记录。
- 风险结论必须和原文证据、置信度及人工决策关联，避免只展示不可复核的分数。

## 可复用经验

- 把模型调用封装成有输入、输出和失败策略的服务边界，方便替换模型或 provider。
- 为后台任务记录 queued、running、retry、done、failed 等状态，并保留失败原因和尝试次数。
- MVP 可以先用 SQLite 打通异步链路，但应明确多进程一致性、外部队列和生产迁移边界。
