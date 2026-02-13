import { extraUtil } from '@/utils/extraUtil';
import { Image, ImageProps } from 'expo-image';
import React, { useEffect } from 'react';
import { View } from 'react-native';

export { Image };

export interface CommonFastImageProps extends Omit<ImageProps, 'source'> {
  source: number | { uri: string } | { uri?: string };
}

export default function CommonFastImage(props: CommonFastImageProps) {
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    // console.log('CommonFastImage:first');
  }, []);
  useEffect(() => {
    return () => {
      // console.log('CommonFastImage 组件卸载');
    };
  }, []);

  if (typeof props.source === 'number') {
  } else if (typeof props.source === 'undefined') {
  } else if (extraUtil.isEmptyObj(props.source?.uri)) {
    return (
      <>
        <View style={[props.style, {backgroundColor: '#EEE'}]} />
      </>
    );
  }
  return (
    <>
      <Image {...props} />
    </>
  );
}
