import { StyleSheet, View } from 'react-native';
import HomeTabs from '@/app/home/_layout';

export default function HomeScreen() {
  // 使用新的首页 Top Tabs 结构
  return (
    <View style={styles.container}>
      <HomeTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
