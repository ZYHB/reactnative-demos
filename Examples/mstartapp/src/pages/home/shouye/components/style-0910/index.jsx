import {StyleSheet, View, ImageBackground, Text} from 'react-native';
import React from 'react';
import {commonStyles} from '~/common/commonStyles';
import CommonFastImage from '~/components/common-fast-image';

const Style0910 = props => {
  const {content} = props.data;
  return (
    <View style={[commonStyles.container]}>
      <View style={[commonStyles.card, {flexDirection: 'row'}]}>
        {content.map((item, index) => {
          const {materialId, name, img, bgImg, rankName, saleNumText} = item;
          return (
            <View
              key={materialId}
              style={[styles.cell, {paddingLeft: index === 0 ? 0 : 10}]}>
              <ImageBackground
                source={{uri: bgImg}}
                style={{
                  borderRadius: 10,
                  width: '100%',
                }}>
                <CommonFastImage
                  source={{uri: img}}
                  style={{width: '100%', aspectRatio: 1, marginTop: 35}}
                />
                <Text>{rankName}</Text>
                <Text>{saleNumText}</Text>
              </ImageBackground>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    paddingLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Style0910;
