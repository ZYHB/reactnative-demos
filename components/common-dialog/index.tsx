import React, { Component } from 'react';
import { Animated, Dimensions, Easing, TouchableOpacity, ViewStyle } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const c_duration = 400;
const c_deviceHeight = Dimensions.get('window').height;

/**
 * 弹窗显示模式
 */
export enum PopupMode {
  /** 从中间弹出 */
  center = 'center',
  /** 从底部向上弹出 */
  bottomToTop = 'bottomToTop',
  /** 从右侧向左弹出 */
  rightToLeft = 'rightToLeft',
}

/**
 * CommonDialog 组件属性
 */
export interface CommonDialogProps {
  /** 覆盖层颜色，默认 rgba(0,0,0,0.4) */
  coverLayerColor?: string;
  /** 点击覆盖层的回调函数 */
  coverLayerEvent?: () => void;
  /** 渲染内容的函数 */
  renderContent?: () => React.ReactNode;
}

/**
 * CommonDialog 组件状态
 */
interface CommonDialogState {
  isShow: boolean;
  opacityValue: Animated.Value;
  scaleValue: Animated.Value;
  bottomToTop: Animated.Value;
  rightToLeft: Animated.Value;
  renderContent?: () => React.ReactNode;
  coverLayerEvent?: () => void;
  displayMode: PopupMode | null;
  coverLayerColor?: string;
}

/**
 * CommonDialog 实例接口（用于 ref 引用）
 */
export interface CommonDialogRef {
  showWithContent(
    displayMode: PopupMode,
    coverLayerEvent?: (() => void) | null,
    renderContent?: (() => React.ReactNode) | null
 ): void;
  show(displayMode: PopupMode): void;
  hide(callback?: () => void): void;
}

export default class CommonDialog extends Component<CommonDialogProps, CommonDialogState> {
  static popupMode = PopupMode;

  showAnimated: (() => Animated.CompositeAnimation) | null = null;
  hideAnimated: (() => Animated.CompositeAnimation) | null = null;

  // 构造
  constructor(props: CommonDialogProps) {
    super(props);
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
      coverLayerColor: this.props.coverLayerColor,
    };
  }

  /**
   * 显示弹框(该方法是为了简化一个界面有多个弹框的情况)
   * @param displayMode - 显示模式
   * @param coverLayerEvent - 点击背景触发的事件, 会覆盖this.props.coverLayerEvent
   * @param renderContent - 渲染弹框内容的方法, 会覆盖this.props.renderContent
   **/
  async showWithContent(
    displayMode: PopupMode,
    coverLayerEvent?: (() => void) | null,
    renderContent?: (() => React.ReactNode) | null
  ) {
    if (this.state.isShow) {
      this.hide(async () => {
        this.setState({
          coverLayerEvent: coverLayerEvent ?? undefined,
          renderContent: renderContent ?? undefined,
        });

        this.show(displayMode);
      });
    } else {
      this.setState({
        coverLayerEvent: coverLayerEvent ?? undefined,
        renderContent: renderContent ?? undefined,
      });

      this.show(displayMode);
    }
  }

  // 显示弹框
  show(displayMode: PopupMode) {
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

    Animated.parallel([
      Animated.timing(this.state.opacityValue, {
        toValue: 1,
        duration: c_duration,
        useNativeDriver: false,
      }),
      this.showAnimated!(),
    ]).start();
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
  hide(callback?: () => void) {
    Animated.parallel([
      Animated.timing(this.state.opacityValue, {
        toValue: 0,
        duration: c_duration,
        useNativeDriver: false,
      }),
      this.hideAnimated!(),
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
    const maskViewSty: ViewStyle = {
      width: DEVICE_WIDTH,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      bottom: 0,
    };
    let containerSty: ViewStyle = {};
    let contentSty: ViewStyle = {};
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
