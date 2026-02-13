/**
 * 日期时间格式化工具
 * 使用 date-fns 提供核心功能
 * 保留中文格式化的自定义封装
 */

import { format, formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

// 设置中文语言环境
const locale = zhCN;

/**
 * 将毫秒数转换为人类可读的时间字符串
 * @param ms - 毫秒数
 * @returns 格式化后的字符串，如 "2天3小时15分钟"
 */
export function formatMilliseconds(ms: number): string {
  if (ms <= 0) {
    return '0秒';
  }

  const day = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hour = Math.floor(ms / (60 * 60 * 1000) - day * 24);
  const minute = Math.floor(ms / (60 * 1000) - day * 24 * 60 - hour * 60);
  const second = Math.floor(ms / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60);

  if (day > 0) {
    return `${day}天${hour}小时${minute}分钟`;
  }
  if (hour > 0) {
    return `${hour}小时${minute}分钟`;
  }
  if (minute > 0) {
    return `${minute}分钟`;
  }
  return `${second}秒`;
}

/**
 * 获取当前日期时间字符串
 * @param timeStr - 可选的时间字符串（时分秒），如 "14:30:00"
 * @returns 完整日期时间字符串，如 "2026-02-13 14:30:00"
 */
export function getNowDateTime(timeStr?: string): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  if (timeStr != null) {
    return `${year}-${month}-${day} ${timeStr}`;
  }

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 时间戳转年月日时分秒
 * @param time - 时间戳（毫秒）
 * @returns 格式化后的字符串，如 "2026-02-13 14:30:00"
 */
export function formatTimestamp(time: number | string): string {
  if (!time) {
    return '';
  }

  const date = new Date(time);
  return format(date, 'yyyy-MM-dd HH:mm:ss', { locale });
}

/**
 * 时间戳转年月日星期
 * @param time - 时间戳（毫秒）
 * @returns 格式化后的字符串，如 "2026年02月13日 星期五"
 */
export function formatTimestampWithWeekday(time: number | string): string {
  if (!time) {
    return '';
  }

  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const weekday = date.getDay();

  const weekdayMap: Record<number, string> = {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六',
  };

  return `${year}年${month}月${day}日 ${weekdayMap[weekday]}`;
}

/**
 * 时间戳转年月
 * @param time - 时间戳（毫秒）
 * @returns 格式化后的字符串，如 "2026年02月"
 */
export function formatTimestampToMonth(time: number | string): string {
  if (!time) {
    return '';
  }

  const date = new Date(time);
  return format(date, 'yyyy年MM月', { locale });
}

/**
 * 时间戳转年月日
 * @param time - 时间戳（毫秒）
 * @returns 格式化后的字符串，如 "2026-02-13"
 */
export function formatTimestampToDate(time: number | string): string {
  if (!time) {
    return '';
  }

  const date = new Date(time);
  return format(date, 'yyyy-MM-dd', { locale });
}

/**
 * 格式化媒体时长（秒转分:秒）
 * @param duration - 时长（秒）
 * @returns 格式化后的字符串，如 "03:45"
 */
export function formatMediaTime(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;

  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
}

/**
 * 秒转时分秒
 * @param seconds - 秒数
 * @returns 格式化后的字符串，如 "14:30:00"
 */
export function formatSeconds(seconds: number | null): string | undefined {
  if (seconds === null || seconds < 0) {
    return undefined;
  }

  let hh, mm, ss;

  const totalSeconds = Math.floor(seconds);

  // 计算小时
  hh = Math.floor(totalSeconds / 3600);

  // 剩余数
  const remaining = totalSeconds - hh * 3600;

  // 计算分钟
  mm = Math.floor(remaining / 60);

  // 计算秒
  ss = remaining - mm * 60;

  const paddedMM = String(mm).padStart(2, '0');
  const paddedSS = String(ss).padStart(2, '0');

  // 限制小时不超过24
  const finalHH = Math.min(hh, 23);
  const paddedHH = String(finalHH).padStart(2, '0');

  return `${paddedHH}:${paddedMM}:${paddedSS}`;
}

/**
 * 获取今天的日期（年月日星期）
 * @returns 格式化后的字符串，如 "2026年2月13日 星期五"
 */
export function getTodayDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekday = now.getDay();

  const weekdayMap: Record<number, string> = {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六',
  };

  return `${year}年${month}月${day}日 ${weekdayMap[weekday]}`;
}

/**
 * 相对时间格式化（如 "3小时前"、"2天前"）
 * @param date - 日期对象或时间戳
 * @returns 相对时间字符串
 */
export function formatRelativeTime(date: Date | number | string): string {
  if (!date) {
    return '';
  }

  const dateObj = typeof date === 'object' ? date : new Date(date);
  return formatDistanceToNow(dateObj, { locale, addSuffix: true });
}

/**
 * 判断是否为今天
 * @param date - 日期对象或时间戳
 * @returns 是否为今天
 */
export function isToday(date: Date | number | string): boolean {
  if (!date) {
    return false;
  }

  const dateObj = typeof date === 'object' ? date : new Date(date);
  const today = new Date();

  return (
    dateObj.getFullYear() === today.getFullYear() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getDate() === today.getDate()
  );
}
