import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

export default class WodezhuanshuFloor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <ContentView {...this.props} />
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
    // backgroundColor: '#FFF',
  },
});

///// --- 底部订单ContentView
class ContentView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {text, tips} = this.props.floor.data;
    return (
      <View style={{paddingVertical: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>{text}</Text>
          <Text style={{fontSize: 13}}>{tips}</Text>
        </View>
      </View>
    );
  }
}
