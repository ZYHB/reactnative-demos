import React from 'react';
import {Animated, View} from 'react-native';

export default function ScrollIndicator(props) {
  const {containerWidth, indicatorWidth, translateX} = props;
  return (
    <View style={{alignItems: 'center', marginBottom: 5}}>
      <View
        style={[
          {
            backgroundColor: '#EEE',
            borderRadius: 2,
            overflow: 'hidden',
            height: 4,
            width: containerWidth,
          },
        ]}>
        <Animated.View
          style={{
            position: 'absolute',
            backgroundColor: 'red',
            borderRadius: 2,
            width: indicatorWidth,
            height: 4,
            transform: [{translateX: translateX}],
          }}
        />
      </View>
    </View>
  );
}
