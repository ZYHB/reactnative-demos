/**
 * 正则表达式常量
 * 用于数据验证
 */

/**
 * 校验手机号
 * @param mobile - 手机号码
 * @returns 是否匹配
 */
export function checkMobile(mobile: string): boolean {
  return /^[1][0-9]{10}$/.test(mobile);
}

/**
 * 校验纯数字
 * @param num - 数字字符串
 * @returns 是否匹配
 */
export function checkNum(num: string): boolean {
  return /^[0-9]+$/.test(num);
}

/**
 * 校验用户名：1-20位字符，首字符为字母
 * @param str - 用户名
 * @returns 是否匹配
 */
export function checkUserName(str: string): boolean {
  return /^[a-zA-Z]{1,20}$/.test(str);
}

/**
 * 校验密码：6-20位，数字、字母、下划线
 * @param str - 密码
 * @returns 是否匹配
 */
export function checkPassword(str: string): boolean {
  return /^\w{6,20}$/.test(str);
}

/**
 * 校验正整数 + 0
 * @param num - 数字字符串
 * @returns 是否匹配
 */
export function checkPositiveInteger(num: string): boolean {
  return /^[0-9]*[1-9][0-9]*$/.test(num);
}

/**
 * 校验邮箱地址
 * @param email - 邮箱地址
 * @returns 是否匹配
 */
export function checkEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * 校验身份证号（18位）
 * @param idCard - 身份证号
 * @returns 是否匹配
 */
export function checkIdCard(idCard: string): boolean {
  return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))\d{2}[0-9Xx]$/.test(idCard);
}

/**
 * 校验URL
 * @param url - URL地址
 * @returns 是否匹配
 */
export function checkURL(url: string): boolean {
  return /^https?:\/\/.+$/.test(url);
}
