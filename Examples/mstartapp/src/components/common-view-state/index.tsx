import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
export enum ViewState {
  default = -1, // 默认
  success = 1, // 加载中
  loading = 2, // 没有更多
  empty = 3, // 报错了
  error = 4, // 报错了
}

interface Props {
  viewState: ViewState;
  title?: string | undefined;
  subtitle?: string | undefined;
  onPress?: ((event: ViewState) => void) | undefined;
  children?: React.ReactNode;
}
export default function CommonStateView({
  viewState,
  title,
  subtitle,
  onPress,
  children,
}: Props) {
  const render = () => {
    let child;
    if (viewState === ViewState.default) {
      return undefined;
    } else if (viewState === ViewState.success) {
      return children;
    } else if (viewState === ViewState.loading) {
      return <CommonLoading />;
    } else if (viewState === ViewState.empty) {
      child = (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.titleStyle}>{title ?? '暂无数据'}</Text>
          <Text style={styles.subtitleStyle}>
            {subtitle ?? '去别的地方看看吧~'}
          </Text>
        </View>
      );
    } else if (viewState === ViewState.error) {
      child = (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.titleStyle}>{title ?? '加载失败'}</Text>
          <Text style={styles.subtitleStyle}>{subtitle ?? '稍后再试吧~'}</Text>
        </View>
      );
    } else {
      return undefined;
    }

    return (
      <View style={[styles.container]}>
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 1}}
          onPress={() => {
            onPress && onPress(viewState);
          }}>
          {child}
        </TouchableOpacity>
      </View>
    );
  };

  return <View style={{flex: 1}}>{render()}</View>;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#EEE',
  },
  titleStyle: {
    fontSize: 15,
    textAlign: 'center',
  },
  subtitleStyle: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export function CommonLoading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator />
    </View>
  );
}
