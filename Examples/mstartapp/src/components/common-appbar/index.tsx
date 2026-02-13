import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CommonVectorIcon from '~/components/common-vector-icons';
import {router} from '~/navigator/NavigationService';

export type CommonAppBarProps = {
  title?: string;
  showBack?: boolean;
  handleBackPress?: (() => void) | undefined;
  leftItem?: React.ReactNode;
  centerItem?: React.ReactNode;
  rightItem?: React.ReactNode;
};

export function CommonAppBar({
  title,
  showBack = true,
  handleBackPress,
  leftItem,
  centerItem,
  rightItem,
}: CommonAppBarProps) {
  const insets = useSafeAreaInsets();

  const renderGoBackBtn = () => {
    if (showBack === true) {
      return (
        <CommonVectorIcon
          name={'long-arrow-alt-left'}
          onPress={handleBackPress ?? (() => router.pop())}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={[{height: Math.max(insets.top, 22), flex: 1}]} />
      <View style={[styles.navigationBar]}>
        <View style={[styles.navigationBar_stack0]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {renderGoBackBtn()}
            {leftItem}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text />
            {rightItem}
          </View>
        </View>
        <View style={[styles.navigationBar_stack1]}>
          {centerItem ? (
            centerItem
          ) : (
            <Text style={[styles.title]}>{title}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    backgroundColor: '#FFF',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 10,
  },
  navigationBar_stack0: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navigationBar_stack1: {
    left: (Dimensions.get('window').width * (1 - 0.5)) / 2,
    width: Dimensions.get('window').width * 0.5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
