import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
// import {ThemeProvider} from '@callstack/react-theme-provider';

// import Header from './Header';
// import ThemeChanger from './ThemeChanger';
// import {themes} from './theme/themes';

export default class App extends Component {
  state = {
    // theme: themes.normal,
  };

  render() {
    return (
      // <ThemeProvider theme={this.state.theme}>
      <View style={[styles.container]}>
        {/* <Button></Button> */}
        <Text>App</Text>
        {/* <Header /> */}
        {/* <ThemeChanger theme={this.state.theme} /> */}
      </View>
      // </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// const Button = withTheme(({theme}) => (
//   <View style={{color: theme.primaryColor}}>
//     <Text>Click me</Text>
//   </View>
// ));
