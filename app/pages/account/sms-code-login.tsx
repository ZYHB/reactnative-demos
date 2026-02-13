import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function SMSCodeLoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>验证码登录</Text>
      <TextInput style={styles.input} placeholder="手机号" />
      <View style={styles.codeContainer}>
        <TextInput style={[styles.input, { flex: 1 }]} placeholder="验证码" />
        <TouchableOpacity style={styles.codeButton}>
          <Text style={styles.codeButtonText}>获取验证码</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>登录</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  codeButton: {
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    marginLeft: 10,
  },
  codeButtonText: {
    fontSize: 14,
    color: '#007AFF',
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
