/* eslint-disable react/react-in-jsx-scope */
import Animated, {Keyframe, Easing} from 'react-native-reanimated';
import {useState} from 'react';
import {StyleSheet, Button, View} from 'react-native';

export default function Box() {
  const [show, setShow] = useState(false);

  const enteringAnimation = new Keyframe({
    0: {
      originX: 50,
      transform: [{rotate: '45deg'}],
    },
    30: {
      originX: 10,
      transform: [{rotate: '-90deg'}],
    },
    100: {
      originX: 0,
      transform: [{rotate: '0deg'}],
      easing: Easing.quad,
    },
  }).duration(2000);

  const exitingAnimation = new Keyframe({
    0: {
      opacity: 1,
      transform: [{skewX: '0deg'}],
    },
    30: {
      opacity: 0.5,
      transform: [{skewX: '40deg'}],
      easing: Easing.exp,
    },
    100: {
      opacity: 0,
      transform: [{skewX: '-10deg'}],
    },
  }).duration(2000);

  return (
    <View style={{flex: 1, flexDirection: 'column-reverse'}}>
      <Button
        title="animate"
        onPress={() => {
          setShow(last => !last);
        }}
      />
      <View
        style={{height: 400, alignItems: 'center', justifyContent: 'center'}}>
        {show && (
          <Animated.View
            entering={enteringAnimation}
            exiting={exitingAnimation}
            style={{
              height: 100,
              width: 200,
              backgroundColor: 'blue',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        )}
      </View>
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
