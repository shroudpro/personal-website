---
id: "coolearn"
title: "Coolearn 智能学习平台"
period: "2026-10"
type: "AI 应用开发学习平台"
summary: "面向中文 AI 应用开发学习的 React 平台，覆盖知识图谱、课程、刷题、薄弱点诊断与复习。"
stack:
  - "React 19"
  - "React Router 7"
  - "Vite 8"
  - "Tailwind CSS 3"
  - "React Flow"
featured: false
coverDoodle: "/images/doodles/browser-plant.png"
githubUrl: "https://github.com/shroudpro/Coolearn"
demoUrl: ""
sortOrder: 1
isPublished: true
---

## Overview

Coolearn 是一个中文 AI 应用开发学习平台的浏览器端单页应用，将知识图谱、课程、题目练习、学习进度和复习流程组织在同一条学习路径中。仓库包含 8 个知识领域、464 道静态题目和 169 个有序课程主题。

## My Role

React 前端开发，围绕学习页面、课程与题库交互、学习进度和复习模块构建浏览器端体验。

## Core Features

- 浏览知识图谱，并从知识节点跳转到对应课程主题。
- 按课程序列学习内容，支持简版和详版课程内容。
- 按领域、题型和难度筛选题目并进行练习。
- 汇总答题记录与主题掌握度，定位薄弱主题并生成自测入口。
- 查看错题复习、能力图表和项目路线图状态。
- 使用浏览器 `localStorage` 保存课程与练习进度。

## Tech Stack

- JavaScript、React 19、React Router 7、Vite 8
- Tailwind CSS 3、React Flow（`@xyflow/react`）、Recharts
- 浏览器 `localStorage`、Storage Event 与自定义事件

## Challenges & Solutions

- 知识图谱节点名与课程主题名存在别名差异：通过按领域维护的别名映射解析主题，并统一生成课程跳转地址。
- 多个页面需要同步同一份学习进度：将本地状态读写封装在 Hook 中，并通过 Storage Event、自定义事件、窗口聚焦和页面可见性变化刷新状态。
- 项目没有配套账号或数据库服务：当前使用浏览器本地存储保存进度，适合单机使用，但不支持云端备份和跨设备同步。

## Result

仓库包含知识图谱、课程学习、题库练习、差距分析、错题复习和能力评估等前端模块。面试公司数据与 BOSS 后端链路尚不完整；线上部署和真实用户效果没有可验证记录。
