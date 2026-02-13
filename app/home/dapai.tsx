import { EnhancedFlatList } from '@/components/common/flat-list';
import { Banner } from '@/components/home/banner';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { HomeTabParams } from './_layout';

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

export default function DaPaiTab() {
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<{ params: HomeTabParams }>>();
  const bannerData = [
    { id: '1', imageUrl: 'https://via.placeholder.com/400x180?text=Dapai+Banner+1', title: '大牌活动1' },
    { id: '2', imageUrl: 'https://via.placeholder.com/400x180?text=Dapai+Banner+2', title: '大牌活动2' },
  ];
  const [products, setProducts] = useState<ListItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // 模拟数据加载
    setTimeout(() => {
      setProducts([
        { id: '1', title: '大牌商品1', subtitle: '￥9999' },
        { id: '2', title: '大牌商品2', subtitle: '￥8999' },
      ]);
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      {/* 轮播图 */}
      <Banner
        data={bannerData}
        autoPlay
        autoPlayInterval={3000}
        onBannerPress={(item) => console.log('Banner pressed:', item)}
      />

      {/* 商品列表 */}
      <View style={styles.listContainer}>
        <EnhancedFlatList
          data={products}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          ListHeaderComponent={<View style={styles.listHeader}><ThemedText style={styles.sectionTitle}>大牌精选</ThemedText></View>}
          renderItem={( item ) => (
            <View style={styles.productItem}>
              <ThemedText style={styles.productTitle}>{item.title}</ThemedText>
              {item.subtitle && (
                <ThemedText style={styles.productSubtitle}>{item.subtitle}</ThemedText>
              )}
            </View>
          )}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 8,
  },
  listHeader: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productItem: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F5F5F5',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 14,
    color: '#de6454',
    fontWeight: 'bold',
  },
});
