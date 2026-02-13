/**
 * 数字格式化工具
 */

/**
 * 格式化数字为千分位
 * @param num - 数字
 * @param separator - 分隔符（默认","）
 * @returns 格式化后的字符串
 */
export function formatThousands(num: number, separator = ','): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * 格式化货币
 * @param amount - 金额
 * @param symbol - 货币符号（默认"¥"）
 * @param decimals - 小数位数（默认2）
 * @returns 格式化后的货币字符串
 */
export function formatCurrency(
  amount: number,
  symbol = '¥',
  decimals = 2
): string {
  const formatted = amount.toFixed(decimals);
  const parts = formatted.split('.');
  parts[0] = formatThousands(parseFloat(parts[0]));
  return symbol + parts.join('.');
}

/**
 * 格式化百分比
 * @param value - 数值（0-1）
 * @param decimals - 小数位数（默认2）
 * @returns 格式化后的百分比字符串
 */
export function formatPercent(value: number, decimals = 2): string {
  return (value * 100).toFixed(decimals) + '%';
}

/**
 * 格式化文件大小
 * @param bytes - 字节数
 * @returns 格式化后的字符串（如 "1.5MB"）
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return '0 B';
  }

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 限制数字范围
 * @param value - 数值
 * @param min - 最小值
 * @param max - 最大值
 * @returns 限制后的数值
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * 生成范围内的随机整数
 * @param min - 最小值
 * @param max - 最大值
 * @returns 随机整数
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 生成范围内的随机浮点数
 * @param min - 最小值
 * @param max - 最大值
 * @param decimals - 小数位数（默认2）
 * @returns 随机浮点数
 */
export function randomFloat(min: number, max: number, decimals = 2): number {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}
