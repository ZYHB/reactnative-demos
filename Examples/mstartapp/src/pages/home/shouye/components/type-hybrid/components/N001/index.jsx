import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CommonFastImage from '~/components/common-fast-image';
import {commonStyles} from '~/common/commonStyles';

const CardItem1 = props => {
  const {showName, img, img2} = props.data;
  const imgArr = [img, img2];
  return (
    <View style={{flex: 1}}>
      <Text>{showName}</Text>
      <View style={{flex: 1, flexDirection: 'row'}}>
        {imgArr.map((item, index) => {
          return (
            <View key={index} style={{flex: 1}}>
              <CommonFastImage
                source={{uri: item}}
                style={{width: '70%', aspectRatio: 1}}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default function RealTplN001(props) {
  const {tpl, realTpl, data} = props.data;
  return (
    <View style={[commonStyles.container]}>
      <View style={[styles.container]}>
        {data.map((item, index) => {
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
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
});
