# API 服务层

本项目采用分层架构设计，将所有 API 请求逻辑集中在 `services` 目录下统一管理。

## 目录结构

```
services/
├── index.ts              # 统一导出入口
└── api/
    ├── index.ts          # API 模块统一导出
    ├── api.ts            # API 配置和 URL 生成
    ├── jingdong.ts       # 请求管理器（缓存、网络请求）
    ├── home-service.ts   # 首页相关 API
    ├── common-service.ts # 通用 API（用户、订单等）
    └── product-service.ts # 商品相关 API
```

---

## 核心模块

### 1. API 配置 (API)

提供 API URL 生成方法，统一管理 API 地址。

#### 使用示例

```typescript
import { API } from '@/services';

// GitHub API
const githubUrl = API.GET_POPULAR_REPO('react');

// Trending API
const trendingUrl = API.GET_TRENDING_REPO('typescript', 'weekly');

// 京东 API
const jdUrl = API.GET_JINGDONG_REPO('tab/home/welcomeHome.json');
```

---

### 2. 请求管理器 (requestManager)

智能请求管理器，支持**缓存优先**策略，自动处理网络请求和缓存。

#### 特性

- ✅ **缓存优先** - 优先从本地缓存读取，失败则请求网络
- ✅ **自动缓存** - 请求成功后自动缓存数据
- ✅ **统一错误处理** - 集中处理网络错误
- ✅ **控制台日志** - 详细的请求日志，方便调试

#### 方法

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `get()` | `url: string` | `Promise<any>` | 发起 GET 请求（带缓存） |

#### 使用示例

```typescript
import { requestManager } from '@/services';

const fetchData = async () => {
  try {
    // 优先从缓存读取，缓存不存在则请求网络
    const data = await requestManager.get(
      API.GET_JINGDONG_REPO('tab/home/welcomeHome.json')
    );
    console.log('数据:', data);
  } catch (error) {
    console.error('请求失败:', error);
  }
};
```

---

### 3. 服务层 (Services)

按照业务模块划分的服务类，提供类型安全的 API 调用。

#### HomeService - 首页服务

```typescript
import { homeService } from '@/services';

// 欢迎页数据
const welcomeData = await homeService.fetchWelcomeHome();

// 分类首页
const categoryData = await homeService.fetchCategoryHome('pcid-123');

// 分类feeds流
const feedsData = await homeService.fetchCategoryFeeds('pcid-123', 1);

// 时段首页
const hoursData = await homeService.fetchHoursHome();
```

#### CommonService - 通用服务

```typescript
import { commonService } from '@/services';

// 用户信息
const userInfo = await commonService.fetchPersoninfoBusiness();

// 推荐标签
const tabs = await commonService.fetchUniformRecommendTabs();

// 推荐内容
const recommendations = await commonService.fetchUniformRecommend('tab-1', 1);

// 浏览历史
const history = await commonService.fetchBrowseHistory(1);

// 商品收藏
const favorites = await commonService.fetchProductFavorite(1);

// 订单列表
const orders = await commonService.fetchOrderList('all', 1);

// 快手视频
const videos = await commonService.fetchKuaiShowVideoList(1);
```

#### ProductService - 商品服务

```typescript
import { productService } from '@/services';

const shopId = 'shop-123';
const sku = 'sku-456';

// 商品业务信息
const business = await productService.fetchWareBusiness(shopId, sku);

// 异步接口数据
const asyncData = await productService.fetchAsynInteface(shopId, sku);

// 商品详情评论
const comments = await productService.fetchLegoWareDetailComment(shopId, sku);

// 生长信息
const growing = await productService.fetchObtainGrowingInfo(shopId, sku);

// 查询模板
const templates = await productService.fetchQueryTemplates(shopId, sku);

// 统一推荐
const recommend = await productService.fetchUniformRecommend(shopId, sku);
```

---

## 在组件中使用

### 方式 1: 直接导入使用

```typescript
import { homeService, commonService } from '@/services';
import { useEffect, useState } from 'react';

function HomeScreen() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await homeService.fetchWelcomeHome();
        setData(response);
      } catch (error) {
        console.error('加载失败:', error);
      }
    };
    loadData();
  }, []);

  return <View>{/* 渲染数据 */}</View>;
}
```

### 方式 2: 结合 Zustand Store

```typescript
import { homeService } from '@/services';
import { useAppStore } from '@/stores';

function HomeScreen() {
  const { setGlobalLoading, showNotification } = useAppStore();

  const loadData = async () => {
    setGlobalLoading(true);
    try {
      const data = await homeService.fetchWelcomeHome();
      // 处理数据...
      showNotification('加载成功', 'success');
    } catch (error) {
      showNotification('加载失败', 'error');
    } finally {
      setGlobalLoading(false);
    }
  };

  return <Button onPress={loadData} title="加载数据" />;
}
```

### 方式 3: 自定义 Hook

```typescript
import { homeService } from '@/services';
import { useState, useEffect } from 'react';

export function useWelcomeHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await homeService.fetchWelcomeHome();
        setData(response);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
}

// 使用
function HomeScreen() {
  const { data, loading, error } = useWelcomeHome();

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>加载失败</Text>;

  return <View>{/* 渲染数据 */}</View>;
}
```

---

## 扩展服务

### 添加新的服务类

1. 在 `services/api/` 下创建新文件，如 `user-service.ts`

```typescript
import API from './api';
import { requestManager } from './jingdong';

class UserService {
  // 定义接口返回类型
  getUserInfo(userId: string): Promise<any> {
    const fullUrl = API.GET_JINGDONG_REPO(`user/${userId}/info.json`);
    return requestManager.get(fullUrl);
  }

  updateUserProfile(userId: string, data: any): Promise<any> {
    const fullUrl = API.GET_JINGDONG_REPO(`user/${userId}/profile.json`);
    return requestManager.get(fullUrl);
  }
}

export const userService = new UserService();
```

2. 在 `services/api/index.ts` 中导出

```typescript
export { userService } from './user-service';
```

3. 使用

```typescript
import { userService } from '@/services';

const userInfo = await userService.getUserInfo('user-123');
```

---

## 请求缓存策略

### 缓存工作流程

```
发起请求
   ↓
检查本地缓存
   ↓
缓存存在？ → 是 → 返回缓存数据
   ↓ 否
请求网络
   ↓
请求成功？
   ↓ 是 → 缓存数据 + 返回结果
   ↓ 否 → 返回错误
```

### 优点

- 🚀 **快速响应** - 缓存数据即时返回，提升用户体验
- 📱 **离线支持** - 无网络时也能显示缓存数据
- 💰 **节省流量** - 减少重复的网络请求
- 🔄 **数据一致性** - 每次请求会自动更新缓存

---

## 类型定义建议

当前服务使用 `Promise<any>` 作为返回类型。**推荐**添加更精确的类型定义：

```typescript
// 定义 API 响应类型
interface WelcomeHomeResponse {
  code: number;
  data: {
    banners: BannerItem[];
    categories: CategoryItem[];
  };
  message: string;
}

// 在服务类中使用
class HomeService {
  fetchWelcomeHome(): Promise<WelcomeHomeResponse> {
    const fullUrl = API.GET_JINGDONG_REPO('tab/home/welcomeHome.json');
    return requestManager.get(fullUrl);
  }
}
```

---

## 错误处理

### 统一错误处理示例

```typescript
import { requestManager } from '@/services';
import { useAppStore } from '@/stores';

async function safeRequest<T>(
  requestFn: () => Promise<T>,
  errorMessage = '请求失败'
): Promise<T | null> {
  const { showNotification } = useAppStore.getState();

  try {
    return await requestFn();
  } catch (error) {
    console.error(errorMessage, error);
    showNotification(errorMessage, 'error');
    return null;
  }
}

// 使用
const data = await safeRequest(
  () => homeService.fetchWelcomeHome(),
  '加载首页数据失败'
);
```

---

## 最佳实践

### ✅ 推荐做法

- ✅ **统一使用服务层** - 不在组件中直接调用 `fetch` 或 `axios`
- ✅ **添加类型定义** - 为请求和响应添加 TypeScript 类型
- ✅ **错误处理** - 使用 try-catch 包裹异步请求
- ✅ **加载状态** - 向用户显示加载状态
- ✅ **缓存策略** - 合理利用缓存提升性能

### ❌ 避免做法

- ❌ 在组件中硬编码 API URL
- ❌ 重复定义相同的 API 请求
- ❌ 忽略错误处理
- ❌ 在组件中直接使用 `fetch`

---

## 相关依赖

- **AsyncStorage** - 本地数据持久化
- **Zustand** - 全局状态管理（配合服务层使用）
- **React Hooks** - 数据获取和状态管理

---

## 迁移指南

如果项目中有旧的 API 调用方式，按以下步骤迁移：

### 旧代码

```typescript
// ❌ 旧方式 - 直接在组件中调用 fetch
const fetchData = async () => {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  setData(data);
};
```

### 新代码

```typescript
// ✅ 新方式 - 使用服务层
import { myService } from '@/services';

const fetchData = async () => {
  const data = await myService.fetchData();
  setData(data);
};
```
