# 项目经历素材：Talk Kids

## 1. 基本信息

- 项目名称：Talk Kids
- 项目类型：Windows 本地儿童英语口语陪练桌面应用
- 项目阶段：已完成主要 Windows 适配、自动启动与打包验证；仍处于实验性 / 本地 MVP 阶段，完整语音链路尚未完成设备级人工联调
- 项目时间：2026-04 至 2026-05（根据需求文档日期和 `WINDOWS_PORTING_PROGRESS.md` 的变更记录整理；准确起止时间待确认）
- 项目地址：https://github.com/xiaochong/talk-kids（来源：`package.json`、`website/index.html`；是否为当前公开仓库地址待确认）
- 一句话描述：面向儿童的 Windows 本地英语口语陪练应用，打通录音、语音识别、AI 对话和语音回复。
- 核心技术：Electron、React 19、TypeScript、electron-vite、Python FastAPI、faster-whisper、Ollama OpenAI-compatible API、Rust KittenTTS、ONNX Runtime、Vitest
- 证据来源：`README.md`、`package.json`、`WINDOWS_PORTING_PLAN.md`、`WINDOWS_PORTING_PROGRESS.md`、`src/main/`、`src/renderer/src/`、`backend/asr_server/`、`scripts/setup-windows.ps1`、`electron-builder.yml`、`src/main/__tests__/`、根仓库 Git 提交 `c2d0f5d4`

## 2. 事实与证据

### 已确认事实

- 项目要解决的问题：为儿童提供一个无需浏览器和远程语音服务的本地英语口语练习桌面应用，完成“录音 → ASR → LLM → TTS → 播放”的交互闭环。来源：`README.md`、`docs/brainstorms/2026-04-18-talk-kids-voice-conversation-integration-requirements.md`、`src/main/ipc/channels.ts`。
- 目标用户与使用场景：需求文档将目标用户描述为 7—12 岁、英语初级水平的儿童，使用场景包括家庭或课堂英语听说练习；这属于产品设计目标，不等同于已验证的真实用户数据。来源：`docs/brainstorms/2026-04-18-talk-kids-voice-conversation-integration-requirements.md`、`README.md`。
- 已实现的主要功能：Electron 桌面窗口、Kitten 角色界面、按住说话、自动监听、实时麦克风电平测试、对话字幕、语音状态显示、打断当前播放、AI 配置面板、首次启动引导、依赖检查、模型下载进度、Windows 服务启动与停止。来源：`src/renderer/src/App.tsx`、`src/renderer/src/components/Kitten.tsx`、`src/renderer/src/components/VoiceButton.tsx`、`src/renderer/src/components/SettingsPanel.tsx`、`src/renderer/src/hooks/useConversation.ts`、`src/main/ipc/channels.ts`。
- 语音输入已使用 Chromium 的 `getUserMedia` 和 `MediaRecorder`，自动监听通过 Web Audio 的 RMS 阈值和静音时长判断结束；渲染进程把音频提交给主进程，主进程再调用 ASR。来源：`src/renderer/src/hooks/useConversation.ts`、`src/main/ipc/channels.ts`、`WINDOWS_PORTING_PROGRESS.md`。
- Windows ASR 服务已实现为 Python FastAPI 服务，提供 `/health` 和 `/v1/audio/transcriptions`，通过 `faster-whisper` 转写英文音频，并支持环境变量覆盖模型、设备和计算类型。来源：`backend/asr_server/app.py`、`backend/asr_server/requirements.txt`、`src/main/services/servers.ts`。
- LLM 通过 Ollama 的 OpenAI-compatible API 接入，默认模型名为 `qwen2.5:1.5b`；AI 名称、系统提示词、服务地址、接口密钥和模型名称可在设置面板编辑并持久化。来源：`README.md`、`src/main/services/config.ts`、`src/main/services/agent.ts`、`src/renderer/src/components/SettingsPanel.tsx`。
- TTS 使用 `kitten-tts-server.exe` 和 `kitten-tts-micro` 模型资源，主进程读取 SSE PCM 音频，再通过 IPC 发给渲染进程，由 Web Audio 播放 24 kHz 单声道 PCM。来源：`README.md`、`src/main/services/servers.ts`、`src/main/services/playback.ts`、`src/renderer/src/hooks/useConversation.ts`、`electron-builder.yml`。
- Ideas 菜单已经从单一话题列表扩展为“Try Saying”和“Speaking Games”两个分类，代码中包含 5 个引导话题和 11 个静态口语游戏；游戏启动前显示确认卡片，启动后把规则作为 system 消息显示并发送给 AI。来源：`src/renderer/src/data/games.ts`、`src/renderer/src/components/IdeasMenu.tsx`、`src/renderer/src/App.tsx`、`src/renderer/src/components/ChatBubbles.tsx`。
- Windows 路径和可执行文件查找已集中封装，支持 `%APPDATA%`、`resources`、Conda 目录以及 `.exe`、`.cmd`、`.bat` 的查找。来源：`src/main/services/paths.ts`、`src/main/services/executable.ts`、`src/main/services/servers.ts`。
- 配置保存使用临时文件后重命名的原子写入方式，并对字段长度和类型进行校验；变更 LLM 参数时会中断旧 Agent 并重建实例。来源：`src/main/services/config.ts`、`src/main/ipc/channels.ts`。
- 下载模块支持 HTTP Range 断点续传、`.part` 文件与元数据、取消、重试和进度通知；当前固定安装清单只包含 KittenTTS 模型归档，TTS 服务二进制由资源目录提供。来源：`src/main/services/download.ts`、`src/main/services/releases.ts`、`src/main/ipc/channels.ts`、`electron-builder.yml`。
- 项目包含 TypeScript 类型检查、Vitest 测试、Electron 构建和 Windows 打包命令。进度文档记录 `npm run typecheck`、`npm test`、`npm run build`、`npm run build:win` 已通过，并记录 7 个测试文件、39 个测试通过。来源：`package.json`、`src/main/__tests__/`、`WINDOWS_PORTING_PROGRESS.md`。
- Windows 打包配置把 `resources/bin` 和 `resources/models` 作为 `extraResources`，目标产物为 NSIS 安装包。来源：`electron-builder.yml`、`package.json`、`WINDOWS_PORTING_PROGRESS.md`。
- 根仓库目前只有一条提交：`c2d0f5d4`，提交信息为 `first-upload`，日期为 2026-05-21；因此根仓库缺少可用于还原逐步开发过程的提交历史。来源：根仓库 `git log`。

### 基于代码的合理推断

- 可能负责的技术范围：从根仓库唯一提交包含完整项目文件，以及 Windows 进度文档对路径、服务、音频、ASR、TTS、配置、打包和验证的集中记录看，提交者可能参与了主要 Windows 适配和项目整合；但 Git 历史不足以证明个人独立完成全部模块。来源：根仓库 `git show c2d0f5d4`、`WINDOWS_PORTING_PROGRESS.md`、`src/main/`、`src/renderer/src/`。
- 技术决策的主要动机推断为：Windows 下 SoX `waveaudio` 录音链路不可用，因此将录音和播放迁移到 Chromium 能力；主进程仍保留服务编排、ASR、Agent 和 TTS 流程，以维持 IPC 边界和已有交互。来源：`WINDOWS_PORTING_PROGRESS.md`、`src/main/ipc/channels.ts`、`src/renderer/src/hooks/useConversation.ts`。
- 项目更接近“可运行的本地 MVP / 实验版本”，而不是已证明完成商业上线的产品：代码和进度文档支持本地启动、测试和 Windows 打包，但没有用户量、上线结果、团队规模或线上运行指标。来源：`README.md`、`WINDOWS_PORTING_PROGRESS.md`、根仓库 Git 历史。

### 当前结果与未完成事项

- 已确认结果：TTS 和 ASR 服务的健康检查曾返回 `status=ok`；进度文档记录类型检查、单元测试、构建和 Windows 打包通过，并记录生成 `dist\\talk-kids-0.1.0-setup.exe`。来源：`WINDOWS_PORTING_PROGRESS.md`、`README.md`。
- 已确认阻塞：首次真实 ASR 转写可能触发 `small.en` 模型下载或缓存；应用内完整语音链路仍需要在真实麦克风、权限和扬声器环境中人工验证。来源：`WINDOWS_PORTING_PROGRESS.md`、`README.md`。
- 已确认技术局限：当前会话历史只保存在渲染进程内，关闭应用后不持久化；需求文档还明确排除了多用户、家长控制、学习进度、积分和排行榜。来源：`docs/brainstorms/2026-04-18-talk-kids-voice-conversation-integration-requirements.md`、`src/renderer/src/hooks/useConversation.ts`。
- 当前快照中没有可确认的根仓库 CI/CD 配置文件；进度文档提到过 `.github/workflows/build-release.yml`，但该文件不在当前可见的根仓库文件列表中，因此不能把 CI 发布流程写成已确认事实。来源：根目录文件扫描、`WINDOWS_PORTING_PROGRESS.md`。
- `kitten_tts_rs` 是以 Git 子模块形式嵌入的 Rust TTS 项目；其子模块工作区当前存在未提交的 `Cargo.toml` 修改，本次扫描未修改该目录。来源：根仓库 `git status`、`kitten_tts_rs/CLAUDE.md`、`kitten_tts_rs/README.md`。

## 3. 可复用的项目描述

### 3.1 一句话版本

Windows 本地儿童英语口语陪练应用，打通录音、识别、对话与语音回复。

### 3.2 简历版本

面向儿童英语口语练习场景，构建基于 Electron、React 和 TypeScript 的 Windows 本地桌面应用，串联 Chromium 录音、FastAPI/faster-whisper 语音识别、Ollama 对话和 KittenTTS 语音回复。针对 Windows SoX 设备兼容问题，将录音与播放迁移到 `MediaRecorder`、Web Audio 和 IPC 方案，并完成类型检查、测试、构建及 Windows 安装包验证；真实设备上的完整语音链路仍待人工确认。

### 3.3 面试讲述版本

背景：项目目标是给儿童提供低门槛的本地英语口语陪练体验，原有设计需要把录音、ASR、LLM、TTS 和角色 UI 组合成一个桌面应用。目标：在 Windows 10/11 环境下保持 Electron + React + TypeScript 架构，完成可启动、可配置、可打包的本地 MVP。

行动：我会把代码中可以确认的实现概括为三个层次：主进程负责 TTS/ASR 子进程、Agent、配置和 IPC；渲染进程负责 Kitten 状态、录音、VAD、字幕和设置交互；Python 服务提供兼容的 ASR HTTP 接口。针对 Windows SoX `waveaudio` 不可用的问题，录音改用 Chromium `getUserMedia` + `MediaRecorder`，自动监听用 Web Audio RMS 和静音计时判断提交，TTS 则通过 SSE 传输 PCM，再由渲染进程播放。

挑战：最大的工程挑战是本地多进程和多媒体链路的兼容性，包括 Windows 可执行文件查找、Conda Python 启动、模型资源路径、首次 ASR 模型缓存、麦克风权限和默认扬声器。解决方式是集中封装 Windows 路径与可执行文件查找、通过 `/health` 等待服务就绪、增加配置校验和 Agent 重建、用断点续传下载器处理模型资源，并把仍需设备验证的风险明确记录下来。

结果：仓库进度文档记录了 `npm run typecheck`、`npm test`、`npm run build` 和 `npm run build:win` 通过，并记录生成 Windows 安装包。反思：由于根仓库只有一条 `first-upload` 提交，且完整语音链路还没有在真实麦克风和扬声器上完成最终验收，面试时应把个人职责、实际用户结果、上线状态和指标作为待补充信息，而不是直接宣称已正式发布。

## 4. 网站可直接使用的 Project Markdown

```markdown
---
id: "talk-kids"
title: "Talk Kids"
type: "Windows 本地儿童英语口语陪练桌面应用"
summary: "一个面向儿童的 Windows 本地英语口语陪练应用，串联录音、语音识别、AI 对话和语音回复。"
stack:
  - "Electron + React 19 + TypeScript"
  - "Python FastAPI + faster-whisper"
  - "Ollama OpenAI-compatible API"
  - "Rust KittenTTS + ONNX Runtime"
featured: false
coverDoodle: "/images/doodles/browser-plant.png"
githubUrl: "https://github.com/xiaochong/talk-kids"
demoUrl: ""
sortOrder: 90
isPublished: false
---

## Overview

Talk Kids 是一个面向儿童英语听说练习场景的 Windows 本地桌面应用。项目的目标是把录音、英文语音识别、AI 对话和语音合成组合成一个低门槛的陪练闭环，并通过 Kitten 角色、字幕、按住说话和自动监听降低儿童使用语音交互的门槛。当前项目已完成主要 Windows 适配、服务编排和安装包构建验证，但仍处于本地 MVP / 实验阶段，完整语音链路尚未完成真实设备上的最终人工验收。

## My Role

待补充。仓库没有明确记录个人角色或团队分工。代码和 Git 只能确认项目包含 Windows 适配、语音链路、配置、UI、下载和打包实现，不能仅据此确认这些模块是否全部由本人独立完成。

## Core Features

- 使用 Chromium `getUserMedia` 和 `MediaRecorder` 录制用户语音，支持按住说话和自动监听两种模式。
- 使用 Web Audio 计算输入电平和 VAD 状态，并在设置面板提供麦克风测试。
- 通过 FastAPI + faster-whisper 提供本地英文语音识别服务。
- 通过 Ollama OpenAI-compatible API 生成英文对话回复，并支持流式文本事件。
- 通过 KittenTTS 服务生成 SSE PCM 音频，再由 Electron 渲染进程使用 Web Audio 播放。
- 在对话中展示用户文本、AI 回复、思考状态、说话状态和可中断的语音播放。
- 提供 AI 名称、系统提示词、服务地址、接口密钥和模型名称配置，并在修改 LLM 参数后重建 Agent。
- 提供 Try Saying 话题和 Speaking Games 口语游戏菜单，包含游戏确认卡片和规则 system 消息。
- 启动时检查依赖和模型资源，提供依赖引导、下载进度、取消与恢复下载流程。

## Tech Stack

- Electron + electron-vite：桌面应用容器和构建流程。
- React 19 + TypeScript：渲染进程 UI、状态管理和类型定义。
- Chromium `getUserMedia` + `MediaRecorder` + Web Audio：录音、VAD、电平检测和 PCM 播放。
- Python FastAPI + faster-whisper：本地 ASR 服务。
- Ollama OpenAI-compatible API + `@mariozechner/pi-agent-core` / `pi-ai`：本地 LLM 连接和 Agent 流程。
- Rust KittenTTS + ONNX Runtime：本地 TTS 服务和模型推理。
- Vitest：主进程服务、配置、国际化、窗口、录音常量和安装清单测试。

## Challenges & Solutions

- 挑战：Windows 下 SoX `waveaudio` 录音命令不可用，且 SoX 播放测试出现默认音频设备未配置问题。解决：将正式录音迁移到 Chromium `getUserMedia` + `MediaRecorder`，将 TTS PCM 播放迁移到渲染进程的 Web Audio，并通过 IPC 保留主进程服务编排。
- 挑战：Windows 下 TTS 可执行文件、模型目录和 Conda Python 的位置不固定。解决：集中封装 `%APPDATA%`、`resources`、Conda 目录和 Windows 可执行文件扩展名查找，并在服务启动前等待 TTS/ASR `/health`。
- 挑战：首次 ASR 转写可能需要下载 Whisper 模型，模型资源体积和网络状态会影响启动体验。解决：提供本地模型路径环境变量、下载进度、取消、`.part` 文件和 HTTP Range 断点续传；首次真实转写仍需要人工验证。
- 挑战：AI 配置修改可能影响当前对话和正在播放的语音。解决：保存配置前校验字段，使用原子写入；LLM 参数变化时停止播放、终止旧 Agent 并创建新 Agent。
- 挑战：儿童用户不适合直接面对底层错误和复杂初始化步骤。解决：增加 Kitten 角色、引导页、中文界面、依赖安装提示、状态化启动界面和可选字幕；真实儿童可用性和学习效果尚未验证。

## Result

代码已经形成可在 Windows 环境中运行和打包的本地 MVP：进度文档记录了类型检查、39 个单元测试、应用构建和 Windows 安装包构建通过，也记录了 TTS/ASR 健康检查通过。当前局限是根仓库历史只有一次 `first-upload` 提交，缺少逐步开发证据；首次 ASR 模型缓存、麦克风权限、实际扬声器输出和应用内完整语音链路仍需在目标机器上人工验证；项目没有可确认的用户量、上线数据、性能指标或团队分工信息。
```

## 5. 网站可直接使用的 Experience Markdown

```markdown
---
title: "将本地 AI 语音对话应用适配到 Windows"
period: "待确认"
role: "待确认"
category: "项目开发"
summary: "围绕 Windows 本地语音链路，完成桌面 UI、ASR、LLM、TTS、配置和安装打包的整合。"
tags:
  - "Electron"
  - "语音交互"
  - "Windows 适配"
sortOrder: 90
isPublished: false
---

## 记录

Talk Kids 的目标是为儿童提供一个本地英语口语陪练桌面应用。需求文档定义了录音、ASR、LLM、TTS 和 Kitten 角色 UI 的完整交互；Windows 改造记录进一步明确了 Windows 10/11、本地 Ollama、FastAPI/faster-whisper ASR 和 KittenTTS 服务的技术路线。项目当前可以从代码中确认主要实现已经形成，但实际项目时间、团队分工和个人职责仍待补充。

从代码可以确认的任务包括：搭建 Electron + React + TypeScript 桌面应用结构；在主进程中启动和停止 TTS/ASR 子服务、等待健康检查并转发 IPC 事件；在渲染进程中实现 Kitten 状态、按住说话、自动监听、字幕、配置面板和口语游戏；增加 FastAPI/faster-whisper ASR 接口；用 SSE PCM 和 Web Audio 完成 TTS 播放；加入 Windows 路径、可执行文件查找、模型下载、配置校验和 Windows 打包配置。

关键行动是处理 Windows 音频和依赖兼容问题。进度文档记录 SoX `waveaudio` 录音命令不可用，且 SoX 默认播放设备测试失败，因此当前录音链路使用 Chromium `getUserMedia` + `MediaRecorder`，自动监听使用 Web Audio RMS 与静音时长判断，TTS 音频则由主进程通过 IPC 发给渲染进程播放。服务侧通过统一路径查找、Conda Python、`/health` 检查和资源打包，减少了环境差异造成的启动失败。

项目结果包括：仓库进度文档记录 `npm run typecheck`、`npm test`、`npm run build` 和 `npm run build:win` 通过，7 个测试文件共 39 个测试通过，并记录生成 Windows 安装包。当前仍是本地 MVP / 实验阶段，首次 ASR 模型缓存、麦克风权限、扬声器输出和完整语音链路需要人工验证；用户量、上线结果、性能指标和个人贡献范围没有项目证据支持。

## 收获

- 处理桌面端语音交互时，需要把录音、识别、对话、合成和播放拆成可观测的服务边界，并为每个边界保留健康检查和错误状态。
- 在 Windows 适配中，优先依赖 Electron/Chromium 已具备的媒体能力，可以减少对外部音频工具设备名和驱动差异的依赖。
- 配置变更会影响 Agent、播放和对话状态，保存配置不能只修改表单，还要考虑原子写入、校验、重建和状态清理。
- 模型和二进制资源的下载流程需要具备进度、取消、重试和断点续传，否则首次启动容易被网络波动打断。
- 需求文档中的成功标准不能替代真实设备验收；模型缓存、麦克风权限和默认音频设备必须在目标环境中单独验证。

## 可复用经验

### 技术经验

- 用 typed IPC 连接 Electron 主进程和渲染进程：主进程管理服务与 Agent，渲染进程管理界面和媒体能力，边界清晰且便于替换单个环节。
- 用 SSE 传输流式 PCM，再由 Web Audio 创建 `AudioBuffer` 播放，可以避免把播放职责继续绑定到 Windows 下不稳定的外部命令。
- 用 FastAPI 保持 ASR HTTP 接口稳定，使上层流程可以从原有服务实现迁移到 `faster-whisper`，而不必重写整个对话管线。

### 工程经验

- 把路径、可执行文件查找、配置、服务生命周期和下载器分别封装，便于定位 Windows 环境差异。
- 用 `/health` 轮询确认子服务真正可用，而不是只判断子进程是否创建成功。
- 用临时文件加重命名保存配置，用 `.part` 和元数据保存下载进度，降低中断造成的数据损坏风险。

### 产品经验

- 对儿童产品，首次启动引导、清晰的麦克风反馈、可选字幕和角色化错误提示是降低学习成本的重要交互组成部分。
- 口语游戏先展示规则和确认卡片，再把规则发送给 AI，可以降低误触并让 AI 获得更稳定的主持上下文。

### 协作与交付经验

- 通过需求文档、改造计划、进度记录和测试命令形成可追踪的交付证据；但当前根仓库只有一次提交，无法还原细粒度的个人贡献和协作过程。

## 6. 可复用经验库

### 技术决策

- 决策：在 Windows 上使用 Chromium `getUserMedia` + `MediaRecorder` 录音，并使用 Web Audio 播放 TTS PCM。
- 背景：进度文档记录 SoX `waveaudio` 录音命令不可用，SoX 默认播放设备也存在问题。
- 取舍：增加渲染进程的媒体处理和 IPC 数据传输，但降低对外部音频命令、系统设备名和驱动配置的依赖；完整设备兼容性仍需验证。
- 可迁移经验：桌面端跨平台音频适配时，先判断宿主框架已有能力能否覆盖录放音，再决定是否继续依赖系统级命令行工具。

### 问题解决

- 问题：Windows 端原有音频链路依赖 SoX，录音和播放在当前环境不可用。
- 定位过程：进度文档记录了 `waveaudio` handler 缺失和默认音频设备未配置；代码扫描确认主流程后来不再依赖 SoX 录音与播放。
- 解决方案：把录音迁移到 `MediaRecorder`，以 Web Audio RMS 和静音计时支持 VAD，把 TTS SSE PCM 通过 IPC 发给渲染进程播放。
- 最终结果：代码和进度文档确认迁移已完成；真实麦克风权限、音箱输出和完整应用内链路仍待人工验收。

### 工程方法

- 使用了什么方法：将服务启动、路径解析、配置读写、下载、IPC、录音提交和 TTS 播放拆成独立模块，并用 Vitest 覆盖配置、国际化、日志、窗口、录音常量、Agent 预热和安装清单。
- 为什么有效：问题可以在模块边界定位，Windows 特定实现可以替换而不必改写整个 UI 和对话流程；测试也能覆盖默认值、迁移和错误处理等边界。
- 适合什么场景：适合 Electron 这类同时包含主进程、渲染进程、外部子服务和本地资源的桌面应用。

### 失败或不足

- 哪些地方没有完成：首次真实 ASR 转写、麦克风权限、扬声器输出和应用内完整语音链路仍需人工验证；`npm run dev` 也未在进度文档中标记为完成。
- 哪些方案存在局限：ASR 首次运行可能依赖网络下载模型；LLM 依赖本地 Ollama 或可配置的 OpenAI-compatible provider；会话历史不持久化；当前没有用户、性能或上线数据。
- 下次会如何改进：补充目标设备上的端到端测试、记录实际延迟和资源占用，增加更细粒度 Git 提交与变更说明，并在确认个人职责和公开许可后再发布作品集内容。

## 7. 可用于简历的短句

- 设计 Electron + React + TypeScript 桌面架构，完成儿童英语口语练习界面与本地服务链路整合。
- 将 Windows 录音从 SoX 迁移到 `MediaRecorder` 与 Web Audio，建立按住说话和自动监听两种交互模式。
- 使用 FastAPI + faster-whisper 搭建本地 ASR HTTP 服务，保留 `/health` 与转写接口供主进程调用。
- 使用 typed IPC 连接 Electron 主进程与渲染进程，串联 ASR、Ollama Agent、TTS 和角色状态更新。
- 解析 SSE PCM 音频并通过 Web Audio 播放，完成 TTS 语音输出与可中断播放流程。
- 建立配置校验、原子写入和 Agent 重建机制，实现 AI 名称、提示词和模型参数的运行时更新。
- 实现带进度、取消、重试和 Range 断点续传的模型资源下载流程，支持首次启动准备本地资源。
- 使用 Vitest 覆盖配置迁移、国际化、日志、窗口、录音常量和安装清单，并完成 Windows 打包验证。

## 8. 可用于面试的追问与回答素材

- 为什么选择这个技术方案？
  - 代码和文档显示项目需要桌面 UI、本地子服务和语音交互，因此使用 Electron 保持桌面能力，React + TypeScript 管理 UI，主进程负责服务与 Agent，FastAPI 提供 Windows ASR 接口，KittenTTS 提供本地 TTS。
  - Windows 下 SoX 音频设备兼容性出现问题后，录音与播放分别迁移到 Chromium `MediaRecorder` 和 Web Audio，以减少系统级音频命令依赖。

- 项目中最难的问题是什么？
  - 不是单一 API 调用，而是多进程服务、模型资源、IPC、媒体权限和播放状态的组合兼容问题。
  - 当前证据支持的解决方式包括统一 Windows 路径、可执行文件查找、服务健康检查、ASR 服务替换、TTS PCM IPC 和启动状态机；完整设备验收仍待补充。

- 你具体负责了哪些部分？
  - 需要如实说明：仓库没有个人分工文件，根 Git 历史只有 `first-upload`，不能仅凭代码断言独立负责全部模块。
  - 可以展示的候选贡献范围是 Windows 适配、语音链路、配置、安装下载、口语游戏 UI 和测试；面试前应由本人确认实际负责模块和协作边界。

- 如果重新做一次，你会如何改进？
  - 先补充真实麦克风、权限、扬声器和首次模型下载的端到端自动化或半自动化验收，再记录延迟、CPU、内存和失败率。
  - 同时完善 Git 提交历史、CI/CD 文件和发布说明，避免只能依赖单次上传和手工进度文档判断开发过程。

- 这个项目中最值得复用的经验是什么？
  - 对本地 AI 桌面应用，应把 ASR、LLM、TTS 和 UI 状态拆开，并通过健康检查、typed IPC 和可替换的 HTTP 接口连接。
  - 对跨平台问题，先用证据定位具体依赖在哪一层失效，再替换最小边界；本项目就是把 Windows 音频输入输出从 SoX 切换到 Chromium 能力。

## 9. 待确认信息

- 准确项目时间：需求设计、Windows 改造和最终验证的实际起止日期。
- 准确个人角色：独立开发、主程、前端、桌面端、AI 应用工程或其他角色。
- 个人实际负责范围：哪些模块由本人编写，哪些来自已有项目、第三方项目或协作者。
- 团队规模与协作方式：是否有其他开发者、设计者或产品参与。
- 是否正式上线：当前是否仅本地实验，是否有公开发行版本。
- 用户或使用人数：家庭、课堂或其他场景是否有真实试用记录。
- 性能、效率或成本指标：端到端延迟、模型加载时间、CPU/内存占用、安装包体积、下载耗时等。
- GitHub、Demo 或线上地址：`package.json` 和 `website/index.html` 指向的 GitHub 地址是否仍然有效；是否存在可公开访问的 Demo。
- CI/CD 状态：进度文档提到过 GitHub Actions，但当前快照未包含对应工作流文件，需要确认是否曾提交、迁移或删除。
- ASR/TTS 真实设备验证：首次模型缓存、麦克风权限、录音格式、扬声器输出和完整对话链路是否已在目标 Windows 设备验证。
- 许可证与公开展示范围：是否允许公开展示源代码、截图、安装包、第三方模型和 `kitten_tts_rs` 子模块相关内容。
- 作品集呈现方式：是否公开显示本地 AI provider、模型名称、第三方依赖和项目限制。
