import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ProductUtils} from '../../../../utils/ProductUtils';

export default function PNbpAggrePromo(props: any) {
  const [data, setData] = useState([]);
  /********************* Effect Hook **************************/
  useEffect(() => {
    const floorData = ProductUtils.getFloorDataByMid(
      props.fullData,
      'bpAggrePromo',
    );
    const data = floorData.data?.preferentialGuide?.labelsInfo ?? [];
    setData(data);
  }, []);
  useEffect(() => {
    return () => {
      console.log('PNbpAggrePromo:组件卸载');
    };
  }, []);
  /********************* 点击事件 **************************/

  /********************* Render **************************/
  return (
    <View>
      <View style={[styles.container]}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {data.map((item, index) => {
            const {desc} = item;
            return (
              <View key={index} style={[styles.tagView]}>
                <Text style={{color: 'red', fontSize: 10}}>{desc}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tagView: {
    backgroundColor: 'rgba(255,0,0,0.1)',
    paddingVertical: 2,
    paddingHorizontal: 2,
    marginRight: 5,
  },
});
