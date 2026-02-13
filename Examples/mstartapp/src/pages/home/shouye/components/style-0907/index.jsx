/* eslint-disable no-shadow */
import {Text, StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import {commonStyles} from '~/common/commonStyles';
import CommonFastImage from '~/components/common-fast-image';

const CardItem = props => {
  const {materialId, img, skuList} = props;
  return (
    <View key={materialId} style={styles.cell}>
      <CommonFastImage source={{uri: img}} style={styles.cell_img} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderRadius: 10,
          backgroundColor: '#FFF',
        }}>
        {skuList.map((item, index) => {
          const {materialId, img, jdPrice, sprice} = item;
          return (
            <View
              key={materialId}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10,
                marginTop: -30,
                paddingLeft: index === 0 ? 0 : 4,
                borderTopLeftRadius: index > 0 ? 0 : 10,
                borderTopRightRadius: index < skuList.length - 1 ? 0 : 10,
              }}>
              <View style={styles.sku}>
                <CommonFastImage source={{uri: img}} style={styles.sku_img} />
              </View>
              <Text style={styles.sku_sprice_dot}>
                ￥<Text style={styles.sku_sprice}>{sprice}</Text>
              </Text>
              <Text style={styles.sku_jdsprice_dot}>
                ￥<Text style={styles.sku_jdsprice}>{jdPrice}</Text>
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const Style0907 = props => {
  const {content, floorName} = props.data;

  return (
    <View style={[commonStyles.container]}>
      <View
        style={[
          commonStyles.card,
          {flexDirection: 'column', flexWrap: undefined},
        ]}>
        <View style={styles.card_header}>
          <Text style={[]}>{floorName}</Text>
        </View>
        <FlatList
          style={styles.listView}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.materialId}
          data={content}
          renderItem={({item, index}) => {
            return <CardItem {...item} />;
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card_header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  listView: {
    paddingHorizontal: 10,
  },
  cell: {
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cell_img: {
    width: '100%',
    height: 100,
  },
  sku: {
    marginTop: 10,
    width: 250 / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sku_img: {
    width: (250 / 3) * 0.8,
    height: (250 / 3) * 0.8,
  },
  sku_sprice_dot: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'red',
  },
  sku_sprice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sku_jdsprice_dot: {
    fontSize: 9,
    color: 'gray',
  },
  sku_jdsprice: {
    fontSize: 11,
  },
});

export default Style0907;
