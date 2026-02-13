import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CommonFastImage from '~/components/common-fast-image';
import {formatTime} from '~/utils';
const BrowseHistoryItem = (props: any) => {
  return (
    <View>
      <Text>{formatTime.timestampToTime(props?.itemInfo?.ts)}</Text>
      <TouchableOpacity onPress={() => console.log('first')}>
        <View style={[styles.group_item, styles.group_item_bg]}>
          <View style={styles.group_item_left}>
            <CommonFastImage
              style={styles.group_item_left_pic}
              defaultSource={require('~/assets/image/placeholder/placeholder.png')} //默认图片
              source={{uri: props?.itemInfo?.img}}
            />
          </View>
          <View style={styles.group_item_right}>
            <Text>
              {props?.itemInfo?.name}, {props?.itemInfo?.jprice}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  group_item: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEEEEE',
  },
  group_item_bg: {
    backgroundColor: '#fff',
  },
  group_item_left: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  group_item_left_pic: {
    width: 50,
    height: 50,
    borderColor: 'red',
    borderWidth: 1,
  },
  group_item_right: {
    flex: 5,
    alignItems: 'flex-start',
  },
});

export default BrowseHistoryItem;
