//-------------------------------------------------//
//                    MIT License                  //
//    Copyright (c) 2025 EFramework Organization   //
//          SEE LICENSE.md FOR MORE DETAILS        //
//-------------------------------------------------//

import { XEnv } from "./XEnv"
import { XString } from "./XString"
import { XTime } from "./XTime"

/**
 * Log utility class.
 *
 * 日志工具类。
 */
export namespace XLog {
    /**
     * Log levels.
     *
     * 日志等级。
     * RFC5424 log standard, including structured data format.
     * Specifies eight severity levels for log messages, indicating the severity or urgency of the recorded event.
     */
    export enum LogLevel {
        /** Emergency (0): System is unusable, typically used for catastrophic failures. 紧急（0）：系统不可用，通常用于灾难性故障。 */
        Emergency = 0,

        /** Alert (1): Action must be taken immediately, indicating a situation that needs immediate attention. 警报（1）：必须立即采取行动，指示需要立即注意的情况。 */
        Alert = 1,

        /** Critical (2): Critical conditions, indicating severe faults that need immediate attention. 严重（2）：严重条件，指示需要立即注意的严重故障。 */
        Critical = 2,

        /** Error (3): Error conditions, indicating errors that should be resolved. 错误（3）：错误条件，指示应该解决的错误。 */
        Error = 3,

        /** Warning (4): Warning conditions, indicating potential issues that may lead to errors if not addressed. 警告（4）：警告条件，指示潜在问题，如果不解决可能会导致错误。 */
        Warn = 4,

        /** Notice (5): Normal but significant conditions, indicating noteworthy events that are not necessarily problematic. 通知（5）：正常但重要的情况，指示值得注意但不一定有问题的事件。 */
        Notice = 5,

        /** Information (6): Informational messages, used for general information about system operations. 信息（6）：信息消息，用于系统操作的一般信息。 */
        Info = 6,

        /** Debug (7): Debug-level messages, used for debugging and troubleshooting purposes. 调试（7）：调试级别的消息，用于调试和故障排除目的的消息。 */
        Debug = 7,
    }

    function anisBrush(color: string) {
        const pre = "\x1b["
        const reset = "\x1b[0m"
        return (text: string) => pre + color + "m" + text + reset
    }

    const mAnsiBrushes: Array<(text: string) => string> = [
        anisBrush("1;39"), // Emergency          black
        anisBrush("1;36"), // Alert              cyan
        anisBrush("1;35"), // Critical           magenta
        anisBrush("1;31"), // Error              red
        anisBrush("1;33"), // Warn               yellow
        anisBrush("1;32"), // Notice             green
        anisBrush("1;30"), // Info               grey
        anisBrush("1;34"), // Debug              blue
    ]

    function unityBrush(color: string) {
        return (text: string) => `<color=${color}><b>${text}</b></color>`
    }

    const mUnityBrushes: Array<(text: string) => string> = [
        unityBrush("black"), // Emergency
        unityBrush("cyan"), // Alert
        unityBrush("magenta"), // Critical
        unityBrush("red"), // Error
        unityBrush("yellow"), // Warn
        unityBrush("green"), // Notice
        unityBrush("grey"), // Info
        unityBrush("blue"), // Debug
    ]

    function htmlBrush(color: string) {
        return (text: string) => `<p style="color: ${color};><b>${text}</b></p>`
    }

    const mHtmlBrushes: Array<(text: string) => string> = [
        htmlBrush("black"), // Emergency
        htmlBrush("cyan"), // Alert
        htmlBrush("magenta"), // Critical
        htmlBrush("red"), // Error
        htmlBrush("yellow"), // Warn
        htmlBrush("grey"), // Notice
        htmlBrush("green"), // Info
        htmlBrush("blue"), // Debug
    ]

    const mTags: Array<string> = [
        "[M]",
        "[A]",
        "[C]",
        "[E]",
        "[W]",
        "[N]",
        "[I]",
        "[D]",
    ]

    /**
     * Log channel (VSCode).
     *
     * 日志管道（VSCode）。
     */
    var mChannel: any = null

    /**
     * Panic output.
     *
     * 异常输出。
     *
     * @param exception exception information. 异常信息。
     * @param extras additional information. 附加信息。
     */
    export function Panic(exception: Error, extras?: string) {
        console.error(exception, extras)
    }

    /**
     * Emergency (0): System is unusable, typically used for catastrophic failures.
     *
     * 紧急（0）：系统不可用，通常用于灾难性故障。
     *
     * @param data log content. 日志内容。
     * @param args format parameters. 格式参数。
     */
    export function Emergency(data: any, ...args: any[]) {
        Print(data, LogLevel.Emergency, args)
    }

    /**
     * Alert (1): Action must be taken immediately, indicating a situation that needs immediate attention.
     *
     * 警报（1）：必须立即采取行动，指示需要立即注意的情况。
     *
     * @param data log content. 日志内容。
     * @param args format parameters. 格式参数。
     */
    export function Alert(data: any, ...args: any[]) {
        Print(data, LogLevel.Alert, args)
    }

    /**
     * Critical (2): Critical conditions, indicating severe faults that need immediate attention.
     *
     * 严重（2）：严重条件，指示需要立即注意的严重故障。
     *
     * @param data log content. 日志内容。
     * @param args format parameters. 格式参数。
     */
    export function Critical(data: any, ...args: any[]) {
        Print(data, LogLevel.Critical, args)
    }

    /**
     * Error (3): Error conditions, indicating errors that should be resolved.
     *
     * 错误（3）：错误条件，指示应该解决的错误。
     *
     * @param data log content. 日志内容。
     * @param args format parameters. 格式参数。
     */
    export function Error(data: any, ...args: any[]) {
        Print(data, LogLevel.Error, args)
    }

    /**
     * Warning (4): Warning conditions, indicating potential issues that may lead to errors if not addressed.
     *
     * 警告（4）：警告条件，指示潜在问题，如果不解决可能会导致错误。
     *
     * @param data log content. 日志内容。
     * @param args format parameters. 格式参数。
     */
    export function Warn(data: any, ...args: any[]) {
        Print(data, LogLevel.Warn, args)
    }

    /**
     * Notice (5): Normal but significant conditions, indicating noteworthy events that are not necessarily problematic.
     *
     * 通知（5）：正常但重要的情况，指示值得注意但不一定有问题的事件。
     *
     * @param data log content. 日志内容。
     * @param args format parameters. 格式参数。
     */
    export function Notice(data: any, ...args: any[]) {
        Print(data, LogLevel.Notice, args)
    }

    /**
     * Information (6): Informational messages, used for general information about system operations.
     *
     * 信息（6）：信息消息，用于系统操作的一般信息。
     *
     * @param data log content. 日志内容。
     * @param args format parameters. 格式参数。
     */
    export function Info(data: any, ...args: any[]) {
        Print(data, LogLevel.Info, args)
    }

    /**
     * Debug (7): Debug-level messages, used for debugging and troubleshooting purposes.
     *
     * 调试（7）：调试级别的消息，用于调试和故障排除目的的消息。
     *
     * @param data log content. 日志内容。
     * @param args format parameters. 格式参数。
     */
    export function Debug(data: any, ...args: any[]) {
        Print(data, LogLevel.Debug, args)
    }

    const mIsUnityEditor: boolean = XEnv.IsUnity ? CS.UnityEngine.Application.isEditor : false
    const mUnityLogRegex = /at ([a-zA-Z0-9#$._ ]+ \()?([^\n\r\*\"\|\<\>]+(.js|.cjs|.mjs|.ts|.mts))\:([0-9]+)\:([0-9]+)\)?/g

    function genUnityLink(trace: string[]) {
        for (let i = 0; i < trace.length; i++) {
            mUnityLogRegex.lastIndex = 0 // 此处未考虑多线程的情况，是否有该使用场景待论证后补充
            const match = mUnityLogRegex.exec(trace[i])
            if (!match) continue
            const path = match[2], line = match[4] ?? "0", column = match[5] ?? "0"
            const search = `${path}:${line}:${column}`
            const npath = path.replace(/\\\\/g, "/").replace(/\\/g, "/")
            const nsearch = `${npath}:${line}:${column}`
            trace[i] = trace[i].replace(search, `<a href="${npath}" line="${line}" column="${column}">${nsearch}</a>`)
        }
    }

    /**
     * Handles log.
     *
     * 处理日志。
     *
     * @param fmt log format. 日志格式。
     * @param level log level. 日志等级。
     * @param args format parameters. 格式化参数。
     */
    export function Print(fmt: any, level: LogLevel, ...args: Array<any>) {
        try {
            if (!(fmt instanceof Boolean) && fmt) {
                const tm = XTime.Format(new Date(), "MM/dd hh:mm:ss.SSS")
                const fstr = `${typeof fmt == "string" ? XString.Format(fmt, args) : fmt}`
                if (XEnv.IsBrowser || XEnv.IsCocos) {
                    // VSCode Debug Console 和 Cocos Preview Editor不支持 ANSI 转义
                    // 浏览器支持 ANSI 转义
                    // 但是为了统一化，对level不作着色处理
                    const lstr = `[${tm}] ${mTags[level]} ${fstr}`
                    if (level <= LogLevel.Error) console.error(lstr)
                    else console.info(lstr)
                } else if (XEnv.IsCode) {
                    // VSCode Output Channel 不支持 ANSI 转义
                    const lstr = `[${tm}] ${mTags[level]} ${fstr}`
                    if (mChannel == null) {
                        const vscode = require("vscode")
                        mChannel = vscode.window.createOutputChannel(XEnv.Product, { log: true })
                    }
                    if (level <= LogLevel.Error) mChannel.error(lstr)
                    else mChannel.info(lstr)
                } else if (XEnv.IsNode) {
                    const lstr = `[${tm}] ${mAnsiBrushes[level](mTags[level])} ${fstr}`
                    if (level <= LogLevel.Error) console.error(lstr)
                    else console.info(lstr)
                } else if (XEnv.IsUnity) {
                    let lstr = `[${tm}] ${mUnityBrushes[level](mTags[level])} ${fstr}`
                    if (mIsUnityEditor) {
                        const trace: string[] = new globalThis.Error().stack?.replace(/\r\n/g, "\n").split("\n").slice(2)
                        if (trace && trace.length > 0) {
                            genUnityLink(trace)
                            lstr += "\n" + trace.join("\n")
                        }
                    }
                    if (level <= LogLevel.Error) CS.UnityEngine.Debug.LogError(lstr)
                    else CS.UnityEngine.Debug.Log(lstr)
                } else if (XEnv.IsUnreal) {
                    // todo
                }
            }
        } catch (error) { }
    }

    /**
     * Gets stack trace information.
     *
     * 获取堆栈信息。
     *
     * @param stack stack level. 堆栈层级。
     * @param err error message. 错误信息。
     *
     * @returns stack trace information. 堆栈信息。
     */
    export function Trace(stack?: number, err?: string): string {
        const trace: string[] = new globalThis.Error(err).stack?.replace(/\r\n/g, "\n").split("\n").slice(2 + (stack != null ? stack : 0))
        if (trace && trace.length > 0) {
            return trace.join("\n")
        }
        return ""
    }
}