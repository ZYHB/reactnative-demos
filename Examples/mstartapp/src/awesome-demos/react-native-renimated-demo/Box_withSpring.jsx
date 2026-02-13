/* eslint-disable react/react-in-jsx-scope */
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import {StyleSheet, Button, View, Text, ScrollView} from 'react-native';

export default function Box() {
  const offset = useSharedValue(0);
  const defaultSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withSpring(offset.value * 255)}],
    };
  });
  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 255, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });

  return (
    <ScrollView style={{flex: 1, flexDirection: 'column'}}>
      <Text
        style={{
          width: '100%',
          backgroundColor: 'yellow',
          paddingVertical: 10,
        }}>
        位移
      </Text>
      <Text>defaultSpringStyles</Text>
      <Animated.View style={[styles.box, defaultSpringStyles]} />
      <Text>customSpringStyles</Text>

      <Animated.View style={[styles.box, customSpringStyles]} />
      <Button onPress={() => (offset.value = Math.random())} title="Move" />

      <Text
        style={{
          width: '100%',
          backgroundColor: 'yellow',
          paddingVertical: 10,
        }}>
        旋转
      </Text>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button
        title="wobble"
        onPress={() => {
          // rotation.value = withRepeat(withTiming(10), 6, true);
          rotation.value = withSequence(
            withTiming(-10, {duration: 50}),
            withRepeat(withTiming(5, {duration: 100}), 6, true),
            withTiming(0, {duration: 50}),
          );
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'blue',
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
