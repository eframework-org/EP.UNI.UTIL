//-------------------------------------------------//
//                    MIT License                  //
//    Copyright (c) 2025 EFramework Organization   //
//          SEE LICENSE.md FOR MORE DETAILS        //
//-------------------------------------------------//

/**
 * Time utility class.
 *
 * 时间工具类。
 */
export namespace XTime {
    /**
     * Formats a date.
     *
     * 时间格式化。
     *
     * @param date date instance. 日期实例。
     * @param fmt format (yyyy-MM-dd hh:mm:ss.SSS). 格式化（yyyy-MM-dd hh:mm:ss.SSS）。
     *
     * @returns formatted date string. 格式化后的日期字符串。
     */
    export function Format(date: Date, fmt: string): string {
        if (!date || !fmt) return ""

        const map = {
            "M": date.getMonth() + 1, // 月份
            "d": date.getDate(),      // 日
            "h": date.getHours(),     // 小时
            "m": date.getMinutes(),   // 分
            "s": date.getSeconds(),   // 秒
            "q": Math.floor((date.getMonth() + 3) / 3), // 季度
            "S": date.getMilliseconds() // 毫秒
        }

        const yearMatch = fmt.match(/y+/)
        if (yearMatch) fmt = fmt.replace(yearMatch[0], (date.getFullYear() + "").slice(-yearMatch[0].length))

        for (const key in map) {
            let reg = new RegExp(`(${key}+)`)
            if (reg.test(fmt)) {
                const value = map[key]
                const replacement = (key.length === 1) ? value.toString() : value.toString().padStart(key.length, '0')
                fmt = fmt.replace(reg, replacement)
            }
        }

        return fmt
    }

    /**
     * Gets the timestamp in seconds.
     *
     * 获取时间戳（秒）。
     *
     * @returns timestamp in seconds. 时间戳（秒）。
     */
    export function GetTimestamp(): number {
        return Date.parse(new Date().toString()) / 1000
    }

    /**
     * Gets the timestamp in milliseconds.
     *
     * 获取时间戳（毫秒）。
     *
     * @returns timestamp in milliseconds. 时间戳（毫秒）。
     */
    export function GetMilliSecond(): number {
        return new Date().valueOf()
    }
}