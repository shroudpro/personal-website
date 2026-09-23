---
id: "talk-kids"
title: "Talk Kids"
period: "2026-04 — 2026-05"
type: "Windows 本地儿童英语口语陪练桌面应用"
summary: "一个面向儿童的 Windows 本地英语口语陪练应用，串联录音、语音识别、AI 对话和语音回复。"
stack:
  - "Electron"
  - "React 19 + TypeScript"
  - "FastAPI + faster-whisper"
  - "Ollama"
  - "KittenTTS"
featured: false
coverDoodle: "/images/doodles/browser-plant.png"
githubUrl: "https://github.com/xiaochong/talk-kids"
demoUrl: ""
sortOrder: 40
isPublished: true
---

## Overview

Talk Kids 面向儿童英语听说练习场景，将录音、英文语音识别、AI 对话和语音合成组合成一个本地桌面应用。项目已完成主要 Windows 适配、服务编排和安装包构建验证，当前定位为本地 MVP，完整语音链路仍需在真实设备上继续验收。

## My Role

桌面应用与本地语音链路开发，覆盖 Electron 主进程服务编排、渲染进程交互、Windows 音频适配、配置管理和打包验证。

## Core Features

- 支持按住说话、自动监听、麦克风电平测试、字幕和可中断语音播放。
- 使用 FastAPI + faster-whisper 提供本地英文语音识别服务。
- 使用 Ollama OpenAI-compatible API 生成对话回复，并通过 KittenTTS 播放语音。
- 提供 AI 配置、依赖检查、模型下载进度、Try Saying 话题和 Speaking Games。
- 使用 Windows 路径查找、服务健康检查和安装资源配置处理本地运行环境。

## Tech Stack

- Electron、React 19、TypeScript、electron-vite
- Python FastAPI、faster-whisper
- Ollama OpenAI-compatible API、Rust KittenTTS、ONNX Runtime
- Vitest、electron-builder

## Challenges & Solutions

- Windows 下 SoX 录音和播放链路不可用：将录音迁移到 Chromium `getUserMedia` + `MediaRecorder`，使用 Web Audio 播放 TTS PCM，并通过 IPC 保留主进程服务编排。
- 本地可执行文件、模型和 Conda Python 路径不固定：集中封装路径查找，并在服务启动前等待 ASR/TTS 健康检查。
- 模型下载和配置变更会影响启动与对话状态：加入断点续传、取消、重试、原子配置写入和 Agent 重建。

## Result

进度记录显示，项目已通过类型检查、39 项测试、应用构建和 Windows 安装包构建，并完成 TTS/ASR 健康检查。当前仍缺少真实麦克风权限、扬声器输出和完整语音链路的目标设备验收，也没有可公开引用的用户量或上线指标。
