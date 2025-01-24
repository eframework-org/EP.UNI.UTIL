//-------------------------------------------------//
//                    MIT License                  //
//    Copyright (c) 2025 EFramework Organization   //
//          SEE LICENSE.md FOR MORE DETAILS        //
//-------------------------------------------------//

import { XEnv } from "./XEnv"
import { XLog } from "./XLog"
import { XObject } from "./XObject"
import { XTime } from "./XTime"

/**
 * Test utility class.
 *
 * 测试工具类。
 */
export namespace XTest {
    var mIsJest: boolean
    function getIsJest(): boolean {
        if (mIsJest == null) mIsJest = typeof jest != "undefined"
        return mIsJest
    }

    /**
     * Jest environment.
     *
     * Jest环境。
     */
    export const IsJest: boolean = getIsJest()

    var mCurrent: string = "Unknown"

    /**
     * Defines a test.
     *
     * 定义一个测试。
     *
     * @param name test name. 测试名称。
     * @param fn test function. 测试函数。
     */
    export function Test(name: string, fn: () => Promise<void>) {
        if (IsJest) {
            test(name, async () => {
                mCurrent = name
                const time = XTime.GetMilliSecond()
                XLog.Debug(`[${name}]: Unit test start, runtime is ${XObject.Key(XEnv.RuntimeType, XEnv.Runtime)}, platform is ${XObject.Key(XEnv.PlatformType, XEnv.Platform)}`)
                await fn()
                XLog.Debug(`[${name}]: Unit test passed, elapsed ${XTime.GetMilliSecond() - time}ms`)
            })
        } else {
            return async () => {
                mCurrent = name
                const time = XTime.GetMilliSecond()
                XLog.Debug(`[${name}]: Unit test start, runtime is ${XObject.Key(XEnv.RuntimeType, XEnv.Runtime)}, platform is ${XObject.Key(XEnv.PlatformType, XEnv.Platform)}`)
                await fn()
                XLog.Debug(`[${name}]: Unit test passed, elapsed ${XTime.GetMilliSecond() - time}ms`)
            }
        }
    }

    /**
     * Creates an expectation.
     *
     * 测试期望。
     *
     * @param obj object to test. 测试对象。
     * @param tag optional tag. 可选标签。
     * @param args optional arguments. 可选参数。
     *
     * @returns Assert instance. 断言实例。
     */
    export function Expect(obj: any, tag?: string, ...args: any[]): Assert {
        return new Assert(obj, tag, ...args)
    }

    /**
     * Test assertion class.
     *
     * 测试断言类。
     */
    export class Assert {
        public Obj: any
        public Tag: string
        public Args: any[]
        public IsNot: boolean = false
        private mJObj: any

        /**
         * Constructor.
         *
         * 构造函数。
         *
         * @param obj object to test. 测试对象。
         * @param tag optional tag. 可选标签。
         * @param args optional arguments. 可选参数。
         */
        constructor(obj: any, tag?: string, ...args: any[]) {
            this.Tag = tag ? tag : "Untagged"
            this.Args = args
            if (IsJest) this.mJObj = expect(obj)
            this.Obj = obj
        }

        /**
         * Negates the assertion.
         *
         * 否定断言。
         *
         * @returns Assert instance. 断言实例。
         */
        public get Not(): Assert {
            this.IsNot = !this.IsNot
            return this
        }

        /**
         * Checks if the object is equal to the expected value.
         *
         * 检查对象是否等于预期值。
         *
         * @param expected expected value. 预期值。
         *
         * @returns whether the assertion passed. 断言是否通过。
         */
        public ToEqual(expected: any): boolean {
            return this.ToBe(expected)
        }

        /**
         * Checks if the object is equal to the expected value.
         *
         * 检查对象是否等于预期值。
         *
         * @param expected expected value. 预期值。
         *
         * @returns whether the assertion passed. 断言是否通过。
         */
        public ToBe(expected: any): boolean {
            let ret = false
            let expr = `[${mCurrent}][${this.Tag}][ToBe]: ${this.Obj} ${this.IsNot ? "!=" : "=="} ${expected}`
            if (IsJest) {
                ret = this.IsNot ? this.mJObj.not.toBe(expected) : this.mJObj.toBe(expected)
            } else {
                ret = this.IsNot ? this.Obj != expected : this.Obj == expected
            }
            if (ret == false) throw new Error(`${expr} was not expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}${this.Args && this.Args.length > 0 ? this.Args : ""}`)
            XLog.Debug(`${expr} was expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}`, ...this.Args)
            return ret
        }

        /**
         * Checks if the object is greater than the expected value.
         *
         * 检查对象是否大于预期值。
         *
         * @param expected expected value. 预期值。
         *
         * @returns whether the assertion passed. 断言是否通过。
         */
        public ToBeGreaterThan(expected: number): boolean {
            let ret = false
            let expr = `[${mCurrent}][${this.Tag}][ToBeGreaterThan]: ${this.Obj} ${this.IsNot ? "<=" : ">"} ${expected}`
            if (IsJest) {
                ret = this.IsNot ? this.mJObj.not.toBeGreaterThan(expected) : this.mJObj.toBeGreaterThan(expected)
            } else {
                ret = this.IsNot ? this.Obj <= expected : this.Obj > expected
            }
            if (ret == false) throw new Error(`${expr} was not expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}${this.Args && this.Args.length > 0 ? this.Args : ""}`)
            XLog.Debug(`${expr} was expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}`, ...this.Args)
            return ret
        }

        /**
         * Checks if the object is greater than or equal to the expected value.
         *
         * 检查对象是否大于或等于预期值。
         *
         * @param expected expected value. 预期值。
         *
         * @returns whether the assertion passed. 断言是否通过。
         */
        public ToBeGreaterThanOrEqual(expected: number): boolean {
            let ret = false
            let expr = `[${mCurrent}][${this.Tag}][ToBeGreaterThanOrEqual]: ${this.Obj} ${this.IsNot ? "<" : ">="} ${expected}`
            if (IsJest) {
                ret = this.IsNot ? this.mJObj.not.toBeGreaterThanOrEqual(expected) : this.mJObj.toBeGreaterThanOrEqual(expected)
            } else {
                ret = this.IsNot ? this.Obj < expected : this.Obj >= expected
            }
            if (ret == false) throw new Error(`${expr} was not expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}${this.Args && this.Args.length > 0 ? this.Args : ""}`)
            XLog.Debug(`${expr} was expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}`, ...this.Args)
            return ret
        }

        /**
         * Checks if the object is less than the expected value.
         *
         * 检查对象是否小于预期值。
         *
         * @param expected expected value. 预期值。
         *
         * @returns whether the assertion passed. 断言是否通过。
         */
        public ToBeLessThan(expected: number): boolean {
            let ret = false
            let expr = `[${mCurrent}][${this.Tag}][ToBeLessThan]: ${this.Obj} ${this.IsNot ? ">=" : "<"} ${expected}`
            if (IsJest) {
                ret = this.IsNot ? this.mJObj.not.toBeLessThan(expected) : this.mJObj.toBeLessThan(expected)
            } else {
                ret = this.IsNot ? this.Obj >= expected : this.Obj < expected
            }
            if (ret == false) throw new Error(`${expr} was not expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}${this.Args && this.Args.length > 0 ? this.Args : ""}`)
            XLog.Debug(`${expr} was expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}`, ...this.Args)
            return ret
        }

        /**
         * Checks if the object is less than or equal to the expected value.
         *
         * 检查对象是否小于或等于预期值。
         *
         * @param expected expected value. 预期值。
         *
         * @returns whether the assertion passed. 断言是否通过。
         */
        public ToBeLessThanOrEqual(expected: number): boolean {
            let ret = false
            let expr = `[${mCurrent}][${this.Tag}][ToBeLessThanOrEqual]: ${this.Obj} ${this.IsNot ? ">" : "<="} ${expected}`
            if (IsJest) {
                ret = this.IsNot ? this.mJObj.not.toBeLessThanOrEqual(expected) : this.mJObj.toBeLessThanOrEqual(expected)
            } else {
                ret = this.IsNot ? this.Obj > expected : this.Obj <= expected
            }
            if (ret == false) throw new Error(`${expr} was not expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}${this.Args && this.Args.length > 0 ? this.Args : ""}`)
            XLog.Debug(`${expr} was expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}`, ...this.Args)
            return ret
        }

        /**
         * Checks if the object is null.
         *
         * 检查对象是否为 null。
         *
         * @returns whether the assertion passed. 断言是否通过。
         */
        public ToBeNull(): boolean {
            let ret = false
            let expr = `[${mCurrent}][${this.Tag}][ToBeNull]: ${this.Obj} ${this.IsNot ? "!=" : "=="} ${"null"}`
            if (IsJest) {
                ret = this.IsNot ? this.mJObj.not.toBeNull() : this.mJObj.toBeNull()
            } else {
                ret = this.IsNot ? this.Obj != null : this.Obj == null
            }
            if (ret == false) throw new Error(`${expr} was not expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}${this.Args && this.Args.length > 0 ? this.Args : ""}`)
            XLog.Debug(`${expr} was expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}`, ...this.Args)
            return ret
        }

        /**
         * Checks if the object is undefined.
         *
         * 检查对象是否为 undefined。
         *
         * @returns whether the assertion passed. 断言是否通过。
         */
        public ToBeUndefined(): boolean {
            let ret = false
            let expr = `[${mCurrent}][${this.Tag}][ToBeUndefined]: ${this.Obj} ${this.IsNot ? "!=" : "=="} ${"undefined"}`
            if (IsJest) {
                ret = this.IsNot ? this.mJObj.not.toBeUndefined() : this.mJObj.toBeUndefined()
            } else {
                ret = this.IsNot ? this.Obj != undefined : this.Obj == undefined
            }
            if (ret == false) throw new Error(`${expr} was not expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}${this.Args && this.Args.length > 0 ? this.Args : ""}`)
            XLog.Debug(`${expr} was expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}`, ...this.Args)
            return ret
        }

        /**
         * Checks if the object is NaN.
         *
         * 检查对象是否为 NaN。
         *
         * @returns whether the assertion passed. 断言是否通过。
         */
        public ToBeNaN(): boolean {
            let ret = false
            let expr = `[${mCurrent}][${this.Tag}][ToBeNaN]: ${this.Obj} ${this.IsNot ? "!=" : "=="} ${"NaN"}`
            if (IsJest) {
                ret = this.IsNot ? this.mJObj.not.toBeNaN() : this.mJObj.toBeNaN()
            } else {
                ret = this.IsNot ? !isNaN(this.Obj) : isNaN(this.Obj)
            }
            if (ret == false) throw new Error(`${expr} was not expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}${this.Args && this.Args.length > 0 ? this.Args : ""}`)
            XLog.Debug(`${expr} was expected${this.Args && this.Args.length > 0 ? ", Args: " : "."}`, ...this.Args)
            return ret
        }
    }
}