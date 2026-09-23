# 项目经历素材：Quartus MCP

## 1. 基本信息

- 项目名称：Quartus MCP
- 项目类型：本地 MCP server / FPGA 与 Quartus 命令行自动化工具
- 项目阶段：Alpha 实验阶段；仓库已实现核心功能，但项目文件没有证明正式上线或完成真实 Quartus 编译
- 项目时间：2026-05；Git 提交集中在 2026-05-26，准确的经历起止时间待确认
- 项目地址：https://github.com/shroudpro/Quartus-MCP.git
- 一句话描述：让 Codex 或 Claude Code 通过 MCP 自动创建、编译和仿真 Quartus 工程。
- 核心技术：Python 3.10+、自定义 JSON-RPC over stdio MCP server、Quartus II 9.1 CLI、VHDL、QPF/QSF/VWF/CVWF、Windows
- 证据来源：`README.md`、`pyproject.toml`、`src/quartus_mcp/server.py`、`src/quartus_mcp/quartus_cli.py`、`src/quartus_mcp/templates.py`、`examples/`、Git 提交 `ed19112`、`b346b20`、`b9366da`

## 2. 事实与证据

- [已确认事实] 项目面向使用 Windows、Quartus II 9.1 或兼容版本，以及 MAX II `EPM1270T144C5` 开发板进行数电实验的用户；README 明确提到 BUPT 数电实验场景，并将初学者不会写 VHDL、配置波形或设置引脚列为问题。来源：`README.md`、`src/quartus_mcp/templates.py`
- [已确认事实] 项目提供一个本地运行的 MCP server，使 Codex、Claude Code 等 AI 编程工具可以调用本机 Quartus 命令行工具。来源：`README.md`、`src/quartus_mcp/server.py`
- [已确认事实] server 暴露 5 个工具：检测 Quartus 安装、创建计数器示例工程、编译工程、运行 VWF 仿真、汇总 Quartus 报告。来源：`README.md`、`src/quartus_mcp/server.py`
- [已确认事实] `create_counter_project` 可以生成 QPF、QSF、VHDL 顶层文件和 VWF 波形文件，并支持项目名、输出目录、仿真时间、网格周期和是否覆盖等参数。来源：`src/quartus_mcp/quartus_cli.py`、`src/quartus_mcp/server.py`、`src/quartus_mcp/templates.py`
- [已确认事实] 生成的示例是带异步复位和使能信号的 16 位计数器：VHDL 中使用 `numeric_std`，在时钟上升沿且 `enable` 为高时递增，`rst` 为高时清零，输出连接到 16 位 `led`。来源：`src/quartus_mcp/templates.py`
- [已确认事实] 模板为 MAX II `EPM1270T144C5` 配置时钟、复位、使能和 16 个 LED 引脚；代码中明确写入了这些引脚分配。来源：`src/quartus_mcp/templates.py`
- [已确认事实] `compile_project` 调用 `quartus_sh --flow compile`，捕获标准输出和错误输出，提取错误与警告，并返回报告文件、`.sof` 和其他编程文件路径。来源：`src/quartus_mcp/quartus_cli.py`
- [已确认事实] `run_vwf_simulation` 使用 `quartus_sim`，指定 VWF 输入文件，设置 `CVWF` 输出格式，并传入 `--overwrite_waveform=off`；同时会寻找新生成的 `.cvwf` 文件，必要时复制到项目根目录。来源：`src/quartus_mcp/quartus_cli.py`、`src/quartus_mcp/server.py`
- [已确认事实] QSF 模板写入 `SIM_OVERWRITE_WAVEFORM_INPUTS OFF` 和 `VECTOR_OUTPUT_FORMAT CVWF`，VWF 模板只为 `clk`、`rst`、`enable` 生成输入激励，LED 作为输出信号展示。来源：`src/quartus_mcp/templates.py`
- [已确认事实] 最近一次 Git 提交的主题是 `Prevent Quartus VWF overwrite during simulation`，修改了仿真命令、QSF 配置、VWF 模板和 README，说明 VWF 回写问题是项目演进中的明确问题。来源：Git 提交 `b9366da`
- [已确认事实] `summarize_quartus_reports` 会汇总 `.rpt`、`.summary`、`.log`、`.sof`、`.pof`、`.jic`、`.jam`、`.jbc` 和 `.cvwf` 等文件，并提取报告文本中的错误和警告。来源：`src/quartus_mcp/quartus_cli.py`、`README.md`
- [已确认事实] server 通过标准输入逐行读取 JSON-RPC 消息，通过标准输出返回 JSON；实现了 `initialize`、`tools/list`、`tools/call` 和 `ping` 等处理。来源：`src/quartus_mcp/server.py`
- [已确认事实] Quartus 路径通过 `QUARTUS_BIN` 环境变量或参数传入，检测工具会检查 `quartus_sh`、`quartus_map`、`quartus_fit`、`quartus_asm`、`quartus_sta`、`quartus_tan` 和 `quartus_sim`。来源：`src/quartus_mcp/quartus_cli.py`、`examples/codex.config.example.toml`、`examples/claude_code.mcp.example.json`
- [已确认事实] Python 包要求 Python 3.10 或更高版本，运行时依赖列表为空，提供 `quartus-mcp-server` 命令行入口，许可证为 MIT。来源：`pyproject.toml`、`LICENSE`
- [已确认事实] Git 历史包含三次提交，均由同一 Git 作者提交：初始上传、README 与演示图片更新、VWF 回写问题修复。来源：Git 提交 `ed19112`、`b346b20`、`b9366da`
- [基于代码的合理推断] 依据 Git 历史中全部代码提交均由同一作者完成，可以推断该作者至少参与了 MCP server、Quartus CLI 封装、VHDL/VWF 模板和文档的实现；但仓库没有记录团队分工，因此不能确认这是独立完成还是团队中的全部职责。来源：Git 提交 `ed19112`、`b346b20`、`b9366da`
- [基于代码的合理推断] 通过把报告解析、编译结果和仿真结果统一成结构化 JSON，项目试图让 AI 工具能够继续判断构建结果并辅助定位问题；这是从 `CommandResult`、错误/警告提取和各工具返回结构推断出的设计意图。来源：`src/quartus_mcp/quartus_cli.py`、`src/quartus_mcp/server.py`
- [已确认事实] 当前仓库中没有发现 `tests/`、测试文件、Dockerfile、`requirements.txt` 或 CI/CD 工作流；因此无法从仓库确认自动化测试覆盖率、持续集成状态或容器化部署。来源：当前目录文件清单、`pyproject.toml`
- [已确认事实] README 提供了 Codex、Claude Code 和 Claude Desktop 的示例配置及安装步骤，但没有提供线上 Demo、用户数量、性能数据、正式上线记录或实际 Quartus 编译日志。来源：`README.md`、`examples/`
- [需要用户补充] 准确个人角色、是否独立开发、团队规模、是否有真实用户，以及是否已经在真实 Quartus 环境中完成编译和下载验证，目前无法从仓库确认。来源：项目文件和 Git 历史未记录这些信息

## 3. 可复用的项目描述

### 3.1 一句话版本

为 Codex 和 Claude Code 构建本地 Quartus MCP，自动生成工程、编译项目并运行 VWF 仿真。

### 3.2 简历版本

针对数电实验中 VHDL 编写、Quartus 工程配置、引脚分配和 VWF 仿真操作分散且易出错的问题，使用 Python 实现本地 MCP server，封装工程生成、Quartus 编译、仿真执行和报告汇总能力。针对 Quartus VWF 仿真结果污染输入波形的问题，改用 `quartus_sim`、CVWF 输出和关闭 VWF 回写的组合，并同步更新 QSF 和 VWF 模板；项目当前为 Alpha 实验阶段，正式上线和实际用户结果待确认。

### 3.3 面试讲述版本

背景：项目面向 Windows 上使用 Quartus II 9.1 和 MAX II 开发板完成数电实验的场景，README 中列出的主要痛点包括 VHDL 编写、波形设置、仿真和引脚配置。目标：让 Codex 或 Claude Code 能通过 MCP 调用本机 Quartus 工具，减少手动创建工程和整理结果文件的步骤。行动：我基于 Python 实现了 stdio JSON-RPC server，提供安装检测、计数器工程生成、编译、VWF 仿真和报告汇总 5 个工具，并用模板生成 QPF、QSF、VHDL 和 VWF 文件。挑战：早期仿真流程可能将输出结果回写到输入 VWF，导致输入激励文件被污染；从 Git 提交和代码变更可以确认，后续改为调用 `quartus_sim`，指定 CVWF 输出并关闭 waveform overwrite，同时移除 LED 输出信号的输入 transition。结果：仓库形成了可安装的 Python 包、Codex/Claude Code 配置样例和 README，核心代码及文档已提交；但仓库没有自动化测试、真实编译日志或上线数据，因此不能宣称生产可用或量化收益。反思：下一步应补充真实 Quartus 环境测试、自动化测试、兼容性矩阵和更清晰的错误分类，并确认个人职责与用户反馈。

## 4. 网站可直接使用的 Project Markdown

以下内容可以复制到 `src/content/projects/quartus-mcp.md`：

```markdown
---
id: "quartus-mcp"
title: "Quartus MCP"
type: "MCP 工具服务 / FPGA 工程自动化"
summary: "让 Codex 和 Claude Code 通过 MCP 调用 Quartus，完成示例工程生成、编译、VWF 仿真和报告汇总。"
stack:
  - "Python 3.10+"
  - "MCP JSON-RPC over stdio"
  - "Quartus II 9.1 CLI"
  - "VHDL"
  - "QPF/QSF/VWF/CVWF"
featured: false
coverDoodle: "/images/doodles/browser-plant.png"
githubUrl: "https://github.com/shroudpro/Quartus-MCP.git"
demoUrl: ""
sortOrder: 90
isPublished: false
---

## Overview

Quartus MCP 是一个面向 Windows、Quartus II 9.1 和 MAX II `EPM1270T144C5` 实验板场景的本地 MCP server。它把 Quartus 工程创建、VHDL/VWF 文件生成、项目编译、VWF 仿真和结果汇总封装成 AI 工具可调用的接口，用于降低数电实验中手动配置工程、波形和引脚的复杂度。项目当前处于 Alpha 实验阶段，仓库未提供正式上线或真实用户数据。

## My Role

Git 历史显示同一作者完成了项目初始上传、文档与演示资源更新，以及 VWF 回写问题修复。基于这些记录，可以推断我参与了 MCP server、Quartus CLI 封装、VHDL/VWF 模板和使用文档的实现；是否为独立开发、具体职责边界和团队分工待补充。

## Core Features

- 检查 `QUARTUS_BIN` 指向的 Quartus 命令行工具是否存在，并读取 `quartus_sh` 版本信息。
- 生成包含 QPF、QSF、VHDL 和 VWF 的 16 位计数器示例工程。
- 调用 `quartus_sh --flow compile` 编译已有 Quartus 工程并提取错误、警告、报告和编程文件路径。
- 调用 `quartus_sim` 运行 VWF 仿真，使用 CVWF 输出并关闭 VWF 输入回写。
- 汇总 `.rpt`、`.summary`、`.log`、`.sof`、`.pof`、`.jic`、`.jam`、`.jbc` 和 `.cvwf` 文件。

## Tech Stack

- Python 3.10+、标准库 `subprocess`、`pathlib`、`dataclasses` 和 `json`。
- 自定义 JSON-RPC over stdio MCP server。
- Intel/Altera Quartus II 9.1 CLI，包括 `quartus_sh` 和 `quartus_sim`。
- VHDL、QPF、QSF、VWF 和 CVWF 文件格式。
- Codex、Claude Code 和 Claude Desktop 的 MCP 配置。

## Challenges & Solutions

- 挑战：Quartus VWF 仿真结果可能回写到输入波形文件，污染原本用于保存 `clk`、`rst` 和 `enable` 激励的 VWF。解决：改用 `quartus_sim`，指定 `--simulation_results_format=CVWF` 和 `--overwrite_waveform=off`，并在 QSF 中设置 `SIM_OVERWRITE_WAVEFORM_INPUTS OFF` 与 `VECTOR_OUTPUT_FORMAT CVWF`。
- 挑战：Quartus 工程文件、顶层 VHDL、引脚配置和 VWF 信号结构需要保持一致。解决：集中在 `templates.py` 中生成 QPF、QSF、VHDL 和 VWF，并将器件、引脚、计数器逻辑及波形激励统一模板化。
- 挑战：AI 工具需要读取编译和仿真结果，而 Quartus 会产生多个报告和编程文件。解决：统一捕获命令结果，提取错误与警告，并按文件类型汇总 `.rpt`、`.summary`、`.log`、`.sof`、`.pof` 和 `.cvwf`。
- 挑战：Quartus II 9.1 的 VWF 格式较旧，手写 VWF 可能被 GUI 拒绝。解决：README 给出了在 Quartus GUI 中打开并保存一次后重新仿真的兼容性处理；这仍是项目的已知局限。

## Result

仓库已形成可安装的 Python 包、5 个 MCP 工具、工程和波形模板、Codex/Claude Code 配置样例以及使用文档。Git 历史确认 VWF 回写问题已被代码和文档共同处理。当前项目标记为 Alpha，仓库没有自动化测试、真实 Quartus 编译日志、线上 Demo、用户规模或性能指标，因此这些结果和正式部署状态仍待验证。
```

## 5. 网站可直接使用的 Experience Markdown

以下内容可以复制到 `src/content/experiences/2026-05-quartus-mcp.md`：

```markdown
---
title: "构建 Quartus MCP 工具服务"
period: "2026-05"
role: "Python / MCP 工具开发者（具体角色待确认）"
category: "工具开发与工程自动化"
summary: "将 Quartus 工程生成、编译、VWF 仿真和报告汇总封装为 Codex 与 Claude Code 可调用的本地 MCP 工具。"
tags:
  - "Python"
  - "MCP"
  - "FPGA"
sortOrder: 90
isPublished: false
---

## 记录

项目面向 Windows 上使用 Quartus II 9.1 和 MAX II 开发板进行数电实验的场景，目标是处理 VHDL 编写、VWF 波形设置、工程编译、引脚分配和结果整理等重复操作。我基于 Python 实现了一个通过 stdio 通信的 JSON-RPC MCP server，提供 Quartus 安装检测、计数器示例工程生成、项目编译、VWF 仿真和报告汇总 5 个工具，并通过模板生成 QPF、QSF、VHDL 和 VWF 文件。

项目演进中明确遇到过 VWF 仿真结果回写输入文件的问题。为保持输入激励与仿真输出分离，代码改用 `quartus_sim`，指定 CVWF 结果格式并关闭 waveform overwrite，同时在 QSF 中配置 `SIM_OVERWRITE_WAVEFORM_INPUTS OFF` 和 `VECTOR_OUTPUT_FORMAT CVWF`，并去除 LED 输出信号的输入 transition。最终仓库形成了可安装的 Python 包、配置样例和使用文档；当前仍是 Alpha 实验阶段，真实 Quartus 编译结果、正式上线状态和用户反馈待确认。

## 收获

- 将本地 EDA 命令行工具封装成 MCP 接口时，返回结构化结果比只返回原始日志更便于 AI 工具继续判断。
- 输入波形文件和输出仿真结果应在文件格式与命令参数两层同时隔离，不能只依赖其中一层配置。
- 工程模板需要同时约束器件、顶层实体、VHDL 端口、引脚分配和 VWF 信号，才能降低生成文件之间不一致的风险。
- 面向旧版工具时，应把格式兼容性、GUI 兜底步骤和已知失败条件写入文档。
- 在没有自动化测试和真实环境日志时，不能把“代码已实现”表述成“已验证上线”。

## 可复用经验

### 技术经验

- 通过 `subprocess.run` 统一调用外部 EDA CLI，捕获 stdout、stderr、返回码和超时状态，再转换为 JSON 结果。
- 用数据类和模板函数生成固定关联的工程文件，避免在多个工具函数中重复拼接 QPF、QSF、VHDL 和 VWF 内容。
- 使用文件模式扫描和错误/警告提取，将 Quartus 的报告、编程文件和仿真文件聚合到同一个结果结构中。

### 工程经验

- 通过 `QUARTUS_BIN` 环境变量隔离本机安装路径，配置样例只保存路径格式，不把机器环境写死到业务代码中。
- 为外部命令设置超时，并将超时转换为明确的返回码和错误信息，避免 MCP 调用永久等待。
- 先识别输入文件，再执行仿真并比较仿真前后的 `.cvwf` 文件集合，便于判断是否产生了新的结果。

### 产品经验

- 将“写 VHDL、设波形、配引脚、编译、看报告”拆分成 AI 可调用的工具，更贴近初学者的实际操作链路。
- 对旧版 Quartus 的 VWF 兼容性保留人工 GUI 处理路径，可以降低自动化失败时的阻塞程度。

### 协作与交付经验

- 为 Codex、Claude Code 和 Claude Desktop 分别提供配置样例，降低不同宿主接入本地 MCP 的成本。
- README 同时说明环境变量、安装命令、超时配置、常见问题和工具列表，便于交付给没有 Quartus 命令行经验的使用者。

```

## 6. 可复用经验库

### 技术决策

- 决策：使用 Python 标准库实现轻量 MCP server，并通过 stdio 处理 JSON-RPC 消息。
- 背景：项目需要让 Codex 和 Claude Code 调用本机 Quartus 工具，同时项目的 `pyproject.toml` 声明运行时依赖为空。
- 取舍：减少运行时依赖和部署复杂度，但需要自行维护 JSON-RPC 消息处理、参数 schema 和错误包装。
- 可迁移经验：当目标能力主要来自本地 CLI，且宿主已经支持 MCP 时，轻量 stdio server 可以作为低依赖集成层；但应补充协议级测试。

- 决策：用模板函数集中生成 QPF、QSF、VHDL 和 VWF。
- 背景：Quartus 工程的器件、顶层实体、VHDL 端口、引脚和波形信号之间存在强关联。
- 取舍：模板集中维护便于保持一致，但当前模板主要围绕一个计数器示例和一块 MAX II 器件，通用性有限。
- 可迁移经验：生成多文件工程时，应让共享参数从同一个数据入口传递到所有相关文件，并对不同器件和顶层接口预留扩展点。

- 决策：将仿真结果保存为 CVWF，并关闭输入 VWF 回写。
- 背景：Git 提交 `b9366da` 明确记录了防止 Quartus VWF overwrite 的问题。
- 取舍：保留原始输入激励文件的稳定性，同时增加了对 CVWF 文件查找、复制和兼容性处理的逻辑。
- 可迁移经验：涉及“输入配置文件”和“工具生成结果”的自动化流程时，应明确文件所有权，避免结果覆盖输入。

### 问题解决

- 问题：VWF 仿真结果可能回写到输入波形文件，导致输入激励被输出结果污染。
- 定位过程：Git 历史显示问题对应的专门修复提交；代码差异显示仿真入口从 `quartus_sh --flow compile_and_simulate` 改为 `quartus_sim`，并增加了 VWF 文件定位和 overwrite 参数。
- 解决方案：使用 `--simulation_results_format=CVWF`、`--overwrite_waveform=off`，在 QSF 中关闭 `SIM_OVERWRITE_WAVEFORM_INPUTS`，并移除 LED 输出 transition。
- 最终结果：代码和 README 都明确记录了新的仿真流程；仓库没有提供真实 Quartus 执行日志，因此只能确认实现了修复逻辑，不能确认所有版本均已实机验证。

- 问题：AI 工具需要知道 Quartus 编译是否成功，以及生成了哪些报告和编程文件。
- 定位过程：`compile_project` 和 `summarize_quartus_reports` 分别处理命令返回码、stdout/stderr、错误/警告以及结果文件扫描。
- 解决方案：使用 `CommandResult` 结构化保存命令结果，使用文件模式扫描收集报告和编程文件，并限制读取报告尾部内容。
- 最终结果：MCP 工具能够返回统一的 JSON 结构供宿主继续处理；自动化测试和真实报告样本待补充。

### 工程方法

- 使用了什么方法：先用 Git 提交定位问题演进，再对照 README、入口代码、CLI 封装、模板和配置样例建立证据链。
- 为什么有效：Git 差异说明了问题何时出现以及修复涉及哪些文件，源代码则能验证功能是否真正落在工具参数和返回结构上。
- 适合什么场景：适合整理个人项目经历、审查自动化工具的真实能力边界，以及避免把 README 宣称误写成已验证结果。

- 使用了什么方法：将“事实”“基于代码的推断”和“待补充信息”分开记录。
- 为什么有效：可以同时保留项目亮点和证据边界，避免在没有用户数、性能数据或上线记录时编造结果。
- 适合什么场景：适合技术作品集、简历素材整理、面试准备和项目交接文档。

### 失败或不足

- 哪些地方没有完成：仓库没有发现自动化测试、CI/CD 工作流、Dockerfile 或真实 Quartus 编译日志；项目是否正式上线、是否有用户和是否完成开发板下载验证也未记录。
- 哪些方案存在局限：当前模板固定面向 MAX II `EPM1270T144C5` 和计数器示例；README 也承认旧版 Quartus 的 VWF 可能需要 GUI 打开并保存一次；server 异常返回中包含 traceback，生产环境可能需要更谨慎的错误暴露策略。
- 下次会如何改进：增加 mock Quartus CLI 和模板测试，补充真实 Quartus 版本兼容性测试，区分可恢复错误与配置错误，记录端到端验证日志，并在确认个人职责和用户反馈后补全作品集信息。

## 7. 可用于简历的短句

- 使用 Python 实现 stdio JSON-RPC MCP server，提供 5 个 Quartus 工具，建立 Codex 与 Claude Code 的本地调用入口。
- 封装 `quartus_sh --flow compile`，统一返回编译状态、错误警告、报告文件和 `.sof` 等编程文件路径。
- 设计 QPF、QSF、VHDL 和 VWF 模板，生成面向 MAX II `EPM1270T144C5` 的 16 位计数器示例工程。
- 针对 Quartus VWF 回写问题改用 `quartus_sim`、CVWF 输出和关闭 overwrite，保持输入波形文件与仿真结果分离。
- 实现 Quartus 安装检测，检查 7 个命令行工具并读取 `quartus_sh` 版本信息，减少本地环境配置排查成本。
- 构建报告汇总逻辑，扫描 `.rpt`、`.summary`、`.log`、`.sof`、`.pof` 和 `.cvwf` 并提取错误与警告。
- 编写 Codex、Claude Code 和 Claude Desktop 配置样例与常见问题文档，完成本地 MCP 的接入说明。

## 8. 可用于面试的追问与回答素材

- 问题：为什么选择 Python 标准库和 stdio MCP server？回答要点：项目的核心工作是调用本地 Quartus CLI，`pyproject.toml` 中运行时依赖为空；stdio 方式适合由 Codex 或 Claude Code 启动本地进程，但协议处理和测试需要自行维护。
- 问题：项目中最难的问题是什么？回答要点：Git 中有专门提交记录的 VWF 回写问题；解决方案是切换到 `quartus_sim`，使用 CVWF 输出、关闭 waveform overwrite，并同步修改 QSF 与 VWF 模板。
- 问题：你具体负责了哪些部分？回答要点：Git 记录可确认同一作者完成了代码初始上传、文档更新和仿真修复；可以说明参与了 server、CLI 封装、模板和文档，但是否独立完成、团队规模和职责边界需要补充确认。
- 问题：如何保证生成工程的多个文件保持一致？回答要点：在 `templates.py` 集中生成 QPF、QSF、VHDL 和 VWF，共享项目名、顶层实体、器件、引脚和仿真参数；局限是当前模板仍以单一器件和计数器示例为主。
- 问题：如果重新做一次，你会如何改进？回答要点：先补充 mock CLI、模板和 JSON-RPC 测试，再做真实 Quartus 版本矩阵与端到端日志；同时细化错误类型、减少 traceback 暴露，并确认多器件和多工程类型需求。

## 9. 待确认信息

- 准确的项目经历起止时间；Git 只能确认主要提交发生在 2026-05-26。
- 准确个人角色、是否独立开发、团队规模以及与他人的职责边界。
- 是否在真实 Quartus II 9.1 或其他版本中完成过编译、VWF 仿真和开发板下载验证。
- 是否正式上线、是否有真实用户或课程使用，以及是否收到用户反馈。
- 用户数量、成功率、性能、节省时间或成本等量化指标；当前仓库没有这些数据。
- GitHub 地址是否允许公开展示，以及是否存在可公开的 Demo 或演示链接。
- 是否需要支持除 MAX II `EPM1270T144C5` 和计数器之外的器件、工程类型或波形场景。
- 是否允许在个人作品集公开展示项目截图、README 中的 BUPT 场景和仓库链接。
