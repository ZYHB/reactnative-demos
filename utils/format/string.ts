/**
 * 字符串格式化工具
 */

/**
 * 深度克隆对象（使用现代 API）
 * @param data - 要克隆的数据
 * @returns 克隆后的数据
 */
export function deepClone<T>(data: T): T {
  // 使用现代 structuredClone API（支持浏览器和 React Native）
  if (typeof structuredClone !== 'undefined') {
    return structuredClone(data);
  }

  // 降级方案：JSON 序列化
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.warn('deepClone failed:', error);
    return data;
  }
}

/**
 * 深度复制对象（旧版兼容）
 * @param data - 要复制的数据
 * @returns 复制后的数据
 * @deprecated 使用 deepClone 替代
 */
export function deepCopy<T>(data: T): T {
  return deepClone(data);
}

/**
 * 截取字符串
 * @param str - 原字符串
 * @param maxLength - 最大长度
 * @param suffix - 后缀（默认"..."）
 * @returns 截取后的字符串
 */
export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (!str || str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * 生成随机字符串
 * @param length - 字符串长度
 * @param charset - 字符集（默认字母+数字）
 * @returns 随机字符串
 */
export function randomString(
  length: number,
  charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

/**
 * 首字母大写
 * @param str - 原字符串
 * @returns 首字母大写的字符串
 */
export function capitalize(str: string): string {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 转换为连字符格式（kebab-case）
 * @param str - 原字符串
 * @returns 连字符格式
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * 转换为驼峰格式（camelCase）
 * @param str - 原字符串
 * @returns 驼峰格式
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/(.)(?=[A-Z])/g, '$1');
}

/**
 * 移除字符串中的所有空格
 * @param str - 原字符串
 * @returns 移除空格后的字符串
 */
export function removeSpaces(str: string): string {
  return str.replace(/\s+/g, '');
}

/**
 * 移除字符串两端的空格
 * @param str - 原字符串
 * @returns trim 后的字符串
 */
export function trim(str: string): string {
  return str.trim();
}
