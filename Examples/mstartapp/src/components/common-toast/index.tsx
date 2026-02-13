import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const AlertControllerWidth = DEVICE_WIDTH - 100;

interface Props {
  message?: string;
}

export default function CommonToast(props: Props) {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.message]}>{props.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    maxWidth: AlertControllerWidth,
    maxHeight: DEVICE_HEIGHT * 0.7,
  },
  message: {
    color: '#333333',
    fontSize: 15,
    textAlign: 'center',
  },
});
