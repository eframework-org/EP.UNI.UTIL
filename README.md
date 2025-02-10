# EP.UNI.UTIL
[![Version](https://img.shields.io/npm/v/ep.uni.util)](https://www.npmjs.com/package/ep.uni.util)
[![Downloads](https://img.shields.io/npm/dm/ep.uni.util)](https://www.npmjs.com/package/ep.uni.util)  
UNI.UTIL 是一个轻量级、跨平台的 TypeScript 工具库，专注于提供统一的 API 接口，支持在 Node.js、浏览器、Unity 和 Cocos 等多种环境下运行。

## 功能特性

- 🚀 **跨平台**: 统一的 API 在不同环境下保持一致的行为
- 📦 **模块化**: 独立的功能模块，按需引入
- 🔧 **类型安全**: 完整的 TypeScript 类型定义
- 🧪 **测试覆盖**: 内置测试框架，支持 Jest 集成

### 核心模块

- **XCollect**: 集合操作工具，提供数组/列表的增删改查、排序等功能
- **XEnv**: 环境检测工具，识别运行时环境、平台特性
- **XEvent**: 事件系统，支持同步/异步事件处理
- **XFile**: 文件操作工具，跨平台文件系统操作
- **XLog**: 日志工具，支持多级别、多目标输出
- **XObject**: 对象工具，提供对象操作、类型判断、函数绑定等
- **XString**: 字符串工具，字符串处理、编码转换、格式化等
- **XTest**: 测试框架，支持 Jest 和独立运行两种模式
- **XTime**: 时间工具，时间格式化、时间戳转换等
- **XUtility**: 通用工具，UUID生成、进程执行、随机数等

### 平台支持

| Runtime/Platform | Windows | Linux | OSX | Android | iOS | Browser |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Node | ✅ | ✅ | ✅ | ➖ | ➖ | ➖ |
| Code | ✅ | ✅ | ✅ | ➖ | ➖ | ➖ |
| Cocos | ✅ | ❓ | ❓ | ❓ | ❓ | ❓ |
| Unity | ✅ | ❓ | ❓ | ✅ | ❓ | ❓ |
| Unreal | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Electron | ❌ | ❌ | ❌ | ➖ | ➖ | ➖ |
| Dom | ➖ | ➖ | ➖ | ➖ | ➖ | ❓ |
- ✅: 已支持    ➖: 不适用
- ❓: 开发中    ❌: 计划中

## 操作手册

### 1. 前置条件
- Windows 环境需要安装 [7-Zip](https://www.7-zip.org/) 或 [WinRAR](https://www.win-rar.com/)
- OSX 环境需要安装 p7zip: `brew install p7zip`

### 2. 安装类库
```bash
npm install ep.uni.util
```

### 3. 快速开始
```typescript
import { XString, XTime, XLog } from 'ep.uni.util';

// 字符串处理
const str = XString.Format("Hello {0}!", "World"); // "Hello World!"

// 时间格式化
const now = new Date();
const formatted = XTime.Format(now, "yyyy-MM-dd hh:mm:ss");

// 日志输出
XLog.Info("应用启动于: {0}", formatted);
```

## 常见问题

如有问题，请参考 [问题反馈](CONTRIBUTING.md#问题反馈)。

### 1. XFile.Unzip 功能无法使用？
请确保已安装所需的[解压工具](#1-前置条件)

## 项目信息

- [更新记录](CHANGELOG.md)
- [贡献指南](CONTRIBUTING.md)
- [许可证](LICENSE)
