import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonFastImage from '~/components/common-fast-image';
import CommonImageBackground from '~/components/common-imageBackground';
import {ProductUtils} from '../../../../utils/ProductUtils';

export default function PNbpCommonBanner(props: any) {
  const [data, setData] = useState<any>({});
  const [priceInfo, setPriceInfo] = useState<any>({});
  /********************* Effect Hook **************************/
  useEffect(() => {
    const floorData = ProductUtils.getFloorDataByMid(
      props.fullData,
      'bpCommonBanner',
    );
    const data = floorData.data?.commonBannerInfo ?? {};
    setData(data);
    setPriceInfo(data.bannerPriceContent?.priceInfo ?? {});
  }, []);
  useEffect(() => {
    return () => {
      console.log('PNbpCommonBanner:组件卸载');
    };
  }, []);
  /********************* 点击事件 **************************/

  /********************* Render **************************/
  const renderPriceInfo = () => {
    return (
      <Text>
        <Text
          style={{
            color: priceInfo.price?.textColor,
            fontSize: priceInfo.price?.textSize,
          }}>
          {priceInfo.price?.text ?? ''}
        </Text>
        <Text
          style={{
            color: priceInfo.subPrice?.textColor,
            fontSize: priceInfo.subPrice?.textSize,
          }}>
          ￥{priceInfo.subPrice?.text ?? ''}
        </Text>
      </Text>
    );
  };
  return (
    <CommonImageBackground
      imageProps={{
        source: {uri: data.bannerImage ?? ''},
        style: styles.container,
      }}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'baseline'}}>
        {renderPriceInfo()}
        <CommonFastImage
          style={{height: 15, aspectRatio: 126 / 36}}
          source={{uri: priceInfo.subPriceIcon ?? ''}}
        />
      </View>
      <CommonFastImage
        style={styles.mainImg}
        source={{uri: data.bannerRight?.mainImg?.imgUrl ?? ''}}
      />
    </CommonImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  mainImg: {
    height: 40,
    aspectRatio: 228 / 105,
  },
});
