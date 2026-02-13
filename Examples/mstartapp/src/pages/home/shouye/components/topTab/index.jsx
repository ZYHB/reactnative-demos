/* eslint-disable no-shadow */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

const dimen = Dimensions.get('window');
const deviceWidth = dimen.width;

export default class TopTabFloor extends Component {
  insets = null;
  navigationBarH = 0;
  segmentH = 40;
  containerH = 0;
  topBgImgBig = null;
  webFloorBgImgBig = null;

  constructor(props) {
    super(props);
    const floorLists = props.data.floorList;
    this.topBgImgBig = props.data.topBgImgBig;
    this.webFloorBgImgBig =
      'https://m15.360buyimg.com/mobilecms/jfs/t1/183492/7/30099/222801/6364eaafE974a7572/0658eacbe4623aa1.jpg!q70.jpg';
    var tabs = [];
    for (let index = 0; index < floorLists.length; index++) {
      const element = floorLists[index];
      if (element.type === 'topTab') {
        tabs = element.content;
        this.selectedFontSize = element.selectedFontSize / 2;
        this.selectedTextColor = element.selectedTextColor;
        this.unSelectedFontSize = element.unSelectedFontSize / 2;
      }
    }

    this.state = {
      selectIndex: props.initialIndex,
      contentSizeW: 0,
      tabs: tabs,
      topTabOpacity: 1,
      webFloorOpacity: 0,
    };
  }

  /********************* render **************************/
  updateSelectIndex = index => {
    this.segmentsRef.goToSelectIndex(index, true);
  };

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
    // this.setState({
    //   // topTabOpacity: topTabOpacity,
    //   // webFloorOpacity: webFloorOpacity,
    // });
    /// 用这种方式修改，渐变时不会那么生硬
    this.tabViewRef.setNativeProps({opacity: topTabOpacity});
    this.webViewRef.setNativeProps({opacity: webFloorOpacity});
  };

  rederTabs = () => {
    const {topTabOpacity} = this.state;
    const containerSty = {
      height: this.containerH,
      left: 0,
      right: 0,
      position: 'absolute',
      opacity: topTabOpacity,
    };
    return (
      <View ref={ref => (this.tabViewRef = ref)} style={[containerSty]}>
        <ImageBackground source={{uri: this.topBgImgBig}} style={{flex: 1}}>
          <WrapperSegments
            ref={ref => (this.segmentsRef = ref)}
            style={{left: 0, right: 0, position: 'absolute', bottom: 0}}
            {...this.props}
          />
        </ImageBackground>
      </View>
    );
  };

  renderWebViewFloor = () => {
    const {webFloorOpacity} = this.state;
    const containerSty = {
      height: this.containerH,
      left: 0,
      right: 0,
      position: 'absolute',
      opacity: webFloorOpacity,
    };
    const imageBackgroundSty = {
      flex: 1,
      marginTop: -200,
      height: 200 + this.containerH,
    };
    const refreshIdlSty = {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      left: 0,
      right: 0,
      bottom: 0,
    };
    return (
      <View ref={ref => (this.webViewRef = ref)} style={containerSty}>
        <ImageBackground
          source={{uri: this.webFloorBgImgBig}}
          style={imageBackgroundSty}>
          <View style={refreshIdlSty}>
            <Text>下拉惊喜</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => {
          ///提前计算好一些变量
          this.insets = insets;
          const marginTop = Math.max(this.insets.top, 22);
          this.navigationBarH = marginTop + 44;
          this.containerH = this.navigationBarH + this.segmentH;
          return (
            <View style={{height: this.containerH}}>
              {this.renderWebViewFloor()}
              {this.rederTabs()}
            </View>
          );
        }}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

class WrapperSegments extends Component {
  didInitialFlag = false;
  layoutInfoMap = {};
  selectedFontSize = 16;
  selectedTextColor = '#ffffff';
  unSelectedFontSize = 16;

  constructor(props) {
    super(props);
    const floorLists = props.data.floorList;
    var tabs = [];
    for (let index = 0; index < floorLists.length; index++) {
      const element = floorLists[index];
      if (element.type === 'topTab') {
        tabs = element.content;
        this.selectedFontSize = element.selectedFontSize / 2;
        this.selectedTextColor = element.selectedTextColor;
        this.unSelectedFontSize = element.unSelectedFontSize / 2;
      }
    }

    this.state = {
      selectIndex: props.initialIndex,
      contentSizeW: 0,
      tabs: tabs,
    };
  }

  /********************* render **************************/
  updateSelectIndex = index => {
    this.goToSelectIndex(index, true);
  };

  /********************* render **************************/
  // 获取标签的Layout信息
  getLableLayoutInfo = (layout, item) => {
    this.layoutInfoMap[item.cName] = layout;
    const keys = Object.keys(this.layoutInfoMap);
    if (keys.length === this.state.tabs.length && !this.didInitialFlag) {
      this.didInitialFlag = true;
      this.didEndLayout();
    }
  };
  //获取所有布局信息后
  didEndLayout = () => {
    if (this.state.tabs.length > 0) {
      let contentSizeW = 0;
      for (let i = 0; i < this.state.tabs.length; i++) {
        const element = this.state.tabs[i];
        const lablayout = this.layoutInfoMap[element.cName];
        contentSizeW += lablayout.width;
      }
      this.setState({contentSizeW});
      this.goToInitialIndex();
    }
  };

  // 设置默认选中项
  goToInitialIndex = () => {
    if (this.props.initialIndex != null) {
      this.goToSelectIndex(this.props.initialIndex, true);
    }
  };

  // 设置选中项
  goToSelectIndex = (index, bl = true) => {
    const {tabs} = this.state;
    const element = tabs[index];

    const layout = this.layoutInfoMap[element.cName];

    let rx = deviceWidth / 2;

    var left = 0;
    for (let i = 0; i < tabs.length; i++) {
      const element = tabs[i];
      const lablayout = this.layoutInfoMap[element.cName];
      if (i < index) {
        left += lablayout.width;
      }
    }
    left -= rx;
    left += layout.width / 2;
    this.scrollViewRef.scrollToOffset({animated: bl, offset: left});
  };

  /// 样式1 ： [文字]
  rederTabItemStyle1 = (item, index) => {
    const {selectIndex} = this.state;
    const textSty =
      selectIndex === index
        ? {
            fontSize: this.selectedFontSize,
            color: this.selectedTextColor,
            fontWeight: 'bold',
          }
        : {
            fontSize: this.unSelectedFontSize,
            color: this.selectedTextColor,
          };
    return (
      <View
        style={{
          paddingVertical: 5,
          paddingHorizontal: 3,
        }}>
        <Text style={[textSty, {}]}> {item.cName}</Text>
      </View>
    );
  };
  /// 样式2 ： [图片]
  rederTabItemStyle2 = (item, index) => {
    const {selectIndex} = this.state;
    return (
      <View
        style={{
          paddingVertical: 5,
          paddingHorizontal: 3,
        }}>
        <Image
          source={{
            uri: selectIndex === index ? item.cateTabImage : item.unCateImage1,
          }}
          style={{
            width: 30,
            height: 20,
          }}
        />
      </View>
    );
  };

  renderTabItem = ({item, index}) => {
    const showImage = item.showImage ?? 0;
    let component;
    if (showImage === 1) {
      component = this.rederTabItemStyle2(item, index);
    } else {
      component = this.rederTabItemStyle1(item, index);
    }

    return (
      <TouchableOpacity
        style={{justifyContent: 'center'}}
        key={item.cName}
        onLayout={e => this.getLableLayoutInfo(e.nativeEvent.layout, item)}
        onPress={() => {
          this.setState({selectIndex: index});
          this.goToSelectIndex(index);
          this.props.onChange && this.props.onChange(index);
        }}>
        {component}
      </TouchableOpacity>
    );
  };

  render() {
    const {tabs} = this.state;
    return (
      <View style={[this.props.style]}>
        <FlatList
          style={{flex: 1}}
          ref={ref => (this.scrollViewRef = ref)}
          data={tabs}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={tabs.length}
          keyExtractor={(item, index) => item.cName}
          onScroll={e => {
            const currentX = e?.nativeEvent?.contentOffset?.x;
            console.log('TabBar：currentX', currentX);
          }}
          renderItem={this.renderTabItem}
        />
      </View>
    );
  }
}

const wrapperSegmentsStyles = StyleSheet.create({});
