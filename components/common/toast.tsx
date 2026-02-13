import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import * as Haptics from 'expo-haptics';

const DEVICE_WIDTH = Dimensions.get('window').width;
const TOAST_WIDTH = DEVICE_WIDTH - 100;

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastRef {
  show: (message: string, type?: ToastType, duration?: number) => void;
  hide: () => void;
}

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
}

export function Toast() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [type, setType] = React.useState<ToastType>('info');
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const insets = useSafeAreaInsets();

  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const toastRef = useRef<ToastRef>({
    show: (msg: string, toastType: ToastType = 'info', duration: number = 2000) => {
      // 清除之前的定时器
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }

      setMessage(msg);
      setType(toastType);
      setIsVisible(true);

      // 触觉反馈
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // 显示动画
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // 自动隐藏
      hideTimer.current = setTimeout(() => {
        toastRef.current.hide();
      }, duration);
    },
    hide: () => {
      // 隐藏动画
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsVisible(false);
        setMessage('');
      });
    },
  });

  // 暴露到全局
  useEffect(() => {
    if (typeof global !== 'undefined') {
      (global as any).toastRef = toastRef.current;
    }
  }, []);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
    };
  }, []);

  const getIconForType = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      case 'warning':
        return '#FF9800';
      case 'info':
      default:
        return '#2196F3';
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.toastBox,
            {
              backgroundColor: getBackgroundColor(),
              transform: [{ translateY }],
              opacity,
              marginTop: insets.top + 50,
            },
          ]}
        >
          <View style={styles.content}>
            <Text style={styles.icon}>{getIconForType()}</Text>
            <ThemedText style={styles.message}>{message}</ThemedText>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastBox: {
    minWidth: TOAST_WIDTH,
    maxWidth: TOAST_WIDTH,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  message: {
    flex: 1,
    fontSize: 15,
    color: '#FFF',
    fontWeight: '500',
  },
});
