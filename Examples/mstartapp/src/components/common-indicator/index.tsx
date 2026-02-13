import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';

type Props = {
  count: number;
  currentIndex: number;
  style?: StyleProp<ViewStyle> | undefined;
  activeStyle?: StyleProp<ViewStyle> | undefined;
  inActiveStyle?: StyleProp<ViewStyle> | undefined;
};

const createIndicatorItems = (indicatorItems: any) => {
  const res = [];
  for (let i = 0; i < indicatorItems.length; i++) {
    res.push(indicatorItems[i]);
    if (i !== indicatorItems.length - 1) {
      res.push('space');
    }
  }
  return res;
};

const CommonIndicator = ({
  count,
  currentIndex,
  style,
  activeStyle,
  inActiveStyle,
}: Props) => {
  const indicatorItems = Array.from({length: count}, (v, k) => k + '1');
  const totalIndicatorItems = createIndicatorItems(indicatorItems);

  return (
    <View style={[styles.container, style]}>
      {totalIndicatorItems.map((item, index) => {
        const isSpace = item.indexOf('space') !== -1;
        if (isSpace) {
          return <View key={index} style={{width: 4, height: 4}} />;
        }
        const slf_index = indicatorItems.indexOf(item);

        return (
          <View
            key={index}
            style={[
              slf_index === currentIndex
                ? Object.assign({}, styles.active, activeStyle)
                : Object.assign({}, styles.inActive, inActiveStyle),
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 3,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  active: {
    width: 10,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'black',
  },
  inActive: {
    width: 5,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'gray',
  },
});

export default CommonIndicator;
