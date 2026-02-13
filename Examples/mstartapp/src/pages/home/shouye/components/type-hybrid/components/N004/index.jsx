import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CommonFastImage from '~/components/common-fast-image';
import {commonStyles} from '~/common/commonStyles';

const CardItem1 = props => {
  const {showName, img, img2, skuList} = props.data;
  return (
    <View style={{flex: skuList.length}}>
      <Text>{showName}</Text>
      <View style={{flex: 1, flexDirection: 'row'}}>
        {skuList.map((item, index) => {
          const imgUrl = index === 0 ? img : img2;

          return (
            <View key={index} style={{flex: 1}}>
              <CommonFastImage
                source={{uri: imgUrl}}
                style={{width: '70%', aspectRatio: 1}}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default function RealTplN004(props) {
  const {tpl, realTpl, data} = props.data;
  const arr = data.filter(item => !(item.content instanceof Array));
  return (
    <View style={[commonStyles.container]}>
      <View style={[styles.container]}>
        {arr.map((item, index) => {
          return <CardItem1 key={index} data={item} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    paddingBottom: 10,
    backgroundColor: '#FFF',
  },
});
