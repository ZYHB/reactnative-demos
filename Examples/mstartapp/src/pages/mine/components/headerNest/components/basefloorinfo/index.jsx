import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

export default class BasefloorinfoFloor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{borderColor: 'red', borderWidth: 1, height: 50}}>
        <Text>basefloorinfo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
