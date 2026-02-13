import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface CommonNavBarProps {
  title?: string;
  showBackButton?: boolean;
  rightContent?: React.ReactNode;
  onBackPress?: () => void;
  transparent?: boolean;
  backgroundColor?: string;
  titleColor?: string;
}

/**
 * 通用导航栏组件
 * 适用于页面顶部导航栏场景简单的页面
 */
export const CommonNavBar: React.FC<CommonNavBarProps> = ({
  title,
  showBackButton = true,
  rightContent,
  onBackPress,
  transparent = false,
  backgroundColor,
  titleColor = '#000',
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const containerStyle = {
    paddingTop: insets.top,
    backgroundColor: transparent ? 'transparent' : backgroundColor,
  };

  const titleStyle = {
    color: titleColor,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.content}>
        {/* 左侧返回按钮 */}
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color={titleColor} />
          </TouchableOpacity>
        )}

        {/* 中间标题 */}
        {title && (
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}

        {/* 右侧内容 */}
        {rightContent && <View style={styles.rightContent}>{rightContent}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 44,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
  },
  content: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    position: 'relative',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 40,
  },
  rightContent: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default CommonNavBar;
