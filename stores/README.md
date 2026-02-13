# 全局状态管理 (Zustand)

本项目使用 **Zustand** 作为全局状态管理方案。Zustand 是一个轻量级、简单易用的状态管理库。

## Store 结构

```
stores/
├── index.ts              # 统一导出
├── user-store.ts         # 用户状态管理
└── app-store.ts          # 应用全局状态
```

---

## 1. 用户状态 (useUserStore)

### 状态

| 状态 | 类型 | 说明 |
|------|------|------|
| `userInfo` | `UserInfo \| null` | 用户信息 |
| `isLoggedIn` | `boolean` | 是否已登录 |
| `isLoading` | `boolean` | 加载状态 |

### 操作方法

| 方法 | 参数 | 说明 |
|------|------|------|
| `setUser()` | `user: UserInfo` | 设置用户信息并登录 |
| `logout()` | - | 退出登录 |
| `setLoading()` | `loading: boolean` | 设置加载状态 |
| `updateUserInfo()` | `updates: Partial<UserInfo>` | 更新部分用户信息 |

### 使用示例

```typescript
import { useUserStore } from '@/stores';

function UserProfile() {
  // 方式 1: 选择性订阅（推荐）
  const userInfo = useUserStore(state => state.userInfo);
  const isLoggedIn = useUserStore(state => state.isLoggedIn);

  // 方式 2: 获取多个状态
  const { userInfo, isLoggedIn, logout } = useUserStore();

  // 方式 3: 只获取操作方法
  const { setUser } = useUserStore();

  const handleLogin = () => {
    setUser({
      id: '1',
      name: '张三',
      email: 'zhangsan@example.com',
      token: 'xxx-xxx-xxx',
    });
  };

  const handleUpdate = () => {
    useUserStore.getState().updateUserInfo({
      name: '李四',
      avatar: 'https://example.com/avatar.jpg',
    });
  };

  return (
    <View>
      {isLoggedIn ? (
        <>
          <Text>欢迎，{userInfo?.name}</Text>
          <Button title="退出登录" onPress={logout} />
        </>
      ) : (
        <Button title="登录" onPress={handleLogin} />
      )}
    </View>
  );
}
```

---

## 2. 应用全局状态 (useAppStore)

### 状态

| 状态 | 类型 | 说明 |
|------|------|------|
| `isOnline` | `boolean` | 网络连接状态 |
| `globalLoading` | `boolean` | 全局加载状态 |
| `notification` | `Notification \| null` | 通知消息 |
| `activeTab` | `string` | 当前激活的标签页 |

### 操作方法

| 方法 | 参数 | 说明 |
|------|------|------|
| `setOnline()` | `online: boolean` | 设置网络状态 |
| `setGlobalLoading()` | `loading: boolean` | 设置全局加载 |
| `showNotification()` | `message, type?` | 显示通知 |
| `hideNotification()` | - | 隐藏通知 |
| `setActiveTab()` | `tab: string` | 设置当前标签页 |

### 使用示例

```typescript
import { useAppStore } from '@/stores';

function App() {
  const { globalLoading, setGlobalLoading } = useAppStore();
  const { notification, showNotification, hideNotification } = useAppStore();

  const fetchData = async () => {
    setGlobalLoading(true);
    try {
      const data = await api.getData();
      showNotification('加载成功', 'success');
    } catch (error) {
      showNotification('加载失败', 'error');
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <View>
      {globalLoading && <ActivityIndicator />}

      {notification?.visible && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
    </View>
  );
}
```

---

## 常用模式

### 1. 订阅状态更新

```typescript
// 订阅单个状态
const userInfo = useUserStore(state => state.userInfo);

// 订阅多个状态
const { userInfo, isLoggedIn } = useUserStore();

// 使用 shallow 比较避免不必要的重渲染
import { shallow } from 'zustand/shallow';
const { userInfo, isLoggedIn } = useUserStore(
  state => ({ userInfo: state.userInfo, isLoggedIn: state.isLoggedIn }),
  shallow
);
```

### 2. 在组件外使用

```typescript
// 在非 React 环境中获取/设置状态
const state = useUserStore.getState();
state.setUser({ id: '1', name: '张三', email: 'test@example.com' });

// 订阅状态变化
const unsub = useUserStore.subscribe(
  state => state.userInfo,
  (userInfo) => {
    console.log('用户信息已更新:', userInfo);
  }
);

// 取消订阅
unsub();
```

### 3. 异步操作

```typescript
const login = async (username: string, password: string) => {
  const { setLoading, setUser, logout } = useUserStore.getState();

  setLoading(true);
  try {
    const response = await api.login(username, password);
    setUser(response.data);
  } catch (error) {
    logout();
    throw error;
  } finally {
    setLoading(false);
  }
};
```

### 4. 持久化存储 (AsyncStorage)

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      // ... store 定义
    }),
    {
      name: 'user-storage', // AsyncStorage 的 key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

---

## 最佳实践

### 1. ✅ 推荐做法

- ✅ **选择性订阅** - 只订阅需要的状态
- ✅ **将状态逻辑放在 Store 中** - 保持组件简洁
- ✅ **使用 TypeScript** - 为状态和方法添加类型
- ✅ **持久化重要状态** - 用户信息、设置等

### 2. ❌ 避免做法

- ❌ 在 Store 中直接调用 UI 相关 API
- ❌ 过度拆分 Store - 相关状态放在同一个 Store
- ❌ 在多个地方重复订阅同一个状态

---

## 创建新 Store

使用以下模板创建新的 Store：

```typescript
import { create } from 'zustand';

interface YourStore {
  // 状态
  count: number;

  // 操作
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useYourStore = create<YourStore>(set => ({
  // 初始状态
  count: 0,

  // 操作方法
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

然后在 `stores/index.ts` 中导出：

```typescript
export { useYourStore } from './your-store';
```

---

## 相关资源

- [Zustand 官方文档](https://github.com/pmndrs/zustand)
- [Zustand 中文文档](https://zustand-demo.pmnd.rs/)
