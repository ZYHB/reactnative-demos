import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {extraUtil} from '~/utils';

export interface CommonImageBackgroundProps extends FastImageProps {}

export interface IPrpos {
  style?: StyleProp<ViewStyle>;
  imageProps?: CommonImageBackgroundProps;
  children?: React.ReactNode;
}

export default function CommonImageBackground(props: IPrpos) {
  if (typeof props.imageProps?.source === 'number') {
  } else if (typeof props.imageProps?.source === 'undefined') {
  } else if (extraUtil.isEmptyObj(props.imageProps?.source?.uri)) {
    return (
      <>
        <View style={[props.style]}>{props.children}</View>
      </>
    );
  }
  return (
    <View style={[props.style]}>
      <FastImage {...props.imageProps}>{props.children}</FastImage>
    </View>
  );
}

const styles = StyleSheet.create({});
