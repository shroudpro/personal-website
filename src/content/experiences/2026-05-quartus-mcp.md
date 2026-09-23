---
title: "构建 Quartus MCP 工具服务"
period: "2026-05"
role: "Python / MCP 工具开发"
category: "工具开发与工程自动化"
summary: "将 Quartus 工程生成、编译、VWF 仿真和报告汇总封装为 Codex 与 Claude Code 可调用的本地 MCP 工具。"
tags:
  - "Python"
  - "MCP"
  - "FPGA"
sortOrder: 41
isPublished: true
---

## 记录

Quartus MCP 面向 Windows 上使用 Quartus II 9.1 和 MAX II 开发板进行数电实验的场景。项目使用 Python 实现 stdio JSON-RPC MCP server，将 Quartus 安装检测、计数器示例工程生成、项目编译、VWF 仿真和报告汇总封装为 5 个工具，并通过模板生成 QPF、QSF、VHDL 和 VWF 文件。

开发过程中，VWF 仿真结果可能回写输入波形文件，污染原始激励。项目改用 `quartus_sim`，指定 CVWF 输出并关闭 waveform overwrite，同时在 QSF 中同步配置仿真选项和信号模板。最终形成可安装 Python 包、宿主配置样例和使用文档，但当前仍是 Alpha 阶段，缺少自动化测试、真实编译日志和用户数据。

## 收获

- 外部 EDA 命令的日志应转换成结构化结果，AI 工具才能继续判断编译和仿真状态。
- 输入配置文件与工具生成结果必须明确隔离，避免自动化流程覆盖用户输入。
- 面向旧版工具时，应把格式兼容性和 GUI 兜底步骤写入交付文档。

## 可复用经验

- 用模板函数从同一组参数生成工程文件，保持器件、顶层实体、引脚和波形信号一致。
- 为外部命令设置超时，统一返回 stdout、stderr、返回码、错误和警告。
- 用环境变量隔离本机工具路径，避免把个人机器配置写死在服务代码中。
