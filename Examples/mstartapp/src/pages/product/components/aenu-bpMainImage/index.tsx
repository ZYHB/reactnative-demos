import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonFastImage from '~/components/common-fast-image';
import CommonIndicator from '~/components/common-indicator';
import {ProductUtils} from '../../utils/ProductUtils';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default function PNbpMainImage(props: any) {
  const [dataArr, setDataArr] = useState<Array<any>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  /********************* Effect Hook **************************/
  useEffect(() => {
    console.log('PNbpMainImage:first');
    const bpMasterdata = ProductUtils.getbpMasterdata(props.fullData);
    const magicHeadPicInfo = bpMasterdata.data?.magicHeadPicInfo ?? [];
    setDataArr(magicHeadPicInfo);
  }, []);
  useEffect(() => {
    return () => {
      console.log('PNbpMainImage:组件卸载');
    };
  }, []);
  /********************* 点击事件 **************************/
  const handleClickPic = (index: number) => {
    console.log('点击图片');
  };

  /********************* Render **************************/
  return (
    <View style={{width: '100%', aspectRatio: 1}}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled={true}
        data={dataArr}
        onScroll={e => {
          const currentX = e?.nativeEvent?.contentOffset?.x;
          const page =
            Math.floor((currentX - DEVICE_WIDTH / 2) / DEVICE_WIDTH) + 1;
          setCurrentIndex(page);
        }}
        renderItem={({item, index}) => {
          const isLast = index === dataArr.length - 1;
          return (
            <TouchableOpacity
              activeOpacity={1}
              key={index}
              style={{width: DEVICE_WIDTH}}
              onPress={() => {
                handleClickPic(index);
              }}>
              <View style={{flex: 1}}>
                <CommonFastImage
                  style={{width: '100%', aspectRatio: 1}}
                  defaultSource={require('~/assets/image/placeholder/placeholder.png')} //默认图片
                  source={{uri: `${item.wareImage?.big}!gray` ?? ''}}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <CommonIndicator
        count={dataArr.length}
        currentIndex={currentIndex}
        style={{justifyContent: 'flex-start', left: 10, bottom: 15}}
        activeStyle={{width: 20}}
        inActiveStyle={{width: 10}}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
