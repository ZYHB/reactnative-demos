import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function DeviceInfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>设备信息</Text>
      <ScrollView style={styles.content}>
        <Text style={styles.item}>设备信息示例</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  content: {
    flex: 1,
  },
  item: {
    fontSize: 16,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
