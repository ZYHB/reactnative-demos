/**
 * 分享工具
 * 基于 expo-sharing
 */

import * as Sharing from 'expo-sharing';

/**
 * 分享选项接口
 */
export interface ShareOptions {
  dialogTitle?: string;
  mimeType?: string;
}

/**
 * 分享文本
 * @param text - 要分享的文本
 * @param options - 分享选项
 */
export async function shareText(
  text: string,
  options?: ShareOptions
): Promise<void> {
  try {
    await Sharing.shareAsync(text, {
      dialogTitle: options?.dialogTitle ?? '分享',
      mimeType: options?.mimeType ?? 'text/plain',
    });
  } catch (error) {
    console.error('[Share] 分享失败:', error);
    throw error;
  }
}

/**
 * 分享 URL
 * @param url - 要分享的 URL
 * @param options - 分享选项
 */
export async function shareURL(
  url: string,
  options?: ShareOptions
): Promise<void> {
  return shareText(url, options);
}

/**
 * 分享文件
 * @param fileUri - 文件 URI
 * @param options - 分享选项
 */
export async function shareFile(
  fileUri: string,
  options?: ShareOptions
): Promise<void> {
  try {
    await Sharing.shareAsync(fileUri, {
      dialogTitle: options?.dialogTitle ?? '分享文件',
      mimeType: options?.mimeType,
    });
  } catch (error) {
    console.error('[Share] 分享文件失败:', error);
    throw error;
  }
}

/**
 * 判断是否可以分享
 * @returns 是否支持分享功能
 */
export async function isShareAvailable(): Promise<boolean> {
  try {
    const isAvailable = await Sharing.isAvailableAsync();
    return isAvailable;
  } catch (error) {
    console.error('[Share] 检查分享能力失败:', error);
    return false;
  }
}
