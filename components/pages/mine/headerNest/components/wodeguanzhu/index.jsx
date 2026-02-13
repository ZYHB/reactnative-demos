import { Component } from 'react';
import { Text, View } from 'react-native';

export default class WodeguanzhuFloor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{borderColor: 'red', borderWidth: 1, height: 50}}>
        <Text>wodeguanzhu</Text>
      </View>
    );
  }
}

