import {StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {TabView} from 'react-native-tab-view';
import TabScene from './scene';
export default class ScenesController extends Component {
  insets = null;
  constructor(props) {
    super(props);
    const {initialIndex} = this.props;
    const tabs = this.getTabs();
    var routes = [];
    for (let index = 0; index < tabs.length; index++) {
      const element = tabs[index];
      routes.push({key: element.cName, title: element.cName, tabInfo: element});
    }
    this.state = {
      index: initialIndex,
      routes: routes,
    };
  }

  getFloors = () => {
    const floors = this.props.data?.floorList ?? [];
    return floors;
  };

  getTabs = () => {
    const floors = this.getFloors();
    var tabs = [];
    for (let index = 0; index < floors.length; index++) {
      const element = floors[index];
      if (element.type === 'topTab') {
        tabs = element.content;
      }
    }
    return tabs;
  };

  setPage = index => {
    this.setState({index});
  };

  _handleIndexChange = index => this.setState({index});

  _renderScene = ({route}) => {
    return <TabScene key={route.key} data={route.tabInfo} />;
  };

  render() {
    return (
      <View style={[{flex: 1}, {backgroundColor: '#EEE'}]}>
        <TabView
          animationEnabled={false}
          swipeEnabled={false}
          navigationState={this.state}
          renderTabBar={() => null}
          renderScene={this._renderScene}
          onIndexChange={this._handleIndexChange}
          lazy={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
