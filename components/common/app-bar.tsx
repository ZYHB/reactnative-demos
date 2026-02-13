import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface AppBarProps {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  leftItem?: React.ReactNode;
  centerItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  transparent?: boolean;
  backgroundColor?: string;
}

export function AppBar({
  title,
  showBack = true,
  onBackPress,
  leftItem,
  centerItem,
  rightItem,
  transparent = false,
  backgroundColor: bgColorProp,
}: AppBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const bgColor = useThemeColor(
    { light: bgColorProp || (transparent ? 'transparent' : '#FFFFFF'), dark: bgColorProp || (transparent ? 'transparent' : '#000000') },
    'background'
  );

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const renderLeftContent = () => {
    if (leftItem) {
      return leftItem;
    }

    if (showBack) {
      return (
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
      );
    }

    return null;
  };

  const renderCenterContent = () => {
    if (centerItem) {
      return centerItem;
    }

    if (title) {
      return (
        <ThemedText style={styles.title} numberOfLines={1}>
          {title}
        </ThemedText>
      );
    }

    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Safe Area 填充 */}
      <View style={{ height: Math.max(insets.top, Platform.select({ ios: 44, android: 48 }) as number) }} />

      {/* 导航栏内容 */}
      <View style={styles.navigationBar}>
        {/* 左侧区域 */}
        <View style={styles.leftContainer}>{renderLeftContent()}</View>

        {/* 中间区域 */}
        <View style={styles.centerContainer}>{renderCenterContent()}</View>

        {/* 右侧区域 */}
        <View style={styles.rightContainer}>{rightItem}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 12,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: '-50%' }],
    width: '50%',
    height: '100%',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  backButton: {
    padding: 4,
    marginLeft: -8,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
});
