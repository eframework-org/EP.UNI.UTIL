//-------------------------------------------------//
//                    MIT License                  //
//    Copyright (c) 2025 EFramework Organization   //
//          SEE LICENSE.md FOR MORE DETAILS        //
//-------------------------------------------------//

import { XEnv } from "./XEnv"

/**
 * String utility class.
 *
 * 字符串工具类。
 */
export namespace XString {
    /**
     * Empty string.
     *
     * 空字符串。
     */
    export const Empty: string = ""

    /**
     * Checks if a string is null or empty.
     *
     * 检查字符串是否为空。
     *
     * @param str string instance. 字符串实例。
     *
     * @returns whether the string is null or empty. 字符串是否为空。
     */
    export function IsNullOrEmpty(str: string): boolean {
        return !str || str === ""
    }

    /**
     * Gets the index of a substring.
     *
     * 字符串索引。
     *
     * @param str string instance. 字符串实例。
     * @param _of feature string. 特征字符串。
     *
     * @returns index of the substring. 子字符串的索引。
     */
    export function IndexOf(str: string, _of: string): number {
        if (IsNullOrEmpty(str) == false && IsNullOrEmpty(_of) == false) {
            return str.indexOf(_of)
        }
        return -1
    }

    /**
     * Gets the last index of a substring.
     *
     * 上一字符串索引。
     *
     * @param str string instance. 字符串实例。
     * @param _of feature string. 特征字符串。
     *
     * @returns last index of the substring. 子字符串的最后一个索引。
     */
    export function LastIndexOf(str: string, _of: string): number {
        if (IsNullOrEmpty(str) == false && IsNullOrEmpty(_of) == false) {
            return str.lastIndexOf(_of)
        }
        return -1
    }

    /**
     * Gets a substring.
     *
     * 子字符串。
     *
     * @param str string instance. 字符串实例。
     * @param from start position (inclusive). 开始位置（闭）。
     * @param to end index (exclusive). 终止索引（开）。
     *
     * @returns substring. 子字符串。
     */
    export function Sub(str: string, from: number, to: number): string {
        if (IsNullOrEmpty(str) == false) {
            return str.substring(from, to)
        }
        return null
    }

    /**
     * Replaces a substring.
     *
     * 字符串替换。
     *
     * @param str string instance. 字符串实例。
     * @param from source string. 源字符串。
     * @param to target string. 目标字符串。
     *
     * @returns replaced string. 替换后的字符串。
     */
    export function Replace(str: string, from: string, to: string): string {
        if (IsNullOrEmpty(str) == false && IsNullOrEmpty(from) == false) {
            return str.replace(new RegExp(from, "gm"), to)
        }
        return str
    }

    /**
     * Trims a string.
     *
     * 字符串裁剪。
     *
     * @param str string instance. 字符串实例。
     *
     * @returns trimmed string. 裁剪后的字符串。
     */
    export function Trim(str: string): string {
        if (IsNullOrEmpty(str) == false) {
            return str.trim()
        }
        return str
    }

    /**
     * Splits a string.
     *
     * 字符串分割。
     *
     * @param str string instance. 字符串实例。
     * @param _of feature string. 特征字符串。
     *
     * @returns array of substrings. 子字符串数组。
     */
    export function Split(str: string, _of: string): string[] {
        if (IsNullOrEmpty(str) == false && IsNullOrEmpty(_of) == false) {
            return str.split(_of)
        }
        return null
    }

    /**
     * Checks if a string contains a substring.
     *
     * 字符串是否包含。
     *
     * @param str string instance. 字符串实例。
     * @param _of feature string. 特征字符串。
     *
     * @returns whether the string contains the substring. 字符串是否包含子字符串。
     */
    export function Contains(str: string, _of: string): boolean {
        return IndexOf(str, _of) >= 0
    }

    /**
     * Checks if a string starts with a substring.
     *
     * 字符串头部匹配。
     *
     * @param str string instance. 字符串实例。
     * @param _of feature string. 特征字符串。
     *
     * @returns whether the string starts with the substring. 字符串是否以子字符串开头。
     */
    export function StartsWith(str: string, _of: string): boolean {
        return IndexOf(str, _of) == 0
    }

    /**
     * Checks if a string ends with a substring.
     *
     * 字符串尾部匹配。
     *
     * @param str string instance. 字符串实例。
     * @param _of feature string. 特征字符串。
     *
     * @returns whether the string ends with the substring. 字符串是否以子字符串结尾。
     */
    export function EndsWith(str: string, _of: string): boolean {
        if (IsNullOrEmpty(str) == false && IsNullOrEmpty(_of) == false) {
            let idx = str.lastIndexOf(_of)
            return idx == str.length - _of.length
        }
        return false
    }

    /**
     * Formats a string.
     *
     * 字符串格式化。
     *
     * @param fmt string format. 字符串格式。
     * @param args format parameters. 格式化参数。
     *
     * @returns formatted string. 格式化后的字符串。
     */
    export function Format(fmt: string, ...args: any[]): string {
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
     * Converts a string to a Buffer.
     *
     * 字符串转Buffer。
     *
     * @param str string instance. 字符串实例。
     *
     * @returns Buffer. Buffer。
     */
    export function ToBuffer(str: string): ArrayBuffer {
        const encoder = new TextEncoder()
        return encoder.encode(str).buffer
    }

    /**
     * Converts a Buffer to a string.
     *
     * Buffer转字符串。
     *
     * @param buf Buffer. Buffer。
     *
     * @returns string. 字符串。
     */
    export function FromBuffer(buf: ArrayBuffer): string {
        const decoder = new TextDecoder()
        if (XEnv.IsCocos && XEnv.IsCocos) return decoder.decode(new Uint8Array(buf))
        else return decoder.decode(buf)
    }

    /**
     * Encodes a string to Base64.
     *
     * 对字符串进行base64编码。
     *
     * @param str string instance. 字符串实例。
     *
     * @returns Base64 encoded string. Base64编码后的字符串。
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
     * Decodes a Base64 string.
     *
     * 对字符串进行base64解码。
     *
     * @param str Base64 encoded string. Base64编码后的字符串。
     *
     * @returns decoded string. 解码后的字符串。
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
     * Converts a version string to a number.
     *
     * 版本号转数字。
     *
     * @param version version string. 版本号。
     *
     * @returns version number. 版本号数字。
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
     * Converts a version number to a string.
     *
     * 数字转版本号。
     *
     * @param version version number. 版本号数字。
     *
     * @returns version string. 版本号字符串。
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