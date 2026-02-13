import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';
const statusBarHeight = StatusBar.currentHeight;
export default class HeaderByScroll extends Component {
  constructor(props) {
    super(props);
    this.changeNavHeight = 150; //决定改变导航栏样式的滑动距离
    this.state = {
      navOpacityOffset: new Animated.Value(0), //改变导航背景图透明度的偏移距离
      navBackColorOffset: new Animated.Value(0), //改变导航背景颜色的偏移距离
    };
  }

  UNSAFE_componentWillMount() {
    //设置状态栏颜色为透明（针对Android）
    StatusBar.setBackgroundColor('transparent');
    //声明滑动动画事件
    this.animatedEvent = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {y: this.state.navBackColorOffset}, //将y值保存到state中背景色偏移距离的值上
            // contentOffset: { y: this.state.navOpacityOffset }  //将y值保存到state中透明度偏移距离的值上
          },
        },
      ],
      {
        listener: e => {
          //获取ScrollView在y轴上的偏移量
          let y = e.nativeEvent.contentOffset.y;
          if (y > this.changeNavHeight / 2) {
            //超过设定滑动距离1/2时，状态栏样式为浅色
            StatusBar.setBarStyle('light-content');
          } else {
            //反之，状态栏样式为深色
            StatusBar.setBarStyle('dark-content');
          }
        },
      },
    );
    // 生成背景色动画输入输出区间
    const navBackColorOffset = this.state.navBackColorOffset;
    // 插值动画(interpolate)
    this.backgroundAnimated = navBackColorOffset.interpolate({
      inputRange: [0, this.changeNavHeight],
      outputRange: ['#F2F740', '#FA5D4D'],
      extrapolate: 'clamp', //阻止输出值超过outputRange
      useNativeDriver: true,
    });
    //生成透明度动画输入输出区间
    // const navOpacityOffset = this.state.navOpacityOffset
    // this.navOpacityAnimated = navOpacityOffset.interpolate({
    //   inputRange: [0, this.changeNavHeight],
    //   outputRange: [0, 1],
    //   extrapolate: 'clamp',  //阻止输出值超过outputRange
    //   useNativeDriver: true,
    // })
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        {/* 顶部背景色 */}
        <Animated.View
          style={[
            styles.header,
            {
              alignItems: 'center',
              backgroundColor: this.backgroundAnimated,
            },
          ]}>
          <Text
            style={{fontSize: 18, marginTop: isAndroid ? statusBarHeight : 44}}>
            滑动渐变导航栏
          </Text>
        </Animated.View>
        {/* 顶部图片透明度 */}
        {/* <Animated.Image
          style={[
            styles.header,
            { 
              opacity:this.navOpacityAnimated
            }
          ]}
          source={require('../../images/house/pic_topbg.png')}  //这里替换成你自己的图片路径
        /> */}
        <ScrollView
          style={{flex: 1, width: width}}
          scrollEventThrottle={1}
          onScroll={this.animatedEvent} //滑动监听事件
          showsVerticalScrollIndicator={false}>
          <View
            style={[styles.itemView, {height: 300, backgroundColor: '#EEE'}]}>
            <Text style={{fontSize: 20}}>区域A</Text>
          </View>
          <View
            style={[styles.itemView, {height: 300, backgroundColor: '#F262'}]}>
            <Text style={{fontSize: 20}}>区域B</Text>
          </View>
          <View
            style={[styles.itemView, {height: 500, backgroundColor: '#EEE'}]}>
            <Text style={{fontSize: 20}}>区域C</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: (isAndroid ? statusBarHeight : 44) + 44, //顶部适配距离,
    width: width,
    position: 'absolute',
    zIndex: 10,
  },
  itemView: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
