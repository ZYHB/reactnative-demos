import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonFastImage from '~/components/common-fast-image';
import {ProductUtils} from '../../utils/ProductUtils';
import PNbpAddr from './components/bpAddr';
import PNbpActivity from './components/bpActivity';
import PNbpServe from './components/bpServe';

export default function PNbpChoice(props: any) {
  const [data, setData] = useState([]);
  /********************* Effect Hook **************************/
  useEffect(() => {
    console.log('PNbpChoice:first');
    const floorData = ProductUtils.getFloorDataByMid(
      props.fullData,
      'bpChoice',
    );
    const data = floorData.data?.images ?? [];
    setData(data);
  }, []);
  useEffect(() => {
    return () => {
      console.log('PNbpChoice:组件卸载');
    };
  }, []);
  /********************* 点击事件 **************************/

  /********************* Render **************************/
  const choiceView = () => {
    return (
      <View style={[styles.choiceView]}>
        <Text>选择</Text>
        <View>
          <ScrollView horizontal={true}>
            {data.map((item: string, index) => {
              const imgUrl = item.replace('http', 'https'); //换成https 否则加载不出来
              return (
                <CommonFastImage
                  key={index}
                  style={[styles.imgView]}
                  source={{uri: imgUrl}}
                />
              );
            })}
          </ScrollView>
          <Text style={{marginTop: 5}}>
            已选择：热销款【鳄鱼200cm*180cm*2cm】
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={[styles.container]}>
      <View style={[styles.contentView]}>
        {choiceView()}
        <View style={{height: 5}} />
        <PNbpAddr data={props.data} fullData={props.fullData} />
        <View style={{height: 5}} />
        <PNbpActivity data={props.data} fullData={props.fullData} />
        <View style={{height: 5}} />
        <PNbpServe data={props.data} fullData={props.fullData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  contentView: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderColor: 'blue',
    borderWidth: 1,
  },
  choiceView: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imgView: {
    width: 40,
    aspectRatio: 1,
    marginRight: 5,
  },
});
