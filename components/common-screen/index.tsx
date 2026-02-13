import { commonStyles } from '@/common/commonStyles';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { CommonAppBar, CommonAppBarProps } from '../common-appbar';

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
