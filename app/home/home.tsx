import { Banner } from '@/components/home/banner';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BannerItem {
  id: string;
  imageUrl: string;
  title?: string;
}


export default function HomeTab() {
  const insets = useSafeAreaInsets();
  const [banners] = useState<BannerItem[]>([
    { id: '1', imageUrl: 'https://via.placeholder.com/400x180?text=Home+Banner+1', title: '首页活动1' },
    { id: '2', imageUrl: 'https://via.placeholder.com/400x180?text=Home+Banner+2', title: '首页活动2' },
  ]);

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
