/**
 * 本地存储工具
 * 使用 AsyncStorage 存储缓存数据
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_PREFIX = 'app_cache_';

export const DeviceStorage = {
  /**
   * 存储数据
   */
  async storeData(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_PREFIX + key, jsonValue);
    } catch (e) {
      console.error('存储数据失败:', e);
    }
  },

  /**
   * 获取数据
   */
  async getData(key: string): Promise<any> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_PREFIX + key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('读取数据失败:', e);
      return null;
    }
  },

  /**
   * 删除数据
   */
  async deleteData(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_PREFIX + key);
    } catch (e) {
      console.error('删除数据失败:', e);
    }
  },

  /**
   * 清空所有缓存
   */
  async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(STORAGE_PREFIX));
      if (cacheKeys.length > 0) {
        await AsyncStorage.multiRemove(cacheKeys);
      }
    } catch (e) {
      console.error('清空缓存失败:', e);
    }
  },
};
