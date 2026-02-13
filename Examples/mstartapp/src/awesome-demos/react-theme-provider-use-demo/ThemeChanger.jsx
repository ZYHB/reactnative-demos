import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {withTheme} from '@callstack/react-theme-provider';

function ThemeChanger({theme}) {
  return (
    <View
      style={{
        backgroundColor: theme.primaryColor,
      }}>
      <Text>ThemeChanger</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default withTheme(ThemeChanger);
