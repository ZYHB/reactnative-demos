/**
 * Toast 提示工具
 * 殖化后的全局提示
 */

import CommonDialog, { CommonDialogRef } from '@/components/common-dialog';
import CommonToast from '@/components/common-toast';
import { isEmptyString } from '@/utils/validation';
import React from 'react';

/**
 * Toast 提示管理器
 */
class ToastManager {
  private toastRef: CommonDialogRef | null | undefined = null;

  /**
   * 设置 Toast 弹窗引用
   */
  setToastRef(ref: CommonDialogRef | null | undefined): void {
    this.toastRef = ref;
  }

  /**
   * 显示提示
   * @param message - 提示消息
   * @param displayTime - 显示时长（毫秒，默认 1000ms）
   */
  async showToast(message?: string, displayTime = 1000): Promise<void> {
    if (isEmptyString(message)) {
      return;
    }

    if (!this.toastRef) {
      console.warn('[Toast] toastRef 未设置');
      return;
    }

    void this.toastRef?.showWithContent(
      CommonDialog.popupMode.center,
      () => console.log('点击 toast 背景'),
      () => {
        return <CommonToast message={message} />;
      }
    );

    // 自动消失
    setTimeout(() => {
      this.toastRef?.hide();
    }, displayTime);
  }

  /**
   * 显示成功提示
   * @param message - 提示消息
   * @param displayTime - 显示时长
   */
  async showSuccess(message: string, displayTime = 1000): Promise<void> {
    await this.showToast(message, displayTime);
  }

  /**
   * 显示错误提示
   * @param message - 提示消息
   * @param displayTime - 显示时长
   */
  async showError(message: string, displayTime = 1000): Promise<void> {
    await this.showToast(message, displayTime);
  }

  /**
   * 显示信息提示
   * @param message - 提示消息
   * @param displayTime - 显示时长
   */
  async showInfo(message: string, displayTime = 1000): Promise<void> {
    await this.showToast(message, displayTime);
  }

  /**
   * 隐藏提示
   */
  hide(): void {
    this.toastRef?.hide();
  }
}

/**
 * 全局 Toast 实例
 */
export const toast = new ToastManager();

/**
 * 快捷方法：显示成功提示
 */
export async function showSuccess(
  message: string,
  displayTime = 1000
): Promise<void> {
  await toast.showSuccess(message, displayTime);
}

/**
 * 快捷方法：显示错误提示
 */
export async function showError(
  message: string,
  displayTime = 1000
): Promise<void> {
  await toast.showError(message, displayTime);
}

/**
 * 快捷方法：显示信息提示
 */
export async function showInfo(
  message: string,
  displayTime = 1000
): Promise<void> {
  await toast.showInfo(message, displayTime);
}
