import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonFastImage from '~/components/common-fast-image';
import {ProductUtils} from '../../../../utils/ProductUtils';

export default function PNbpAddr(props: any) {
  const [data, setData] = useState<any>({});
  /********************* Effect Hook **************************/
  useEffect(() => {
    const floorData = ProductUtils.getFloorDataByMid(props.fullData, 'bpAddr');
    const data = floorData.data ?? {};
    setData(data);
  }, []);
  useEffect(() => {
    return () => {
      console.log('PNbpAddr:组件卸载');
    };
  }, []);
  /********************* 点击事件 **************************/

  /********************* Render **************************/
  return (
    <View style={[styles.container]}>
      <View style={[styles.contentView]}>
        <Text>送至</Text>
        <View style={{flex: 1, marginLeft: 4}}>
          <Text>
            {data.defaultAddr?.provinceName ?? ''}
            {data.defaultAddr?.cityName ?? ''}
            {data.defaultAddr?.countyName ?? ''}
            {data.defaultAddr?.townName ?? ''}
          </Text>
          <View>
            <Text style={{}}>{data.stock ?? ''}</Text>
            <View style={{flexDirection: 'row', marginTop: 4}}>
              <CommonFastImage
                style={[styles.imgForAddr]}
                source={{uri: data.imgForAddr ?? ''}}
              />
              <Text style={{flex: 1, fontSize: 12}} numberOfLines={1}>
                {data.jdServiceIcon ?? ''}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentView: {
    flexDirection: 'row',
  },
  imgForAddr: {
    height: 15,
    aspectRatio: 204 / 48,
    marginRight: 5,
  },
});
