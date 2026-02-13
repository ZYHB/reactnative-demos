/**
 * 通用样式定义
 */
import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  // 页面容器
  page: {
    flex: 1,
    backgroundColor: '#EEE',
  },

  // 内容容器
  container: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  // 卡片
  card: {
    borderRadius: 10,
    backgroundColor: '#FFF',
  },

  // 卡片包装器（flex wrap）
  card_wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
});

export { commonStyles };
