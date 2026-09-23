# 项目经历素材：ContractAI（合同智审）

## 1. 基本信息

- 项目名称：ContractAI（合同智审）
- 项目类型：AI 辅助合同风险审核 Web 应用
- 项目阶段：已确认事实：可演示 MVP；同时接入了第三阶段的部分工程化能力，尚未达到生产可用或完整验收状态。
- 项目时间：2026-06-01 至 2026-06-02（按当前 Git 提交历史；完整开发周期待确认）
- 项目地址：当前仓库未配置 Git remote；GitHub 地址、Demo 地址待补充。
- 一句话描述：面向企业法务的 AI 合同风险审核工作台，串联解析、复核与报告生成。
- 核心技术：React 18、TypeScript、Vite、Tailwind CSS、FastAPI、SQLAlchemy、Pydantic、SQLite、LangGraph、DeepSeek Chat、PyPDF2、python-docx、SSE。
- 证据来源：`README.md`、`PRD.md`、`PRODUCT.md`、`DESIGN.md`、`产品综合设计.md`、`项目开发进度文档.md`、`backend/pyproject.toml`、`backend/app/`、`backend/tests/`、`frontend/src/`、当前 Git 提交历史。

## 2. 事实与证据

### 已确认事实

- 项目要解决的问题：把企业合同的上传、文本解析、字段提取、风险扫描、人工复核和报告输出串成可追踪的初审流程，减少审核人需要在多个工具之间切换的问题。来源：`PRD.md`、`PRODUCT.md`、`项目开发进度文档.md`。
- 目标用户和使用场景：文档定义了业务提交人、法务审核人、管理员和管理层四类用户；核心场景是上传 PDF/DOCX 合同、核对 AI 字段、复核风险条款、确认审核结论并查看报告。来源：`PRD.md`、`PRODUCT.md`。
- 文件入口已实现：后端支持 PDF 和 DOCX，使用 magic bytes 识别文件类型，限制单文件大小，检查 PDF/DOCX 完整性，拒绝加密 PDF，并对 PDF 做疑似扫描件判断。来源：`backend/app/services/upload_service.py`、`backend/app/api/contracts.py`、`frontend/src/app/pages/ContractUploadPage.tsx`。
- 文本与字段处理已实现：使用 PyPDF2 和 python-docx 提取文本，再提取甲方、乙方、合同金额、生效日期和适用法律等结构化字段，字段带置信度、证据文本和核验状态。来源：`backend/app/services/ocr_service.py`、`backend/app/models/extracted_field.py`、`backend/app/api/fields.py`、`backend/tests/smoke_mvp.py`。
- 风险扫描和路由已实现：合同文本按段落扫描，风险分为 HIGH、MEDIUM、LOW；存在高风险时进入人工逐条审核，仅有中风险时进入批量确认，低风险路径可以自动通过并生成报告。来源：`backend/app/workflow/nodes.py`、`backend/app/workflow/graph.py`、`PRD.md`。
- 人工审核已实现：高风险条款支持确认、拒绝、误报或修改等决策，支持撤销；高风险决策受角色限制，并通过 `Idempotency-Key` 处理重复提交。来源：`backend/app/api/items.py`、`backend/app/services/review_service.py`、`backend/app/services/hitl_service.py`、`backend/tests/test_contract_stabilization.py`。
- 中风险批量审核已实现闭环：批量确认接口拒绝高风险条款；当待处理风险项清空后，会触发报告生成并将会话推进到 `report_ready`。来源：`backend/app/services/review_service.py`、`backend/tests/test_contract_stabilization.py`、`项目开发进度文档.md`。
- 实时状态已实现：后端通过 SSE 推送连接、解析、扫描进度、风险路由、人工决策、报告生成、失败和中止等事件；前端使用 `EventSource` 监听并在断开后重连。来源：`backend/app/core/sse.py`、`backend/app/api/events.py`、`frontend/src/app/api/sse.ts`。
- 报告能力已实现：报告服务会汇总字段、风险项和人工决策，落盘 JSON 和基础 PDF，并包含覆盖范围说明与 AI 辅助免责声明；下载接口支持 JSON 和 PDF。来源：`backend/app/services/report_service.py`、`backend/app/api/reports.py`、`backend/tests/test_contract_stabilization.py`。
- 合同证据查看已实现：审核页面可查看合同文本或原文件预览，接口返回风险条款的字符偏移和高亮锚点，便于将风险结论与原文关联。来源：`backend/app/api/contract_text.py`、`frontend/src/app/pages/HITLReviewPage.tsx`、`backend/tests/test_phase2_core_capabilities.py`。
- 管理能力已实现：管理员接口支持用户生命周期、风险规则 CRUD 和风险阈值读取/更新；前端 `/admin` 页面调用 admin-only API。来源：`backend/app/api/admin.py`、`frontend/src/app/pages/AdminPage.tsx`、`backend/tests/test_phase2_core_capabilities.py`。
- 局部工程化已实现：LLM 调用使用 Pydantic schema 校验，支持超时、指数退避、token bucket 限流、失败降级、脱敏审计；OCR、workflow 和报告生成通过 SQLite `background_tasks` 表和进程内 worker 执行，并处理失败重试和过期锁释放。来源：`backend/app/services/llm_service.py`、`backend/app/core/redaction.py`、`backend/app/services/task_queue.py`、`backend/tests/test_llm_governance.py`、`backend/tests/test_task_queue.py`。
- 工作流恢复已实现基础能力：LangGraph 通过 SQLite `SqliteSaver` 保存 checkpoint，HITL 服务以数据库会话状态为主要依据，并提供恢复信息接口。来源：`backend/app/workflow/checkpointer.py`、`backend/app/workflow/graph.py`、`backend/app/services/hitl_service.py`、`项目开发进度文档.md`。
- 前端主要页面已形成闭环：登录、工作台、合同列表、上传、解析进度、字段核验、AI 扫描、高风险审核、中风险批量审核、报告和管理后台均有对应路由与页面。来源：`frontend/src/app/routes.tsx`、`frontend/src/app/pages/`、`项目开发进度文档.md`。
- 项目文档记录的验证结果为 `uv run pytest tests -q` 得到 24 passed、216 warnings，以及 `npm run build` 构建成功。该结果来自 2026-06-02 的进度记录，不代表本次素材整理过程中重新执行了测试。来源：`项目开发进度文档.md`。
- Git 历史显示 8 个提交集中在 2026-06-01 至 2026-06-02，提交主题依次涉及 MVP、接口契约和测试、启动说明、管理后台与合同预览、LLM 治理与 SQLite 任务队列、前端设计和前端打磨。来源：Git 提交历史：`1bea4d0`、`fc461b2`、`105f5c2`、`6180b87`、`9abc7bb`、`bd83117`、`e571362`、`9c2fe58`。

### 基于代码的合理推断

- 我可能负责的部分：Git 历史中的提交作者均显示为 `shroudpro`，且改动覆盖后端 API、业务服务、LangGraph 工作流、数据库模型、测试、前端页面、设计文档和启动文档。因此可以推断 `shroudpro` 可能承担了全栈实现和集成工作；但 `shroudpro` 是否就是本人、是否为独立开发，仍需确认。来源：当前 Git 提交历史、`backend/app/`、`backend/tests/`、`frontend/src/`。
- 技术选型的可能考虑：项目用 SQLite、进程内任务 worker 和本地 storage 承载 MVP，README 明确说明当前任务队列不需要 Redis；这表明实现优先控制部署和依赖复杂度，再为后续 PostgreSQL、外部队列和生产化留出迁移空间。前半句是事实，后半句属于基于架构和文档的推断。来源：`README.md`、`backend/app/services/task_queue.py`、`项目开发进度文档.md`。
- 交互设计的可能目标：`DESIGN.md` 将界面定位为证据优先、状态可追踪的法律审核工作台；`WorkflowStatusBar`、风险等级标签、来源标签和双栏审核页共同服务于“先看证据，再做人工判断”的流程。该设计意图来自文档，具体用户效果没有量化数据。来源：`DESIGN.md`、`PRODUCT.md`、`frontend/src/app/components/WorkflowStatusBar.tsx`、`frontend/src/app/pages/HITLReviewPage.tsx`。
- 问题解决过程的可能主线：Git 提交主题和进度文档显示，项目先处理前后端数据契约，再补齐合同预览、管理后台和 SQLite checkpoint，随后加入 LLM 治理与 SQLite 任务队列，最后进行前端页面打磨。这可以作为开发过程的叙事主线，但每个阶段的个人工作量和具体分工待确认。来源：Git 提交历史、`项目开发进度文档.md`、`产品综合设计.md`。

### 需要用户补充的信息

- 准确的个人角色、负责边界，以及 `shroudpro` 是否为本人的 Git 署名。
- 是否为独立开发，或项目是否存在未提交的协作者、产品、设计或法务角色。
- 是否正式上线、部署到何处、是否有真实用户或仅用于本地演示。
- GitHub、线上 Demo、部署环境或可公开的项目地址。
- 真实用户数量、处理合同数量、准确性能、耗时、成本或效率指标；当前仓库没有这些数据。
- 是否允许公开展示项目名称、界面截图、代码片段和合同样例。

## 3. 可复用的项目描述

### 3.1 一句话版本

面向企业法务的 AI 合同风险审核工作台，串联解析、复核与报告生成。

### 3.2 简历版本

面向企业法务构建合同风险审核系统，打通合同上传、文本解析、结构化字段提取、AI 风险分级、人工复核和报告生成的 MVP 主链路。针对 LLM 输出不稳定、人工审核恢复和后台任务失败等问题，引入 Pydantic 结构化校验、重试与限流、脱敏审计、LangGraph SQLite checkpoint 和 SQLite 任务队列；项目文档记录了测试通过与前端构建成功，但项目仍处于可演示 MVP 阶段。

### 3.3 面试讲述版本

背景：项目面向企业合同初审场景，希望把合同上传、AI 风险识别和法务人工确认串成一个可追踪工作流，而不是只输出一段不可复核的模型结论。

目标：先完成 MVP 主链路，支持 PDF/DOCX 上传、文本和字段解析、风险等级路由、高风险人工审核、中风险批量确认，以及 JSON/PDF 报告输出。

行动：基于 React、TypeScript 和 Vite 实现多页面审核工作台，基于 FastAPI、SQLAlchemy、SQLite 和 Pydantic 建立后端 API 与数据模型；用 LangGraph 表达扫描、分级和 HITL interrupt/resume，用 SSE 推送状态；随后针对 LLM schema 校验、超时、重试、限流、脱敏审计和任务失败重试进行工程化补强。

挑战：一是模型输出可能不是合法结构化结果，二是人工审核会中断并需要恢复，三是后台 OCR、工作流和报告任务失败时不能让会话静默卡住，四是高风险条款需要保留原文证据和人工责任链。

结果：代码和进度文档显示，上传到报告的 MVP 链路已跑通，管理后台、合同文本/PDF 预览、风险证据高亮、SQLite checkpoint 和 SQLite 任务队列已接入，测试记录为 24 passed、216 warnings，前端 build 成功。

反思：当前结果仍是可演示 MVP。扫描件 OCR、生产级队列和数据库、企业级认证、多租户、审计展示、规则命中解释和正式 PDF 排版仍需继续完成；如果再次迭代，应优先补齐生产安全边界、状态联动和可观测性。

## 4. 网站可直接使用的 Project Markdown

以下内容可复制到 `src/content/projects/contract-ai.md`。个人职责措辞基于 Git 署名和改动范围推断，发布前请先确认。

```md
---
id: "contract-ai"
title: "ContractAI（合同智审）"
type: "AI 辅助合同审核 Web 应用"
summary: "面向企业法务的合同上传、AI 风险分级、人工复核与报告生成工作台。"
stack:
  - "React 18"
  - "TypeScript"
  - "FastAPI"
  - "LangGraph"
  - "DeepSeek Chat"
  - "SQLite"
  - "SSE"
featured: false
coverDoodle: "/images/doodles/browser-plant.png"
githubUrl: ""
demoUrl: ""
sortOrder: 90
isPublished: false
---

## Overview

ContractAI 是面向企业合同初审场景的 AI 辅助审核工作台，目标是把合同上传、PDF/DOCX 文本解析、结构化字段提取、风险扫描、人工复核和审核报告串成可追踪流程。项目当前处于可演示 MVP 阶段，代码已形成从上传到报告的主要链路，但尚未达到生产可用或完整验收状态。

## My Role

Git 历史中的提交作者均显示为 `shroudpro`，改动覆盖后端 API、业务服务、LangGraph 工作流、数据库模型、测试、前端页面和设计文档。若 `shroudpro` 为本人，可将个人职责概括为全栈开发与工程集成；准确角色、负责边界和团队分工待补充确认。

## Core Features

- 支持 PDF/DOCX 文件上传、大小校验、magic bytes 识别、完整性检查、加密 PDF 拒绝和疑似扫描件判断。
- 提取合同文本以及甲方、乙方、合同金额、生效日期、适用法律等结构化字段，并保留置信度和证据文本。
- 使用 AI 对合同段落进行 HIGH、MEDIUM、LOW 风险分级，并按风险等级路由到自动通过、批量确认或人工审核。
- 支持高风险条款逐条人工决策、决策撤销、幂等提交和基于角色的权限限制。
- 支持中风险条款批量确认，并在待处理风险清空后触发报告生成。
- 通过 SSE 推送解析、扫描、路由、决策、报告和失败状态，前端按会话状态展示审核进度。
- 支持合同文本/PDF 原文预览，以及基于风险证据定位信息的文本高亮。
- 支持 JSON 和基础 PDF 审核报告下载，报告包含风险统计、覆盖范围说明和 AI 辅助免责声明。
- 管理员可以管理用户、风险规则和风险阈值。

## Tech Stack

- 前端：React 18、TypeScript、Vite、Tailwind CSS、Radix/shadcn 风格组件。
- 后端：FastAPI、SQLAlchemy 2.0、Pydantic、Uvicorn。
- 工作流：LangGraph，使用 SQLite `SqliteSaver` 保存 checkpoint，并通过 interrupt/resume 支持 HITL。
- AI 与解析：DeepSeek Chat、langchain-openai、PyPDF2、python-docx。
- 数据与异步：SQLite、本地 storage、SQLite `background_tasks` 任务表和进程内 worker。
- 通知与测试：SSE、pytest、FastAPI TestClient。

## Challenges & Solutions

- 挑战：LLM 返回内容可能不是合法 JSON，枚举值也可能不符合业务约束。解决：使用 Pydantic schema 校验 JSON 结果，加入超时、指数退避重试、失败降级和审计记录。
- 挑战：LLM 调用失败或错误信息可能包含合同和个人敏感信息。解决：对失败摘要做脱敏和长度限制，只记录用途、模型、耗时、重试次数、字符数和脱敏错误摘要。
- 挑战：高风险审核会中断，所有条款处理完成后还需要恢复工作流并继续生成报告。解决：用 LangGraph interrupt/resume 表达 HITL 节点，用 SQLite checkpoint 保存状态，并由服务层根据数据库中的待处理条款触发恢复。
- 挑战：OCR、工作流和报告生成属于后台任务，失败时不能让前端会话无提示地停住。解决：将任务写入 SQLite 任务表，增加状态、尝试次数、过期锁释放、失败重试、失败审计和 SSE 错误事件。
- 挑战：审核人需要知道 AI 结论对应哪一段合同原文。解决：保存页码、段落索引、字符偏移和高亮锚点，并提供合同文本/PDF 预览接口。
- 挑战：AI 风险结论不能被呈现为绝对法律意见。解决：在提示词、结果清洗和报告免责声明中统一使用模态表达，并明确最终判断仍需人工确认。

## Result

项目文档记录的结果是：核心上传到报告链路已跑通，前端主要页面已接入真实 API，管理后台、合同预览、风险证据高亮、SQLite checkpoint、LLM 治理和 SQLite 任务队列已接入；测试记录为 24 passed、216 warnings，前端 `npm run build` 成功。当前仍属于可演示 MVP，扫描件 OCR、生产级外部任务队列、PostgreSQL、多租户、审计日志页面、规则命中解释和正式 PDF 排版尚未完成。
```

## 5. 网站可直接使用的 Experience Markdown

以下内容可复制到 `src/content/experiences/2026-06-contract-ai.md`。个人角色和任务边界仍需人工确认。

```md
---
title: "从合同审核 MVP 到可恢复的 AI 工作流"
period: "2026-06"
role: "全栈开发（待确认）"
category: "AI 应用 / 工程化"
summary: "围绕合同风险审核主链路，完成前后端集成、HITL 工作流和局部工程化治理。"
tags:
  - "合同审核"
  - "HITL 工作流"
  - "LLM 工程化"
sortOrder: 90
isPublished: false
---

## 记录

ContractAI 面向企业合同初审场景，目标是把合同上传、文本解析、字段提取、AI 风险扫描、人工复核和报告输出串成一个可追踪流程。Git 历史显示 `shroudpro` 的改动覆盖前端页面、后端 API、数据库模型、LangGraph 工作流、测试和设计文档；如果该署名属于本人，可以将承担的任务概括为全栈开发与工程集成，但准确职责仍待确认。

实现过程中，项目先完成 PDF/DOCX 上传、文本提取和风险审核主链路，再围绕实际问题补充接口契约收敛、合同文本/PDF 预览、风险证据高亮、管理员 API、SQLite checkpoint、结构化 LLM 调用和 SQLite 任务队列。针对模型返回不稳定的问题，加入 Pydantic 校验、超时、指数退避、token bucket 限流、失败降级和脱敏审计；针对人工审核中断问题，使用 LangGraph interrupt/resume，并由数据库记录待处理风险和审核进度；针对后台任务失败问题，加入队列状态、重试、过期锁释放、失败审计和 SSE 错误通知。

最终形成了可演示的上传到报告 MVP，支持高风险逐条审核、中风险批量确认、报告下载、角色权限、合同证据定位和管理员配置。项目当前仍未完成扫描件 OCR、生产级队列与数据库、企业级认证、多租户、审计展示和正式 PDF 排版，因此不应描述为已正式上线的生产系统。

## 收获

- AI 功能的可用性不仅取决于模型能力，还取决于 schema 校验、失败降级、重试、限流和审计边界。
- HITL 场景需要把中断、恢复、幂等、权限和责任记录视为同一条业务链路设计。
- 风险审核产品必须把 AI 结论和原文证据、置信度、人工决策关联起来，避免只展示一个不可复核的分数。
- MVP 可以先用 SQLite 任务表和进程内 worker 打通异步链路，但应明确外部队列、多进程一致性和生产迁移是后续工作。
- 进度文档、接口契约和测试记录可以帮助团队持续区分已实现能力与设计目标，减少把规划误写成结果。

## 可复用经验

### 技术经验

将 LLM 输出定义为 Pydantic schema，并在解析失败时进行有限重试和明确降级，可以把不可控的自然语言输出约束为稳定的业务数据入口。对于需要人工介入的流程，可以把风险路由、人工决策和报告生成拆成 LangGraph 节点，并利用 interrupt/resume 保留工作流边界。

### 工程经验

后台任务至少需要记录 queued、running、retry、done、failed 等状态，并配合尝试次数、锁超时、失败审计和可观察的错误事件。LLM 错误日志应先脱敏再落库，避免调试信息成为新的数据泄露入口。

### 产品经验

在合同审核场景中，产品应该优先呈现风险等级、原文证据、置信度、处理状态和下一步动作。AI 输出需要使用“可能存在”等模态表达，并在报告中保留覆盖范围和免责声明，明确 AI 辅助与人工判断的边界。
```

## 6. 可复用经验库

### 技术决策

- 决策：使用 LangGraph 的 interrupt/resume 组织高风险人工审核流程。
- 背景：风险扫描不是一次性自动化结果，高风险条款必须等待人工决策，中断后还要继续报告生成。
- 取舍：增加了工作流状态和 checkpoint 管理复杂度，但比在 API 层手写多个隐式状态更容易表达中断、恢复和路由关系。
- 可迁移经验：当流程包含人工确认、审批或外部事件等待时，应显式建模暂停点、恢复条件和状态快照。

- 决策：MVP 阶段使用 SQLite 任务表和进程内 worker，而不是直接引入 Redis 或外部任务系统。
- 背景：上传后的文本提取、workflow scan/resume 和报告生成需要异步执行，但项目仍处于可演示 MVP 阶段。
- 取舍：降低了部署依赖和初期复杂度，但多进程抢锁、吞吐、监控和生产恢复能力有限。
- 可迁移经验：小规模 MVP 可以先用持久化任务表形成清晰边界，同时把迁移 PostgreSQL 和外部队列列为明确的生产化工作。

- 决策：统一使用结构化 LLM 服务处理字段提取和风险扫描。
- 背景：字段提取和风险识别都需要从模型响应中得到可入库的业务字段。
- 取舍：需要维护 schema、重试、fallback、限流和审计逻辑，但避免各调用点自行解析模型文本。
- 可迁移经验：把模型调用封装成有输入、输出和失败策略的服务边界，有利于后续替换模型或增加 provider failover。

- 决策：使用 SSE 推送审核会话状态。
- 背景：解析、扫描、路由、人工决策和报告生成均可能异步完成，页面需要及时更新。
- 取舍：SSE 适合服务端到浏览器的单向事件流，接入简单；复杂双向协作和多端广播仍需要更完整的实时通信方案。
- 可迁移经验：单向进度和状态通知可以先用 SSE，但应设计事件类型、重连策略和最终状态查询，避免只依赖瞬时消息。

### 问题解决

- 问题：前端和后端曾存在报告、字段状态和人工决策枚举不一致的风险。
- 定位过程：项目进度和综合设计文档记录了前后端契约问题，Git 提交 `fc461b2` 的主题为“统一接口契约、重构测试”。
- 解决方案：按后端响应契约收敛前端展示字段，并新增 TestClient 和单元测试覆盖报告、决策和异常场景。
- 最终结果：进度文档记录报告页、字段状态和人工决策枚举已完成第一轮收敛。

- 问题：早期工作流 checkpoint 使用内存保存，服务重启后无法满足恢复目标。
- 定位过程：综合设计文档将 InMemorySaver 与跨天恢复目标之间的不一致列为 P0/P1 问题。
- 解决方案：切换到 SQLite `SqliteSaver`，并增加 checkpoint 路径配置和测试。
- 最终结果：进度文档记录 SQLite checkpoint 已接入，并有测试验证配置路径上的持久化对象。

- 问题：中风险批量确认可能只修改条款状态而不触发报告生成。
- 定位过程：综合设计文档明确记录原流程可能停在 `hitl_pending`，后续进度文档记录该问题已闭环。
- 解决方案：批量确认后检查待处理高风险和中风险条款，满足条件时推进会话状态、写入审计、推送事件并执行报告任务。
- 最终结果：测试验证纯中风险会话可进入 `report_ready`，批量确认高风险会被拒绝。

- 问题：LLM 失败和后台任务失败可能导致审核会话无提示卡住。
- 定位过程：项目文档将异常静默、LLM 输出不稳定和后台处理缺少可观测性列为风险。
- 解决方案：加入结构化 schema、超时、重试、限流、fallback、脱敏审计、任务失败重试、锁释放、`failed` 状态和 SSE `system_failure` 事件。
- 最终结果：测试覆盖 LLM schema、重试、脱敏、限流、任务入队、失败重试、锁释放和失败状态记录。

### 工程方法

- 使用了什么方法：用产品文档定义目标用户、主链路和状态，再用接口契约、数据库模型、工作流节点和前端路由分别落地。
- 为什么有效：复杂审核流程被拆成可检查的会话状态、风险项、人工决策、报告和审计记录，能够通过单元测试和 TestClient 对关键边界进行验证。
- 适合什么场景：适合包含异步处理、人工介入、状态流转和结果留痕的业务系统。

- 使用了什么方法：先建立 MVP 主链路，再按提交记录分阶段补充接口契约、预览高亮、管理后台、checkpoint、LLM 治理和任务队列。
- 为什么有效：每个阶段都有相对明确的主题和可验证的结果，能够在不一次性引入全部生产组件的情况下逐步降低风险。
- 适合什么场景：适合需求较多但需要尽快形成可演示闭环的 AI 应用项目。

- 使用了什么方法：把文档中“已实现”“未实现”和“下一步”分开记录，并用测试文件记录关键行为。
- 为什么有效：可以避免把产品规划或设计目标误写成已经交付的功能，也方便后续面试和作品集展示时说明边界。
- 适合什么场景：适合仍在迭代中的个人项目、MVP 和需要持续交接的工程项目。

### 失败或不足

- 哪些地方没有完成：扫描件目前只能通过启发式判断，尚未接入真正的 OCR 引擎；字段核验也没有与后续扫描和报告形成完整的强状态联动。
- 哪些方案存在局限：SQLite 任务表和进程内 worker 不适合多进程生产环境，SQLite checkpoint 也缺少迁移、压缩和清理策略。
- 哪些方案存在局限：PDF 报告是基础版式，复杂中文排版、正式模板和更完整的字体处理仍不足；文本高亮也不是 PDF.js 坐标级覆盖。
- 哪些方案存在局限：认证仍是开发态 Bearer Token，未接企业 SSO/OIDC；CORS、文件生命周期、数据库外键、病毒扫描、多租户和权限审计仍需加强。
- 下次会如何改进：先统一生产级认证、数据库约束和文件安全边界，再将任务执行迁移到外部队列与 PostgreSQL，并补充部署、告警、数据隔离和恢复演练。

## 7. 可用于简历的短句

- 使用 FastAPI、SQLAlchemy 与 SQLite 建立合同审核会话、字段、风险项、报告和审计数据模型。
- 基于 LangGraph 构建风险分级与 HITL interrupt/resume 流程，支持高风险逐条审核后恢复生成报告。
- 为 DeepSeek 调用加入 Pydantic 结构化校验、指数退避、token bucket 限流和失败降级。
- 将 OCR、workflow 与报告生成迁移到 SQLite 任务表和进程内 worker，补充失败重试与锁释放。
- 通过 SSE 推送解析、扫描、路由、决策和报告事件，前端按会话状态驱动审核流程。
- 实现合同文本/PDF 原文预览与风险证据偏移高亮，帮助审核人定位 AI 判断的原文依据。
- 补齐 Bearer Token、角色路由守卫和 admin-only 用户、规则、阈值管理接口。
- 使用 FastAPI TestClient 与 pytest 覆盖 LLM 治理、任务队列、权限、报告和异常状态场景。

## 8. 可用于面试的追问与回答素材

- 为什么选择这个技术方案？
  - 后端使用 FastAPI、SQLAlchemy、Pydantic 和 SQLite，能够快速形成清晰的 API、数据模型和本地可运行 MVP；工作流使用 LangGraph 是因为项目存在高风险人工中断和恢复需求；SSE 能满足服务端向前端推送进度的单向场景；这些选型都在项目文档和依赖配置中有依据。生产环境仍需要 PostgreSQL、外部任务队列和企业级认证。

- 项目中最难的问题是什么？
  - 难点不是单次调用模型，而是把不稳定的 LLM 输出放进可恢复、可审计的人工审核流程。项目通过结构化 schema、重试、限流、fallback、脱敏审计、LangGraph checkpoint、SQLite 任务表和 SSE 失败事件，把模型和后台任务的不确定性收敛到可处理的状态。

- 你具体负责了哪些部分？
  - 当前只能确认 Git 历史中的提交作者均为 `shroudpro`，改动覆盖后端、前端、测试和文档。如果 `shroudpro` 是本人，可以进一步表述为全栈实现与集成；面试前应补充本人实际负责的模块、独立程度和协作边界，不应仅凭提交作者名推断团队角色。

- 如果重新做一次，你会如何改进？
  - 会优先把开发态认证升级为 OIDC/JWT 或企业 SSO，迁移 PostgreSQL 和外部任务队列，补充数据库外键、文件病毒扫描、文件生命周期、失败原因查询和告警；随后接入生产 OCR、PDF 坐标高亮、规则命中解释、审计页面和更完整的端到端测试。

- 这个项目中最值得复用的经验是什么？
  - AI 应用的交付边界应由业务状态、证据、人工决策和审计记录共同定义，而不是只展示模型输出。把模型调用、人工中断、后台任务和最终报告分别设计成可验证的状态节点，能让系统在失败和恢复场景下仍保持可解释性。

## 9. 待确认信息

- 完整项目时间，当前只能从 Git 历史确认 2026-06-01 至 2026-06-02 有提交。
- 准确个人角色、负责模块、独立开发程度，以及 `shroudpro` 是否为本人署名。
- 团队规模和协作关系，包括产品、设计、法务或其他开发成员。
- 是否正式上线，部署环境、部署方式和当前可访问状态。
- 用户或使用人数，以及是否处理过真实合同数据。
- 性能、处理时长、成本、稳定性或效率指标；当前仓库没有可验证的业务指标。
- GitHub、Demo、部署地址或可访问的作品集链接。
- 是否允许公开展示项目名称、界面截图、源代码片段和合同样例。
- 是否需要在公开版本中隐藏或替换项目中的开发态认证、内部接口和本地路径信息。
