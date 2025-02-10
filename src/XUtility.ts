// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

/**
 * 工具函数集。
 */
export namespace XUtility {
    /**
     * 生成 UUID。
     * 
     * @returns UUID。
     */
    export function GenUUID() {
        let date = new Date().getTime()
        let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            let r = (date + Math.random() * 16) % 16 | 0
            date = Math.floor(date / 16)
            return (c == "x" ? r : (r & 0x3 | 0x8)).toString(16)
        })
        return uuid
    }

    /**
     * 生成执行选项。
     * 
     * @param cwd 运行目录。
     * @returns 执行选项。
     */
    export function ExecOpt(cwd: string): any {
        return {
            encoding: "utf8",
            timeout: 0,
            maxBuffer: 1024 * 1024 * 1024,
            killSignal: "SIGTERM",
            cwd: cwd,
            env: process.env
        }
    }

    /**
     * 查找可执行文件。
     * 
     * @param cmd 可执行文件名。
     * @param extras 附加搜索路径。
     * @returns 可执行文件路径。
     */
    export function FindBin(cmd: string, ...extras: string[]) {
        const path = require("path")
        const fs = require("fs")

        const names = process.platform == "win32" ? [cmd + ".exe", cmd + ".bat"] : [cmd]

        const env = process.env.PATH || ""
        const paths = env.split(path.delimiter)
        for (const part of paths) {
            for (const name of names) {
                const file = path.join(part, name)
                if (fs.existsSync(file) && fs.statSync(file).isFile()) {
                    return file
                }
            }
        }
        if (extras && extras.length > 0) {
            for (const extra of extras) {
                for (const name of names) {
                    const file = path.join(extra, name)
                    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
                        return file
                    }
                }
            }
        }
        return null
    }

    /**
     * 生成指定范围内的随机数。
     * 
     * @param min 最小值（闭区间）。
     * @param max 最大值（闭区间）。
     * @returns 随机数。
     */
    export function RandomRange(min: number, max: number) {
        return parseInt((Math.random() * (max - min + 1) + min).toString(), 10)
    }
}