import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonSafeArea from '~/components/common-safe-area';

const DEVICE_WIDTH = Dimensions.get('window').width;
export default function OrderFilterView(props: any) {
  const arr = Array.from({length: 100}, (v, k) => k + 'eee');
  const [datas, setDatas] = useState(arr);

  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    console.log('OrderFilterView ', props);
  }, []);

  return (
    <ScrollView style={[styles.container, {backgroundColor: '#FFF'}]}>
      <CommonSafeArea type="top" />
      {datas.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              borderBottomColor: '#EEE',
              borderBottomWidth: 1,
              paddingVertical: 15,
            }}>
            <Text>zhesh</Text>
          </View>
        );
      })}
      <CommonSafeArea type="bottom" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: DEVICE_WIDTH * 0.8,
  },
});
