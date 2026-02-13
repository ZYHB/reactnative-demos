import {Text, StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import {commonStyles} from '~/common/commonStyles';
import CommonFastImage from '~/components/common-fast-image';

const SwipeMore = props => {
  const text = '左\n滑\n查\n看\n更\n多';
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          backgroundColor: '#EEE',
          marginLeft: 15,
          marginRight: 5,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 4,
          overflow: 'hidden',
        }}>
        {text}
      </Text>
    </View>
  );
};

const CardItem = props => {
  const {materialId, promotionTag, img, jdPrice, sprice, saleRatio} = props;
  return (
    <View key={materialId} style={styles.cell}>
      <CommonFastImage source={{uri: img}} style={styles.cell_img} />
      <Text style={styles.cell_sprice_dot}>
        ￥<Text style={styles.cell_sprice}>{sprice}</Text>
      </Text>
      <Text style={styles.cell_jdsprice_dot}>
        ￥<Text style={styles.cell_jdsprice}>{jdPrice}</Text>
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingVertical: 5,
        }}>
        <View style={{width: 20}} />
        <View style={styles.cell_saleRatio_progress}>
          <View
            style={{
              flex: 1,
              width: `${saleRatio}%`,
              backgroundColor: 'red',
            }}
          />
        </View>
        <View style={{width: 20}} />
      </View>
      <Text style={styles.cell_saleRatio}>已售{saleRatio}%</Text>
      <Text style={styles.cell_promotionTag}>{promotionTag}</Text>
    </View>
  );
};

const Style0902 = props => {
  const {content, floorName} = props.data;

  return (
    <View style={[commonStyles.container]}>
      <View style={[commonStyles.card]}>
        <View style={styles.card_header}>
          <Text style={[]}>{floorName}</Text>
        </View>
        <View style={styles.card_wrap}>
          <FlatList
            style={{}}
            data={content}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => {
              const {type} = item;
              if (type === 1) {
                return <SwipeMore />;
              }
              return <CardItem {...item} />;
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card_header: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  card_wrap: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },

  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  cell_img: {
    width: 100,
    height: 100,
  },
  cell_sprice_dot: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'red',
  },
  cell_sprice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cell_jdsprice_dot: {
    fontSize: 9,
    color: 'gray',
  },
  cell_jdsprice: {
    fontSize: 11,
  },
  cell_promotionTag: {
    position: 'absolute',
    top: 5,
    right: 0,
    fontSize: 10,
    backgroundColor: 'yellow',
    paddingHorizontal: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  cell_saleRatio_progress: {
    flex: 1,
    height: 5,
    backgroundColor: '#EEE',
    borderRadius: 2,
    overflow: 'hidden',
  },

  cell_saleRatio: {
    fontSize: 10,
  },
});

export default Style0902;
