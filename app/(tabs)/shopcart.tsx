import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ShopcartScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">购物车</ThemedText>
      <ThemedText style={styles.placeholder}>购物车页面 - 待开发</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  placeholder: {
    fontSize: 16,
    opacity: 0.6,
  },
});
