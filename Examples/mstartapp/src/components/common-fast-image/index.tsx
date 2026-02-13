import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {extraUtil} from '~/utils';

export {FastImage};

export default function CommonFastImage(props: FastImageProps) {
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
      <FastImage {...props} />
    </>
  );
}

const styles = StyleSheet.create({});
