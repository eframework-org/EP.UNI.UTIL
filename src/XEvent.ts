//-------------------------------------------------//
//                    MIT License                  //
//    Copyright (c) 2025 EFramework Organization   //
//          SEE LICENSE.md FOR MORE DETAILS        //
//-------------------------------------------------//

import { XLog } from "./XLog"

/**
 * Event utility class.
 *
 * 事件工具类。
 */
export namespace XEvent {
    /**
     * Event callback.
     *
     * 事件回调。
     *
     * @param args event arguments. 事件参数。
     */
    export type Callback = (...args: any[]) => void

    /**
     * Event management.
     *
     * 事件管理。
     */
    export class Manager {
        protected mMultiple: boolean
        protected mCallbacks: Map<number, Callback[]>
        protected mOnces: Map<Callback, boolean>
        protected mBatches: Callback[]

        /**
         * Constructor.
         *
         * 构造函数。
         *
         * @param multiple whether multiple callbacks are allowed. 是否允许多个回调。
         */
        constructor(multiple: boolean = true) {
            this.mMultiple = multiple
            this.mCallbacks = new Map<number, Callback[]>()
            this.mOnces = new Map<Callback, boolean>()
            this.mBatches = []
        }

        /**
         * Clears event registrations.
         *
         * 清除事件注册。
         */
        public Clear() {
            this.mCallbacks.clear()
            this.mOnces.clear()
            this.mBatches.length = 0
        }

        /**
         * Gets event callbacks.
         *
         * 获取事件回调。
         *
         * @param eid event identifier. 事件标识。
         *
         * @returns event callbacks. 事件回调。
         */
        public Get(eid: number): Callback[] | null {
            return this.mCallbacks.get(eid) || null
        }

        /**
         * Registers an event.
         *
         * 注册事件。
         *
         * @param eid event identifier. 事件标识。
         * @param callback callback function. 回调函数。
         * @param once callback once. 回调一次。
         *
         * @returns whether registration was successful. 是否成功注册。
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
         * Unregisters an event.
         *
         * 注销事件。
         *
         * @param eid event identifier. 事件标识。
         * @param callback callback function. 回调函数。
         *
         * @returns whether unregistration was successful. 是否成功注销。
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
         * Notifies an event.
         *
         * 通知事件。
         *
         * @param eid event identifier. 事件标识。
         * @param args event arguments. 事件参数。
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