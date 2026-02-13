import { isEmptyObject } from '@/utils/validation';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import CommonFastImage, { CommonFastImageProps } from '../common-fast-image';

export interface IPrpos {
  style?: StyleProp<ViewStyle>;
  imageProps?: CommonFastImageProps;
  children?: React.ReactNode;
}

export default function CommonImageBackground(props: IPrpos) {
  if (typeof props.imageProps?.source === 'number') {
  } else if (typeof props.imageProps?.source === 'undefined') {
  } else if (isEmptyObject(props.imageProps?.source?.uri)) {
    return (
      <>
        <View style={[props.style]}>{props.children}</View>
      </>
    );
  }
  return (
    <View style={[props.style]}>
      <CommonFastImage {...props.imageProps} source={props.imageProps?.source!} />
      {props.children}
    </View>
  );
}
