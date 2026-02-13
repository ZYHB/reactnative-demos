import { StyleSheet, View } from 'react-native';
import HomeScreenContent from '@/app/pages/home';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HomeScreenContent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
