import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

export const HEADER_IMAGE_HEIGHT = Dimensions.get('window').width / 3;

export default function Dashboard() {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
      console.log('====================================');
      console.log(scrollY.value);
      console.log('====================================');
    },
  });
  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [100, 0], [3, 1], {
      extrapolateRight: Extrapolate.CLAMP,
    });
    return {
      transform: [{scale: scale}],
    };
  });

  return (
    <View
      style={[
        {flex: 1, backgroundColor: 'white', borderColor: 'red', borderWidth: 4},
      ]}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 90,
            left: 20,
            width: 20,
            height: 20,
            backgroundColor: 'blue',
          },
          animatedStyles,
        ]}
      />

      <Animated.ScrollView
        scrollEventThrottle={1}
        style={StyleSheet.absoluteFill}
        onScroll={scrollHandler}>
        {[0, 1, 2, 3, 43, 4, 45, 45, 45, 46, 432, 22, 333].map(
          (item, index) => {
            console.log('object', item);
            return (
              <View
                key={index}
                style={[{height: 44, borderColor: 'red', borderWidth: 1}]}>
                <Text style={{color: 'red'}}>{index}</Text>
              </View>
            );
          },
        )}
      </Animated.ScrollView>
    </View>
  );
}
