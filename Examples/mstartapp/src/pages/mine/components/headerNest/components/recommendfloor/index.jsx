/* eslint-disable no-shadow */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {commonService} from '~/api/common-service';

export default class RecommendFloor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: [],
      selectTabId: 1,
    };
  }

  componentDidMount() {
    this.loadFirstPage();
  }

  loadFirstPage() {
    commonService
      .fetchUniformRecommendTabs()
      .then(response => {
        const tabs = response.tabs;
        if (tabs.length > 0) {
          const selectTabId = tabs[0].tabId;
          DeviceEventEmitter.emit('meeting_receive', tabs[0]); //发送消息，并携带param参数
          this.setState({tabs: tabs, selectTabId: selectTabId});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderCardItem = ({item, index}) => {
    const {selectTabId} = this.state;
    const {tabId, title, subtitle} = item;
    const select = tabId === selectTabId;
    const titleSty = {
      color: select ? 'red' : 'black',
      fontWeight: select ? 'bold' : 'normal',
    };
    const subtitleSty = {
      color: select ? 'red' : 'black',
      fontWeight: select ? 'bold' : 'normal',
    };
    return (
      <TouchableOpacity
        key={tabId}
        style={styles.cardItem}
        onPress={() => {
          const selectTabId = tabId;
          DeviceEventEmitter.emit('meeting_receive', item); //发送消息，并携带param参数
          this.setState({selectTabId: selectTabId});
        }}>
        <Text style={titleSty}>{title}</Text>
        <Text style={subtitleSty}>{subtitle}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {tabs, selectTabId} = this.state;
    return (
      <View style={{borderColor: 'red', borderWidth: 1}}>
        <Text>recommendfloor</Text>
        <FlatList
          style={{}}
          data={tabs}
          keyExtractor={(item, index) => item.tabId}
          renderItem={this.renderCardItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={tabs.length}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    borderColor: 'red',
    borderWidth: 1,
  },
});
