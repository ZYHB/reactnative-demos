# Expo Router 完全指南

> 基于 Expo Router v6 + Expo SDK 54 的最佳实践指南
>
> 面向中级开发者的实战参考文档

## 目录

1. [工作原理](#工作原理)
2. [路由类型](#路由类型)
3. [导航与路由管理](#导航与路由管理)
4. [最佳实践](#最佳实践)
5. [性能优化](#性能优化)
6. [常见问题](#常见问题)

---

## 工作原理

### 核心概念

Expo Router 是基于文件系统的路由库，它将 `app/` 目录中的文件直接映射到应用的路由结构。

#### 1. 文件系统映射规则

```
app/
├── _layout.tsx           # 根布局（相当于 App.js）
├── index.tsx             # 首页 (/)
├── modal.tsx             # 模态窗口 (/modal)
├── (tabs)/              # 路由组（URL 中不显示）
│   ├── _layout.tsx       # Tabs 布局定义
│   ├── index.tsx         # 默认 Tab (/)
│   ├── news.tsx          # 新闻 Tab (/news)
│   └── shopcart.tsx     # 购物车 Tab (/shopcart)
└── pages/               # 页面组
    ├── home/
    │   └── index.tsx     # 首页内容 (/pages/home)
    ├── product/
    │   └── [id].tsx      # 动态路由 (/pages/product/123)
    └── setting/
        └── index.tsx     # 设置页 (/pages/setting)
```

**关键规则**：

1. **所有页面必须在 `app/` 目录中**
   - 每个 `.tsx`/`.js` 文件自动成为路由（除了 `_layout.tsx`）
   - 页面文件必须有 `default` 导出

2. **每个页面都有对应的 URL**
   - 支持深链接（Deep Linking）
   - Web、iOS、Android 平台统一
   - 例如：`app/pages/product/[id].tsx` → `myapp://pages/product/123`

3. **`index.tsx` 是默认路由**
   - 应用启动时查找第一个 `index.tsx`
   - 可以通过路由组 `(tabs)` 改变默认起始位置
   - 例如：`app/(tabs)/index.tsx` 作为根路由 `/`

4. **根 `_layout.tsx` 替代 `App.js`**
   - 在此定义全局初始化代码
   - 加载字体、配置主题、Provider 设置
   - 定义顶层导航结构

5. **非导航组件放在 `app/` 外**
   - 组件、工具函数、hooks 应放在 `components/`、`utils/` 等
   - 避免在 `app/` 中放置非路由文件

**项目中的实际应用**：

```typescript
// app/_layout.tsx - 根布局
import { Stack } from 'expo-router';

export const unstable_settings = {
  anchor: '(tabs)',  // 锚点到 tabs 路由组
};

export default function RootLayout() {
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
```

#### 2. Metro Bundler 的路由处理

Expo Router 通过 Metro Bundler 的自定义配置实现文件系统路由：

**工作流程**：

1. **文件扫描与解析**
   - Metro 在启动时扫描 `app/` 目录
   - 识别路由文件（排除 `_layout.tsx`、组件文件）
   - 构建路由树结构

2. **代码分割（Code Splitting）**
   - 每个路由文件作为独立模块
   - 生产环境自动启用懒加载
   - 开发环境延迟打包（Deferred Bundling）

3. **类型化路由（Typed Routes）**
   ```json
   // app.json
   {
     "expo": {
       "experiments": {
         "typedRoutes": true  // 启用类型安全路由
       }
     }
   }
   ```

4. **路由注册**
   - `package.json` 中的 `"main": "expo-router/entry"` 是关键
   - Expo Router 作为入口点接管应用启动
   - 自动将文件结构转换为 React Navigation 配置

#### 3. 路由参数传递

**动态路由参数**：

```typescript
// app/pages/product/[id].tsx
import { useLocalSearchParams } from 'expo-router';

export default function ProductDetail() {
  // 获取路由参数
  const { id } = useLocalSearchParams<{ id: string }>();

  return <Text>Product ID: {id}</Text>;
}

// 导航时传递参数
router.push('/pages/product/123');
```

**查询参数**：

```typescript
// URL: /pages/product?id=123&category=electronics
const { id, category } = useLocalSearchParams();

// 或者通过导航传递
router.push({
  pathname: '/pages/product/[id]',
  params: { id: '123', category: 'electronics' }
});
```

**全局搜索参数**：

```typescript
import { useGlobalSearchParams } from 'expo-router';

// 获取所有页面的参数（包括父路由）
const params = useGlobalSearchParams();
```

#### 4. 页面导航栈管理

Expo Router 基于 React Navigation，因此遵循相同的导航栈概念：

**Stack 导航栈**：

```typescript
// 导航历史：[Home] -> [Product] -> [Detail]
router.push('/pages/product');      // push 入栈
router.push('/pages/product/123');   // 继续入栈
router.back();                      // 返回上一页（出栈）
router.replace('/pages/home');       // 替换当前页面
```

**Tabs 导航状态隔离**：

```typescript
// 每个 Tab 有独立的导航栈
// Tab 1: [Home] -> [Detail]
// Tab 2: [Profile]
// 切换 Tab 时保持各自的导航状态
```

**Modal 导航**：

```typescript
// Modal 不受 Stack 影响，独立呈现
<Stack.Screen
  name="modal"
  options={{ presentation: 'modal' }}
/>
```

---

## 路由类型

### 1. 文件路由 (app/)

基础路由类型，每个文件对应一个页面。

**普通路由**：

```typescript
// app/about.tsx
export default function AboutScreen() {
  return <View><Text>About Page</Text></View>;
}
```

**动态路由**：

```typescript
// app/user/[id].tsx
import { useLocalSearchParams } from 'expo-router';

export default function UserProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Text>User {id}</Text>;
}

// 访问：/user/evanbacon
```

**嵌套动态路由**：

```typescript
// app/user/[id]/posts/[postId].tsx
const { id, postId } = useLocalSearchParams();
// URL: /user/evanbacon/posts/42
```

**可选参数**：

```typescript
// app/product/[slug].tsx
// 使用 ? 表示可选（虽然文件名不包含 ?）
// 通过查询参数实现可选性
const { slug, variant } = useLocalSearchParams();
// URL: /product/phone?variant=pro
```

### 2. Tabs 路由 (app/(tabs)/)

使用路由组创建底部标签导航。

**Tabs 布局配置**：

```typescript
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/tab-bar-icon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: true,
        tabBarStyle: { backgroundColor: '#FFF' },
        tabBarButton: HapticTab,  // 自定义 Tab 按钮组件
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} color={color} name="index" />
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: '新品',
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} color={color} name="news" />
          ),
        }}
      />
      {/* 更多 Tab */}
    </Tabs>
  );
}
```

**隐藏某个 Tab**：

```typescript
<Tabs.Screen
  name="hidden"
  options={{
    href: null,  // 不在 Tab Bar 显示，但仍可通过 URL 访问
  }}
/>
```

**动态路由作为 Tab**：

```typescript
<Tabs.Screen
  name="[user]"
  options={{
    href: {
      pathname: '/[user]',
      params: { user: 'current' },
    },
    tabBarIcon: ({ color }) => <Icon name="user" color={color} />,
  }}
/>
```

**三种 Tab 导航器类型**：

1. **JavaScript Tabs**（默认）
   - 基于 React Navigation Bottom Tabs
   - 高度可定制
   - 跨平台一致体验

2. **Native Tabs**
   - 使用原生 Tab Bar
   - 更接近系统原生体验
   - 配置：`<Tabs navigator="native" />`

3. **Custom Tabs**
   - 完全自定义的 Tab 布局
   - 使用 `expo-router/ui` 的无头组件
   - 适合复杂 UI 模式

### 3. Stack 路由

提供基于栈的导航，支持 push/pop 操作。

**根 Stack 布局**：

```typescript
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      <Stack.Screen
        name="pages/product/[id]"
        options={{
          title: '商品详情',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
```

**嵌套 Stack**：

```typescript
// app/pages/_layout.tsx
export default function PagesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{ title: '商品详情' }}
      />
    </Stack>
  );
}
```

**Stack 配置选项**：

```typescript
<Stack
  screenOptions={{
    headerShown: true,
    headerStyle: { backgroundColor: '#fff' },
    headerTitleStyle: { color: '#000' },
    presentation: 'card',  // 'card' | 'modal' | 'transparentModal'
    animation: 'default',   // 'default' | 'fade' | 'none'
  }}
>
```

### 4. Modal 路由

模态窗口从底部滑入或全屏覆盖。

**基本 Modal**：

```typescript
// app/modal.tsx
import { Link } from 'expo-router';

export default function ModalScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>This is a modal</Text>
      <Link href="/" dismissTo>
        <Text>关闭</Text>
      </Link>
    </View>
  );
}
```

**Modal 配置**：

```typescript
// app/_layout.tsx
<Stack.Screen
  name="modal"
  options={{
    presentation: 'modal',
    title: 'Modal',
    headerShown: true,
    animation: 'slide_from_bottom',
  }}
/>
```

**不同呈现模式**：

```typescript
options={{
  presentation: 'card',              // 默认，从右侧滑入
  presentation: 'modal',             // 从底部滑入，全屏
  presentation: 'transparentModal',   // 透明模态，背景可见
  presentation: 'fullScreenModal',   // 全屏模态
}}
```

**Web Modal（需要单独配置）**：

```typescript
// Web 端使用不同的 Modal 实现
import { useSegments } from 'expo-router';

// 在 Web 上可以通过 URL 参数控制模态状态
```

---

## 导航与路由管理

### 1. 使用 useRouter Hook

程序化导航的主要方式。

**基本导航方法**：

```typescript
import { useRouter } from 'expo-router';

export default function MyScreen() {
  const router = useRouter();

  return (
    <View>
      <Button onPress={() => router.push('/pages/setting')}>
        前往设置
      </Button>
      <Button onPress={() => router.back()}>
        返回
      </Button>
      <Button onPress={() => router.replace('/pages/home')}>
        替换当前页面
      </Button>
    </View>
  );
}
```

**带参数导航**：

```typescript
// 对象形式
router.push({
  pathname: '/pages/product/[id]',
  params: { id: '123' },
});

// 字符串形式
router.push('/pages/product/123');

// 带查询参数
router.push({
  pathname: '/pages/product/[id]',
  params: { id: '123', variant: 'pro' },
});
```

**导航选项**：

```typescript
router.push('/pages/detail', {
  // 相对导航（实验性功能）
});

// 返回并传递参数
router.back({
  someData: 'result',
});
```

### 2. 使用 Link 组件

声明式导航，类似于 Web 的 `<a>` 标签。

**基本用法**：

```typescript
import { Link } from 'expo-router';

<Link href="/pages/setting">
  <Text>前往设置</Text>
</Link>
```

**带样式**：

```typescript
<Link href="/pages/product/123" style={styles.link}>
  <Text style={styles.linkText}>查看商品</Text>
</Link>
```

**Link vs useRouter**：

| 特性 | Link 组件 | useRouter Hook |
|------|-----------|----------------|
| 用途 | 声明式导航 | 程序化导航 |
| 适用场景 | 静态链接、按钮 | 条件导航、逻辑复杂 |
| 样式 | 容易应用样式 | 需要手动处理 |
| 可访问性 | 内置支持 | 需要额外配置 |

**外部链接**：

```typescript
import { ExternalLink } from '@/components/external-link';

<ExternalLink href="https://expo.dev">
  <Text>访问 Expo 官网</Text>
</ExternalLink>
```

### 3. 路由 Hooks 详解

**useLocalSearchParams()**：

```typescript
// 获取当前路由的参数
const params = useLocalSearchParams();
const { id, category } = useLocalSearchParams<{
  id: string;
  category?: string;
}>();

// 用于动态路由 [id].tsx
```

**useGlobalSearchParams()**：

```typescript
// 获取所有路由的参数（包括父路由）
const allParams = useGlobalSearchParams();

// 适用场景：
// - 需要访问父路由传递的参数
// - 全局筛选条件
```

**useSegments()**：

```typescript
// 获取当前激活的路由片段
const segments = useSegments();
// 返回: ['tabs', 'product', '123']

// 用于：
// - 根据路由改变样式
// - 条件渲染
```

**usePathname()**：

```typescript
// 获取当前完整路径
const pathname = usePathname();
// 返回: '/pages/product/123'

// 用于：
// - 页面标识
// - 面包屑导航
```

### 4. 导航事件与生命周期

**监听导航焦点**：

```typescript
import { useFocusEffect } from '@react-navigation/native';

useFocusEffect(
  React.useCallback(() => {
    // 页面获得焦点时执行
    console.log('Screen focused');

    return () => {
      // 页面失去焦点时清理
      console.log('Screen unfocused');
    };
  }, [])
);
```

**导航监听器**：

```typescript
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

useEffect(() => {
  const unsubscribe = navigation.addListener('beforeRemove', (e) => {
    // 阻止默认行为
    e.preventDefault();

    // 显示确认对话框
    Alert.alert(
      '确认退出？',
      '未保存的更改将丢失',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确认',
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]
    );
  });

  return unsubscribe;
}, [navigation]);
```

### 5. 深链接 (Deep Linking)

**配置 Scheme**：

```json
// app.json
{
  "expo": {
    "scheme": "myapp",
    "ios": {
      "bundleIdentifier": "com.myapp"
    },
    "android": {
      "package": "com.myapp"
    }
  }
}
```

**处理传入链接**：

```typescript
import * as Linking from 'expo-linking';

// 解析 URL
const url = Linking.useURL();

// 在 _layout.tsx 中处理初始链接
const handleURL = (url: string | null) => {
  if (url) {
    const { hostname, path, queryParams } = Linking.parse(url);
    // 根据链接导航
  }
};

useEffect(() => {
  Linking.getInitialURL().then(handleURL);

  const subscription = Linking.addEventListener('url', ({ url }) => {
    handleURL(url);
  });

  return () => subscription.remove();
}, []);
```

**测试深链接**：

```bash
# iOS Simulator
xcrun simctl openurl booted "myapp://pages/product/123"

# Android
adb shell am start -W -a android.intent.action.VIEW -d "myapp://pages/product/123" com.myapp
```

---

## 最佳实践

### 1. 目录结构组织

**推荐的项目结构**：

```
my-app/
├── app/                      # 路由目录（Expo Router 核心）
│   ├── _layout.tsx            # 根布局
│   ├── (tabs)/                # Tab 路由组
│   │   ├── _layout.tsx        # Tabs 布局
│   │   ├── index.tsx          # 首页 Tab
│   │   ├── news.tsx           # 新品 Tab
│   │   └── mine.tsx          # 我的 Tab
│   ├── modal.tsx              # 模态窗口
│   └── pages/                # 功能页面
│       ├── _layout.tsx        # 页面组布局
│       ├── home/
│       ├── product/
│       │   └── [id].tsx      # 动态路由
│       └── setting/
│
├── components/               # 可复用组件
│   ├── ui/                 # UI 基础组件
│   ├── common-appbar/       # 通用应用栏
│   ├── common-cell/         # 通用单元格
│   └── tab-bar-icon/       # Tab 图标
│
├── hooks/                   # 自定义 Hooks
│   ├── use-color-scheme.ts
│   ├── use-theme-color.ts
│   └── use-auth.ts
│
├── utils/                   # 工具函数
│   ├── http/               # 网络请求
│   ├── storage.ts           # 本地存储
│   ├── validation.ts        # 数据验证
│   └── format/             # 格式化工具
│
├── constants/               # 常量定义
│   ├── theme.ts            # 主题配置
│   ├── paths.ts            # 路径常量
│   └── api.ts             # API 端点
│
├── services/               # 业务服务层
│   ├── auth.service.ts
│   ├── product.service.ts
│   └── user.service.ts
│
├── stores/                 # 状态管理
│   ├── auth.store.ts
│   └── cart.store.ts
│
├── types/                  # TypeScript 类型定义
│   ├── api.types.ts
│   ├── component.types.ts
│   └── navigation.types.ts
│
├── styles/                 # 样式配置
│   ├── common.ts
│   └── variables.ts
│
└── theme/                  # 主题相关
    ├── colors.ts
    └── typography.ts
```

**关键原则**：

1. **`app/` 目录仅用于路由**
   - 每个文件对应一个 URL
   - 避免放置非路由文件

2. **组件分离**
   - UI 组件放在 `components/`
   - 业务逻辑通过 `services/` 封装
   - 状态管理集中到 `stores/`

3. **按功能模块组织**
   - 相关页面放在同一子目录
   - 例如：`app/pages/account/` 包含登录、注册等

4. **路径别名配置**
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```

**实际项目的目录组织示例**：

```typescript
// 组件复用示例
// app/(tabs)/index.tsx - 简单的容器组件
import HomeScreenContent from '@/app/pages/home';

export default function HomeScreen() {
  return <HomeScreenContent />;
}

// app/pages/home/index.tsx - 实际页面内容
// 这样可以在多个地方复用 home 页面内容
```

### 2. 组件复用策略

**布局组件复用**：

```typescript
// components/layouts/screen-layout.tsx
export function ScreenLayout({
  children,
  title,
  showBack = true,
}: ScreenLayoutProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {(title || showBack) && (
        <CommonAppBar
          title={title}
          showBack={showBack}
          handleBackPress={() => router.back()}
        />
      )}
      {children}
    </View>
  );
}

// 使用
export default function ProductScreen() {
  return (
    <ScreenLayout title="商品详情">
      <ProductContent />
    </ScreenLayout>
  );
}
```

**通用导航组件**：

```typescript
// components/common-appbar/index.tsx
export type CommonAppBarProps = {
  title?: string;
  showBack?: boolean;
  handleBackPress?: (() => void) | undefined;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
};

export function CommonAppBar({
  title,
  showBack = true,
  handleBackPress,
}: CommonAppBarProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        {showBack && (
          <CommonVectorIcon
            name="chevron-back"
            onPress={handleBackPress ?? (() => router.back())}
          />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}
```

**触觉反馈 Tab 按钮**：

```typescript
// components/haptic-tab.tsx
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}

// 在 Tabs 布局中使用
<Tabs tabBarButton={HapticTab}>
```

### 3. 类型安全

**启用类型化路由**：

```json
// app.json
{
  "expo": {
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

**路由参数类型定义**：

```typescript
// types/navigation.types.ts
export type ProductParams = {
  id: string;
  variant?: 'standard' | 'pro';
};

export type UserParams = {
  userId: string;
  tab?: 'posts' | 'comments';
};

// 在页面中使用
export default function ProductDetail() {
  const { id, variant } = useLocalSearchParams<ProductParams>();

  // 现在有完整的类型提示
  const product = useQuery(['product', id], () => fetchProduct(id));
}
```

**Link 组件类型安全**：

```typescript
import type { Href } from 'expo-router';

// 使用 Href 类型确保 URL 字符串正确
const productUrl: Href = '/pages/product/123';

<Link href={productUrl}>
  <Text>查看商品</Text>
</Link>
```

**导航守卫类型**：

```typescript
// hooks/use-auth-redirect.ts
export function useAuthRedirect() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/pages/account/login');
    }
  }, [isAuthenticated, router]);
}
```

### 4. 错误处理

**错误边界**：

```typescript
// components/error-boundary.tsx
export class RouteErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text>出错了！</Text>
          <Button onPress={() => this.setState({ hasError: false })}>
            重试
          </Button>
        </View>
      );
    }

    return this.props.children;
  }
}

// 在 _layout.tsx 中使用
export default function RootLayout() {
  return (
    <RouteErrorBoundary>
      <Stack />
    </RouteErrorBoundary>
  );
}
```

**路由级错误处理**（Async Routes 功能）：

```typescript
// 页面导出 ErrorBoundary
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={styles.errorContainer}>
      <Text>加载失败: {error.message}</Text>
      <Button onPress={retry}>重试</Button>
    </View>
  );
}

export default function MyScreen() {
  // 页面内容
}
```

### 5. 状态管理与路由集成

**Zustand + Expo Router**：

```typescript
// stores/navigation.store.ts
interface NavigationState {
  previousRoute: string | null;
  setPreviousRoute: (route: string) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  previousRoute: null,
  setPreviousRoute: (route) => set({ previousRoute: route }),
}));

// 在路由变更时更新状态
useEffect(() => {
  const unsubscribe = navigation.addListener('state', (e) => {
    const currentRoute = e.data.state.routes[e.data.state.index];
    useNavigationStore.getState().setPreviousRoute(currentRoute.name);
  });

  return unsubscribe;
}, []);
```

**认证状态路由保护**：

```typescript
// app/_layout.tsx
export default function RootLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoaded = useAuthStore((state) => state.isLoaded);
  const segments = useSegments();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(tabs)';

    if (!isAuthenticated && inAuthGroup) {
      router.replace('/pages/account/login');
    }
  }, [isAuthenticated, segments]);

  if (!isLoaded) {
    return <SplashScreen />;
  }

  return <Stack />;
}
```

---

## 性能优化

### 1. 代码分割与懒加载

**自动代码分割**：

Expo Router 默认在生产环境为每个路由创建独立的 bundle。

**Async Routes 功能**（实验性）：

```json
// app.json
{
  "expo": {
    "plugins": [
      [
        "expo-router",
        {
          "asyncRoutes": {
            "web": true,          // Web 端启用
            "default": "development"  // 其他平台开发模式
          }
        }
      ]
    ]
  }
}
```

**特性**：
- 基于 React Suspense
- 路由文件异步加载
- 首次导航会有加载延迟
- 后续访问立即（缓存）

**手动代码分割**：

```typescript
// 对于大型组件，使用 React.lazy
import React, { Suspense } from 'react';

const HeavyComponent = React.lazy(() => import('@/components/heavy-component'));

export default function ProductScreen() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 2. 渲染优化

**避免不必要的重渲染**：

```typescript
// 使用 React.memo 优化组件
export const ProductCard = React.memo(({ product }: ProductCardProps) => {
  return <Card product={product} />;
}, (prevProps, nextProps) => {
  return prevProps.product.id === nextProps.product.id;
});

// 使用 useMemo 优化计算
const processedData = useMemo(() => {
  return expensiveOperation(rawData);
}, [rawData]);
```

**列表优化**：

```typescript
import { FlatList } from 'react-native';

<FlatList
  data={products}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ProductCard product={item} />}
  removeClippedSubviews={true}  // 移除屏幕外的视图
  maxToRenderPerBatch={10}      // 每批渲染数量
  windowSize={5}               // 渲染窗口大小
  initialNumToRender={10}       // 初始渲染数量
/>
```

### 3. 图片与资源优化

**使用 Expo Image**：

```typescript
import { Image } from 'expo-image';

// 自动缓存和优化
<Image
  source={{ uri: product.imageUrl }}
  style={styles.image}
  contentFit="cover"
  transition={200}  // 淡入动画
/>
```

**预加载关键资源**：

```typescript
import { preloadAssets } from 'expo-manifest';

export default function RootLayout() {
  useEffect(() => {
    preloadAssets([
      require('./assets/images/splash-icon.png'),
    ]);
  }, []);

  return <Stack />;
}
```

### 4. 导航性能

**减少导航栈深度**：

```typescript
// 使用 replace 而不是 push 避免栈过深
router.replace('/pages/home');

// 重置导航栈
router.reset({
  index: 0,
  routes: [{ name: '(tabs)', params: { screen: 'index' } }],
});
```

**延迟加载 Tabs 内容**：

```typescript
// 只在 Tab 激活时加载数据
const [isFocused, setIsFocused] = useState(false);

useFocusEffect(
  useCallback(() => {
    if (!isFocused) {
      setIsFocused(true);
      loadData();
    }
  }, [isFocused])
);
```

### 5. Metro 配置优化

**缓存配置**：

```javascript
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 增加缓存大小以提高性能
config.cacheStores = ['file-system', 'compress'];

module.exports = config;
```

**启动开发服务器时清除缓存**：

```bash
npx expo start --clear
```

---

## 常见问题

### 1. 路由无法识别

**问题**：新增页面文件后，路由不生效。

**解决方案**：

1. 确保文件在 `app/` 目录中
2. 文件必须有 `default` 导出
3. 重启 Metro Bundler：`npx expo start --clear`
4. 检查文件命名：避免使用特殊字符

```typescript
// ❌ 错误
export const MyScreen = () => <View />;

// ✅ 正确
export default function MyScreen() {
  return <View />;
}
```

### 2. 路由组 URL 问题

**问题**：使用 `(tabs)` 等路由组后，URL 包含括号。

**原因**：路由组 `(name)` 的括号不应出现在 URL 中。

**正确使用**：

```typescript
// (tabs) 路由组的页面
// 访问 / 而不是 /(tabs)/
// app/(tabs)/index.tsx → /

// 如果需要 URL 段，不要使用括号
// app/home/index.tsx → /home
```

### 3. Tab 导航状态混乱

**问题**：切换 Tab 后，之前的导航状态丢失。

**原因**：默认情况下，Tabs 不保留导航状态。

**解决方案**：使用独立栈

```typescript
// app/(tabs)/_layout.tsx
<Tabs>
  <Tabs.Screen
    name="home"
    options={{
      // 每个 Tab 有独立的导航栈
      href: '/home',
    }}
  >
    {/* 在 home/_layout.tsx 中定义 Stack */}
  </Tabs.Screen>
</Tabs>
```

### 4. 动态路由参数获取为空

**问题**：`useLocalSearchParams()` 获取不到参数。

**解决方案**：

```typescript
// ✅ 正确：文件名使用方括号
// app/product/[id].tsx

// ✅ 正确：导航时传递参数
router.push({
  pathname: '/product/[id]',
  params: { id: '123' },
});

// ❌ 错误：使用查询参数方式
// router.push('/product?id=123');  // 不匹配文件名
```

### 5. 深链接不工作

**问题**：点击深链接后无法打开应用或导航失败。

**解决方案**：

1. **确认 Scheme 配置**：

```json
// app.json
{
  "expo": {
    "scheme": "myapp"  // 必须配置
  }
}
```

2. **iOS 配置 Associated Domains**：

```xml
<!-- ios/<project-name>/Info.plist -->
<key>com.apple.developer.associated-domains</key>
<array>
  <string>applinks:myapp.com</string>
</array>
```

3. **Android Intent Filter**：

```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data
    android:scheme="myapp"
    android:host="pages.product" />
</intent-filter>
```

4. **测试命令**：

```bash
# iOS
xcrun simctl openurl booted "myapp://pages/product/123"

# Android
adb shell am start -W -a android.intent.action.VIEW \
  -d "myapp://pages/product/123" com.myapp
```

### 6. 类型错误

**问题**：启用 `typedRoutes` 后类型报错。

**解决方案**：

```bash
# 清除缓存并重启
npx expo start --clear

# 重置 TypeScript 服务器
# VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### 7. Modal 不在 iOS 底部滑入

**问题**：Modal 表现和普通 Stack 一样。

**解决方案**：

```typescript
// 确保在根 _layout.tsx 中配置 presentation
<Stack.Screen
  name="modal"
  options={{
    presentation: 'modal',
    animation: 'slide_from_bottom',
  }}
/>
```

### 8. 性能问题

**问题**：应用启动慢，导航卡顿。

**优化清单**：

1. 启用生产构建：`npx expo start --no-dev --minify`
2. 使用 Hermes Engine（默认已启用）
3. 减少初始渲染组件数量
4. 使用 `react-native-reanimated` 优化动画
5. 分析 Bundle 大小：`npx expo export --output-dir dist`

---

## 参考资源

### 官方文档

- [Expo Router 核心概念](https://docs.expo.dev/router/basics/core-concepts/) - 文件系统路由基础规则
- [Expo Router 简介](https://docs.expo.dev/router/introduction/) - 功能概览和入门指南
- [导航布局详解](https://docs.expo.dev/router/basics/layout/) - Stack、Tabs、Drawer 等
- [JavaScript Tabs 指南](https://docs.expo.dev/router/advanced/tabs/) - 底部标签导航详细配置
- [Async Routes（实验性）](https://docs.expo.dev/router/web/async-routes/) - 代码分割与懒加载

### 最佳实践

- [Expo 应用文件夹结构最佳实践](https://expo.dev/blog/expo-app-folder-structure-best-practices) - 官方推荐的项目组织方式
- [Metro Bundler 自定义](https://docs.expo.dev/guides/customizing-metro/) - Metro 配置优化
- [React Native 性能策略 | Sentry](https://blog.sentry.io/react-native-performance-strategies-tools/) - 性能优化技巧

### 社区资源

- [Expo Router 完全指南](https://uniquedevs.com/en/blog/how-to-master-expo-router-basics-best-practices-examples-and-comparisons/) - 社区实践总结
- [Why I Switched to Expo Router](https://medium.com/@andrew.chester/why-i-switched-to-expo-router-best-practices-and-implementation-guide-11c31ceb3134) - 迁移经验分享

---

## 结语

Expo Router 为 React Native 应用带来了声明式、文件系统的路由方式，大幅简化了导航配置。通过遵循本指南的最佳实践，您可以：

1. **构建清晰的项目结构**：合理的目录组织、组件复用策略
2. **实现类型安全**：利用 TypeScript 和 typedRoutes 特性
3. **优化应用性能**：代码分割、懒加载、渲染优化
4. **处理复杂场景**：深链接、路由守卫、状态管理集成

持续关注 [Expo 官方博客](https://expo.dev/blog) 和 [Changelog](https://expo.dev/changelog) 获取最新更新和功能。

---

**文档版本**：v1.0
**最后更新**：2026-02-13
**适用版本**：Expo Router v6.0.23, Expo SDK 54
