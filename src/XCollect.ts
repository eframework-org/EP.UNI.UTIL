//-------------------------------------------------//
//                    MIT License                  //
//    Copyright (c) 2025 EFramework Organization   //
//          SEE LICENSE.md FOR MORE DETAILS        //
//-------------------------------------------------//

/**
 * Collection utility class.
 *
 * 集合工具类。
 */
export namespace XCollect {
    /**
     * Checks if an element exists in the list.
     *
     * 检查列表中是否存在某个元素。
     *
     * @param list list instance. 列表实例。
     * @param cond condition function. 条件函数。
     *
     * @returns whether an element meeting the condition exists. 是否存在符合条件的元素。
     */
    export function Exist<T>(list: T[], cond: (item: T) => boolean): boolean {
        if (list && cond) {
            for (let i = 0; i < list.length; i++) {
                if (cond(list[i])) return true
            }
        }
        return false
    }

    /**
     * Finds an element in the list.
     *
     * 在列表中查找元素。
     *
     * @param list list instance. 列表实例。
     * @param cond condition function. 条件函数。
     *
     * @returns element meeting the condition or null if not found. 符合条件的元素，如果没有找到则返回 null。
     */
    export function Find<T>(list: T[], cond: (item: T) => boolean): T {
        if (list && cond) {
            for (let index = 0; index < list.length; index++) {
                let ele = list[index]
                if (cond(ele)) return ele
            }
        }
        return null
    }

    /**
     * Finds the index of an element in the list.
     *
     * 在列表中查找元素的索引。
     *
     * @param list list instance. 列表实例。
     * @param cond condition function. 条件函数。
     *
     * @returns index of the element meeting the condition or -1 if not found. 符合条件的元素的索引，如果没有找到则返回 -1。
     */
    export function Index<T>(list: T[], cond: (item: T) => boolean): number {
        if (list && cond) {
            for (let index = 0; index < list.length; index++) {
                var ele = list[index]
                if (cond(ele)) return index
            }
        }
        return -1
    }

    /**
     * Deletes an element from the list at the specified index.
     *
     * 从列表中删除指定索引的元素。
     *
     * @param list list instance. 列表实例。
     * @param idx list index. 列表索引。
     */
    export function Delete(list: Array<any>, idx: number) {
        if (list != null) {
            if (idx < list.length) list.splice(idx, 1)
        }
    }

    /**
     * Removes an element from the list based on a condition.
     *
     * 根据条件从列表中移除元素。
     *
     * @param list list instance. 列表实例。
     * @param cond condition function. 条件函数。
     *
     * @returns whether an element was successfully removed. 是否成功移除元素。
     */
    export function Remove<T>(list: Array<T>, cond: (item: T) => boolean): boolean {
        for (let i = 0; i < list.length; i++) {
            if (cond(list[i])) {
                this.Delete(list, i)
                return true
            }
        }
        return false
    }

    /**
     * Inserts an element into the list at the specified index.
     *
     * 将元素插入到列表的指定位置。
     *
     * @param list list instance. 列表实例。
     * @param ele element. 元素。
     * @param idx list index default is -1 (appends to the end). 列表索引，默认为 -1（表示插入到列表末尾）。
     */
    export function Insert(list: Array<any>, ele: any, idx: number = -1) {
        if (list != null && ele != null) {
            if (idx == -1) idx = list.length
            list.splice(idx, 0, ele)
        }
    }

    /**
     * Sorts the list.
     *
     * 对列表进行排序。
     *
     * @param list list instance. 列表实例。
     * @param func sort function. 排序函数。
     */
    export function Sort<T>(list: T[], func: (o1: T, o2: T) => boolean) {
        if (list != null && func != null && list instanceof Array) {
            list.sort((o1, o2) => {
                if (func(o1, o2)) return -1
                else return 1
            })
        }
    }

    /**
     * Subtracts a range of elements from the list.
     *
     * 从列表中截取一段元素。
     *
     * @param list list instance. 列表实例。
     * @param start start index default is 0. 开始索引，默认为 0。
     * @param end end index default is -1 (to the end of the list). 终止索引，默认为 -1（表示截取到列表末尾）。
     *
     * @returns array of elements in the specified range. 截取的元素数组。
     */
    export function SubRange<T>(list: T[], start: number = 0, end: number = -1): T[] {
        var rets: T[] = []
        if (list) {
            if (end == -1) end = list.length - 1
            else end = Math.min(list.length, end)
            start = Math.max(start, 0)
            for (let i = start; i <= end; i++) {
                rets.push(list[i])
            }
        }
        return rets
    }

    /**
     * Adds a range of elements to the list.
     *
     * 将一组元素添加到列表中。
     *
     * @param list list instance. 列表实例。
     * @param eles element collection. 元素集合。
     */
    export function AddRange<T>(list: Array<T>, eles: Iterable<T> | ArrayLike<T>) {
        if (list && eles) list.push.apply(list, Array.from(eles))
    }

    /**
     * Deletes a range of elements from the list.
     *
     * 从列表中删除一段元素。
     *
     * @param list list instance. 列表实例。
     * @param idx start index. 开始索引。
     * @param length delete length default is from start index to the end of the list. 删除长度，默认为从开始索引到列表末尾。
     */
    export function DeleteRange(list: Array<any>, idx: number, length?: number) {
        if (list) {
            if (length == null) length = list.length - idx
            for (let i = 0; i < length; i++) {
                this.Delete(list, idx)
            }
        }
    }
}