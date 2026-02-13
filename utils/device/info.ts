/**
 * 设备信息工具
 * 基于 expo-device
 */

import * as Device from 'expo-device';

/**
 * 设备信息接口
 */
/**
 * 设备信息接口
 * 注意：modelId 在 Android 上为 null（expo-device 限制）
 */
export interface DeviceInfo {
  brand: string;
  manufacturer: string;
  modelName: string;
  modelId: string | null; // Android 上可能为 null
  platform: string;
  osVersion: string;
  isDevice: boolean;
  isSimulator: boolean;
}

/**
 * 获取设备信息
 * @returns 设备信息
 */
export function getDeviceInfo(): DeviceInfo {
  const osName = Device.osName ?? '';

  return {
    brand: Device.brand ?? '',
    manufacturer: Device.manufacturer ?? '',
    modelName: Device.modelName ?? '',
    // modelId: expo-device 限制，Android 上返回 null，iOS 上返回设备内部 ID
    // 如需在 Android 上获取更多信息，可使用 Device.productName 等其他字段
    modelId: Device.modelId ?? (osName === 'iOS' ? Device.modelId : null),
    platform: osName,
    osVersion: Device.osVersion ?? '',
    isDevice: !Device.isDevice,
    isSimulator: Device.isDevice ?? false,
  };
}

/**
 * 获取应用版本号
 * @returns 版本号字符串
 */
export function getAppVersion(): string {
  // 需要从 app.json 或 Constants 中读取
  // 这里返回占位符
  return '1.0.0';
}

/**
 * 获取应用包名
 * @returns 包名
 */
export function getBundleId(): string {
  // 需要从 app.config.js 或 Constants 中读取
  return 'com.example.app';
}

/**
 * 判断是否为模拟器
 * @returns 是否为模拟器
 */
export function isSimulator(): boolean {
  return Device.isDevice;
}

/**
 * 判断是否为真机
 * @returns 是否为真机
 */
export function isRealDevice(): boolean {
  return !Device.isDevice;
}

/**
 * 获取设备类型
 * @returns 设备类型描述
 */
export function getDeviceType(): string {
  if (!Device.isDevice) {
    return 'simulator';
  }

  const osName = Device.osName ?? '';

  if (osName === 'iOS') {
    return 'ios';
  } else if (osName === 'Android') {
    return 'android';
  } else {
    return 'unknown';
  }
}
