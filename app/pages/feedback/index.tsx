import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function FeedBackScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>意见反馈</Text>
      <TextInput
        style={styles.textarea}
        placeholder="请输入您的意见或建议"
        multiline
        numberOfLines={6}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>提交</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textarea: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    textAlignVertical: 'top',
  },
  button: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
