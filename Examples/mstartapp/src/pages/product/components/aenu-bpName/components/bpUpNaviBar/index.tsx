import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonFastImage from '~/components/common-fast-image';
import {ProductUtils} from '../../../../utils/ProductUtils';

export default function PNbpUpNaviBar(props: any) {
  const [data, setData] = useState([]);
  /********************* Effect Hook **************************/
  useEffect(() => {
    const floorData = ProductUtils.getFloorDataByMid(
      props.fullData,
      'bpUpNaviBar',
    );
    const data = floorData.data?.naviBar ?? [];
    setData(data);
  }, []);
  useEffect(() => {
    return () => {
      console.log('JDguojibrand:组件卸载');
    };
  }, []);
  /********************* 点击事件 **************************/

  /********************* Render **************************/
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const {icon, name} = item;
        return (
          <View key={index} style={styles.item}>
            <CommonFastImage
              style={{height: 20, aspectRatio: 1}}
              source={{uri: icon ?? ''}}
            />
            <Text style={{color: '#666', fontSize: 11, paddingLeft: 5}}>
              {name}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
