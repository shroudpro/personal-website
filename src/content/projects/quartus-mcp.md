---
id: "quartus-mcp"
title: "Quartus MCP"
period: "2026-05"
type: "MCP 工具服务 / FPGA 工程自动化"
summary: "让 Codex 和 Claude Code 通过 MCP 调用 Quartus，完成示例工程生成、编译、VWF 仿真和报告汇总。"
stack:
  - "Python 3.10+"
  - "MCP JSON-RPC over stdio"
  - "Quartus II 9.1 CLI"
  - "VHDL"
  - "QPF/QSF/VWF/CVWF"
featured: true
coverDoodle: "/images/doodles/browser-plant.png"
githubUrl: "https://github.com/shroudpro/Quartus-MCP.git"
demoUrl: ""
sortOrder: 42
isPublished: true
---

## Overview

Quartus MCP 是一个面向 Windows、Quartus II 9.1 和 MAX II 实验板场景的本地 MCP server。它把 Quartus 工程创建、VHDL/VWF 文件生成、项目编译、VWF 仿真和结果汇总封装为 AI 工具可调用的接口，减少数电实验中的重复配置。项目当前处于 Alpha 阶段。

## My Role

Python / MCP 工具开发，覆盖 stdio JSON-RPC server、Quartus CLI 封装、工程模板、仿真结果处理和接入文档。

## Core Features

- 检查 Quartus 安装并读取 `quartus_sh` 版本。
- 生成包含 QPF、QSF、VHDL 和 VWF 的 16 位计数器示例工程。
- 调用 `quartus_sh --flow compile` 编译工程并提取错误、警告和产物路径。
- 调用 `quartus_sim` 运行 VWF 仿真并输出 CVWF 结果。
- 汇总 `.rpt`、`.summary`、`.log`、`.sof`、`.pof` 和 `.cvwf` 等文件。

## Tech Stack

- Python 3.10+ 标准库、JSON-RPC over stdio
- Quartus II 9.1 CLI、VHDL、QPF/QSF/VWF/CVWF
- Codex、Claude Code 和 Claude Desktop MCP 配置

## Challenges & Solutions

- VWF 仿真可能回写输入波形文件：改用 `quartus_sim`，指定 CVWF 输出、关闭 waveform overwrite，并同步更新 QSF 和 VWF 模板。
- 工程器件、顶层 VHDL、引脚配置和波形信号需要保持一致：用集中模板生成 QPF、QSF、VHDL 和 VWF。
- Quartus 会产生多种报告和编程文件：统一捕获命令输出，提取错误/警告并按文件类型汇总结果。

## Result

仓库已形成可安装的 Python 包、5 个 MCP 工具、工程与波形模板、宿主配置样例和使用文档。VWF 回写问题已在代码和文档中处理；当前没有自动化测试、真实编译日志、线上 Demo 或性能指标，因此仍应作为 Alpha 实验项目理解。
