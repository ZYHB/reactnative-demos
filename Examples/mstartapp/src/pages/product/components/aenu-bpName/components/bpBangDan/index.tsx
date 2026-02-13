import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonFastImage from '~/components/common-fast-image';
import CommonImageBackground from '~/components/common-imageBackground';
import {ProductUtils} from '../../../../utils/ProductUtils';

export default function PNbpBangDan(props: any) {
  const [data, setData] = useState<any>({});
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    const floorData = ProductUtils.getFloorDataByMid(
      props.fullData,
      'bpBangDan',
    );
    const data = floorData.data ?? {};
    setData(data);
  }, []);
  useEffect(() => {
    return () => {
      console.log('PNbpBangDan:组件卸载');
    };
  }, []);
  /********************* 点击事件 **************************/

  /********************* Render **************************/
  return (
    <CommonImageBackground
      imageProps={{
        source: {uri: data.leaderBoard?.floorBgImage ?? ''},
        style: styles.container,
      }}>
      <View style={styles.content}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CommonFastImage
            style={{height: 20, aspectRatio: 218 / 84}}
            defaultSource={require('~/assets/image/placeholder/placeholder.png')} //默认图片
            source={{uri: data.leaderBoard?.logoIcon ?? ''}}
          />
          <Text
            style={{
              color: data.leaderBoard?.textColor ?? '#666',
              fontSize: 13,
              paddingLeft: 5,
            }}>
            {data.leaderBoard?.rankName ?? ''}
          </Text>
        </View>
        <CommonFastImage
          style={{height: 12, aspectRatio: 1}}
          source={{uri: data.leaderBoard?.arrowPic ?? ''}}
        />
      </View>
    </CommonImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
