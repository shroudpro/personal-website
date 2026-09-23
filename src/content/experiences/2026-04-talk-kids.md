---
title: "将本地 AI 语音对话应用适配到 Windows"
period: "2026-04 — 2026-05"
role: "桌面应用与语音链路开发"
category: "AI 应用 / Windows 适配"
summary: "围绕 Windows 本地语音链路，完成桌面 UI、ASR、LLM、TTS、配置和安装打包的整合。"
tags:
  - "Electron"
  - "语音交互"
  - "Windows 适配"
sortOrder: 40
isPublished: true
---

## 记录

Talk Kids 面向儿童英语口语练习场景，需要把录音、语音识别、AI 对话、语音合成和角色化界面组合成一个本地桌面应用。项目围绕 Electron + React + TypeScript 建立主进程服务编排和渲染进程交互，并接入 FastAPI/faster-whisper、Ollama 和 KittenTTS。

Windows 适配中的关键问题是 SoX 录音和播放链路不稳定。项目将录音迁移到 Chromium `getUserMedia` + `MediaRecorder`，用 Web Audio 完成电平检测和 TTS PCM 播放，再通过 IPC 连接主进程服务。同时补充路径查找、健康检查、配置校验、模型下载和 Windows 打包流程。

最终记录显示，类型检查、39 项测试、应用构建和 Windows 安装包构建均已通过。项目仍属于本地 MVP，真实麦克风权限、扬声器输出和完整语音链路需要在目标设备上继续验收。

## 收获

- 桌面端语音系统需要把录音、识别、对话、合成和播放拆成可观测的服务边界。
- 跨平台适配时，优先利用宿主框架已有的媒体能力，可以减少对系统命令和设备名的依赖。
- 本地模型下载、配置变更和服务启动都需要明确的状态、重试和恢复机制。

## 可复用经验

- 用 typed IPC 连接主进程与渲染进程，让服务管理和界面媒体能力保持清晰边界。
- 用 `/health` 确认子服务真正可用，而不是只判断进程是否启动。
- 用原子配置写入、`.part` 下载文件和断点续传降低本地应用被中断后的恢复成本。
