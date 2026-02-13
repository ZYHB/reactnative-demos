import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ColorValue,
  GestureResponderEvent,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native';

interface IProps {
  name: React.ComponentProps<typeof Ionicons.Button>['name'];
  size?: number | undefined;
  backgroundColor?: string | ColorValue | undefined;
  color?: string | ColorValue | undefined;
  iconStyle?: TextStyle | undefined;
  style?: TextStyle | ViewStyle | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}
export default function CommonVectorIcon(props: IProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.onPress ? false : true}>
      <Ionicons.Button
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

