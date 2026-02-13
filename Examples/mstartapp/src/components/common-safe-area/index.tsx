import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  type?: 'top' | 'bottom' | 'appBar' | 'tabBar' | undefined; //样式
};
export default function CommonSafeArea({type = 'appBar'}: Props) {
  const insets = useSafeAreaInsets();
  if (type === 'top') {
    return <View style={[{width: '100%', height: Math.max(insets.top, 22)}]} />;
  } else if (type === 'bottom') {
    return (
      <View style={[{width: '100%', height: Math.max(insets.bottom, 16)}]} />
    );
  } else if (type === 'appBar') {
    return (
      <View style={[{width: '100%'}]}>
        <View style={[{height: Math.max(insets.top, 22)}]} />
        <View style={[{height: 44}]} />
      </View>
    );
  } else if (type === 'tabBar') {
    return (
      <View style={[{width: '100%'}]}>
        <View style={[{height: Math.max(insets.bottom, 16)}]} />
        <View style={[{height: 50}]} />
      </View>
    );
  } else {
    return <View style={[{width: '100%'}]} />;
  }
}

const styles = StyleSheet.create({});
