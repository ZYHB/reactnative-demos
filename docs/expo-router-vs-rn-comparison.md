# Expo Router vs 原生 React Native 完全对比指南

> 本文档基于 CSDN 博客文章《Expo Router vs 原生React Native 完全对比指南》整理而成
>
> **原作者**: 酷酷的鱼
> **发布时间**: 2026-01-15
> **原文链接**: https://blog.csdn.net/cool_sec/article/details/156983515
> **阅读量**: 656次 | **点赞**: 27次 | **收藏**: 23次

---

## 目录

1. [核心对比总结](#核心对比总结)
2. [目录结构对比](#目录结构对比)
3. [核心区别详解](#核心区别详解)
4. [路由系统深度对比](#路由系统深度对比)
5. [Tab 导航机制](#tab-导航机制)
6. [项目结构最佳实践](#项目结构最佳实践)
7. [优劣势分析](#优劣势分析)
8. [学习路径建议](#学习路径建议)
9. [迁移指南](#迁移指南)
10. [关键要点总结](#关键要点总结)

---

## 核心对比总结

| 特性 | 原生 React Native | Expo + Expo Router |
|------|------------------|-------------------|
| **路由机制** | 代码式路由（React Navigation） | 文件系统路由 |
| **原生代码目录** | 包含完整的 android/ 和 ios/ | 默认不包含（托管工作流） |
| **配置复杂度** | 高（需配置 Gradle、Podfile） | 低（app.json 统一管理） |
| **路由配置** | 手动在代码中注册 | 文件结构即路由 |
| **新增页面** | 1. 创建组件<br>2. 注册路由<br>3. 配置导航 | 1. 创建文件 |
| **类型安全** | 需手动配置 TypeScript | 自动生成类型 |
| **URL 支持** | 需额外配置 | 原生支持 |
| **开发速度** | 较慢 | 极快 |
| **学习曲线** | 陡峭 | 平缓 |

---

## 目录结构对比

### 原生 React Native 项目结构

使用 `react-native init` 创建的项目结构：

```
my-app/
├── android/              ⚠️ 原生 Android 代码目录
│   ├── app/
│   ├── gradle/
│   └── build.gradle
├── ios/                  ⚠️ 原生 iOS 代码目录
│   ├── MyApp/
│   ├── MyApp.xcodeproj
│   └── Podfile
├── src/
│   ├── screens/
│   ├── components/
│   └── navigation/       ⚠️ 需要手动配置路由
├── App.tsx
├── index.js              ⚠️ 入口文件
├── metro.config.js
├── babel.config.js
└── package.json
```

**特点**：
- 包含完整的原生代码目录
- 需要手动配置路由系统
- 需要维护多个配置文件

### Expo 项目结构

使用 `npx create-expo-app` 创建的项目结构：

```
my-app/
├── app/                  ✨ 基于文件的路由目录（pages）
│   ├── (tabs)/          ✨ 分组路由（Tab 导航）
│   │   ├── _layout.tsx  ✨ Tab 布局配置
│   │   ├── index.tsx    → 路由: /
│   │   └── explore.tsx  → 路由: /explore
│   ├── _layout.tsx      ✨ 根布局
│   ├── modal.tsx        → 路由: /modal
│   └── pages/user/
│       └── index.tsx    → 路由: /pages/user
│
├── components/          ✨ 可复用 UI 组件（非路由）
├── constants/
├── hooks/
├── assets/
├── app.json             ✨ Expo 配置文件
├── babel.config.js
└── package.json
```

**特点**：
- 无原生代码目录（托管工作流）
- 文件系统自动映射为路由
- 统一的 app.json 配置文件

---

## 核心区别详解

### 1. 原生代码目录

| 特性 | 原生 RN | Expo |
|------|----------|------|
| **android/** | ✅ 包含完整 Android 原生代码 | ❌ 默认不包含（托管） |
| **ios/** | ✅ 包含完整 iOS 原生代码 | ❌ 默认不包含（托管） |
| **原生模块** | ✅ 完全自由添加 | ⚠️ 受限于 Expo SDK |
| **配置复杂度** | 🔴 高（需配置 Gradle/Podfile） | 🟢 低（app.json 统一管理） |
| **弹出选项** | - | ✅ 可用 `expo prebuild` 生成原生目录 |

**说明**：
- **Expo 托管工作流 (Managed Workflow)**：无需接触原生代码，适合快速开发
- **Expo 裸工作流 (Bare Workflow)**：运行 `npx expo prebuild` 生成原生目录，获得原生 RN 的灵活性

### 2. 路由系统

#### 原生 RN - 代码式路由（React Navigation）

```typescript
// src/navigation/AppNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 使用路由
navigation.navigate('User');
```

#### Expo Router - 文件系统路由

```
app/
├── index.tsx           → 自动映射路由: /
├── user.tsx            → 自动映射路由: /user
└── modal.tsx           → 自动映射路由: /modal
```

```typescript
// 使用路由
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/user');  // 直接使用路径
```

**对比表格**：

| 特性 | 原生 RN | Expo Router |
|------|----------|------------|
| **路由配置** | 手动在代码中注册 | 文件结构即路由 |
| **新增页面** | 1. 创建组件<br>2. 注册路由<br>3. 配置导航 | 1. 创建文件 ✅ |
| **路由跳转** | `navigation.navigate('ScreenName')` | `router.push('/path')` |
| **类型安全** | ⚠️ 需手动配置 TypeScript | ✅ 自动生成类型 |
| **URL 支持** | ❌ 需额外配置 | ✅ 原生支持 |

### 3. 入口文件差异

#### 原生 RN

```javascript
// index.js
import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('MyApp', () => App);
```

#### Expo

```json
// package.json
{
  "main": "expo-router/entry"
}
```

**说明**：Expo 使用统一的入口，自动处理路由初始化。

### 4. 配置文件差异

#### 原生 RN - 多文件配置

```
android/app/build.gradle    # Android 配置
ios/Info.plist              # iOS 配置
app.json                    # Metro 配置
```

#### Expo - 统一配置

```json
// app.json
{
  "expo": {
    "name": "my-app",
    "icon": "./assets/icon.png",
    "android": { ... },
    "ios": { ... },
    "web": { ... }
  }
}
```

### 5. 原生模块添加流程

#### 原生 RN

```bash
# 1. 安装库
npm install react-native-camera

# 2. 链接原生代码（如需要）
cd ios && pod install

# 3. 手动配置
# - 修改 android/app/build.gradle
# - 修改 AndroidManifest.xml
# - 配置权限等
```

#### Expo

```bash
# Managed Workflow（仅 Expo SDK 模块）
npx expo install expo-camera

# Bare Workflow（任何模块）
npx expo prebuild  # 生成原生目录
npm install react-native-camera
cd ios && pod install
```

---

## 路由系统深度对比

### 核心理念差异

**原生 RN**：组件即路由
- 路由是**运行时**的导航配置
- 需要显式声明每个 Screen

**Expo Router**：文件即路由
- 路由是**编译时**的文件结构
- 文件系统映射为 URL 结构

### 实际案例：添加用户详情页

#### 原生 RN 需要做的事

```typescript
// 1️⃣ 创建 src/screens/UserDetailScreen.tsx
export default function UserDetailScreen({ route }) {
  const { userId } = route.params;
  return <Text>User {userId}</Text>;
}

// 2️⃣ 修改 src/navigation/AppNavigator.tsx
<Stack.Screen
  name="UserDetail"
  component={UserDetailScreen}
  options={{ title: '用户详情' }}
/>

// 3️⃣ 使用导航
navigation.navigate('UserDetail', { userId: 123 });
```

#### Expo Router 需要做的事

```typescript
// 1️⃣ 创建 app/user/[id].tsx
import { useLocalSearchParams } from 'expo-router';

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams();
  return <Text>User {id}</Text>;
}

// 2️⃣ 完成！使用路由
router.push('/user/123');
```

**工作量对比**：
- 原生 RN：3 个步骤，涉及 2 个文件
- Expo Router：1 个步骤，1 个文件 ✅

---

## Tab 导航机制

### 原生 RN 的 Tab 实现

```typescript
// 需要创建 src/navigation/TabNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="compass" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// 然后在主导航器中嵌套
<Stack.Navigator>
  <Stack.Screen name="MainTabs" component={TabNavigator} />
  <Stack.Screen name="Modal" component={ModalScreen} />
</Stack.Navigator>
```

### Expo Router 的 Tab 实现

#### 目录结构

```
app/
├── (tabs)/                 ✨ 括号 = 分组路由（不影响 URL）
│   ├── _layout.tsx        ✨ Tab 配置文件
│   ├── index.tsx          → URL: /
│   └── explore.tsx        → URL: /explore
├── _layout.tsx            ✨ 根布局
└── modal.tsx              → URL: /modal
```

#### Tab 配置文件

```typescript
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

### 分组路由 `(tabs)` 的魔法

**关键特性**：

1. **括号包裹的目录不会出现在 URL 中**

   ```
   app/(tabs)/index.tsx  → URL: /        (不是 /tabs/)
   app/(tabs)/explore.tsx → URL: /explore (不是 /tabs/explore)
   ```

2. **`_layout.tsx` 决定子页面的渲染方式**

   - 使用 `<Tabs>` → 底部 Tab 导航
   - 使用 `<Stack>` → 堆栈导航
   - 使用 `<Drawer>` → 抽屉导航

3. **自动子页面注册**

   - `(tabs)` 目录下的所有页面自动成为 Tab 页
   - 无需手动逐个注册

### Tab 底层封装链

```
expo-router 的 <Tabs>
    ↓ 封装
@react-navigation/bottom-tabs
    ↓ 基于
React Navigation 7.x
    ↓ 使用
React Native 核心组件 (View, TouchableOpacity, Animated)
```

### 添加新 Tab 页面对比

#### 原生 RN

```typescript
// 1️⃣ 创建 src/screens/ProfileScreen.tsx
export default function ProfileScreen() {
  return <Text>Profile</Text>;
}

// 2️⃣ 修改 TabNavigator.tsx
<Tab.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    tabBarIcon: ({ color, size }) => (
      <Icon name="person" size={size} color={color} />
    ),
  }}
/>
```

#### Expo Router

```typescript
// 1️⃣ 创建 app/(tabs)/profile.tsx
export default function ProfileScreen() {
  return <Text>Profile</Text>;
}

// 2️⃣ 修改 app/(tabs)/_layout.tsx
<Tabs.Screen
  name="profile"
  options={{
    title: 'Profile',
    tabBarIcon: ({ color }) => (
      <IconSymbol size={28} name="person.fill" color={color} />
    ),
  }}
/>
```

**对比结果**：
- 代码量相当
- Expo Router 更符合直觉（文件结构即路由）
- URL 访问：Expo 自动支持 `/profile` 路径

---

## 项目结构最佳实践

### ❌ 错误做法：所有代码放在 app/

```
app/
├── index.tsx
├── user.tsx
├── api.ts              ❌ 会被识别为路由 /api
├── utils.ts            ❌ 会被识别为路由 /utils
└── config.ts           ❌ 会被识别为路由 /config
```

**问题**：`app/` 目录下的所有文件都会被 expo-router 自动解析为路由！

### ✅ 正确做法：app/ 只放页面

```
my-app/
├── app/                  ✅ 纯粹的路由/页面
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── explore.tsx
│   ├── _layout.tsx
│   └── pages/user/
│       └── index.tsx
│
├── api/                  ✅ API 调用层
│   ├── user.ts
│   ├── auth.ts
│   └── request.ts
│
├── utils/                ✅ 工具函数
│   ├── format.ts
│   ├── validate.ts
│   └── storage.ts
│
├── services/             ✅ 业务逻辑服务
│   ├── authService.ts
│   └── userService.ts
│
├── hooks/                ✅ 自定义 Hooks
│   ├── useAuth.ts
│   └── useUser.ts
│
├── store/                ✅ 状态管理
│   ├── userStore.ts
│   └── appStore.ts
│
├── types/                ✅ TypeScript 类型
│   ├── user.ts
│   └── api.ts
│
├── components/           ✅ UI 组件（非路由）
│   ├── ui/
│   └── business/
│
├── constants/
└── assets/
```

### 核心原则

**`app/` 目录应该放的内容**：
- ✅ 页面组件（index.tsx, about.tsx 等）
- ✅ 布局文件（_layout.tsx）
- ✅ 特殊文件（+html.tsx, +not-found.tsx 等）

**`app/` 目录不应该放的内容**：
- ❌ API 调用函数
- ❌ 工具函数
- ❌ 业务逻辑
- ❌ 状态管理
- ❌ 类型定义
- ❌ 配置文件

**原因**：`app/` 目录下的文件/文件夹会被 expo-router 自动解析为路由！

---

## 优劣势分析

### 原生 React Native

**优势**：
- ✅ 完全掌控原生代码
- ✅ 不受第三方 SDK 限制
- ✅ 可使用任何原生模块
- ✅ 更成熟的生态系统

**劣势**：
- ❌ 配置复杂（Gradle、Podfile 等）
- ❌ 需要 Android Studio/Xcode
- ❌ 路由配置繁琐
- ❌ 学习曲线陡峭
- ❌ 构建时间长

### Expo + Expo Router

**优势**：
- ✅ 开发速度极快
- ✅ 文件系统路由（类似 Next.js）
- ✅ 无需接触原生代码
- ✅ 统一配置管理（app.json）
- ✅ 内置 OTA 更新
- ✅ 云构建支持（EAS Build）
- ✅ Web 支持开箱即用
- ✅ 学习曲线平缓

**劣势**：
- ❌ 原生模块受限（Managed Workflow）
- ⚠️ 应用体积稍大
- ⚠️ 需要 Expo SDK 支持的功能

**弹出选项**：

```bash
# 需要使用 Expo 不支持的原生模块时
npx expo prebuild

# 生成 android/ 和 ios/ 目录
# 转为 Bare Workflow，获得原生 RN 的灵活性
```

---

## 学习路径建议

### 新手推荐

1. **从 Expo 开始** ✅

   - 快速上手 React Native 开发
   - 理解组件、状态、导航等核心概念
   - 体验文件系统路由的便利

2. **掌握 Expo Router**

   - 文件结构即路由
   - 布局系统（_layout.tsx）
   - 分组路由（括号语法）
   - 动态路由（[id].tsx）

3. **深入原生 RN**（可选）

   - 需要特殊原生模块时
   - 学习 React Navigation
   - 理解原生桥接机制

### 项目选择建议

**使用 Expo 如果**：
- 快速原型开发
- 创业公司 MVP
- 大部分功能 Expo SDK 覆盖
- 团队没有原生开发经验

**使用原生 RN 如果**：
- 需要大量自定义原生模块
- 对包体积有严格要求
- 需要深度定制原生功能
- 团队有原生开发能力

---

## 迁移指南

### 从原生 RN 迁移到 Expo

#### 1. 安装 Expo

```bash
npx install-expo-modules@latest
```

#### 2. 重构路由结构

```bash
src/screens/  →  app/
src/navigation/  →  删除（使用文件路由）
```

#### 3. 更新导航代码

```typescript
// 之前
navigation.navigate('User', { id: 123 });

// 之后
router.push('/user/123');
```

#### 4. 配置文件迁移

```bash
android/  →  可选（使用 expo prebuild 生成）
ios/      →  可选（使用 expo prebuild 生成）
```

---

## 关键要点总结

### 核心结论

1. **Expo Router 代表了 React Native 开发的现代化方向**：
   - 📁 文件系统路由 - 告别繁琐的路由配置
   - 🚀 快速迭代 - 专注业务逻辑而非基础设施
   - 🌐 Web 优先 - 天然支持跨平台（含 Web）
   - 🛠️ 渐进增强 - 需要时可转为原生 RN

2. **路由机制是核心差异**：
   - 原生 RN：组件即路由（运行时配置）
   - Expo Router：文件即路由（编译时映射）

3. **选择适合自己的方案**：
   - 快速开发、团队无原生经验 → Expo
   - 深度定制、大量原生模块 → 原生 RN

### 最佳实践

1. **app/ 目录只放页面**
   - 相当于 Next.js 的 pages/ 或 app/
   - 不要放业务逻辑、工具函数等

2. **业务代码同级组织**
   - `api/` - API 调用
   - `services/` - 业务逻辑
   - `utils/` - 工具函数
   - `hooks/` - 自定义 Hooks
   - `store/` - 状态管理

3. **善用分组路由**
   - `(tabs)/` - Tab 导航
   - `(auth)/` - 认证相关页面
   - `(drawer)/` - 抽屉导航

4. **类型安全**
   - Expo Router 自动生成路由类型
   - 使用 `Href<>` 类型获得路径提示

5. **渐进增强**
   - 从 Managed Workflow 开始
   - 需要时使用 `expo prebuild` 转为 Bare Workflow

---

## 附录：实战示例 - 完整的用户登录功能

### 原生 RN 实现

```
src/
├── screens/
│   └── LoginScreen.tsx          # 页面
├── navigation/
│   └── AppNavigator.tsx         # 路由配置
├── api/
│   └── auth.ts                  # API 调用
├── services/
│   └── AuthService.ts           # 业务逻辑
└── hooks/
    └── useAuth.ts               # Hook
```

```typescript
// 1️⃣ src/api/auth.ts
export const login = async (username: string, password: string) => {
  return await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
};

// 2️⃣ src/services/AuthService.ts
export class AuthService {
  async login(username: string, password: string) {
    const data = await login(username, password);
    await AsyncStorage.setItem('token', data.token);
    return data;
  }
}

// 3️⃣ src/hooks/useAuth.ts
export const useAuth = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async (username: string, password: string) => {
    const authService = new AuthService();
    const userData = await authService.login(username, password);
    setUser(userData);
  };

  return { user, login: handleLogin };
};

// 4️⃣ src/screens/LoginScreen.tsx
export default function LoginScreen({ navigation }) {
  const { login } = useAuth();

  const handleSubmit = async () => {
    await login(username, password);
    navigation.navigate('Home');  // 手动导航
  };

  return <View>...</View>;
}

// 5️⃣ src/navigation/AppNavigator.tsx
<Stack.Screen name="Login" component={LoginScreen} />
```

### Expo Router 实现

```
my-app/
├── app/
│   └── login.tsx                # 页面（自动路由）
├── api/
│   └── auth.ts                  # API 调用
├── services/
│   └── authService.ts           # 业务逻辑
└── hooks/
    └── useAuth.ts               # Hook
```

```typescript
// 1️⃣ api/auth.ts（同上）
export const login = async (username: string, password: string) => {
  return await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
};

// 2️⃣ services/authService.ts（同上）
export class AuthService {
  async login(username: string, password: string) {
    const data = await login(username, password);
    await AsyncStorage.setItem('token', data.token);
    return data;
  }
}

// 3️⃣ hooks/useAuth.ts（同上）
export const useAuth = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async (username: string, password: string) => {
    const authService = new AuthService();
    const userData = await authService.login(username, password);
    setUser(userData);
  };

  return { user, login: handleLogin };
};

// 4️⃣ app/login.tsx
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    await login(username, password);
    router.replace('/');  // 使用路径导航
  };

  return <View>...</View>;
}

// ✅ 无需第 5 步！文件即路由
```

### 关键差异

1. **路由注册**：Expo Router 无需手动注册
2. **导航方式**：
   - 原生 RN：`navigation.navigate('ScreenName')`
   - Expo：`router.push('/path')`
3. **类型安全**：Expo 自动生成路由类型

---

**文档创建时间**: 2026-01-15
**基于版本**: Expo 54.0 / expo-router 6.0
**整理者**: Claude Code

---

> **结语**：无论选择哪种方案，理解它们的差异和适用场景才是关键！
