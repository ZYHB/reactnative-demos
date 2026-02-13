import {
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  GestureResponderEvent,
  ViewStyle,
  ColorValue,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

interface IProps {
  name: string;
  size?: number | undefined;
  backgroundColor?: number | ColorValue | undefined;
  color?: number | ColorValue | undefined;
  iconStyle?: TextStyle | undefined;
  style?: TextStyle | ViewStyle | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}
export default function CommonVectorIcon(props: IProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.onPress ? false : true}>
      <FontAwesome.Button
        disabled={true} //设置可点击，去除原本的长按高亮状态
        name={props.name}
        size={props.size ?? undefined}
        color={props.color ?? '#000'} //控制图标和文字颜色
        backgroundColor={props.backgroundColor ?? 'transparent'}
        // iconStyle={Object.assign({}, {marginRight: 0}, props.iconStyle)}
        iconStyle={{marginRight: 0}}
        style={{backgroundColor: 'transparent', opacity: 1}}
        // style={Object.assign(
        //   {backgroundColor: 'transparent', opacity: 1},
        //   props.style,
        // )} //控制按钮背景色
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
