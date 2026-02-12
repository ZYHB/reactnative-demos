# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Expo Router 的 React Native 项目，使用文件路由（file-based routing）和 TypeScript 构建。项目支持 iOS、Android 和 Web 平台，并启用了新架构（New Architecture）。

## 开发命令

### 启动开发服务器
```bash
npm start          # 启动 Expo 开发服务器
npm run android    # 在 Android 模拟器/设备上运行
npm run ios        # 在 iOS 模拟器/设备上运行
npm run web        # 在 Web 浏览器中运行
```

### 代码检查
```bash
npm run lint       # 运行 ESLint 检查代码质量
```

### 重置项目
```bash
npm run reset-project  # 将现有代码移动到 app-example/，创建空白 app/ 目录
```

### 安装依赖
```bash
npm install        # 安装项目依赖
```

## 架构说明

### 文件路由（Expo Router）
项目使用 Expo Router 的文件路由系统：
- `app/_layout.tsx` - 根布局，包含 Stack 导航和主题配置
- `app/(tabs)/` - 底部标签页路由组，包含 `_layout.tsx` 定义标签配置
- `app/modal.tsx` - 模态窗口页面示例
- 路由文件放在 `app/` 目录下，自动生成导航结构

### 主题系统
项目实现了完整的亮色/暗色主题支持：
- `constants/theme.ts` - 定义 light 和 dark 模式的颜色和字体
- `hooks/use-color-scheme.ts` - 检测当前设备的颜色方案（自动/亮色/暗色）
- `hooks/use-theme-color.ts` - 获取当前主题下的颜色
- `components/themed-text.tsx` 和 `components/themed-view.tsx` - 主题感知的组件

### 路径别名
项目配置了 `@/*` 路径别名，指向项目根目录。例如：
- `@/components/themed-text` 引用 `components/themed-text`
- `@/constants/theme` 引用 `constants/theme`

### 组件结构
- `components/` - 可复用组件
  - `themed-text.tsx` / `themed-view.tsx` - 主题感知的基础组件
  - `haptic-tab.tsx` - 带触觉反馈的标签按钮
  - `parallax-scroll-view.tsx` - 视差滚动容器
  - `ui/` - UI 基础组件（如图标符号）
- `hooks/` - 自定义 React Hooks
  - `use-color-scheme.ts` - 颜色方案检测
  - `use-theme-color.ts` - 主题颜色获取
- `constants/` - 常量定义（主题颜色、字体等）

### 启用的功能
- **New Architecture**: 启用了 React Native 的新架构（`newArchEnabled: true`）
- **Typed Routes**: 启用了类型化路由实验性功能（`typedRoutes: true`）
- **React Compiler**: 启用了 React 编译器实验性功能（`reactCompiler: true`）

## 技术栈
- **Expo SDK 54** - React Native 开发框架
- **Expo Router** - 文件系统路由
- **React Navigation** - 底部标签导航
- **TypeScript** - 类型检查
- **React Native Reanimated** - 高性能动画
- **expo-haptics** - 触觉反馈
