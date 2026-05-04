---
id: "study-monitor"
title: "Study Monitor"
type: "Computer Vision System"
summary: "一个基于摄像头、YOLO 检测和本地 LLM 解释的学习状态分析原型，用于记录和展示学习行为状态。"
stack:
  - YOLO
  - Ollama
  - Qwen
  - Vue
  - Python
featured: true
coverDoodle: "/images/doodles/phone.png"
githubUrl: ""
demoUrl: ""
sortOrder: 30
isPublished: true
---

## Overview

项目尝试把视觉检测结果转化为更容易理解的学习状态记录，用于观察专注、离席和行为变化。

## My Role

- 视觉检测流程设计
- 状态展示页面实现
- 本地模型解释流程整理
- 实验记录与展示材料编写

## Core Features

- 摄像头画面采集
- 学习行为检测
- 本地 LLM 解释
- 状态历史展示

## Tech Stack

- YOLO
- Ollama
- Qwen
- Vue
- Python

## Challenges & Solutions

- 检测结果和真实学习状态存在偏差：把检测结果作为辅助信号展示，并保留状态解释和人工判断空间。
- 本地模型调用链路较长：拆分检测、解释和展示流程，先保证单步结果可观察，再组合为完整原型。

## Result

完成了可演示的学习状态监测 MVP，能够展示计算机视觉与本地大模型结合的应用思路。
