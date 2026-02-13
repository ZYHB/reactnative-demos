import * as React from 'react';
import {
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {TabView} from 'react-native-tab-view';
import CommonOrderList from './order-list/common-order-list';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class OrderTabView extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    index: this.props.initialIndex ?? 0,
    routes: [
      {key: 'allOrder', title: '全部'},
      {key: 'wait4PaymentOrder', title: '待付款'},
      {key: 'wait4DeliveryOrder', title: '待收货'},
      {key: 'completedOrder', title: '已完成'},
      {key: 'cancleOrder', title: '已取消'},
    ],
  };

  componentDidMount() {
    setTimeout(() => {}, 1000);
  }

  _handleIndexChange = index => this.setState({index});

  _renderTabBar = props => {
    return (
      <View>
        <FlatList
          style={styles.tabBar}
          data={props.navigationState.routes}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={(item, index) => {
            const route = item;
            return (
              <TouchableOpacity
                key={route.item.key}
                style={styles.tabItem}
                onPress={() => this.setState({index: route.index})}>
                <Text
                  style={{
                    color: this.state.index === route.index ? '#000' : '#666',
                    fontSize: this.state.index === route.index ? 15 : 13,
                  }}>
                  {route.item.title}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  _renderScene = ({route}) => {
    const {index, routes} = this.state;
    return <CommonOrderList key={route.key} data={route.key} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <TabView
          animationEnabled={false}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
          lazy={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH / 5,
    height: 40,
  },
});
