/* eslint-disable react/no-unstable-nested-components */
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import CommonVectorIcon from '~/components/common-vector-icons';
interface IProps {
  inputViewStyle?: StyleProp<ViewStyle>;
  value?: string | undefined;
  placeholder?: string | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean | undefined;
  onChangeText?: ((text: string) => void) | undefined;
}

export default function TextField(props: IProps) {
  const [secure, setSecure] = useState(props.secureTextEntry);
  const EyeIcon = () => {
    return (
      <CommonVectorIcon
        name={secure ? 'eye-slash' : 'eye'}
        size={15}
        onPress={() => {
          setSecure(!secure);
        }}
      />
    );
  };
  return (
    <View style={[styles.container, props.inputViewStyle]}>
      <TextInput
        style={{padding: 10, flex: 1}}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        secureTextEntry={secure}
        clearButtonMode="while-editing"
      />
      {props.secureTextEntry === true ? <EyeIcon /> : undefined}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEE',
    overflow: 'hidden',
  },
});
