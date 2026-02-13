import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ProductUtils} from '../../../../utils/ProductUtils';

export default function PNbpBrightpoint(props: any) {
  const [data, setData] = useState<any>({});
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    const floorData = ProductUtils.getFloorDataByMid(
      props.fullData,
      'bpBrightpoint',
    );
    const data = floorData.data ?? {};
    setData(data);
  }, []);
  useEffect(() => {
    return () => {
      console.log('PNbpBrightpoint:组件卸载');
    };
  }, []);
  /********************* 点击事件 **************************/

  /********************* Render **************************/
  return (
    <View style={styles.container}>
      <Text style={{color: '#666', fontSize: 13, paddingLeft: 5}}>
        {data.brightPoints ?? ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
