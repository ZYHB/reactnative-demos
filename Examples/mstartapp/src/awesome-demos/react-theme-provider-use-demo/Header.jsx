import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
// import {ThemeProvider} from '@callstack/react-theme-provider';

class Header extends Component {
  render() {
    return (
      <View
        style={{
          // backgroundColor: this.props.theme.primaryColor,
          backgroundColor: 'red',
        }}>
        <Text>Header</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Header;
