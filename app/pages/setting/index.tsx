import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>设置</Text>
      <ScrollView style={styles.content}>
        <Text style={styles.item}>账号与安全</Text>
        <Text style={styles.item}>通知设置</Text>
        <Text style={styles.item}>隐私设置</Text>
        <Text style={styles.item}>通用</Text>
        <Text style={styles.item}>关于</Text>
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
