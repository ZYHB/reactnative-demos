import { CommonNavBar } from '@/components/common-navbar';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface TestItem {
  id: string;
  title: string;
  description?: string;
  route?: string;
}

const testData: TestItem[] = [
  {
    id: '1',
    title: '我的页面',
    description: '查看个人中心',
    route: '/(tabs)/mine',
  },
  {
    id: '2',
    title: '购物车',
    description: '查看购物车',
    route: '/(tabs)/shopcart',
  },
  {
    id: '3',
    title: '新品',
    description: '浏览新品',
    route: '/(tabs)/news',
  },
  {
    id: '4',
    title: '发现',
    description: '探索更多',
    route: '/(tabs)/explore',
  },
  {
    id: '5',
    title: 'Modal 示例',
    description: '打开模态窗口',
    route: '/modal',
  },
  {
    id: '6',
    title: '测试导航栏',
    description: '测试透明导航栏效果',
  },
  {
    id: '7',
    title: '列表滚动测试',
    description: '测试滚动性能',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: TestItem }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          if (item.route) {
            router.push(item.route as any);
          } else {
            console.log('点击了:', item.title);
          }
        }}
        activeOpacity={0.7}
      >
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          {item.description && (
            <Text style={styles.itemDescription}>{item.description}</Text>
          )}
        </View>
        <Text style={styles.itemArrow}>{'>'}</Text>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <CommonNavBar title="首页" showBackButton={false} />
      <FlatList
        data={testData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    minHeight: 60,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#999',
  },
  itemArrow: {
    fontSize: 20,
    color: '#999',
    marginLeft: 12,
  },
  separator: {
    height: 12,
  },
});
