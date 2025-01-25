# EP.UNI.UTIL
[![Version](https://img.shields.io/npm/v/ep.uni.util)](https://www.npmjs.com/package/ep.uni.util)
[![Downloads](https://img.shields.io/npm/dm/ep.uni.util)](https://www.npmjs.com/package/ep.uni.util)  
Package UNI.UTIL provides utility functions such as string, io, time, loom, pool, event, log, etc.  
UNI.UTIL 包提供了诸如字符串、IO、时间、Loom、对象池、事件、日志等实用功能。

| Runtime/Platform | Windows | Linux | OSX | Android | iOS | Browser |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Node | ✅ | ✅ | ✅ | ➖ | ➖ | ➖ |
| Code | ✅ | ✅ | ✅ | ➖ | ➖ | ➖ |
| Cocos | ✅ | ❓ | ❓ | ❓ | ❓ | ❓ |
| Unity | ✅ | ❓ | ❓ | ✅ | ❓ | ❓ |
| Unreal | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Electron | ❌ | ❌ | ❌ | ➖ | ➖ | ➖ |
| Dom | ➖ | ➖ | ➖ | ➖ | ➖ | ❓ |
- ✅: Supported&Tested   ➖: Ignored
- ❓: Developing/Testing ❌: Planing

## Manual | 使用手册
- Install/安装: npm install ep.uni.util

## FAQ | 常见问题
- XFile.Unzip need 7z or WinRAR. 解压功能需要安装 7z 或 WinRAR。
  - Windows
  ```
  WinRAR: https://www.win-rar.com/
  7-Zip: https://www.7-zip.org/
  ```
  - OSX
  ```
  brew install p7zip
  ```

## Changelog | 版本记录
### 0.0.1 - 0.0.2
- [0.0.2]Fix XFile.Unzip error. 修复 XFile.Unzip 功能错误。
- [0.0.1]Initial commit. 首次提交。

## Refer | 参考
- Cocos Native: https://docs.cocos.com/creator/api/zh/namespace/native.fileUtils
- Browser fs: https://github.com/zen-fs/core

## Developer | 开发者
### Developing | 开发流程
- 当前工程: npm link（链接至全局）
- 目标工程: 
  - npm link ep.uni.util（链接本地包）
  - packege.json -> dependencies: "ep.uni.util": "$version",（添加包引用）
  - import { TestAll } from "ep.uni.util/test"（导入并执行）
  - Cocos Creator: Developer/Cache/Clear Code Cache（重构以生效）
- 注意事项:
  - Typescript不允许循环引用，注意模块间的依赖关系。
  - Jest在OSX上解析ts模块导入有问题，故使用tsconfig.jest.json覆盖module选项为CommonJS。

### Publishing | 发布流程
- Trigger [workflow](https://github.com/eframework-org/EP.UNI.UTIL/actions/workflows/publish.yml) to publish.
- 触发 [工作流](https://github.com/eframework-org/EP.UNI.UTIL/actions/workflows/publish.yml) 以发布。
