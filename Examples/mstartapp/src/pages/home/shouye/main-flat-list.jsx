/* eslint-disable no-shadow */
import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState} from 'react';
import TopTabFloor from './components/topTab';
import TopSearchHeader from './components/topSearchHeader';
import TypeAppcenter from './components/type-appcenter';
import TypeHybrid from './components/type-hybrid';
import TypeFloat from './components/type-float';
import TypePhotoCeiling from './components/type-photoCeiling';
import TypeTopRotate from './components/type-topRotate';
import TypeRuleFloat from './components/type-ruleFloat';
import TypeRecommend from './components/type-recommend';
const MainFlatList = (props, ref) => {
  const [floors, setFloors] = useState();
  let topTabRef;
  let topSearchRef;
  /********************* Effect Hook **************************/
  React.useEffect(() => {
    const floors = props.welcomeHome?.floorList ?? [];
    setFloors(floors);
  }, []);
  // //暴露指定的方法给父组件调用
  // React.useImperativeHandle(ref, () => ({
  //   updateModel: welcomeHome => {
  //     const floors = welcomeHome?.floorList ?? [];
  //     setFloors(floors);
  //   },
  // }));

  /// [回调]:FlatList滚动
  const onScroll = e => {
    const offsetY = e?.nativeEvent?.contentOffset?.y;
    const contentSize = e?.nativeEvent?.contentSize?.height;
    topTabRef.changeOpacity(offsetY);
    topSearchRef.changeOpacity(offsetY);
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <FlatList
        data={floors}
        onScroll={onScroll}
        initialNumToRender={30}
        renderItem={({item, index}) => {
          const {floorId, headType, type} = item;
          if (type === 'topTab') {
            return (
              <TopTabFloor
                key={floorId}
                ref={ref => (topTabRef = ref)}
                data={props.welcomeHome}
                initialIndex={props.initialIndex}
                onChange={index => {
                  props.onChange && props.onChange(index);
                }}
              />
            );
          } else if (type === 'appcenter') {
            return <TypeAppcenter data={item} />;
          } else if (type === 'hybrid') {
            return <TypeHybrid data={item} />;
          } else if (type === 'float') {
            return <TypeFloat data={item} />;
          } else if (type === 'photoCeiling') {
            return <TypePhotoCeiling data={item} />;
          } else if (type === 'topRotate') {
            return <TypeTopRotate data={item} />;
          } else if (type === 'ruleFloat') {
            return <TypeRuleFloat data={item} />;
          } else if (type === 'recommend') {
            return <TypeRecommend data={item} />;
          }

          return (
            <View key={floorId} style={[styles.itemContainer]}>
              <Text style={styles.itemName}>floorId:{floorId}</Text>
              <Text style={styles.itemName}>type:{type}</Text>
              <Text style={styles.itemName}>headType:{headType}</Text>
            </View>
          );
        }}
      />
      <TopSearchHeader
        ref={ref => (topSearchRef = ref)}
        data={props.welcomeHome ?? {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default React.forwardRef(MainFlatList);
