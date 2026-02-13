import {StyleSheet, View} from 'react-native';
import React from 'react';
import {commonStyles} from '~/common/commonStyles';
import CommonFastImage from '~/components/common-fast-image';

// const dimen = Dimensions.get('window');
// const deviceWidth = dimen.width;
// const column = 4;
// const hspace = 5;
// const paddingHorizontal = 10;
const aspectRatio = 203 / 290; //图片宽高比
// const cellW =
//   (deviceWidth - paddingHorizontal * 2 - (column - 1) * hspace) / column;
const Style0912 = props => {
  const {content} = props.data;

  return (
    <View style={[commonStyles.container]}>
      <View style={[commonStyles.card]}>
        {content.map((item, index) => {
          const {materialId, bgImg} = item;
          return (
            <View
              key={materialId}
              style={[styles.cell, {paddingLeft: index > 0 ? 5 : 0}]}>
              <CommonFastImage source={{uri: bgImg}} style={styles.cell_img} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell_img: {
    width: '100%',
    aspectRatio: 203 / 290,
  },
});

export default Style0912;
