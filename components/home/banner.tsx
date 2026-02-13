import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PagerView } from 'react-native-pager-view';
import { Image } from 'expo-image';
import { ThemedView } from '@/components/themed-view';

const DEVICE_WIDTH = Dimensions.get('window').width;

export interface BannerItem {
  id: string;
  imageUrl: string;
}

export interface BannerProps {
  data: BannerItem[];
  onBannerPress?: (item: BannerItem) => void;
}

export function Banner({
  data,
  onBannerPress,
}: BannerProps) {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={[styles.container, { marginTop: insets.top }]}>
      <PagerView
        style={styles.pager}
        initialPage={0}
        orientation="horizontal"
        transitionStyle="scroll"
        showPageIndicator={false}
      >
        {data.map((item: BannerItem) => (
          <TouchableOpacity
            key={item.id}
            style={styles.page}
            onPress={() => onBannerPress?.(item)}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              contentFit="cover"
            />
          </TouchableOpacity>
        ))}
      </PagerView>
    </ThemedView>
  );
}

export default Banner;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
    backgroundColor: '#F5F5F5',
  },
  pager: {
    flex: 1,
  },
  page: {
    width: DEVICE_WIDTH,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
