import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Banner } from '@/components/home/banner';
import { EnhancedFlatList } from '@/components/common/flat-list';

interface BannerItem {
  id: string;
  imageUrl: string;
  title?: string;
}

interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
}

export default function HomeTab() {
  const insets = useSafeAreaInsets();
  const [banners, setBanners] = useState<BannerItem[]>([
    { id: '1', imageUrl: 'https://via.placeholder.com/400x180?text=Home+Banner+1', title: '首页活动1' },
    { id: '2', imageUrl: 'https://via.placeholder.com/400x180?text=Home+Banner+2', title: '首页活动2' },
  ]);
  const [products, setProducts] = useState<ListItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setProducts([
        { id: '1', title: '热门商品1', subtitle: '￥199' },
        { id: '2', title: '热门商品2', subtitle: '￥299' },
        { id: '3', title: '热门商品3', subtitle: '￥399' },
      ]);
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      {/* 轮播图 */}
      <Banner
        data={banners}
        autoPlay
        onBannerPress={(item) => console.log('Banner pressed:', item)}
      />

      {/* 热门推荐 */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>热门推荐</ThemedText>
      </View>

      <EnhancedFlatList
        data={products}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <ThemedText style={styles.productTitle}>{item.title}</ThemedText>
            {item.subtitle && (
              <ThemedText style={styles.productPrice}>{item.subtitle}</ThemedText>
            )}
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  section: {
    padding: 16,
    paddingBottom: 8,
    backgroundColor: '#FFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  productItem: {
    padding: 16,
    backgroundColor: '#FFF',
    marginBottom: 8,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    color: '#de6454',
    fontWeight: 'bold',
  },
});
