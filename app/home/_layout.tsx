import { ThemedText } from '@/components/themed-text';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import DaPaiTab from './dapai';
import HomeTab from './home';
import ShanghaiTab from './shanghai';
import TanguanTab from './tanguan';

const Tab = createMaterialTopTabNavigator();

export interface HomeTabParams {
  title: string;
  backgroundColor?: string;
}

function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <>
      {/* Top Safe Area */}
      <View style={{ height: insets.top, backgroundColor: '#FFF' }} />

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.tabLabel,
          tabBarStyle: styles.tab,
          tabBarIndicatorStyle: styles.indicator,
          tabBarActiveTintColor: '#de6454',
          tabBarInactiveTintColor: '#666',
          tabBarPressColor: '#de6454',
          swipeEnabled: true,
          lazy: true,
          lazyPlaceholder: () => <ThemedText>加载中...</ThemedText>,
        }}
      >
        <Tab.Screen
          name="dapai"
          component={DaPaiTab}
          options={{
            tabBarLabel: '大牌',
            tabBarContentContainerStyle: { backgroundColor: '#EEEEEE' },
          }}
          initialParams={{ title: '大牌', backgroundColor: '#EEEEEE' }}
        />
        <Tab.Screen
          name="shanghai"
          component={ShanghaiTab}
          options={{
            tabBarLabel: '上海',
            tabBarContentContainerStyle: { backgroundColor: '#FFFFFF' },
          }}
          initialParams={{ title: '上海', backgroundColor: '#FFFFFF' }}
        />
        <Tab.Screen
          name="home"
          component={HomeTab}
          options={{
            tabBarLabel: '首页',
          }}
          initialParams={{ title: '首页' }}
        />
        <Tab.Screen
          name="tanguan"
          component={TanguanTab}
          options={{
            tabBarLabel: '探馆',
            tabBarContentContainerStyle: { backgroundColor: '#334455' },
            tabBarLabelStyle: { color: '#FFF' },
            tabBarInactiveTintColor: '#FFF',
            tabBarPressColor: '#FFF',
          }}
          initialParams={{ title: '探馆', backgroundColor: '#334455' }}
        />
      </Tab.Navigator>
    </>
  );
}

export default TabNavigator;

const styles = StyleSheet.create({
  tab: {
    borderWidth: 0,
    elevation: 0,
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  indicator: {
    height: 2,
    backgroundColor: '#de6454',
  },
});
