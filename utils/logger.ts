// 简单的日志工具，兼容 Expo 项目
// 直接使用 console 而不是 react-native-logs

/**
 * 日志工具接口
 */
interface Logger {
  debug(message: unknown): void;
  info(message: unknown): void;
  warn(message: unknown): void;
  error(message: unknown): void;
}

/**
 * 日志工具实例
 */
const log: Logger = {
  debug: function (message: unknown): void {
    if (__DEV__) {
      console.log(`[DEBUG] ${message}`);
    }
  },

  info: function (message: unknown): void {
    if (__DEV__) {
      console.log(`[INFO] ${message}`);
    }
  },

  warn: function (message: unknown): void {
    if (__DEV__) {
      console.warn(`[WARN] ${message}`);
    }
  },

  error: function (message: unknown): void {
    console.error(`[ERROR] ${message}`);
  },
};

export { log };
