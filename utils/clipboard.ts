/**
 * 剪贴板工具
 * 基于 expo-clipboard
 */

import * as Clipboard from 'expo-clipboard';

/**
 * 复制文本到剪贴板
 * @param text - 要复制的文本
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await Clipboard.setStringAsync(text);
    console.log('[Clipboard] 已复制:', text);
  } catch (error) {
    console.error('[Clipboard] 复制失败:', error);
    throw error;
  }
}

/**
 * 从剪贴板获取文本
 * @returns 剪贴板内容
 */
export async function getFromClipboard(): Promise<string> {
  try {
    const text = await Clipboard.getStringAsync();
    return text ?? '';
  } catch (error) {
    console.error('[Clipboard] 获取失败:', error);
    return '';
  }
}

/**
 * 判断剪贴板是否有内容
 * @returns 是否有内容
 */
export async function hasClipboardContent(): Promise<boolean> {
  const text = await getFromClipboard();
  return text.length > 0;
}
