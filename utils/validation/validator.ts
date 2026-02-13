/**
 * 验证工具函数
 */

/**
 * 判断是否为空字符串
 * @param val - 要检查的值
 * @returns 是否为空
 */
export function isEmptyString(val: unknown): boolean {
  if (
    val === undefined ||
    val === 'undefined' ||
    val === null ||
    val === 'null' ||
    val === 'NULL' ||
    val === '' ||
    val === ''
  ) {
    return true;
  }
  return false;
}

/**
 * 判断是否为空对象
 * @param obj - 要检查的对象
 * @returns 是否为空
 */
export function isEmptyObject(obj: unknown): boolean {
  if (typeof obj === 'object') {
    return (
      !obj ||
      (Array.isArray(obj) && obj.length === 0) ||
      (obj?.toString?.() === '[object Object]' && Object.keys(obj).length === 0)
    );
  } else if (typeof obj === 'boolean' || typeof obj === 'number') {
    return false;
  } else if (typeof obj === 'string') {
    return (obj as string).trim().length === 0;
  } else {
    return !obj;
  }
}

/**
 * 判断是否为空值（字符串或对象）
 * @param val - 要检查的值
 * @returns 是否为空
 */
export function isEmpty(val: unknown): boolean {
  return isEmptyString(val) || isEmptyObject(val);
}

/**
 * 判断是否为非空值
 * @param val - 要检查的值
 * @returns 是否非空
 */
export function isNotEmpty(val: unknown): boolean {
  return !isEmpty(val);
}

/**
 * 判断是否为有效的数字
 * @param num - 要检查的值
 * @returns 是否为有效数字
 */
export function isValidNumber(num: unknown): boolean {
  return typeof num === 'number' && !isNaN(num);
}

/**
 * 判断是否为有效的手机号
 * @param mobile - 手机号
 * @returns 是否有效
 */
export function isValidMobile(mobile: string): boolean {
  return /^1[3-9]\d{9}$/.test(mobile);
}

/**
 * 判断是否为有效的邮箱
 * @param email - 邮箱地址
 * @returns 是否有效
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * 判断是否为数组
 * @param val - 要检查的值
 * @returns 是否为数组
 */
export function isArray(val: unknown): val is any[] {
  return Array.isArray(val);
}

/**
 * 判断是否为对象
 * @param val - 要检查的值
 * @returns 是否为对象
 */
export function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}

/**
 * 判断是否为函数
 * @param val - 要检查的值
 * @returns 是否为函数
 */
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}
