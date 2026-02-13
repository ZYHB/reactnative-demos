import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/tab-bar-icon';
import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,  // 隐藏系统导航栏，由各页面自行处理
        tabBarStyle: { backgroundColor: '#FFF' },
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ focused, color }) => <TabBarIcon focused={focused} color={color} name="index" />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: '新品',
          tabBarIcon: ({ focused, color }) => <TabBarIcon focused={focused} color={color} name="news" />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '发现',
          tabBarIcon: ({ focused, color }) => <TabBarIcon focused={focused} color={color} name="explore" />,
        }}
      />
      <Tabs.Screen
        name="shopcart"
        options={{
          title: '购物车',
          tabBarIcon: ({ focused, color }) => <TabBarIcon focused={focused} color={color} name="shopcart" />,
        }}
      />
      <Tabs.Screen
        name="mine"
        options={{
          title: '我的',
          tabBarIcon: ({ focused, color }) => <TabBarIcon focused={focused} color={color} name="mine" />,
        }}
      />
    </Tabs>
  );
}
