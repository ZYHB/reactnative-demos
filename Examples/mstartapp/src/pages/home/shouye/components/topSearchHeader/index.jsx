import {StyleSheet, View, ImageBackground} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

export default class TopSearchHeader extends Component {
  insets = null;
  topBgImgBig = null;
  constructor(props) {
    super(props);
    const floorLists = props.data.floorList;
    this.topBgImgBig = props.data.topBgImgBig;
  }
  changeOpacity = currentY => {
    const totalH = 74;
    let topTabOpacity = 0;
    let webFloorOpacity = 0;

    if (currentY >= 74) {
      // 上滑渐变结束显示
      webFloorOpacity = 0;
      topTabOpacity = 1;
    } else if (currentY > 0) {
      // 上滑渐变中
      // [self slideUpWithAlpha:offsetY / 74.f];
      webFloorOpacity = 0;
      topTabOpacity = 1;
    } else if (currentY === 0) {
      // 初始状态
      webFloorOpacity = 0;
      topTabOpacity = 1;
    } else if (currentY < -50) {
      // 下滑渐变结束显示
      webFloorOpacity = 1;
      topTabOpacity = 0;
    } else {
      // 下滑渐变中
      webFloorOpacity = 1;
      topTabOpacity = 1 - -currentY / 50;
    }

    /// 用这种方式修改，渐变时不会那么生硬
    this.backgroundRef.setNativeProps({opacity: topTabOpacity});
  };

  renderTopHeader = () => {
    const marginTop = Math.max(this.insets.top, 22);
    return (
      <ImageBackground
        ref={ref => (this.backgroundRef = ref)}
        source={{uri: this.topBgImgBig}}
        style={styles.imageBackground}>
        <View style={{paddingTop: marginTop}}>
          <View style={{height: 44}} />
        </View>
      </ImageBackground>
    );
  };

  render() {
    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => {
          this.insets = insets;
          return this.renderTopHeader();
        }}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
  },
});
