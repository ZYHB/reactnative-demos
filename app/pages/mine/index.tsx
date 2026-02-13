import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MineScreen() {
  const router = useRouter();

  const handleSettingPress = () => {
    router.push('/pages/setting');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>我的</Text>
      <TouchableOpacity
        style={styles.settingButton}
        onPress={handleSettingPress}
      >
        <Text style={styles.settingButtonText}>设置</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  settingButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
