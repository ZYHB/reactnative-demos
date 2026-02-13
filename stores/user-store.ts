import { create } from 'zustand';

/**
 * 用户信息接口
 */
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  token?: string;
}

/**
 * 用户 Store 状态和操作
 */
interface UserStore {
  // 状态
  userInfo: UserInfo | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  // 操作
  setUser: (user: UserInfo) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUserInfo: (updates: Partial<UserInfo>) => void;
}

/**
 * 用户状态管理 Store
 */
export const useUserStore = create<UserStore>(set => ({
  // 初始状态
  userInfo: null,
  isLoggedIn: false,
  isLoading: false,

  // 设置用户信息
  setUser: (user: UserInfo) =>
    set({
      userInfo: user,
      isLoggedIn: true,
      isLoading: false,
    }),

  // 退出登录
  logout: () =>
    set({
      userInfo: null,
      isLoggedIn: false,
      isLoading: false,
    }),

  // 设置加载状态
  setLoading: (loading: boolean) => set({ isLoading: loading }),

  // 更新用户信息
  updateUserInfo: (updates: Partial<UserInfo>) =>
    set(state => ({
      userInfo: state.userInfo ? { ...state.userInfo, ...updates } : null,
    })),
}));
