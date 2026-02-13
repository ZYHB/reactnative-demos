import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ProductScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>商品详情</Text>
      <ScrollView style={styles.content}>
        <Text style={styles.text}>商品信息</Text>
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
  text: {
    fontSize: 16,
    padding: 20,
  },
});
