/**
 * 数组工具函数
 * 使用 TypeScript 泛型确保类型安全
 */

/**
 * 往数组中添加元素，若数组中已有此元素，则删除重复元素，添加新的元素
 * @param array - 目标数组
 * @param item - 要添加的元素
 * @returns 新数组
 */
export function updateArray<T>(array: T[], item: T): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  // 移除已存在的相同元素
  const filtered = array.filter((value) => value !== item);

  // 添加新元素到末尾
  return [...filtered, item];
}

/**
 * 往数组中添加元素，若数组中有则不再添加
 * @param array - 目标数组
 * @param item - 要添加的元素
 * @returns 新数组
 */
export function addToArray<T>(array: T[], item: T): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  // 如果已存在，直接返回原数组
  if (array.includes(item)) {
    return array;
  }

  // 添加到末尾
  return [...array, item];
}

/**
 * 往数组的指定位置插入一个元素
 * @param array - 目标数组
 * @param location - 插入位置
 * @param item - 要插入的元素
 * @returns 新数组
 */
export function insertToArray<T>(array: T[], location: number, item: T): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  const newArray = [...array];
  newArray.splice(location, 0, item);
  return newArray;
}

/**
 * 删除数组中指定元素（删除所有匹配项）
 * @param array - 目标数组
 * @param item - 要删除的元素
 * @returns 新数组
 */
export function removeFromArray<T>(array: T[], item: T): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  return array.filter((value) => value !== item);
}

/**
 * 删除数组中指定位置，指定长度的元素
 * @param array - 目标数组
 * @param location - 起始位置
 * @param length - 删除长度
 * @returns 新数组
 */
export function spliceFromArray<T>(array: T[], location: number, length: number): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  const newArray = [...array];
  newArray.splice(location, length);
  return newArray;
}

/**
 * 判断两个数组是否相等（浅比较）
 * @param array1 - 第一个数组
 * @param array2 - 第二个数组
 * @returns 是否相等
 */
export function isArrayEqual<T>(array1: T[], array2: T[]): boolean {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    return false;
  }

  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}
