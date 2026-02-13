import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonFastImage from '~/components/common-fast-image';
import {ProductUtils} from '../../../../utils/ProductUtils';

export default function PNbpServe(props: any) {
  const [data, setData] = useState([]);
  /********************* Effect Hook **************************/
  useEffect(() => {
    const floorData = ProductUtils.getFloorDataByMid(props.fullData, 'bpServe');
    const data = floorData.data?.serviceInfo?.basic?.iconList ?? [];
    setData(data);
  }, []);
  useEffect(() => {
    return () => {
      console.log('PNbpServe:组件卸载');
    };
  }, []);
  /********************* 点击事件 **************************/

  /********************* Render **************************/
  return (
    <View style={[styles.container]}>
      <View style={[styles.contentView]}>
        {data.map((item, index) => {
          const {imageUrl, text} = item;
          return (
            <View key={index} style={[styles.tagView]}>
              <CommonFastImage
                style={{height: 15, aspectRatio: 1}}
                source={{uri: imageUrl ?? ''}}
              />
              <Text style={{color: '#666', fontSize: 11, paddingLeft: 5}}>
                {text}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCFD',
  },
  contentView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 2,
  },
});
