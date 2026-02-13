import {TouchableOpacity, Animated, Dimensions, Easing} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

const DEVICE_WIDTH = Dimensions.get('window').width;
const c_duration = 400;
const c_deviceHeight = Dimensions.get('window').height;
export default class CommonDialog extends Component {
  static propTypes = {
    coverLayerColor: PropTypes.string,
    coverLayerEvent: PropTypes.func,
    renderContent: PropTypes.func,
  };

  static popupMode = {
    center: 'center',
    bottomToTop: 'bottomToTop',
    rightToLeft: 'rightToLeft',
  };

  // 构造
  constructor(props) {
    super(props);
    console.log('CommonDialog:constructor', props);
    // 初始状态
    this.state = {
      isShow: false,
      opacityValue: new Animated.Value(0),
      scaleValue: new Animated.Value(1.1),
      bottomToTop: new Animated.Value(-c_deviceHeight),
      rightToLeft: new Animated.Value(DEVICE_WIDTH),
      renderContent: this.props.renderContent,
      coverLayerEvent: this.props.coverLayerEvent,
      displayMode: null,
    };
    this.showAnimated = null;
    this.hideAnimated = null;
  }

  /**
   * 显示弹框(该方法是为了简化一个界面有多个弹框的情况)
   * renderContent: func, 渲染弹框内容的方法, 会覆盖this.props.renderContent
   * coverLayerEvent: func, 点击背景触发的事件, 会覆盖this.props.coverLayerEvent
   **/
  async showWithContent(displayMode, coverLayerEvent, renderContent) {
    if (this.state.isShow) {
      this.hide(async () => {
        this.setState({
          coverLayerEvent: coverLayerEvent,
          renderContent: renderContent,
        });

        this.show(displayMode);
      });
    } else {
      this.setState({
        coverLayerEvent: coverLayerEvent,
        renderContent: renderContent,
      });

      this.show(displayMode);
    }
  }

  // 显示弹框
  show(displayMode) {
    this.setState({
      displayMode: displayMode,
      isShow: true,
    });

    if (displayMode === CommonDialog.popupMode.bottomToTop) {
      this.showAnimated = this.showTypeOfBottomToTop;
      this.hideAnimated = this.hideTypeOfBottomToTop;
    } else if (displayMode === CommonDialog.popupMode.center) {
      this.showAnimated = this.showTypeOfFromCenter;
      this.hideAnimated = this.hideTypeOfFromCenter;
    } else if (displayMode === CommonDialog.popupMode.rightToLeft) {
      this.showAnimated = this.showTypeOfRightToLeft;
      this.hideAnimated = this.hideTypeOfRightTopLeft;
    }

    Animated.parallel(
      [
        Animated.timing(this.state.opacityValue, {
          toValue: 1,
          duration: c_duration,
          useNativeDriver: false,
        }),
        this.showAnimated(),
      ],
      {useNativeDriver: false},
    ).start();
  }

  // 从中间弹出界面
  showTypeOfFromCenter() {
    return Animated.timing(this.state.scaleValue, {
      toValue: 1,
      duration: c_duration,
      useNativeDriver: false,
    });
  }

  // 从底部弹出界面
  showTypeOfBottomToTop() {
    return Animated.timing(this.state.bottomToTop, {
      toValue: 0,
      duration: c_duration,
      useNativeDriver: false,
    });
  }
  // 从右侧弹出
  showTypeOfRightToLeft() {
    return Animated.timing(this.state.rightToLeft, {
      easing: Easing.inOut(Easing.ease),
      toValue: 0,
      duration: c_duration,
      useNativeDriver: false,
    });
  }

  // 隐藏弹框
  hide(callback) {
    Animated.parallel([
      Animated.timing(this.state.opacityValue, {
        toValue: 0,
        duration: c_duration,
        useNativeDriver: false,
      }),
      this.hideAnimated(),
    ]).start(async () => {
      this.setState({isShow: false});
      callback && callback();
    });
  }

  //从中间隐藏
  hideTypeOfFromCenter() {
    return Animated.timing(this.state.scaleValue, {
      toValue: 1.1,
      duration: c_duration,
      useNativeDriver: false,
    });
  }

  // 从底部隐藏
  hideTypeOfBottomToTop() {
    return Animated.timing(this.state.bottomToTop, {
      toValue: -c_deviceHeight,
      duration: c_duration,
      useNativeDriver: false,
    });
  }

  // 从右侧隐藏
  hideTypeOfRightTopLeft() {
    return Animated.timing(this.state.rightToLeft, {
      toValue: DEVICE_WIDTH,
      duration: c_duration,
      useNativeDriver: false,
    });
  }

  render() {
    const {displayMode, opacityValue, coverLayerColor} = this.state;
    const maskViewSty = {
      width: DEVICE_WIDTH,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      bottom: 0,
    };
    let containerSty = {};
    let contentSty = {};
    if (displayMode === CommonDialog.popupMode.bottomToTop) {
      containerSty = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: DEVICE_WIDTH,
        justifyContent: 'flex-end',
        backgroundColor: coverLayerColor ?? 'rgba(0,0,0,0.4)',
        opacity: opacityValue,
      };
      contentSty = {bottom: this.state.bottomToTop};
    } else if (displayMode === CommonDialog.popupMode.center) {
      containerSty = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: DEVICE_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: coverLayerColor ?? 'rgba(0,0,0,0.4)',
        opacity: opacityValue,
      };
      contentSty = {transform: [{scale: this.state.scaleValue}]};
    } else if (displayMode === CommonDialog.popupMode.rightToLeft) {
      containerSty = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: DEVICE_WIDTH,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: coverLayerColor ?? 'rgba(0,0,0,0.4)',
        opacity: opacityValue,
      };
      contentSty = {left: this.state.rightToLeft};
    }

    return (
      this.state.isShow && (
        <Animated.View style={[containerSty]}>
          <TouchableOpacity
            style={[maskViewSty]}
            activeOpacity={1}
            onPress={() => {
              this.state.coverLayerEvent && this.state.coverLayerEvent();
            }}
          />
          <Animated.View style={[contentSty]}>
            {this.state.renderContent && this.state.renderContent()}
          </Animated.View>
        </Animated.View>
      )
    );
  }
}
