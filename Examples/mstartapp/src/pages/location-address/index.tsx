import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import CommonAMap from './amap';
import CommonScreen from '~/components/common-screen';

export default function LoactionAddressScreen() {
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    setTimeout(() => {}, 600);
  }, []);
  useEffect(() => {
    return () => {
      console.log('LoactionAddressScreen 组件卸载');
    };
  }, []);
  return (
    <CommonScreen appbar={{title: '选中你的位置'}}>
      <CommonAMap />
    </CommonScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
