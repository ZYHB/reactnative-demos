import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  Switch,
} from 'react-native';
import React from 'react';
import CommonVectorIcon from '~/components/common-vector-icons';

export interface CommonCellProps {
  style?: StyleProp<ViewStyle> | undefined;
  title: string; //标题
  subtitle?: string | undefined; //子标题
  showRedDot?: boolean | undefined; //是否展示小红点
  cellType?: 'normal' | 'switch' | undefined; //cell的样式
  switchValue?: boolean; //仅在style为'switch'时生效
  onPress?: ((event: any) => void) | undefined;
  onValueChange?: ((value: boolean) => Promise<void> | void) | null | undefined;
}

export default function CommonCell({
  style,
  title,
  subtitle,
  showRedDot = false,
  cellType = 'normal',
  switchValue,
  onPress,
  onValueChange,
}: CommonCellProps) {
  if (cellType === 'normal') {
    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <View style={[styles.leftContainer]}>
          <Text style={[styles.title]}>{title}</Text>
          <Text style={[styles.subtitle]}>{subtitle}</Text>
        </View>
        <View style={[showRedDot ? styles.redDot : styles.redDot1]} />
        <CommonVectorIcon name={'chevron-right'} size={10} />
      </TouchableOpacity>
    );
  } else if (cellType === 'switch') {
    return (
      <View style={[styles.container, style]}>
        <View style={[styles.leftContainer]}>
          <Text style={[styles.title]}>{title}</Text>
          <Text style={[styles.subtitle]}>{subtitle}</Text>
        </View>
        <View style={[showRedDot ? styles.redDot : styles.redDot1]} />
        <Switch value={switchValue} onValueChange={onValueChange} />
      </View>
    );
  }

  return (
    <View>
      <Text>参数不合规</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
  },
  subtitle: {
    fontSize: 13,
    color: 'gray',
  },
  redDot: {
    width: 5,
    height: 5,
    backgroundColor: 'red',
    marginHorizontal: 5,
  },
  redDot1: {
    width: 5,
    height: 5,
    backgroundColor: 'transparent',
    marginHorizontal: 5,
  },
});
