// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XEnv } from "./XEnv"

/**
 * 字符串工具类。
 */
export namespace XString {
    /**
     * 空字符串。
     */
    export const Empty: string = ""

    /**
     * 检查字符串是否为空。
     * 
     * @param str 字符串实例。
     * @returns 字符串是否为空。
     */
    export function IsNullOrEmpty(str: string): boolean {
        return !str || str === ""
    }

    /**
     * 字符串索引。
     * 
     * @param str 字符串实例。
     * @param _of 特征字符串。
     * @returns 子字符串的索引。
     */
    export function IndexOf(str: string, _of: string): number {
        if (IsNullOrEmpty(str) == false && IsNullOrEmpty(_of) == false) {
            return str.indexOf(_of)
        }
        return -1
    }

    /**
     * 上一字符串索引。
     * 
     * @param str 字符串实例。
     * @param _of 特征字符串。
     * @returns 子字符串的最后一个索引。
     */
    export function LastIndexOf(str: string, _of: string): number {
        if (IsNullOrEmpty(str) == false && IsNullOrEmpty(_of) == false) {
            return str.lastIndexOf(_of)
        }
        return -1
    }

    /**
     * 子字符串。
     * 
     * @param str 字符串实例。
     * @param from 开始位置（闭）。
     * @param to 终止索引（开）。
     * @returns 子字符串。
     */
    export function Sub(str: string, from: number, to: number): string {
        if (IsNullOrEmpty(str) == false) {
            return str.substring(from, to)
        }
        return null
    }

    /**
     * 字符串替换。
     * 
     * @param str 字符串实例。
     * @param from 源字符串。
     * @param to 目标字符串。
     * @returns 替换后的字符串。
     */
    export function Replace(str: string, from: string, to: string): string {
        if (IsNullOrEmpty(str) == false && IsNullOrEmpty(from) == false) {
            return str.replace(new RegExp(from, "gm"), to)
        }
        return str
    }

    /**
     * 字符串裁剪。
     * 
     * @param str 字符串实例。
     * @returns 裁剪后的字符串。
     */
    export function Trim(str: string): string {
        if (IsNullOrEmpty(str) == false) {
            return str.trim()
        }
        return str
    }

    /**
     * 字符串分割。
     * 
     * @param str 字符串实例。
     * @param _of 特征字符串。
     * @returns 子字符串数组。
     */
    export function Split(str: string, _of: string): string[] {
        if (IsNullOrEmpty(str) == false && IsNullOrEmpty(_of) == false) {
            return str.split(_of)
        }
        return null
    }

    /**
     * 字符串是否包含。
     * 
     * @param str 字符串实例。
     * @param _of 特征字符串。
     * @returns 字符串是否包含子字符串。
     */
    export function Contains(str: string, _of: string): boolean {
        return IndexOf(str, _of) >= 0
    }

    /**
     * 字符串头部匹配。
     * 
     * @param str 字符串实例。
     * @param _of 特征字符串。
     * @returns 字符串是否以子字符串开头。
     */
    export function StartsWith(str: string, _of: string): boolean {
        return IndexOf(str, _of) == 0
    }

    /**
     * 字符串尾部匹配。
     * 
     * @param str 字符串实例。
     * @param _of 特征字符串。
     * @returns 字符串是否以子字符串结尾。
     */
    export function EndsWith(str: string, _of: string): boolean {
        if (IsNullOrEmpty(str) == false && IsNullOrEmpty(_of) == false) {
            return str.endsWith(_of)
        }
        return false
    }

    /**
     * 字符串格式化。
     * 
     * @param fmt 格式字符串。
     * @param args 格式化参数。
     * @returns 格式化后的字符串。
     */
    export function Format(fmt: string, ...args: Array<any>): string {
        if (fmt) {
            if (args.length > 0) {
                let index = 0
                const doReplace = (rplc: any) => {
                    if (rplc == null) rplc = "undefined"
                    if (rplc instanceof Array) {
                        for (let i = 0; i < rplc.length; i++) {
                            let temp = rplc[i]
                            doReplace(temp)
                        }
                    } else {
                        let str: string
                        let reg = new RegExp("({)" + index + "(})", "g")
                        if (typeof (rplc) == "string") {
                            str = <string>rplc
                        } else {
                            str = rplc.toString()
                        }
                        fmt = fmt.replace(reg, str)
                        index++
                    }
                }
                for (let i = 0; i < args.length; i++) {
                    let temp = args[i]
                    if (temp != null) {
                        doReplace(temp)
                    }
                }
            }
            return fmt
        } else {
            return null
        }
    }

    /**
     * 字符串转Buffer。
     * 
     * @param str 字符串实例。
     * @returns Buffer。
     */
    export function ToBuffer(str: string): ArrayBuffer {
        const encoder = new TextEncoder()
        return encoder.encode(str).buffer
    }

    /**
     * Buffer转字符串。
     * 
     * @param buf Buffer。
     * @returns 字符串。
     */
    export function FromBuffer(buf: ArrayBuffer): string {
        const decoder = new TextDecoder()
        if (XEnv.IsCocos && XEnv.IsCocos) return decoder.decode(new Uint8Array(buf))
        else return decoder.decode(buf)
    }

    /**
     * 对字符串进行base64编码。
     * 
     * @param str 字符串实例。
     * @returns Base64编码后的字符串。
     */
    export function ToBase64(str: string): string {
        if (XEnv.IsBrowser || XEnv.IsCocos) {
            let utf8Encoder = new TextEncoder()
            let binaryData = utf8Encoder.encode(str)
            let binaryArray = Array.from(binaryData)
            let binaryString = ""
            for (let byte of binaryArray) {
                binaryString += String.fromCharCode(byte)
            }
            return btoa(binaryString)
        } else {
            return Buffer.from(str).toString("base64")
        }
    }

    /**
     * 对字符串进行base64解码。
     * 
     * @param str Base64编码后的字符串。
     * @returns 解码后的字符串。
     */
    export function FromBase64(str: string): string {
        if (XEnv.IsBrowser || XEnv.IsCocos) {
            let binaryString = atob(str)
            let binaryArray = new Uint8Array(binaryString.length)
            for (let i = 0; i < binaryString.length; i++) {
                binaryArray[i] = binaryString.charCodeAt(i)
            }
            let utf8Decoder = new TextDecoder()
            return utf8Decoder.decode(binaryArray)
        } else {
            return Buffer.from(str, "base64").toString("utf8")
        }
    }

    /**
     * 版本号转数字。
     * 
     * @param version 版本号。
     * @returns 版本号数字。
     */
    export function ToVersion(version: string): number {
        if (IsNullOrEmpty(version)) {
            return -1
        }
        let strs: Array<string> = version.split(".")
        if (strs == null || strs.length == 0) {
            return -1
        } else {
            let finalVersion = 0
            let large = (strs.length - 1) * 2
            for (let i = 0; i < strs.length; i++) {
                let singleVersion = parseInt(strs[i])
                if (i == 0) {
                    finalVersion = (large == 0 ? singleVersion : singleVersion * (Math.pow(10, large)))
                } else if (i == strs.length - 1) {
                    finalVersion += singleVersion
                } else {
                    finalVersion += singleVersion * (Math.pow(10, large - i * 2))
                }
            }
            return finalVersion
        }
    }

    /**
     * 数字转版本号。
     * 
     * @param version 版本号数字。
     * @returns 版本号字符串。
     */
    export function FromVersion(version: number): string {
        let finalVersion = ""
        let str = version.toString()
        let singleVersion = 0
        for (let i = str.length - 1; i >= 0;) {
            let length = (i - 1) >= 0 ? 2 : 1
            let from = i - length + 1
            singleVersion = parseInt(str.substr(from, length))
            finalVersion = singleVersion + finalVersion
            if (i > 1) {
                finalVersion = "." + finalVersion
            }
            i -= 2
        }
        return finalVersion
    }
}