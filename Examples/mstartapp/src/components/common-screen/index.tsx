import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {CommonAppBar, CommonAppBarProps} from '../common-appbar';
import {commonStyles} from '~/common/commonStyles';
type CommonScreenProps = {
  showAppbar?: boolean;
  appbar?: CommonAppBarProps;
  children?: React.ReactNode;
};

export default function CommonScreen({
  showAppbar = true,
  appbar,
  children,
}: CommonScreenProps) {
  return (
    <View style={[commonStyles.page]}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      {children}
      {showAppbar ? <CommonAppBar {...appbar} /> : undefined}
    </View>
  );
}

const styles = StyleSheet.create({});
