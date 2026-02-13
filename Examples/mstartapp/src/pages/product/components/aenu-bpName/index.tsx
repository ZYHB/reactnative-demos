import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import JDguojibrand from './components/JDguojibrand';
import PNbpBrightpoint from './components/bpBrightpoint';
import PNbpBangDan from './components/bpBangDan';
import PNbpUpNaviBar from './components/bpUpNaviBar';
import PNbpMember from './components/bpMember';
import PNbpAggrePromo from './components/bpAggrePromo';
import PNbpCommonBanner from './components/bpCommonBanner';
import {ProductUtils} from '../../utils/ProductUtils';

export default function PNbpName(props: any) {
  const [wareInfo, setWareInfo] = useState<any>({});
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    console.log('PNbpName:first');
    const bpMasterdata = ProductUtils.getbpMasterdata(props.fullData);
    const wareInfo = bpMasterdata.data?.wareInfo ?? {};
    setWareInfo(wareInfo);
  }, []);
  useEffect(() => {
    return () => {
      console.log('PNbpName:组件卸载');
    };
  }, []);
  /********************* 点击事件 **************************/

  /********************* Render **************************/
  return (
    <View style={[styles.container]}>
      <PNbpCommonBanner fullData={props.fullData} />
      <View style={{backgroundColor: 'red'}}>
        <View style={[styles.content]}>
          <PNbpAggrePromo fullData={props.fullData} />
          <View style={{height: 4}} />
          <PNbpMember fullData={props.fullData} />
          <View style={{height: 4}} />
          <JDguojibrand fullData={props.fullData} />
          <View style={{height: 4}} />
          <Text>{wareInfo.name ?? ''}</Text>
          <View style={{height: 4}} />
          <PNbpBrightpoint fullData={props.fullData} />
          <View style={{height: 4}} />
          <PNbpBangDan fullData={props.fullData} />
          <View style={{height: 4}} />
          <PNbpUpNaviBar fullData={props.fullData} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  content: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
});
