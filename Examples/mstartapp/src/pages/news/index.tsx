import React from 'react';
import {StyleSheet} from 'react-native';
import CommonAMap from './amap';

export default function NewsScreen() {
  return <CommonAMap />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 1,
    // width: '100%',
    // height: 200,
    marginBottom: 20,
  },
});
