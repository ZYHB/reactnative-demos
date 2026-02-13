import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {PureComponent} from 'react';
import {RouteNames, router} from '~/navigator/NavigationService';

export default class OrderItem extends PureComponent {
  placeholder = require('~/assets/image/placeholder/placeholder.png');
  _renderOrderHeader = () => {
    const {shopName, orderStatusShow} = this.props.data;
    return (
      <View
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>{shopName}</Text>
        <Text>{orderStatusShow}</Text>
      </View>
    );
  };
  _renderWareInfoList = () => {
    const {orderMsg, wareCountMessageNew, listPrice} = this.props.data ?? {};
    const {wareInfoList} = orderMsg;
    if (wareInfoList.length === 1) {
      return (
        <View>
          {wareInfoList.map((item, index) => {
            const {wareId, wname, imageurl} = item;
            return (
              <TouchableOpacity
                key={wareId}
                style={[styles.single_good]}
                onPress={() => {
                  router.push(RouteNames.Product, this.props.data);
                }}>
                <Image
                  style={[styles.single_good_img]}
                  defaultSource={this.placeholder}
                  source={{uri: imageurl}}
                />
                <Text style={{flex: 1, paddingHorizontal: 4}} numberOfLines={2}>
                  {wname}
                </Text>
                <View style={{alignItems: 'flex-end'}}>
                  <Text style={{}} numberOfLines={1}>
                    {listPrice}
                  </Text>
                  <Text style={{fontSize: 12}} numberOfLines={1}>
                    {wareCountMessageNew}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    } else {
      return (
        <View style={[]}>
          <FlatList
            data={wareInfoList}
            renderItem={({item}) => {
              const {imageurl} = item;
              return (
                <TouchableOpacity
                  style={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    marginRight: 5,
                  }}
                  onPress={() => {
                    router.push(RouteNames.Product, item);
                  }}>
                  <Image
                    style={[styles.single_good_img]}
                    defaultSource={this.placeholder}
                    source={{uri: imageurl}}
                  />
                </TouchableOpacity>
              );
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              backgroundColor: 'rgba(256, 256, 256, 0.9)',
              paddingHorizontal: 4,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text style={{}} numberOfLines={1}>
              {listPrice}
            </Text>
            <Text style={{fontSize: 12}} numberOfLines={1}>
              {wareCountMessageNew}
            </Text>
          </View>
        </View>
      );
    }
  };

  _renderButtons = () => {
    const {buttons} = this.props.data;
    var arr = buttons.reverse().filter((item, index) => {
      if (buttons.length < 4) {
        return index >= 0;
      } else {
        return index < 3;
      }
    });
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Text>更多</Text>
        <View style={{flexDirection: 'row'}}>
          {arr.map((item, index) => {
            const {showLabel} = item;
            const textSty = {
              paddingHorizontal: 6,
              paddingVertical: 4,
              marginLeft: 4,
              borderRadius: 12,
              overflow: 'hidden',
              borderColor: index === arr.length - 1 ? 'red' : 'black',
              borderWidth: 0.5,
              fontSize: 12,
            };
            return (
              <TouchableOpacity key={showLabel}>
                <Text style={textSty}>{showLabel}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={[styles.cell]}>
        <View style={[styles.cell_card]}>
          {this._renderOrderHeader()}
          {this._renderWareInfoList()}
          {this._renderButtons()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    paddingHorizontal: 10,
    backgroundColor: '#EEE',
    paddingBottom: 10,
  },
  cell_card: {
    backgroundColor: '#FFF',
    paddingHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  single_good: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  single_good_img: {
    width: 70,
    height: 70,
    borderRadius: 5,
    overflow: 'hidden',
  },
  mutial_good: {flexDirection: 'column'},
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
