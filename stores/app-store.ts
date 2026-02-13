import { create } from 'zustand';

/**
 * 应用全局状态
 */
interface AppStore {
  // 网络状态
  isOnline: boolean;
  setOnline: (online: boolean) => void;

  // 全局加载状态
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;

  // 通知/提示消息
  notification: {
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null;
  showNotification: (
    message: string,
    type?: 'success' | 'error' | 'info' | 'warning',
  ) => void;
  hideNotification: () => void;

  // 底部标签页状态
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

/**
 * 应用全局状态管理 Store
 */
export const useAppStore = create<AppStore>(set => ({
  // 初始状态
  isOnline: true,
  globalLoading: false,
  notification: null,
  activeTab: 'home',

  // 网络状态
  setOnline: (online: boolean) => set({ isOnline: online }),

  // 全局加载状态
  setGlobalLoading: (loading: boolean) => set({ globalLoading: loading }),

  // 显示通知
  showNotification: (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
  ) =>
    set({
      notification: {
        visible: true,
        message,
        type,
      },
    }),

  // 隐藏通知
  hideNotification: () => set({ notification: null }),

  // 设置当前激活的标签页
  setActiveTab: (tab: string) => set({ activeTab: tab }),
}));
