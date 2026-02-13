/**
 * 通用工具函数
 */

export const extraUtil = {
  /**
   * 判断字符串是否为空或无效值
   */
  isNullStr(val: any): boolean {
    if (
      val === undefined ||
      val === 'undefined' ||
      val === null ||
      val === 'null' ||
      val === 'NULL' ||
      val === '' ||
      val === ''
    ) {
      return true;
    }
    return false;
  },

  /**
   * 判断对象是否为空
   */
  isEmptyObj(obj: any): boolean {
    if (obj === null || obj === undefined) {
      return true;
    }
    if (typeof obj === 'string' && obj.trim() === '') {
      return true;
    }
    if (Array.isArray(obj) && obj.length === 0) {
      return true;
    }
    if (typeof obj === 'object' && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  },

  /**
   * 深拷贝对象
   */
  deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    if (obj instanceof Date) {
      return new Date(obj.getTime()) as any;
    }
    if (obj instanceof Array) {
      return obj.map(item => extraUtil.deepClone(item)) as any;
    }
    if (typeof obj === 'object') {
      const copy: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          copy[key] = extraUtil.deepClone(obj[key]);
        }
      }
      return copy;
    }
    return obj;
  },

  /**
   * 防抖函数
   */
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
  ): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<T>) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        func(...args);
      }, wait);
    };
  },

  /**
   * 节流函数
   */
  throttle<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
  ): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<T>) => {
      if (!timeout) {
        timeout = setTimeout(() => {
          func(...args);
          timeout = null;
        }, wait);
      }
    };
  },
};
