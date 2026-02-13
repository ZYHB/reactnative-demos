import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonFastImage from '~/components/common-fast-image';
import CommonImageBackground from '~/components/common-imageBackground';
import {ProductUtils} from '../../../../utils/ProductUtils';

export default function PNbpMember(props: any) {
  const [data, setData] = useState<any>({});
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    const floorData = ProductUtils.getFloorDataByMid(
      props.fullData,
      'bpMember',
    );
    const data = floorData.data?.data ?? {};
    setData(data);
  }, []);
  useEffect(() => {
    return () => {
      console.log('PNbpMember:组件卸载');
    };
  }, []);
  /********************* 点击事件 **************************/

  /********************* Render **************************/
  return (
    <CommonImageBackground
      imageProps={{
        source: {uri: data.bgurl ?? ''},
        style: styles.container,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            color: data.preBox?.preTextColor ?? '#666',
            fontSize: 13,
            paddingLeft: 5,
          }}>
          {data.preBox?.preText ?? ''}
        </Text>
        <CommonFastImage
          style={{height: 12, aspectRatio: 1}}
          source={{uri: data.preBox?.preArrowUrl ?? ''}}
        />
      </View>
    </CommonImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1005 / 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
