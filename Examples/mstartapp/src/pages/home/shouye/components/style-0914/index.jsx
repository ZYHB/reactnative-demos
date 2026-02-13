import {Text, StyleSheet, View} from 'react-native';
import React from 'react';
import {commonStyles} from '~/common/commonStyles';
import CommonFastImage from '~/components/common-fast-image';

const Style0914 = props => {
  const {content} = props.data;
  return (
    <View style={[commonStyles.container]}>
      <View style={[commonStyles.card, {flexDirection: 'row'}]}>
        {content.map((item, index) => {
          const {materialId, title, img} = item;
          return (
            <View key={materialId + title} style={styles.cell}>
              <CommonFastImage source={{uri: img}} style={styles.cell_img} />
              <Text style={{fontSize: 11}}>{title}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: '20%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell_img: {
    width: '70%',
    aspectRatio: 1,
  },
});

export default Style0914;
