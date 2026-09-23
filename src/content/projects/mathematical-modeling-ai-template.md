---
id: "mathematical-modeling-ai-template"
title: "数学建模竞赛求解与论文生成模板"
period: "2026-06"
type: "AI 工作流模板"
summary: "面向数学建模竞赛的赛题读取、分题求解、论文生成与编译流程模板。"
stack:
  - "Markdown"
  - "Python 数据分析流程"
  - "LaTeX / XeLaTeX"
  - "Claude Code Skill"
featured: true
coverDoodle: "/images/doodles/browser-plant.png"
githubUrl: ""
demoUrl: ""
sortOrder: 43
isPublished: true
---

## Overview

这是一个面向数学建模竞赛的 AI 工作流模板，将赛题与数据读取、求解计划、分题分析、Python 数据处理、LaTeX 论文撰写和 PDF 编译组织成可复用流程。当前目录已接入一个零售销售预测题目和数据，但具体模型、指标和论文结论尚未完成。

## My Role

AI 工作流与交付模板设计，覆盖目录结构、求解规范、论文章节拆分和编译检查流程。

## Core Features

- 规划从 PDF/DOCX 赛题和结构化数据到论文编译的完整流程。
- 按竞赛问题拆分求解计划、Python 脚本、图表输出和 LaTeX 章节。
- 规定先计算后绘图，并把缺失值、时间泄露、模型不收敛和过拟合纳入异常预案。
- 使用统一的 LaTeX 表格、中文字体、参考文献和排版检查规范论文输出。

## Tech Stack

- Markdown、CSV、Python 数据分析流程
- LaTeX / XeLaTeX
- Claude Code Skill 工作流

## Challenges & Solutions

- 题目同时包含统计、预测、评价和策略建议：按问题建立独立求解目录，并将论文拆分为问题级和章节级文件。
- 零售预测存在时间泄露风险：文档规定按时间划分训练集和测试集，但当前实例尚未实现模型验证。
- 数据、图表、论文和 PDF 容易脱节：统一文件命名、图表位置、章节引用和编译检查。

## Result

项目已形成模板目录、工作流规范、题目输入、CSV 数据和论文骨架，生成的 PDF 仍包含占位内容。当前应定位为模板开发与示例输入阶段，尚无可引用的模型精度、未来预测或竞赛结果。
