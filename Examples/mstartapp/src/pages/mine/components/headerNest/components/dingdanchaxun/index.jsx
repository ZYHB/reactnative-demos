import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component, PureComponent} from 'react';
import {router, RouteNames} from '~/navigator/NavigationService';
export default class DingdanchaxunFloor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.card]}>
          <TopBar />
          <BottomListView {...this.props} />
        </View>
        <View style={{height: 5}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
});

///// --- 顶部TopBar
class TopBar extends PureComponent {
  handlePress = item => {
    const {name, icon, value} = item;
    if (name === '商品收藏') {
      router.push(RouteNames.Favorite);
    } else if (name === '店铺关注') {
    } else if (name === '浏览记录') {
      router.push(RouteNames.BrowseHistory);
    }
  };

  render() {
    const list = [
      {name: '商品收藏', icon: 'cut', value: '1'},
      {name: '店铺关注', icon: 'yang', value: ''},
      {name: '浏览记录', icon: 'cruling', value: '3'},
    ];
    return (
      <View style={topBarStyles.container}>
        {list.map((item, index) => {
          const {name, icon, value} = item;
          return (
            <TouchableOpacity
              key={name}
              style={topBarStyles.item}
              onPress={() => this.handlePress(item)}>
              <View style={{width: 25, height: 25, backgroundColor: '#EEE'}} />
              <Text style={[{fontSize: 13}]}>{name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const topBarStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
});

///// --- 底部订单BottomListView
class BottomListView extends Component {
  handlePress = item => {
    const {name, icon, value} = item;
    if (name === '待付款') {
      router.push(RouteNames.Order, {index: 1});
    } else if (name === '待收货') {
      router.push(RouteNames.Order, {index: 2});
    } else if (name === '待评价') {
    } else if (name === '退换/售后') {
    } else if (name === '我的订单') {
      router.push(RouteNames.Order, {index: 0});
    }
  };

  render() {
    const list = [
      {name: '待付款', icon: 'cut', value: '1'},
      {name: '待收货', icon: 'yang', value: ''},
      {name: '待评价', icon: 'cruling', value: '3'},
      {name: '退换/售后', icon: 'cruling', value: '3'},
      {name: '我的订单', icon: 'cruling', value: '3'},
    ];
    return (
      <View style={bottomStyles.container}>
        {list.map((item, index) => {
          const {name, icon, value} = item;

          return (
            <TouchableOpacity
              key={name}
              style={bottomStyles.item}
              onPress={() => this.handlePress(item)}>
              <View style={{width: 25, height: 25, backgroundColor: '#EEE'}} />
              <Text style={[bottomStyles.title]}>{name}</Text>
              {name === '我的订单' ? (
                <Text style={[bottomStyles.subtitle]}>查看电子发票</Text>
              ) : undefined}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const bottomStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  title: {
    fontSize: 13,
    marginBottom: 2,
  },
  subtitle: {fontSize: 10},
});
