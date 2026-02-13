import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import CommonSafeArea from '~/components/common-safe-area';
export enum Colors {
  background_color = '#000060',
  button_gradient_color1 = '#4c669f',
  button_gradient_color2 = '#3b5998',
  button_gradient_color3 = '#192f6a',
}

export enum FooterState {
  default = -1, // 默认
  loading = 1, // 加载中
  noMore = 2, // 没有更多
  error = 3, // 报错了
}

type Props = {
  footerState: FooterState; //cell的样式
  onPress?: ((event: any) => void) | undefined;
};

const CommonFooter = ({footerState, onPress}: Props) => {
  const render = () => {
    let footer;
    switch (footerState) {
      case FooterState.default:
        footer = <></>;
        break;
      case FooterState.loading:
        footer = (
          <View style={[styles.content]}>
            <ActivityIndicator />
            <Text style={{fontSize: 14}}>加载中...</Text>
          </View>
        );

        break;
      case FooterState.noMore:
        footer = (
          <View style={[styles.content]}>
            <Text style={{fontSize: 14}}>加载完毕！</Text>
          </View>
        );
        break;
      case FooterState.error:
        footer = (
          <View style={[styles.content]}>
            <Text style={styles.titleStyle}>加载失败</Text>
          </View>
        );
        break;
      default:
        footer = <></>;
        break;
    }

    return (
      <View style={[styles.container]}>
        <TouchableOpacity
          onPress={() => {
            onPress && onPress(footerState);
          }}>
          {footer}
        </TouchableOpacity>
        <CommonSafeArea type="bottom" />
      </View>
    );
  };
  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
  },
  content: {
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  titleStyle: {
    fontSize: 13,
    textAlign: 'center',
  },
  subtitleStyle: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default CommonFooter;
