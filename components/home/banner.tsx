import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PagerViewOnPageScrollEvent, PagerView } from 'react-native-pager-view';
import { Image } from 'expo-image';
import { ThemedView } from '@/components/themed-view';

const DEVICE_WIDTH = Dimensions.get('window').width;

export interface BannerItem {
  id: string;
  imageUrl: string;
  title?: string;
  linkUrl?: string;
}

export interface BannerProps {
  data: BannerItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onBannerPress?: (item: BannerItem) => void;
}

export function Banner({
  data,
  autoPlay = true,
  autoPlayInterval = 3000,
  onBannerPress,
}: BannerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const insets = useSafeAreaInsets();

  // 自动轮播
  const startAutoPlay = () => {
    if (!autoPlay || data.length <= 1) return;

    stopAutoPlay();

    autoPlayTimerRef.current = setTimeout(() => {
      const nextPage = (currentPage + 1) % data.length;
      pagerRef.current?.setPage(nextPage);
      setCurrentPage(nextPage);
      startAutoPlay();
    }, autoPlayInterval);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  };

  // 页面切换事件
  const handlePageScroll = (event: PagerViewOnPageScrollEvent) => {
    const { position } = event.nativeEvent;
    setCurrentPage(Math.floor(position));
  };

  // 点击轮播图
  const handleBannerPress = () => {
    const currentItem = data[currentPage];
    onBannerPress?.(currentItem);
    stopAutoPlay();
  };

  // 指示器
  const renderIndicator = () => {
    if (data.length <= 1) return null;

    return (
      <View style={styles.indicatorContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicatorDot,
              currentPage === index && styles.indicatorDotActive,
            ]}
          />
        ))}
      </View>
    );
  };

  // 渲染轮播页面
  const renderPage = (item: BannerItem, index: number) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.page}
        activeOpacity={1}
        onPress={handleBannerPress}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          contentFit="cover"
        />
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [currentPage, autoPlay, autoPlayInterval]);

  return (
    <ThemedView style={[styles.container, { marginTop: insets.top }]}>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageScroll={handlePageScroll}
        orientation="horizontal"
        transitionStyle="scroll"
        showPageIndicator={false}
      >
        {data.map((item, index) => renderPage(item, index))}
      </PagerView>

      {/* 指示器 */}
      {renderIndicator()}
    </ThemedView>
  );
}

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
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 8,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  indicatorDotActive: {
    backgroundColor: '#FFF',
    width: 20,
  },
});
