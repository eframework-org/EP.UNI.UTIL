// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XLog } from "./XLog"

/**
 * 事件工具类。
 */
export namespace XEvent {
    /**
     * 事件回调。
     * 
     * @param args 事件参数。
     */
    export type Callback = (...args: any[]) => void

    /**
     * 事件管理。
     */
    export class Manager {
        protected mMultiple: boolean
        protected mCallbacks: Map<number, Callback[]>
        protected mOnces: Map<Callback, boolean>
        protected mBatches: Callback[]

        /**
         * 构造函数。
         * 
         * @param multiple 是否允许多个回调。
         */
        constructor(multiple: boolean = true) {
            this.mMultiple = multiple
            this.mCallbacks = new Map<number, Callback[]>()
            this.mOnces = new Map<Callback, boolean>()
            this.mBatches = []
        }

        /**
         * 清除事件注册。
         */
        public Clear() {
            this.mCallbacks.clear()
            this.mOnces.clear()
            this.mBatches.length = 0
        }

        /**
         * 获取事件回调。
         * 
         * @param eid 事件标识。
         * @returns 事件回调。
         */
        public Get(eid: number): Callback[] | null {
            return this.mCallbacks.get(eid) || null
        }

        /**
         * 注册事件。
         * 
         * @param eid 事件标识。
         * @param callback 回调函数。
         * @param once 回调一次。
         * @returns 是否成功注册。
         */
        public Reg(eid: number, callback: Callback, once: boolean = false): boolean {
            if (callback == null) {
                XLog.Error("XEvent.Manager.Reg: nil callback, eid={0}", eid)
                return false
            }

            let callbacks = this.mCallbacks.get(eid)
            if (!callbacks) {
                callbacks = []
                this.mCallbacks.set(eid, callbacks)
            }

            if (!this.mMultiple && callbacks.length > 1) {
                XLog.Error("XEvent.Manager.Reg: not support multi-register, eid={0}", eid)
                return false
            }

            for (const temp of callbacks) {
                if (temp === callback) return false
            }

            if (once) this.mOnces.set(callback, once)
            callbacks.push(callback)
            return true
        }

        /**
         * 注销事件。
         * 
         * @param eid 事件标识。
         * @param callback 回调函数。
         * @returns 是否成功注销。
         */
        public Unreg(eid: number, callback?: Callback): boolean {
            let ret = false

            if (this.mCallbacks.has(eid)) {
                const callbacks = this.mCallbacks.get(eid)
                if (callback) {
                    if (callbacks.length > 0) {
                        ret = callbacks.some((cb, index) => {
                            if (cb === callback) {
                                callbacks.splice(index, 1)
                                if (this.mOnces.has(callback)) this.mOnces.delete(callback)
                                return true
                            }
                            return false
                        })
                        if (callbacks.length == 0) this.mCallbacks.delete(eid)
                    }
                } else {
                    ret = true
                    for (const cb of callbacks) {
                        if (this.mOnces.has(cb)) this.mOnces.delete(cb)
                    }
                    this.mCallbacks.delete(eid)
                }
            }

            return ret
        }

        /**
         * 通知事件。
         * 
         * @param eid 事件标识。
         * @param args 事件参数。
         */
        public Notify(eid: number, ...args: any[]): void {
            if (this.mCallbacks.has(eid)) {
                const callbacks = this.mCallbacks.get(eid)
                this.mBatches.length = 0
                for (let i = 0; i < callbacks.length;) {
                    const callback = callbacks[i]
                    if (!callback) {
                        callbacks.splice(i, 1)
                    } else {
                        if (this.mOnces.has(callback)) {
                            callbacks.splice(i, 1)
                        } else {
                            i++
                        }
                        this.mBatches.push(callback)
                    }
                }
                for (const callback of this.mBatches) {
                    callback(...args)
                }
                this.mBatches.length = 0
            }
        }
    }
}