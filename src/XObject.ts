//-------------------------------------------------//
//                    MIT License                  //
//    Copyright (c) 2025 EFramework Organization   //
//          SEE LICENSE.md FOR MORE DETAILS        //
//-------------------------------------------------//

/**
 * 对象工具类。
 */
export namespace XObject {
    /**
     * 钩子映射。
     */
    const mHooks: any = {}

    const XObjectThis = "__xobject_this"

    /**
     * 函数this实例绑定器。
     * 
     * @returns 装饰器函数。
     */
    export function This(): (target: any, propertyKey: string) => void {
        return function (target, propertyKey) {
            target[XObjectThis] = target[XObjectThis] || new Array()
            target[XObjectThis].push(propertyKey)
        }
    }

    /**
     * 基础类型。
     */
    export class Base {
        constructor() {
            const othis = this.constructor.prototype[XObjectThis]
            if (othis) {
                for (let i = 0; i < othis.length; i++) {
                    let key = othis[i]
                    let value = this[key]
                    if (value && typeof (value) == "function") {
                        this[key] = value.bind(this)
                    }
                }
            }
        }
    }

    /**
     * 检查对象是否为值类型。
     * 
     * @param obj 对象实例。
     * @returns 对象是否为值类型。
     */
    export function IsValue(obj: any): boolean {
        if (obj == null) return false
        else {
            if (typeof (obj) == "number") return true
            else if (typeof (obj) == "string") return true
            else if (typeof (obj) == "boolean") return true
            else return false
        }
    }

    /**
     * 检查对象是否为引用类型。
     * 
     * @param obj 对象实例。
     * @returns 对象是否为引用类型。
     */
    export function IsObject(obj: any): boolean {
        if (obj == null || IsValue(obj) || IsFunction(obj)) {
            return false
        } else {
            return true
        }
    }

    /**
     * 检查对象是否为函数类型。
     * 
     * @param obj 对象实例。
     * @returns 对象是否为函数类型。
     */
    export function IsFunction(obj: any): boolean {
        if (obj == null) {
            return false
        } else if (IsValue(obj)) {
            return false
        } else if (typeof (obj) == "function") {
            if (obj.prototype != null && obj.prototype.constructor == obj) return false
            return true
        }
        return false
    }

    /**
     * 检查对象是否为类型。
     * 
     * @param obj 类型实例。
     * @returns 对象是否为类型。
     */
    export function IsClass(obj: any): boolean {
        if (obj == null) {
            return false
        } else if (IsValue(obj)) {
            return false
        } else if (typeof (obj) == "function") {
            if (obj.prototype != null && obj.prototype.constructor == obj) return true
        }
        return false
    }

    /**
     * 获取对象中某个值的键。
     * 
     * @param obj 对象实例。
     * @param value 值。
     * @returns 值的键。
     */
    export function Key(obj: any, value: any): string {
        if (obj != null && value != null) {
            for (let k in obj) {
                if (obj[k] == value) {
                    return k
                }
            }
        }
        return null
    }

    /**
     * 获取对象中某个键的值。
     * 
     * @param obj 对象实例。
     * @param key 键。
     * @returns 键的值。
     */
    export function Value(obj: any, key: string): any {
        if (obj != null && key != null) {
            let r = obj[key]
            if (r != null) return r
            if (IsClass(obj)) return obj.prototype[key]
        }
        return null
    }

    /**
     * 反射调用函数。
     * 
     * @param obj 对象实例。
     * @param key 键名称。
     * @param args 参数。
     * @returns 函数调用的结果。
     */
    export function Invoke(obj: any, key: string, ...args: any[]) {
        if (obj != null && key != null) {
            let func = obj[key]
            if (func != null && typeof (func) == "function") {
                return func.apply(obj, args)
            }
        }
    }

    /**
     * 对象克隆。
     * 
     * @param obj 对象实例。
     * @param exclude 忽略字段。
     * @returns 克隆的对象。
     */
    export function Clone<T>(obj: any, ...exclude: Array<string>): T {
        if (obj == null || typeof obj !== "object") return obj

        let nobj: any = null
        if (Array.isArray(obj)) nobj = []
        else {
            nobj = {}
            const proto = Object.getPrototypeOf(obj)
            if (proto) Object.setPrototypeOf(nobj, proto)
        }
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (exclude.includes(key)) continue
                const value = obj[key]
                nobj[key] = (typeof value === "object" && value !== null) ? Clone(value, ...exclude) : value
            }
        }

        return nobj
    }

    /**
     * 对象实例哈希。
     * 
     * @param obj 对象实例。
     * @returns 哈希码。
     */
    export function HashCode(obj: any): number {
        let hash = 0
        if (obj == null) return hash
        if (typeof obj === "boolean") return obj ? 1 : 0
        if (typeof obj === "number") hash = Math.floor(obj)
        if (typeof obj === "string") {
            for (let i = 0; i < obj.length; i++) {
                const chr = obj.charCodeAt(i)
                hash = ((hash << 5) - hash) + chr
                hash |= 0
            }
        }

        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                hash = ((hash << 5) - hash) + HashCode(obj[i])
                hash |= 0
            }
        }

        if (typeof obj === "object") {
            const keys = Object.keys(obj).sort()
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]
                const keyHash = HashCode(key)
                const valueHash = HashCode(obj[key])
                hash = ((hash << 5) - hash) + keyHash
                hash |= 0
                hash = ((hash << 5) - hash) + valueHash
                hash |= 0
            }
        }

        return Math.abs(hash)
    }

    /**
     * 函数注入。
     * 
     * @param obj 实例/类型。
     * @param from 源函数名。
     * @param to 目标函数。
     * @returns 原始函数。
     */
    export function Hook(obj: any, from: string, to: Function) {
        let ret = null
        let err = null
        if (obj != null && to != null && from) {
            let hook = mHooks[obj]
            if (hook == null) {
                hook = {}
                mHooks[obj] = hook
            }
            if (!hook[from]) {
                ret = XObject.Value(obj, from)
                if (ret != null && typeof (ret) == "function") {
                    if (XObject.IsClass(obj)) obj.prototype[from] = to
                    else obj[from] = to
                    hook[from] = ret
                } else {
                    err = "hook failed caused by nil or invalid target."
                }
            } else {
                err = "hook failed caused by multiple hook."
            }
        } else {
            err = "hook failed caused by invalid args."
        }
        if (err) console.error(err)
        return ret
    }

    /**
     * 函数恢复。
     * 
     * @param obj 实例/类型。
     * @param from 源函数名。
     * @returns 原始函数。
     */
    export function Unhook(obj: any, from: string) {
        let ret = null
        let err = null
        if (obj != null && from) {
            let hook = mHooks[obj]
            if (hook) {
                ret = hook[from]
                if (ret != null && typeof (ret) == "function") {
                    if (XObject.IsClass(obj)) obj.prototype[from] = ret
                    else delete obj[from]
                } else {
                    err = "unhook failed caused by nil or invalid target."
                }
                delete hook[from]
                let sig = true
                for (let _ in hook) { sig = false; break }
                if (sig) {
                    delete mHooks[obj] // release references
                }
            } else {
                err = "unhook failed caused by nil hook map."
            }
        } else {
            err = "unhook failed caused by invalid args."
        }
        if (err) console.error(err)
        return ret
    }
}