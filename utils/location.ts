/**
 * 地理位置工具
 * 基于 expo-location
 */

import * as Location from 'expo-location';

/**
 * 位置信息接口
 */
export interface LocationInfo {
  latitude: number;
  longitude: number;
  formattedAddress?: string;
}

/**
 * 获取当前位置
 * @param accuracy - 定位精度（默认 BestForNavigation）
 * @returns 位置信息
 */
export async function getCurrentLocation(
  accuracy: Location.Accuracy = Location.Accuracy.BestForNavigation
): Promise<LocationInfo> {
  try {
    // 请求定位权限
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('定位权限被拒绝');
    }

    // 获取位置
    const location = await Location.getCurrentPositionAsync({ accuracy });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      formattedAddress: '位置获取功能需要配置', // TODO: 集成地图服务
    };
  } catch (error) {
    console.error('[Location] 获取位置失败:', error);
    throw error;
  }
}

/**
 * 获取位置权限状态
 * @returns 权限状态
 */
export async function getLocationPermissionStatus(): Promise<Location.PermissionResponse> {
  try {
    return await Location.getForegroundPermissionsAsync();
  } catch (error) {
    console.error('[Location] 获取权限状态失败:', error);
    return {
      android: {},
      ios: {},
      canAskAgain: true,
      expires: 'never',
      granted: false,
      status: Location.PermissionStatus.DENIED,
    } as Location.PermissionResponse;
  }
}

/**
 * 请求位置权限
 * @returns 权限状态
 */
export async function requestLocationPermission(): Promise<Location.PermissionStatus> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status;
  } catch (error) {
    console.error('[Location] 请求权限失败:', error);
    throw error;
  }
}

/**
 * 计算两点之间的距离（米）
 * @param lat1 - 第一个点的纬度
 * @param lon1 - 第一个点的经度
 * @param lat2 - 第二个点的纬度
 * @param lon2 - 第二个点的经度
 * @returns 距离（米）
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // 地球半径（米）
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * 度转弧度
 */
function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}
