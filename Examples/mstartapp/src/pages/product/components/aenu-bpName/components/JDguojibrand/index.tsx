import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonFastImage from '~/components/common-fast-image';
import {ProductUtils} from '../../../../utils/ProductUtils';

export default function JDguojibrand(props: any) {
  const [data, setData] = useState([]);
  /********************* Effect Hook **************************/
  useEffect(() => {
    const floorData = ProductUtils.getFloorDataByMid(
      props.fullData,
      'JDguojibrand',
    );
    const data = floorData.data?.icodeImgAndTextList ?? [];
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
        const {icontext, iconDesc, iconImg} = item;
        return (
          <View key={index} style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <CommonFastImage
              style={{height: 15, aspectRatio: 150 / 48}}
              defaultSource={require('~/assets/image/placeholder/placeholder.png')} //默认图片
              source={{uri: iconImg ?? ''}}
            />
            <Text style={{color: '#666', fontSize: 13, paddingLeft: 5}}>
              {icontext}
              {iconDesc}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
