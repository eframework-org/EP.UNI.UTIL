//-------------------------------------------------//
//                    MIT License                  //
//    Copyright (c) 2025 EFramework Organization   //
//          SEE LICENSE.md FOR MORE DETAILS        //
//-------------------------------------------------//

/**
 * Utility functions collection.
 *
 * 工具函数集。
 */
export namespace XUtility {
    /**
     * Generates a UUID.
     *
     * 生成UUID。
     *
     * @returns UUID. UUID。
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
     * Generates execution options.
     *
     * 执行选项。
     *
     * @param cwd working directory. 运行目录。
     *
     * @returns execution options. 执行选项。
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
     * Search for executable file.
     * 
     * 查找可执行文件。
     * 
     * @param cmd executable file name. 可执行文件名。
     * @param extras extra search paths. 附加搜索路径。
     * 
     * @returns executable file path. 可执行文件路径。
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
     * Generates a random number within a range.
     *
     * 随机数。
     *
     * @param min minimum value (inclusive). 最小值（闭）。
     * @param max maximum value (inclusive). 最大值（闭）。
     *
     * @returns random number. 随机数。
     */
    export function RandomRange(min: number, max: number) { return parseInt((Math.random() * (max - min + 1) + min).toString(), 10) }
}