/**清空数组，不改变引用地址
 * @param arr 数组
 */
function clear<T>(arr: T[]): T[] {
    arr.length = 0;
    return arr;
}
/**判读对象是否是数组
 * @param arr 数组
 */
function isArray(arr: any): arr is any[] {
    if (Array.isArray) {
        return Array.isArray(arr)
    } else {
        return Object.prototype.toString.call(arr) === '[object Array]'
    }
}
/**判读对象是否是字符串数组(undefined也会被定义为字符串数组)
 * @param arr 数组
 */
function isArrayString(arr: any): arr is string[] {
    let value = arr[0];
    if (Array.isArray) {
        return Array.isArray(arr) && (typeof value === 'string' || value === undefined)
    } else {
        return Object.prototype.toString.call(arr) === '[object Array]' && (typeof value === 'string' || value === undefined)
    }
}

/**对象是数组且length > 0
 * @param arr 数组
 */
function isNonNull(arr: Array<any> | undefined): arr is any[] {
    return isArray(arr) && arr.length > 0
}
/**循环遍历对每个item都执行cb操作,改变原数据
 * @param arr 要操作的数组
 * @param cb 回调函数(返回false则此数据不添加到返回数组,无返回则返回操作数组中的对象)
 * @param children 子类所在key,传入 '' 空字符串则不查询子类
 * @returns 返回和arr结构类似的children树状结构（普通数组请自行在cb中接受返回）
 */
function loop<T, K extends any>(arr: T[] | undefined, cb: (item: T) => K, children: string = 'children'): K[] {
    let datas: K[] = [];
    if (isNonNull(arr)) {
        for (let i = 0; i < arr.length; i++) {
            let e = arr[i], res = cb(e), data = (res === undefined ? e : res) as K;
            if (res === false) continue;
            if (children && isNonNull(e[children])) data[children] = loop(e[children], cb, children);
            datas.push(data);
        };
    }
    return datas;
}
/**判断数组中的属性key是否全为值value，子项
 * @param arr 数组
 * @param value 值
 * @param key 属性,不传就直接比较数组中的对象
 * @param children 不传就直接比较数组中的对象
 */
function every<T>(arr: T[] | any, value: any, key?: keyof T, children?: any): boolean {
    if (isNonNull(arr)) {
        for (let i = 0, len = arr.length; i < len; i++) {
            const ele = arr[i];
            if (!key) {
                if (ele !== value) return false;
            } else if (ele[key] !== value) {
                return false
            } else {
                if (children && !every(ele[children], value, key, children)) {
                    return false
                }
            }
        }
        return true;
    }
    return true;
}
/**判断数组（包含其子项）中是否存在key为value的选项 
 * @param arr 数组
 * @param value 值
 * @param key 属性,不传只直接比较数组中的对象
 * @param children 不传表示不比较子项
 */
function some<T>(arr: T[] | any, value: any, key?: keyof T, children?: string): boolean {
    if (isNonNull(arr)) {
        for (let i = 0, len = arr.length; i < len; i++) {
            const ele = arr[i];
            if (ele === value || (key && ele[key] === value)) {
                return true;
            } else {
                if (children && some(ele[children], value, key, children)) {
                    return true
                }
            }
        }
    }
    return false;
}
/**查找数组中是否存在满足cb返回为true的选项 ， children
 * @param arr 要查找的数组
 * @param cb 回调函数 e 数组中的每一项
 * @param children 子项所在的key（传入则表示查找子项）
 * @returns 返回第一个cb返回为true的项
 */
function find<T>(arr: T[] | undefined, cb: (e: T) => boolean | undefined, children?: keyof T): T | undefined {
    if (isNonNull(arr)) {
        for (let i = 0, len = arr.length; i < len; i++) {
            const ele = arr[i];
            if (cb(ele)) {
                return ele;
            } else if (children) {
                let e = find(ele[children] as any, cb, children)
                if (e) return e
            }
        }
    }
    return undefined;
}
/**数组中如果有就删除如果没有就添加(改变原数组)
 * @param arr 要操作的数组
 * @param value 用于比较的值
 * @param key 属性,不传只直接比较数组中的对象
 */
function toggleItem<T>(arr: T[], value: T, key?: keyof T): T[] {
    if (isArray(arr)) {
        if (some(arr, value, key)) {
            delItem(arr, value, key)
        } else {
            arr.push(value);
        }
    }
    return arr
}
/**浅复制(改变引用地址)
 *@param arr 要操作的数组
 */
function copy<T>(arr: T[]): T[] {
    let r: T[] = [];
    if (isNonNull(arr)) { r = [...arr] }
    return r
}
/**判断数据a中是否含有b
 * @param a 
 * @param b 
 */
function includes<T>(a: T | T[], b: any): boolean {
    if (a === undefined || a === null) return false;
    if (typeof a === 'number') return a.toString().includes(b);
    if (typeof a === 'string' || isArray(a)) return a.includes(b);
    return false;
}
/**在指定index后添加一个数组的数据 ,不改变引用地址
 *@param arr 要操作的数组
 *@param arr 要添加的数组
 *@param index 要添加的位置
 */
function addItemsIndex<T>(arr: T[], adds: T[], index?: number): T[] {
    if (isArray(arr) && isNonNull(adds)) {
        if (index !== undefined) {
            let start = arr.slice(0, index + 1)
            let end = arr.slice(index + 1)
            clear(arr);
            start.forEach(e => arr.push(e));
            adds.forEach(e => arr.push(e));
            end.forEach(e => arr.push(e));
        }
    }
    return arr
}
/**去除重复项（undefined和null），返回新的数组
 * @param arr 要去重操作的数组
 */
function delRepetItem<T>(arr: T[]): T[] {
    let res: T[] = [];
    if (isNonNull(arr)) {
        arr.forEach(e => { if (!includes(res, e)) res.push(e); });
    }
    return res
}
/**移除数组指定item，会改变原数组，不改变引用地址
 * @param arr 要操作的数组
 * @param item 要移除的对象或某个对象key属性的值
 * @param key 用于比较的key属性
*/
function delItem<T>(arr: T[] | undefined, item: T, key?: keyof T): T[] {
    if (isNonNull(arr)) {
        let index;
        if (key) {
            index = arr.findIndex(e => e == item || e[key] == item[key])
        } else {
            index = arr.findIndex(e => e == item);
        }
        index >= 0 && arr.splice(index, 1);
    }
    return arr || [];
}
/**
 * 将数组及其后代数组中的 指定的key属性值设为value
 * @param arr 数组   
 * @param key 为要设置的key
 * @param value 为要设置值   
 * @param children 为子数组所在的key,children 为''表示不设置子项
 */
function setItemValue<T>(arr: T[] | any, key: keyof T, value: any, children: string = 'children') {
    if (isNonNull(arr)) {
        for (let i = 0, len = arr.length; i < len; i++) {
            let el = arr[i];
            el[key] = value;
            if (children) {
                setItemValue(el[children], key, value, children);
            }
        }
    }
}
/**当数组arr中某条数据key为指定value时，将该数据及其所有祖先的attr设置为指定的data,children为子数组所在的key,返回该条数据(路由服务中启用)
* @param arr 要操作的数组
* @param key 比较值的属性名
* @param value 比较的值
* @param attr 要重设的属性
* @param data 要重设的值
* @param children 传入''表示不设置子项
* @returns 返回找到的项
*/
function setItemDataByValue<T>(arr: T[], key: keyof T, value: any, attr: keyof T, data: any, children: string = 'children'): T {
    if (isNonNull(arr)) {
        for (let i = 0, len = arr.length; i < len; i++) {
            let el = arr[i];
            if (el[key] == value) {
                el[attr] = data;
                return el;
            } else {
                let el_c: T = setItemDataByValue((el as any)[children], key, value, attr, data, children);
                if (el_c) {
                    el[attr] = data;
                    return el_c
                }
            }
        }
    }
    return {} as T;
}
/**获取数组最后一个元素 
 * @param arr 要操作的数组
 */
function getLast<T>(arr: T[]): T | undefined {
    if (!isNonNull(arr)) return undefined;
    let last = arr[arr.length - 1]
    return last
}
/**获取数组中所有key为指定value的对象组合的数组 onlySuper为true表示父类匹配后就不再匹配子类  flag标识强制添加
 * @param arr 要操作的数组
 * @param key 比较值的属性名
 * @param value 比较的值
 * @param onlySuper 父项匹配后就不再匹配子类
 * @param children 传入''表示不设置子项
 */
function getArrByValue<T>(arr: T[], key: keyof T, value: any, onlySuper: boolean = false, children: string = 'children'): T[] {
    let values: T[] = [];
    if (isNonNull(arr)) {
        for (let i = 0, len = arr.length; i < len; i++) {
            let el: any = arr[i];
            if (el[key] == value) {
                values.push(el);
                if (onlySuper) {
                    continue;
                }
            }
            let datas: T[] = getArrByValue(el[children], key, value, onlySuper, children);
            values.push(...datas);
        }
    }
    return values
}
/**获取与子项childern合并进行扁平化处理 
 * @param arr 要操作的数组
 * @param children 'children' 传入''表示不设置子项
*/
function getAllItems<T>(arr: T[], children: string = 'children'): T[] {
    let values: T[] = [];
    if (isNonNull(arr)) {
        for (let i = 0, len = arr.length; i < len; i++) {
            let el: any = arr[i];
            values.push(el);
            let childs: T[] = getAllItems(el[children], children);
            values.push(...childs);
        }
    }
    return values
}

/**获取数组及其子项中key为指定value的对象，children 为 ''表示不查找子项
 * @param arr 要查找的数组
 * @param value 指定的value值 
 * @param key 比对的项，不传则直接比较对象
 * @param children 传入''表示不查找子项
*/
function getItemByValue<T>(arr: T[] | any, value: any, key: keyof T, children: string = 'children'): T | undefined {
    if (isNonNull(arr)) {
        for (let i = 0, len = arr.length; i < len; i++) {
            let el = arr[i];
            if (key && el[key] == value || el === value) {
                return el;
            } else if (children) {
                let obj = getItemByValue(el[children], value, key);
                if (obj) return obj;
            }
        }
    }
    return undefined
}
/** 获取数组arr中key为指定value的始祖对象
 * @param arr 要查找的数组
 * @param key 比对的项
 * @param value 指定的value值 
 * @param children 传入''表示不查找子项
 */
function getAncestorByValue<T>(arr: T[] | any, key: keyof T, value: any, children: string = 'children'): T | undefined {
    if (isNonNull(arr)) {
        for (let i = 0, len = arr.length; i < len; i++) {
            let el = arr[i];
            if (el[key] == value) {
                return el;
            } else {
                let obj = getAncestorByValue(el[children], key, value);
                if (obj) return el;
            }
        }
    }
    return undefined
}
/**得到含自身和父级的数组,顶级父类排第一
 * arr数组中key等于value或者该对象等于value的父级数组 
 * @param arr 要查找的数组
 * @param value 指定的value值或数组内容之一 
 * @param key 比对的项
 * @param children 传入''表示不查找子项
*/
function getAncestorsByValue<T>(arr: T[] | undefined, value: T | any, key?: keyof T, children: string = 'children'): T[] | undefined {
    if (isNonNull(arr)) {
        for (let i = 0, len = arr.length; i < len; i++) {
            let el = arr[i];
            if (el === value || (key && (el[key] === value || el[key] === value[key]))) {
                let arrB: T[] = []
                arrB.unshift(el)
                return arrB;
            } else {
                let child = el[children], obj = getAncestorsByValue(child, value, key);
                if (obj) {
                    obj.unshift(el)
                    return obj;
                }
            }
        }
    }
    return undefined
}

/**
 * 将数组及其后代数组中的 指定的okey改为key
 * @template T
 * @param {(T[] | any)} arr 数组
 * @param {keyof T} okey 原始的key
 * @param {*} key 要设置的key
 * @param {string} [children='children'] 为子数组所在的key,children 为''表示不设置子项
 */
function setItemsKey<T>(arr: T[] | any, okey: keyof T, key: any, children: string = 'children') {
    if (isNonNull(arr)) {
        for (let i = 0, len = arr.length; i < len; i++) {
            let el = arr[i];
            arr[i][key] = el[okey];
            delete arr[i][okey]
            if (children) {
                setItemValue(el[children], okey, key, children);
            }
        }
    }
}
/**数组分组 
 * [{mmsi:1,time:0},{mmsi:1,time:1},{mmsi:1,time:2},{mmsi:2,time:0}]=>[[{mmsi:1,time:0},{mmsi:1,time:1},{mmsi:1,time:2}],[{mmsi:2,time:0}]]
 * @param arr 要分组的数组
 * @param key 分组的key
 */
function group<T, K extends keyof T>(arr: T[], key: K): T[][] {
    let group: T[][] = [];
    if (isNonNull(arr)) {
        let map = new Map<T[K], T[]>();
        arr.reduce((map, person) => {
            const id = person[key];
            const group = map.get(id) || [];
            group.push(person);
            map.set(id, group);
            return map;
        }, map);
        /**遍历map */
        for (const value of map.values()) {
            group.push(value)
        }
    }
    return group;
}
/**数组操作工具对象 */
export {
    loop as u_arrLoop,
    group as u_arrGroup,
    clear as u_arrClear,
    copy as u_arrCopy,
    isArray as u_arrIsArray,
    isArrayString as u_arrIsStr,
    isNonNull as u_arrNotNone,
    every as u_arrEvery,
    some as u_arrSome,
    find as u_arrFind,
    delItem as u_arrItemDel,
    delRepetItem as u_arrItemDelRepet,
    toggleItem as u_arrItemToggle,
    addItemsIndex as u_arrAddItemsIndex,
    setItemValue as u_arrSetItemValue,
    setItemDataByValue as u_arrSetItemByValue,
    getLast as u_arrGetLast,
    getAllItems as u_arrGetAllItems,
    getArrByValue as u_arrGetItemsByValue,
    getItemByValue as u_arrGetItemByValue,
    getAncestorByValue as u_arrGetTopByValue,
    getAncestorsByValue as u_arrGetTopsByValue,
    setItemsKey as u_arrSetKey
}