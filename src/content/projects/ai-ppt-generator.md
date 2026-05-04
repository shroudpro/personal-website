---
id: "ai-ppt-generator"
title: "AI PPT Generator"
type: "AI Web Application"
summary: "一个面向论文和文档的 AI 演示文稿生成系统，支持内容解析、页面规划和可编辑 PPTX 输出。"
stack:
  - Vue3
  - FastAPI
  - LLM API
  - PPTX
featured: true
coverDoodle: "/images/doodles/browser-plant.png"
githubUrl: ""
demoUrl: ""
sortOrder: 10
isPublished: true
---

## Overview

该项目面向需要快速整理论文、报告和长文档的用户，将原始内容解析为演示结构，再生成可继续编辑的页面结果。

## My Role

- 产品流程设计
- 前端页面实现
- AI 生成流程设计
- 可编辑输出方案设计

## Core Features

- 文档内容解析
- 页面结构规划
- 版式生成
- PPTX / 可编辑输出

## Tech Stack

- Vue3
- FastAPI
- LLM API
- PPTX

## Challenges & Solutions

- 生成结果结构不稳定：使用固定字段 schema 约束输出，并在渲染层加入兜底规则。
- 设计感和可编辑性冲突：将视觉元素拆分为文本、形状、图片和背景层，避免整页图片化。

## Result

完成了从文档输入、页面规划到可编辑输出的流程，可用于课程展示、项目答辩和后续产品化验证。
