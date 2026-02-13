import { Component } from 'react';
import { Text, View } from 'react-native';

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

