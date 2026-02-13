import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ProductUtils} from '../../utils/ProductUtils';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function PNbpschj(props: any) {
  const [data, setData] = useState<any>({});
  const [selectIndex, setSelectIndex] = useState(0);
  let tagListRef: FlatList<any> | null;
  const arr = Array.from({length: 100}, (v, k) => k + 'eee');
  const tags = [
    '特惠',
    '婴童纸尿裤',
    '早教启智',
    '奶瓶奶嘴',
    '牙胶',
    '牙胶1',
    '牙胶2',
    '牙胶3',
  ];
  /********************* Effect Hook **************************/
  useEffect(() => {
    console.log('PNbpschj:first');
    const floorData = ProductUtils.getFloorDataByMid(props.fullData, 'bpschj');
    const data = floorData.data ?? {};
    setData(data);
  }, []);
  useEffect(() => {
    return () => {
      console.log('PNbpschj:组件卸载');
    };
  }, []);
  /********************* 点击事件 **************************/

  /********************* Render **************************/
  const renderHeader = () => {
    return (
      <View style={{}}>
        <Text style={{color: '#333', fontSize: 15, fontWeight: 'bold'}}>
          {data.title}
          <Text style={{color: '#666', fontSize: 11}}>{data.subtitle}</Text>
        </Text>
      </View>
    );
  };
  const renderTagsView = () => {
    return (
      <FlatList
        ref={element => (tagListRef = element)}
        data={tags}
        style={{marginTop: 5}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const style =
            selectIndex === index ? styles.tagActive : styles.tagInActive;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectIndex(index);
                //viewPosition参数：0表示顶部，0.5表示中部，1表示底部
                tagListRef?.scrollToIndex({
                  index: index,
                  viewPosition: 0.5,
                });
              }}>
              <Text style={[style]}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  const renderProductListView = () => {
    return (
      <FlatList
        data={arr}
        style={{marginTop: 5}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.productView}
              onPress={() => {}}>
              <View style={styles.productView_img} />
              <Text style={styles.productView_name}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.contentView]}>
        {renderHeader()}
        {renderTagsView()}
        {renderProductListView()}
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
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tagView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 2,
  },
  tagActive: {
    backgroundColor: 'rgba(255,0,0,0.1)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    borderRadius: 15,
    overflow: 'hidden',
    color: 'red',
  },
  tagInActive: {
    backgroundColor: '#EEE',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    borderRadius: 15,
    overflow: 'hidden',
    color: 'black',
  },
  productView: {
    marginRight: 4,
    padding: 5,
    borderColor: '#EEE',
    borderWidth: 1,
  },
  productView_img: {
    width: 100,
    aspectRatio: 1,
    backgroundColor: '#EEE',
  },
  productView_name: {
    paddingVertical: 2,
  },
});
