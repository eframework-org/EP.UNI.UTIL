// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XObject } from "./XObject"

/**
 * 环境变量命名空间。
 */
export namespace XEnv {
    /**
     * 运行时类型。
     */
    export enum RuntimeType {
        Node,
        Code,
        Cocos,
        Unity,
        Unreal,
        Electron,
        Dom,
    }

    /**
     * 平台类型。
     */
    export enum PlatformType {
        Unknown,
        Windows,
        Linux,
        OSX,
        Android,
        iOS,
        Browser,
    }

    var mRuntime: RuntimeType = null
    function getRuntime(): RuntimeType {
        if (mRuntime == null) {
            if (typeof process !== 'undefined' && !!process.env.VSCODE_PID) {
                mRuntime = RuntimeType.Code
                return mRuntime
            }
            if (typeof cc !== 'undefined') {
                mRuntime = RuntimeType.Cocos
                return mRuntime
            }
            if (typeof CS !== 'undefined') {
                mRuntime = RuntimeType.Unity
                return mRuntime
            }
            if (typeof UE !== 'undefined') {
                mRuntime = RuntimeType.Unity
                return mRuntime
            }
            mRuntime = RuntimeType.Node
        }
        return mRuntime
    }

    var mPlatform: PlatformType = null
    function getPlatform(): PlatformType {
        if (mPlatform == null) {
            if (getRuntime() == RuntimeType.Node) {
                if (process.platform == "win32") mPlatform = PlatformType.Windows
                else if (process.platform == "darwin") mPlatform = PlatformType.OSX
                else if (process.platform == "linux") mPlatform = PlatformType.Linux
                else if (process.platform == "android") mPlatform = PlatformType.Android
                else mPlatform = PlatformType.Unknown
            } else if (getRuntime() == RuntimeType.Cocos) {
                // refer: https://docs.cocos.com/creator/3.8/api/zh/variable/sys?id=Platform
                try {
                    if (cc.sys.isBrowser) mPlatform = PlatformType.Browser
                    else if (cc.sys.platform == cc.sys.Platform.WIN32) mPlatform = PlatformType.Windows
                    else if (cc.sys.platform == cc.sys.Platform.MACOS) mPlatform = PlatformType.OSX
                    else if (cc.sys.platform == cc.sys.Platform.ANDROID) mPlatform = PlatformType.Android
                    else if (cc.sys.platform == cc.sys.Platform.IOS) mPlatform = PlatformType.iOS
                    else mPlatform = PlatformType.Unknown
                } catch (error) { mPlatform = PlatformType.Unknown }
            } else if (getRuntime() == RuntimeType.Unity) {
                const plat = CS.UnityEngine.Application.platform
                const platEnum = CS.UnityEngine.RuntimePlatform
                if (plat == platEnum.WindowsPlayer || plat == platEnum.WindowsEditor) mPlatform = PlatformType.Windows
                else if (plat == platEnum.OSXPlayer || plat == platEnum.OSXEditor) mPlatform = PlatformType.OSX
                else if (plat == platEnum.LinuxPlayer || plat == platEnum.LinuxEditor) mPlatform = PlatformType.Linux
                else if (plat == platEnum.Android) mPlatform = PlatformType.Android
                else if (plat == platEnum.IPhonePlayer) mPlatform = PlatformType.iOS
                else if (plat == platEnum.WebGLPlayer || plat == platEnum.WindowsWebPlayer || plat == platEnum.OSXWebPlayer) mPlatform = PlatformType.Browser
                else mPlatform = PlatformType.Unknown
            }
        }
        return mPlatform
    }

    /**
     * 当前平台类型。
     */
    export const Platform = getPlatform()

    /**
     * 当前运行时类型。
     */
    export const Runtime = getRuntime()

    /**
     * 是否为 Node 或 Code 运行时。
     */
    export const IsNode = getRuntime() == RuntimeType.Node || getRuntime() == RuntimeType.Code

    /**
     * 是否为 VSCode 扩展运行时。
     */
    export const IsCode = getRuntime() == RuntimeType.Code

    /**
     * 是否为 Cocos Creator 运行时。
     */
    export const IsCocos = getRuntime() == RuntimeType.Cocos

    /**
     * 是否为 Unity 运行时。
     */
    export const IsUnity = getRuntime() == RuntimeType.Unity

    /**
     * 是否为 Unreal 运行时。
     */
    export const IsUnreal = getRuntime() == RuntimeType.Unreal

    /**
     * 是否为原生平台。
     */
    export const IsNative = getPlatform() != PlatformType.Browser

    /**
     * 是否为浏览器平台。
     */
    export const IsBrowser = getPlatform() == PlatformType.Browser

    /**
     * 不支持的运行时和平台错误。
     */
    export const Unsupport = new Error(`Unsupported runtime: ${XObject.Key(XEnv.RuntimeType, XEnv.Runtime)} on platform: ${XObject.Key(XEnv.PlatformType, XEnv.Platform)}`)

    const separator = "/"

    /**
     * 规范化给定的路径。
     * 
     * @param path 需要规范化的路径。
     * @returns 规范化后的路径。
     */
    function normalizePath(path: string): string {
        if (typeof path !== "string") throw new TypeError("path must be a string")
        let prefix = ""
        if (path.startsWith("file://")) {
            prefix = "file://"
        } else if (path.startsWith("jar:file://")) {
            prefix = "jar:file://"
        }
        if (prefix != "") {
            path = path.substring(prefix.length)
        }
        path = path.replace(/\\/g, separator)
        const parts = path.split(separator)
        const nparts = []
        for (let i = 0; i < parts.length; i++) {
            let part = parts[i]
            if ((part === "." || part === "")) {
                if (nparts.length == 0) nparts.push(part)
            } else if (part === "..") {
                if (nparts.length > 0) nparts.pop()
            } else nparts.push(part)
        }
        const npath = nparts.join(separator)
        return prefix + npath
    }

    /**
     * 返回给定路径的目录名称。
     * 
     * @param path 需要获取目录名称的路径。
     * @returns 目录名称。
     */
    function directoryName(path: string): string {
        if (path) {
            path = normalizePath(path)
            let idx = path.lastIndexOf(separator)
            if (idx >= 0) path = path.substring(0, idx)
            if (path == "file:/") path += separator
            return path
        }
        return ""
    }

    /**
     * 将多个路径连接成一个。
     * 
     * @param paths 需要连接的路径。
     * @returns 连接后的路径。
     */
    function pathJoin(...paths: string[]) {
        paths = paths.filter(path => typeof path === "string" && path.trim() !== "")
        if (paths.length === 0) return ""
        let ret = paths[0]
        for (let i = 1; i < paths.length; i++) {
            if (!paths[i].startsWith(separator) && !ret.endsWith(separator)) {
                ret += separator
            }
            ret += paths[i]
        }
        return normalizePath(ret)
    }

    /**
     * 检查文件是否存在。
     * 
     * @param file 需要检查的文件路径。
     * @returns 如果文件存在则返回true，否则返回false。
     */
    function hasFile(file: string): boolean {
        if (file) {
            try {
                const stat = require("fs").statSync(file)
                return stat.isFile()
            } catch { }
        }
        return false
    }

    /**
     * 检查目录是否存在。
     * 
     * @param dir 需要检查的目录路径。
     * @returns 如果目录存在则返回true，否则返回false。
     */
    function hasDirectory(dir: string): boolean {
        if (dir) {
            dir = normalizePath(dir)
            if (XEnv.IsNode) {
                try {
                    const stat = require("fs").statSync(dir)
                    return stat.isDirectory()
                } catch { }
            } else if (XEnv.IsNative) {
                if (XEnv.IsCocos) {
                    return jsb.fileUtils.isDirectoryExist(dir)
                } else if (XEnv.IsUnity) {
                    return CS.System.IO.Directory.Exists(dir)
                } else if (XEnv.IsUnreal) {
                    // todo
                }
            } else if (XEnv.IsBrowser) {
                for (let i = 0; i < localStorage.length; i++) {
                    let key = localStorage.key(i)
                    let tdir = directoryName(key)
                    if (tdir == dir || key == dir) return true
                }
            } else throw XEnv.Unsupport
        }
        return false
    }

    /**
     * 创建目录。
     * 
     * @param dir 需要创建的目录路径。
     */
    function createDirectory(dir: string) {
        if (!dir || hasDirectory(dir)) return

        dir = normalizePath(dir)
        if (XEnv.IsNode) {
            if (dir.startsWith("file://") || dir.startsWith("jar:file://")) {
                return
            }
            const fs = require("fs")
            dir = dir.replace(/\\/g, separator)
            const parts = dir.split(separator)
            const nparts = []
            for (let i = 0; i < parts.length; i++) {
                let part = parts[i]
                let sig = false
                if ((part === "." || part === "")) {
                    if (nparts.length == 0) {
                        nparts.push(part)
                        sig = true
                    }
                } else if (part === "..") {
                    if (nparts.length > 0) nparts.pop()
                } else {
                    nparts.push(part)
                    sig = true
                }
                if (sig && nparts.length > 1) {
                    let tmp = nparts.join(separator)
                    if (!hasDirectory(tmp)) {
                        fs.mkdirSync(tmp)
                    }
                }
            }
        } else if (XEnv.IsNative) {
            if (XEnv.IsCocos) {
                jsb.fileUtils.createDirectory(dir)
            } else if (XEnv.IsUnity) {
                CS.System.IO.Directory.CreateDirectory(dir)
            } else if (XEnv.IsUnreal) {
                // todo
            }
        } else if (XEnv.IsBrowser) {
            localStorage.setItem(dir, "")
        } else throw XEnv.Unsupport
    }

    var mDataPath: string
    /**
     * 获取数据路径。
     * 
     * @returns 数据路径。
     */
    function getDataPath(): string {
        if (mDataPath == null) {
            if (XEnv.IsNode) {
                if (typeof jest != "undefined") {
                    mDataPath = process.cwd()
                } else {
                    if (require.main && require.main.filename) {
                        let dir = directoryName(require.main.filename)
                        if (hasFile(pathJoin(dir, "package.json"))) {
                            mDataPath = dir
                        } else {
                            dir = pathJoin(dir, "..")
                            if (hasFile(pathJoin(dir, "package.json"))) {
                                mDataPath = dir
                            }
                        }
                    } else {
                        let err = new Error()
                        if (err.stack) {
                            let lines = err.stack.split("\n")
                            for (let i = 0; i < lines.length; i++) {
                                let line = lines[i]
                                if (line.indexOf(".js") >= 0) {
                                    let strs = line.split("(")
                                    if (strs.length > 1) line = strs[1]
                                    strs = line.split("file:///")
                                    if (strs.length > 1) line = strs[1]
                                    strs = line.split(".js")
                                    let file = strs[0] + ".js"
                                    let dir = directoryName(file)
                                    if (hasFile(pathJoin(dir, "package.json"))) {
                                        mDataPath = dir
                                    } else {
                                        dir = pathJoin(dir, "..")
                                        if (hasFile(pathJoin(dir, "package.json"))) {
                                            mDataPath = dir
                                        }
                                    }
                                }
                                if (mDataPath != null) break
                            }
                        }
                    }
                }

                if (mDataPath == null) {
                    let dir = __dirname
                    if (hasFile(pathJoin(dir, "package.json"))) {
                        mDataPath = dir
                    } else {
                        dir = pathJoin(dir, "..")
                        if (hasFile(pathJoin(dir, "package.json"))) {
                            mDataPath = dir
                        }
                    }
                }

                if (mDataPath == null) mDataPath = "Unknown"
                else mDataPath = pathJoin(mDataPath, "local")
            } else if (XEnv.IsBrowser) {
                mDataPath = "file://"
            } else if (XEnv.IsCocos) {
                mDataPath = pathJoin(jsb.fileUtils.getWritablePath(), "local")
            } else if (XEnv.IsUnity) {
                if (CS.UnityEngine.Application.isEditor) {
                    mDataPath = pathJoin(CS.UnityEngine.Application.dataPath, "..", "Local")
                } else if (CS.UnityEngine.Application.platform == CS.UnityEngine.RuntimePlatform.WindowsPlayer) {
                    mDataPath = pathJoin(CS.UnityEngine.Application.streamingAssetsPath, "..", "Local")
                } else {
                    mDataPath = normalizePath(CS.UnityEngine.Application.persistentDataPath)
                }
            }
            if (mDataPath != "Unknown") {
                if (hasDirectory(mDataPath) == false) createDirectory(mDataPath)
            }
        }
        return mDataPath
    }

    /**
     * 数据路径。
     */
    export const DataPath = getDataPath()

    /**
     * 获取包信息。
     * 
     * @returns 包信息。
     */
    function getPackage(): any {
        if (XEnv.IsNode) {
            const pf = pathJoin(DataPath, "..", "package.json")
            if (hasFile(pf)) {
                try {
                    let str = require("fs").readFileSync(pf)
                    let pkg = JSON.parse(str.toString())
                    return pkg
                } catch (error) { }
            }
        }
    }

    var mProduct: string
    /**
     * 获取产品名称。
     * 
     * @returns 产品名称。
     */
    function getProduct(): string {
        if (mProduct == null) {
            if (XEnv.IsNode) {
                const pkg = getPackage()
                if (pkg) {
                    if (pkg.displayName) mProduct = pkg.displayName
                    else mProduct = pkg.name
                }
            }
            else if (XEnv.IsUnity) mProduct = CS.UnityEngine.Application.productName

            if (mProduct == null) mProduct = "Unknown"
        }
        return mProduct
    }
    /**
     * 产品名称。
     */
    export const Product = getProduct()

    var mAuthor: string
    /**
     * 获取作者名称。
     * 
     * @returns 作者名称。
     */
    function getAuthor(): string {
        if (mAuthor == null) {
            if (XEnv.IsNode) {
                const pkg = getPackage()
                if (pkg) {
                    if (pkg.publisher) mAuthor = pkg.publisher
                    else if (pkg.author) {
                        if (typeof (pkg.author) == "string") mAuthor = pkg.author
                        else mAuthor = pkg.author.name
                    }
                }
            }

            if (mAuthor == null) mAuthor = "Unknown"
        }
        return mAuthor
    }
    /**
     * 作者名称。
     */
    export const Author = getAuthor()

    var mIdentifier: string
    /**
     * 获取标识符。
     * 
     * @returns 标识符。
     */
    export function getIdentifier(): string {
        if (mIdentifier == null) {
            if (XEnv.IsNode) {
                const pkg = getPackage()
                if (pkg) mIdentifier = pkg.name
            }
            else if (XEnv.IsUnity) mIdentifier = CS.UnityEngine.Application.identifier

            if (mIdentifier == null || mIdentifier == "") mIdentifier = "Unknown"
        }
        return mIdentifier
    }
    /**
     * 标识符。
     */
    export const Identifier = getIdentifier()

    var mVersion: string
    /**
     * 获取版本。
     * 
     * @returns 版本。
     */
    function getVersion(): string {
        if (mVersion == null) {
            if (XEnv.IsNode) {
                const pkg = getPackage()
                if (pkg) mVersion = pkg.version
            }
            else if (XEnv.IsUnity) mVersion = CS.UnityEngine.Application.version

            if (mVersion == null) mVersion = "0.0"
        }
        return mVersion
    }

    /**
     * 版本。
     */
    export const Version = getVersion()

    var mDescription: string
    /**
     * 获取描述。
     * 
     * @returns 描述。
     */
    function getDescription(): string {
        if (mDescription == null) {
            if (XEnv.IsNode) {
                const pkg = getPackage()
                if (pkg) mDescription = pkg.description
            }

            if (mDescription == null) mDescription = ""
        }
        return mDescription
    }

    /**
     * 描述。
     */
    export const Description = getDescription()
}