import { Banner } from '@/components/home/banner';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DaPaiTab() {
  const insets = useSafeAreaInsets();
  const bannerData = [
    { id: '1', imageUrl: 'https://via.placeholder.com/400x180?text=Dapai+Banner+1', title: '大牌活动1' },
    { id: '2', imageUrl: 'https://via.placeholder.com/400x180?text=Dapai+Banner+2', title: '大牌活动2' },
  ];


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
