# NetLearn Interactive

[English](README.md) | [中文](README_zh.md)

一个通过模拟和交互式示例学习和可视化网络协议的交互式Web应用程序。

## 概述

NetLearn Interactive通过视觉演示和交互式模拟帮助用户理解基本网络协议。该应用程序涵盖了以下主题：

- **TCP协议**：可视化TCP三次握手和四次挥手过程
- **HTTP协议**：通过交互式示例了解HTTP请求和响应流程
- **DNS协议**：学习域名如何通过DNS查询过程解析
- **网络分层模型**：交互式探索OSI和TCP/IP分层模型，了解每层的功能、协议和数据单元(PDU)

## 使用的技术

- React 19
- TypeScript
- Vite
- React Router
- Styled Components
- Framer Motion
- React Icons

## 安装

1. 克隆仓库：
   ```bash
   git clone https://github.com/zym9863/netlearn-interactive.git
   cd netlearn-interactive
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

## 使用方法

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 构建生产版本：
   ```bash
   npm run build
   ```

3. 预览生产构建：
   ```bash
   npm run preview
   ```

## 功能特点

- **交互式可视化**：展示网络协议如何运作的动态动画
- **协议模拟**：协议操作的逐步演示
- **响应式设计**：适用于桌面和移动设备
- **现代UI**：干净、直观的界面，流畅的动画效果

## 项目结构

```
src/
├── assets/       # 静态资源，如图片
├── components/   # 可复用UI组件
│   ├── protocols/   # 协议特定组件
│   │   ├── tcp/     # TCP协议组件
│   │   ├── http/    # HTTP协议组件
│   │   ├── dns/     # DNS协议组件
│   │   └── models/  # 网络模型组件
├── pages/        # 每个路由的页面组件
│   ├── HomePage.tsx
│   ├── TCPPage.tsx
│   ├── HTTPPage.tsx
│   ├── DNSPage.tsx
│   └── NetworkModelsPage.tsx
├── styles/       # 全局样式和主题
└── utils/        # 实用工具函数
```

## 贡献

欢迎贡献！请随时提交Pull Request。

## 许可证

该项目采用MIT许可证 - 详情请参阅LICENSE文件。

## 致谢

- 使用[React](https://react.dev/)和[Vite](https://vitejs.dev/)构建
- 图标来自[React Icons](https://react-icons.github.io/react-icons/)
- 动画由[Framer Motion](https://www.framer.com/motion/)提供支持
