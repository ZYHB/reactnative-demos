/* eslint-disable react/react-in-jsx-scope */
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';

export default function Box() {
  const pressed = useSharedValue(false);
  const startingPosition = 100;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const uas = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? '#FEEF86' : '#001972',
      transform: [{translateX: x.value}, {translateY: y.value}],
    };
  });

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event, ctx) => {
      pressed.value = false;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    },
  });

  return (
    <View style={{flex: 1}}>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.ball, uas]} />
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  ball: {
    backgroundColor: 'blue',
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
