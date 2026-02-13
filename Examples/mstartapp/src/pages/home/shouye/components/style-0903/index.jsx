import {Text, StyleSheet, View} from 'react-native';
import React from 'react';
import {commonStyles} from '~/common/commonStyles';
import CommonFastImage from '~/components/common-fast-image';

const Style0903 = props => {
  const {content, floorName} = props.data;
  return (
    <View style={[commonStyles.container]}>
      <View style={[commonStyles.card]}>
        <View style={styles.card_header}>
          <Text style={[]}>{floorName}</Text>
        </View>
        <View style={styles.card_wrap}>
          {content.map((item, index) => {
            const {materialId, name, img} = item;
            return (
              <View key={materialId + name} style={styles.cell}>
                <CommonFastImage source={{uri: img}} style={styles.cell_img} />
                <Text style={[styles.cell_title]}>{name}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card_header: {
    paddingHorizontal: 10,
  },
  card_wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
  cell_title: {
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default Style0903;
