/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// 从 commonStyle.js 迁移来的样式常量
export const commonStyle = {
  color: {
    red: '#FF0000',
    orange: '#FFA500',
    yellow: '#FFFF00',
    green: '#00FF00',
    cyan: '#00FFFF',
    blue: '#0000FF',
    purple: '#800080',
    black: '#000',
    white: '#FFF',
    gray: '#808080',
    drakGray: '#A9A9A9',
    lightGray: '#D3D3D3',
    tomato: '#FF6347',
    PeachPuff: '#FFDAB9',
    clear: 'transparent',

    /** 主题色 **/
    themeColor: '#e74c3c',
    // 默认灰色字体颜色
    textGrayColor: '#989898',
    // 默认黑色字体颜色
    textBlockColor: '#262626',
    // 默认背景颜色
    bgColor: '#E6E6E6',
    // 默认分割线颜色
    lineColor: '#E6E6E6',
    // 默认placeholder颜色
    placeholderTextColor: '#c8c8cd',
    // borderColor
    borderColor: '#808080',
    // 导航title 颜色
    navTitleColor: '#262626',
    // 导航左item title color
    navLeftTitleColor: '#333',
    // 导航右item title color
    navRightTitleColor: '#333',
    navThemeColor: '#FEFEFE',
    iconGray: '#989898',
    iconBlack: '#262626',
  },
  space: {
    // 上边距
    marginTop: 10,
    // 左边距
    marginLeft: 10,
    // 下边距
    marginBotton: 10,
    // 右边距
    marginRight: 10,
    // 内边距
    padding: 10,
    // 导航的leftItem的左间距
    navMarginLeft: 15,
    // 导航的rightItem的右间距
    navMarginRight: 15,
  },
  width: {
    // 导航栏左右按钮image宽度
    navImageWidth: 25,
    // 边框线宽度
    borderWidth: 1,
    // 分割线高度
    lineWidth: 0.8,
  },
  height: {
    // 导航栏除掉状态栏的高度
    navContentHeight: 44,
    // tabBar的高度
    tabBarContentHeight: 49,
    // 底部按钮高度
    bottonBtnHeight: 44,
    // 通用列表cell高度
    cellHeight: 44,
    // 导航栏左右按钮image高度
    navImageHeight: 25,
  },
  font: {
    // 默认文字字体
    textFont: 14,
    // 默认按钮文字字体
    btnFont: 15,
    btnFontSmall: 13,
    // 导航title字体
    navTitleFont: 17,
    // tabBar文字字体
    barBarTitleFont: 12,
    // 占位符的默认字体大小
    placeholderFont: 13,
    // 导航左按钮的字体
    navRightTitleFont: 15,
    // 导航右按钮字体
    navLeftTitleFont: 15,
  },
  opacity: {
    // mask
    modalOpacity: 0.3,
    // touchableOpacity
    taOpacity: 0.1,
  },

  /** 定位 **/
  absolute: 'absolute',

  /** flex **/
  around: 'space-around',
  between: 'space-between',
  center: 'center',
  row: 'row',
};
