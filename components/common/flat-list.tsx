import React, { useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  FlatListProps as RNFlatListProps,
  StyleSheet,
  View
} from 'react-native';
import { ThemedText } from '../themed-text';
import { ListCell } from './list-cell';

export interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  [key: string]: any;
}

export interface FlatListProps<T extends ListItem> extends Omit<RNFlatListProps<T>, 'renderItem' | 'ListEmptyComponent' | 'ListFooterComponent' | 'ListHeaderComponent'> {
  data: T[];
  renderItem?: (item: T, index: number) => React.ReactNode;
  onRefresh?: () => void | Promise<void>;
  onLoadMore?: () => void | Promise<void>;
  isRefreshing?: boolean;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  ListEmptyComponent?: React.ReactElement | null;
  ListFooterComponent?: React.ReactElement | null;
  ListHeaderComponent?: React.ReactElement | null;
}

export function EnhancedFlatList<T extends ListItem>({
  data,
  renderItem,
  onRefresh,
  onLoadMore,
  isRefreshing = false,
  isLoadingMore = false,
  hasMore = true,
  ListEmptyComponent,
  ListFooterComponent,
  ListHeaderComponent,
  ...restProps
}: FlatListProps<T>) {
  const flatListRef = useRef<FlatList<T>>(null);

  const handleRefresh = async () => {
    if (onRefresh) {
      await onRefresh();
    }
  };

  const handleLoadMore = () => {
    if (onLoadMore && !isLoadingMore && hasMore) {
      onLoadMore();
    }
  };

  const handleEndReached = ({ distanceFromEnd }: { distanceFromEnd: number }) => {
    if (distanceFromEnd < 300) {
      handleLoadMore();
    }
  };

  const renderFooter = () => {
    if (!hasMore && data.length > 0) {
      return (
        <View style={styles.footer}>
          <ThemedText style={styles.noMoreText}>没有更多了</ThemedText>
        </View>
      );
    }

    if (isLoadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color="#999" />
          <ThemedText style={styles.loadingText}>加载中...</ThemedText>
        </View>
      );
    }

    return ListFooterComponent;
  };

  const renderEmpty = () => {
    if (ListEmptyComponent) {
      return ListEmptyComponent;
    }

    return (
      <View style={styles.empty}>
        <ThemedText style={styles.emptyText}>暂无数据</ThemedText>
      </View>
    );
  };

  const defaultRenderItem = ({ item, index }: { item: T; index: number }): React.ReactElement | null => {
    if (renderItem) {
      const result = renderItem(item, index);
      return result as React.ReactElement | null;
    }

    return (
      <ListCell
        title={item.title}
        subtitle={item.subtitle}
        onPress={() => console.log('Pressed:', item)}
      />
    );
  };

  return (
    <FlatList<T>
      ref={flatListRef}
      data={data}
      renderItem={defaultRenderItem}
      keyExtractor={(item) => item.id}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.2}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#999', '#F00']}
            tintColor="#999"
            title="加载中..."
            titleColor="#999"
          />
        ) : undefined
      }
      ListEmptyComponent={data.length === 0 ? renderEmpty : undefined}
      ListFooterComponent={renderFooter}
      ListHeaderComponent={ListHeaderComponent}
      {...restProps}
    />
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  noMoreText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 8,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
