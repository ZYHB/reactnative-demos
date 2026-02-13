# CommonNavBar 使用指南

通用导航栏组件，适用于大部分页面的导航需求。

## 基础用法

```tsx
import { CommonNavBar } from '@/components/common-navbar';

export default function MyScreen() {
  return (
    <View style={{ flex: 1 }}>
      <CommonNavBar title="页面标题" />
      <Text>页面内容</Text>
    </View>
  );
}
```

## 隐藏返回按钮

```tsx
<CommonNavBar
  title="首页"
  showBackButton={false}
/>
```

## 自定义返回按钮行为

```tsx
<CommonNavBar
  title="我的页面"
  onBackPress={() => {
    // 自定义返回逻辑
    console.log('返回被点击');
  }}
/>
```

## 添加右侧按钮

```tsx
<CommonNavBar
  title="设置"
  rightContent={
    <TouchableOpacity onPress={handleSave}>
      <Text style={{ color: '#007AFF' }}>保存</Text>
    </TouchableOpacity>
  }
/>
```

## 透明导航栏（用于滚动渐变效果）

```tsx
<CommonNavBar
  title="详情"
  transparent
  titleColor="#fff"
/>
```

## 自定义背景色

```tsx
<CommonNavBar
  title="关于"
  backgroundColor="#f5f5f5"
/>
```

## 完整示例

```tsx
import { CommonNavBar } from '@/components/common-navbar';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function ProductDetailScreen() {
  return (
    <View style={{ flex: 1 }}>
      {/* 透明导航栏，配合滚动使用 */}
      <CommonNavBar
        title="商品详情"
        transparent
        titleColor="#fff"
        rightContent={
          <TouchableOpacity>
            <Text style={{ color: '#fff' }}>分享</Text>
          </TouchableOpacity>
        }
      />

      {/* 页面内容 */}
      <ScrollView>
        <Text>商品详情内容...</Text>
      </ScrollView>
    </View>
  );
}
```

## API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | - | 导航栏标题 |
| showBackButton | boolean | true | 是否显示返回按钮 |
| rightContent | ReactNode | - | 右侧自定义内容 |
| onBackPress | () => void | - | 自定义返回按钮点击事件 |
| transparent | boolean | false | 是否透明背景 |
| backgroundColor | string | '#fff' | 自定义背景色 |
| titleColor | string | '#000' | 标题和图标颜色 |
