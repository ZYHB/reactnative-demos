/**
 * 全局状态管理 Store 统一导出
 */

// 用户状态
export { useUserStore } from './user-store';

// 应用状态
export { useAppStore } from './app-store';

// 导出类型以便在其他地方使用
export type { UserInfo } from './user-store';
