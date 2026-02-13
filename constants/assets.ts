/**
 * 应用静态资源统一管理
 *
 * 所有资源通过此文件统一导入和管理，避免散落在各处的 require() 调用
 *
 * 使用示例：
 * ```tsx
 * import { Assets } from '@/constants/assets';
 *
 * // 图片资源
 * <Image source={Assets.images.tab.home.normal} />
 *
 * // Lottie 动画
 * <Lottie source={Assets.animations.splash} />
 *
 * // 占位图
 * <Image source={Assets.images.placeholder.default} />
 * ```
 */

// ==================== 类型定义 ====================

/**
 * 图片资源类型
 */
type ImageSource = number;

/**
 * Lottie 动画资源类型
 * JSON 文件通过 require() 导入后返回对象本身
 * 使用 any 避免 lottie-react-native 类型兼容问题
 */
type AnimationSource = any;

/**
 * Tab 图标对（普通/选中状态）
 */
interface TabIconPair {
  normal: ImageSource;
  selected: ImageSource;
}

/**
 * 资源集合类型
 */
export interface AssetsType {
  images: {
    // Tab 图标
    tab: Record<string, TabIconPair>;
    // 图标字体
    iconfont: Record<string, ImageSource>;
    // 占位图
    placeholder: Record<string, ImageSource>;
    // 应用图标和 Logo
    app: Record<string, ImageSource>;
  };
  animations: {
    // 启动页动画
    splash: AnimationSource;
    // 加载动画组
    loading: Record<string, AnimationSource>;
    // 骨架屏加载
    skeleton: AnimationSource;
    // 体育主题动画
    sports: Record<string, AnimationSource>;
  };
}

// ==================== Tab 图标资源 ====================

/**
 * Tab 图标资源
 * 命名规范：对应底部导航的功能名称
 */
const TabIcons: Record<string, TabIconPair> = {
  // 首页
  home: {
    normal: require('@/assets/images/tab/tabbar_home.png') as ImageSource,
    selected: require('@/assets/images/tab/tabbar_home_sel.png') as ImageSource,
  },
  // 课程
  course: {
    normal: require('@/assets/images/tab/tabbar_course.png') as ImageSource,
    selected: require('@/assets/images/tab/tabbar_course_sel.png') as ImageSource,
  },
  // 问答
  ask: {
    normal: require('@/assets/images/tab/tabbar_ask.png') as ImageSource,
    selected: require('@/assets/images/tab/tabbar_ask_sel.png') as ImageSource,
  },
  // 购物车/选择
  choose: {
    normal: require('@/assets/images/tab/tabbar_choose.png') as ImageSource,
    selected: require('@/assets/images/tab/tabbar_choose_sel.png') as ImageSource,
  },
  // 我的
  my: {
    normal: require('@/assets/images/tab/tabbar_my.png') as ImageSource,
    selected: require('@/assets/images/tab/tabbar_my_sel.png') as ImageSource,
  },
};

// ==================== 图标字体资源 ====================

/**
 * 通用图标资源
 * 命名规范：使用语义化的英文命名，描述图标功能
 */
const IconfontIcons: Record<string, ImageSource> = {
  // 功能操作类
  add: require('@/assets/images/iconfont/add.png') as ImageSource,
  close: require('@/assets/images/iconfont/close.png') as ImageSource,
  delete: require('@/assets/images/iconfont/delete.png') as ImageSource,
  download: require('@/assets/images/iconfont/download.png') as ImageSource,
  // 箭头类
  down: require('@/assets/images/iconfont/down.png') as ImageSource,
  // 客服与反馈
  customerService: require('@/assets/images/iconfont/customer-service.png') as ImageSource,
  // 主题切换
  daytimeMode: require('@/assets/images/iconfont/daytime-mode.png') as ImageSource,
  daytimeModeFill: require('@/assets/images/iconfont/daytime-mode-fill.png') as ImageSource,
  // 附件与文件
  attachment: require('@/assets/images/iconfont/attachent.png') as ImageSource,
  // 格式图标
  formatBmp: require('@/assets/images/iconfont/format-bmp.png') as ImageSource,
  formatDoc: require('@/assets/images/iconfont/format-doc.png') as ImageSource,
  formatExl: require('@/assets/images/iconfont/format-exl.png') as ImageSource,
  formatGif: require('@/assets/images/iconfont/format-gif.png') as ImageSource,
  formatJpeg: require('@/assets/images/iconfont/format-jpeg.png') as ImageSource,
  formatPdf: require('@/assets/images/iconfont/format-pdf.png') as ImageSource,
  // 关注相关
  follow: require('@/assets/images/iconfont/follow.png') as ImageSource,
  followFill: require('@/assets/images/iconfont/follow-fill.png') as ImageSource,
  // 手电筒
  flashlight: require('@/assets/images/iconfont/flashlight.png') as ImageSource,
  flashlightOff: require('@/assets/images/iconfont/flashlight-turned-off.png') as ImageSource,
};

// ==================== 占位图资源 ====================

/**
 * 占位图资源
 */
const PlaceholderImages: Record<string, ImageSource> = {
  default: require('@/assets/images/placeholder/placeholder.png') as ImageSource,
};

// ==================== 应用图标资源 ====================

/**
 * 应用 Logo 和启动图
 */
const AppIcons: Record<string, ImageSource> = {
  icon: require('@/assets/images/icon.png') as ImageSource,
  splash: require('@/assets/images/splash-icon.png') as ImageSource,
  reactLogo: require('@/assets/images/react-logo.png') as ImageSource,
  reactLogo2x: require('@/assets/images/react-logo@2x.png') as ImageSource,
  reactLogo3x: require('@/assets/images/react-logo@3x.png') as ImageSource,
};

// ==================== Lottie 动画资源 ====================

/**
 * Lottie 动画资源
 * 命名规范：使用描述性的英文命名，说明动画用途
 */
const Animations = {
  // 启动页动画
  splash: require('@/assets/animations/4677-valiu-splashscreen-loader.json') as AnimationSource,
  // 加载动画组
  loading: {
    blue: require('@/assets/animations/125704-blue-loading.json') as AnimationSource,
    utensils: require('@/assets/animations/99276-loading-utensils.json') as AnimationSource,
    files: require('@/assets/animations/99297-loading-files.json') as AnimationSource,
  },
  // 骨架屏加载
  skeleton: require('@/assets/animations/list-items-loading-skeleton.json') as AnimationSource,
  // 体育主题动画
  sports: {
    playing: require('@/assets/animations/129327-boy-and-girl-playing-soccer.json') as AnimationSource,
    watching: require('@/assets/animations/129328-sport-fans-watching-match-on-tv.json') as AnimationSource,
    passing: require('@/assets/animations/129360-soccer-player-passing-on-the-ball.json') as AnimationSource,
    receive: require('@/assets/animations/129361-soccer-player-ball-receive-on-body.json') as AnimationSource,
  },
};

// ==================== 资源导出 ====================

/**
 * 统一资源导出对象
 *
 * @example
 * ```tsx
 * // 使用 Tab 图标
 * <Image source={Assets.images.tab.home.normal} />
 *
 * // 使用 Lottie 动画
 * <Lottie source={Assets.animations.splash} />
 *
 * // 使用通用图标
 * <Image source={Assets.images.iconfont.close} />
 * ```
 */
export const Assets: AssetsType = {
  images: {
    tab: TabIcons,
    iconfont: IconfontIcons,
    placeholder: PlaceholderImages,
    app: AppIcons,
  },
  animations: Animations,
};

// ==================== 便捷导出 ====================

/**
 * 导出常用资源的快捷访问方式
 * 减少代码中的路径层级，提高可读性
 */
export const { images, animations } = Assets;
