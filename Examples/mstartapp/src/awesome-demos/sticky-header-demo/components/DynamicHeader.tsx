import * as React from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';
import {Easing} from 'react-native-reanimated';

const Header_Max_Height = 200;
const Header_Min_Height = 70;
export interface IProps {
  animHeaderValue: Animated.Value;
}

export default function DynamicHeader({animHeaderValue}: IProps) {
  const animateHeaderBackgroundColor = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: ['blue', 'red'],
    extrapolate: 'clamp',
  });
  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp', //阻止输出值超过outputRange
    easing: Easing.ease,
  });
  // const animatetranslateY = animHeaderValue.interpolate({
  //   inputRange: [0, Header_Max_Height - Header_Min_Height],
  //   outputRange: [Header_Max_Height, Header_Min_Height],
  //   extrapolate: 'extend',
  // });
  // const getHeight = () => {
  //   return animateHeaderHeight;
  // };

  React.useEffect(() => {
    console.log('animateHeaderHeight:', animHeaderValue);
  }, []);

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animateHeaderHeight,
          backgroundColor: animateHeaderBackgroundColor,
          // transform: [{translateY: animatetranslateY}],
        },
      ]}>
      <Text style={styles.headerText}>A List of Books</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    paddingTop: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
