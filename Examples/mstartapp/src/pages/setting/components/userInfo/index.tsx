import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// 对标签属性进行类型、必要性的限制
interface Props {
  // style?: StyleProp<ViewStyle> | undefined;
  // title: string; //标题
  // subtitle?: string | undefined; //子标题
  // showRedDot?: boolean | undefined; //是否展示小红点
  // cellType?: 'normal' | 'switch' | 'userInfo' | undefined; //cell的样式
  // switchValue?: boolean; //仅在style为'switch'时生效
  onPress?: ((event: any) => void) | undefined;
  onValueChange?: ((value: boolean) => Promise<void> | void) | null | undefined;
}

const SettingUserInfoView = (props: Props) => {
  const [info, setInfo] = useState({
    accountName: '我不是寻宝鼠',
    nickName: '我不是寻宝鼠~~~',
  });

  const _renderLeft = () => {
    const {accountName, nickName} = info;
    return (
      <View style={[styles.leftContainer]}>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />
        <View style={[{flex: 1, borderColor: 'transparent', borderWidth: 1}]}>
          <Text style={[styles.title]}>{accountName}</Text>
          <Text style={[styles.subtitle]}>{nickName}</Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity style={[styles.container]} onPress={props.onPress}>
      {_renderLeft()}
      <View style={[styles.redDot1]} />
      <FontAwesome name={'chevron-right'} size={10} color={'black'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 0.5,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
  },
  subtitle: {
    fontSize: 13,
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

export default SettingUserInfoView;
