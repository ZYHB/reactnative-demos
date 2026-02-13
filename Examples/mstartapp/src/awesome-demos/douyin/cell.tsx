import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Slider from '@react-native-community/slider';
import CommonFastImage from '~/components/common-fast-image';
import CommonVectorIcon from '~/components/common-vector-icons';
import CommonSafeArea from '~/components/common-safe-area';
import RNVideo, {OnLoadData, OnProgressData} from 'react-native-video';

const videos = [
  'https://gitlab.com/ikumock-data/MockDatas/-/raw/JingDong/20220629/functionId/@new/kuaishou/videos/video_1.mp4',
  'https://gitlab.com/ikumock-data/MockDatas/-/raw/JingDong/20220629/functionId/@new/kuaishou/videos/video_2.mp4',
  'https://gitlab.com/ikumock-data/MockDatas/-/raw/JingDong/20220629/functionId/@new/kuaishou/videos/video_3.mp4',
  'https://gitlab.com/ikumock-data/MockDatas/-/raw/JingDong/20220629/functionId/@new/kuaishou/videos/video_4.mp4',
  'https://gitlab.com/ikumock-data/MockDatas/-/raw/JingDong/20220629/functionId/@new/kuaishou/videos/video_5.mp4',
  'https://gitlab.com/ikumock-data/MockDatas/-/raw/JingDong/20220629/functionId/@new/kuaishou/videos/video_6.mp4',
  'https://gitlab.com/ikumock-data/MockDatas/-/raw/JingDong/20220629/functionId/@new/kuaishou/videos/video_7.mp4',
];
const date = {
  prefixZero: (num: any, n: any) => {
    return (Array(n).join('0') + num).slice(-n);
  },
  parseSeconds: (second: number) => {
    if (second > 0) {
      let hour = 0;
      let minute = 0;
      let seconds = 0;
      let data: {
        hour?: number;
        minute?: number;
        seconds?: number;
      } = {};
      minute = Math.floor(second / 60);
      if (parseInt(String(minute), 10) > 60) {
        hour = parseInt(String(minute / 60), 10);
        minute %= 60; //算出有多分钟
      }
      seconds = second % 60;
      data.hour = hour;
      data.minute = minute;
      data.seconds = parseInt(String(seconds), 10);

      return data;
    }
  },
} as const;

interface componentProps {
  ref?: React.LegacyRef<DouYinVideoCell> | undefined;
  style?: StyleProp<ViewStyle>;
  info?: {[key: string]: any};
  videoViewH?: number;
}

interface State {
  videoPaused?: boolean;
  hideControl?: boolean;
  duration: number; //总时长-秒
  currentTime: number; //当前进度-秒
  isLoading?: boolean; //加载中
  randomVideoUrl: string; //视频地址
}

class DouYinVideoCell extends React.PureComponent<componentProps, State> {
  randomIndex = Math.floor(Math.random() * videos.length);
  randomVideoUrl = videos[this.randomIndex];

  static defaultProps = {
    resizeMode: 'contain',
    controls: false,
    repeat: true,
    paused: true,
    // poster: '',
    // posterResizeMode: ''
  };

  public state: State = {
    currentTime: 0, //当前进度-秒
    duration: 0, //总时长-秒
    hideControl: false,
    videoPaused: true,
    randomVideoUrl: this.randomVideoUrl,
  };

  constructor(props: componentProps) {
    super(props);
  }
  componentDidMount() {}

  componentWillUnmount() {
    this.toPaused(); //停止视频播放
  }

  _renderVideoView = () => {
    const {videoPaused, hideControl, randomVideoUrl} = this.state;
    const {style, ...restProps} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{position: 'relative', flex: 1}}
        onPress={this.toggleHideControl}>
        <RNVideo
          style={[{flex: 1, backgroundColor: 'rgba(0,0,0,0.8)'}]}
          source={{uri: randomVideoUrl}}
          ref={this.handleBindRef}
          paused={videoPaused}
          onLoadStart={this.onVideoLoadStart}
          onLoad={this.onLoad}
          onEnd={this.onEnd}
          progressUpdateInterval={200}
          onProgress={this.onProgress}
        />
        {hideControl ? null : (
          <View style={styles.controlBox}>
            <View style={[{flex: 1, flexDirection: 'row'}]}>
              <TouchableOpacity
                style={styles.playBtn}
                onPress={this.togglePause}>
                {videoPaused ? <Text>{'播放'}</Text> : <Text>{'暂停'}</Text>}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.towardBtn}
                onPress={this.headBack}>
                <Text>{'<<'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.towardBtn}
                onPress={this.headForward}>
                <Text>{'>>'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  _renderRightControlsView = () => {
    return (
      <View style={styles.rightBar}>
        <CommonFastImage
          style={styles.userAval}
          defaultSource={require('~/assets/image/placeholder/placeholder.png')} //默认图片
          source={{uri: this.props.info?.author?.headerUrl ?? ''}}
        />
        <FlatList
          data={['heart', 'comments', 'star', 'share']}
          renderItem={({item, index}) => {
            return (
              <View style={styles.actionBtn}>
                <CommonVectorIcon name={item} color={'#FFF'} />
                <Text style={styles.actionTitle}>{index}</Text>
              </View>
            );
          }}
        />
        <View style={{height: 100}} />
        <CommonSafeArea type="bottom" />
      </View>
    );
  };
  _renderBottomInfoView = () => {
    const {duration, currentTime, isLoading, videoPaused} = this.state;
    return (
      <View style={styles.bottomBar}>
        <View style={styles.addressView}>
          <Text style={styles.addressText}>附近-碧桂园-龙城</Text>
        </View>
        <View style={styles.userInfoWrap}>
          <Text style={styles.userName}>
            {this.props.info?.photo?.caption ?? ''}
          </Text>
        </View>
        <View style={styles.progressView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {!isLoading && duration ? (
              <View style={[{paddingHorizontal: 10}]}>
                <Text style={{color: '#FFF'}}>
                  {this.parseSeconds(currentTime)}/{this.parseSeconds(duration)}
                </Text>
              </View>
            ) : null}
          </View>
          <Slider
            style={{width: '100%', height: 4}}
            value={currentTime}
            maximumValue={duration} // onValueChange 和 onSlidingComplete 是修改步进器进度时触发的函数 // 可以在此时同步视频播放,同步视频播放的函数是,video的Ref.seek() // 中间需要设置视频暂停和播放，否则边拖动边播放会很奇怪
            onValueChange={value => {
              this.toPaused();
              this.setState({currentTime: value});
            }}
            onSlidingComplete={value => {
              this.refVideo?.seek(value);
              this.toPlay();
            }}
          />
        </View>
        <CommonSafeArea type="bottom" />
      </View>
    );
  };
  _renderLoadingView = () => {
    const {isLoading} = this.state;
    if (isLoading) {
      return (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <>
        <View style={[styles.videoView, {height: this.props.videoViewH}]}>
          <CommonFastImage
            style={styles.background}
            defaultSource={require('~/assets/image/placeholder/placeholder.png')} //默认图片
            source={{uri: this.props.info?.photo?.animatedCoverUrl ?? ''}}
          />
          {this._renderVideoView()}
          {this._renderBottomInfoView()}
          {this._renderRightControlsView()}
          {this._renderLoadingView()}
        </View>
      </>
    );
  }

  private refVideo: any = null;
  private handleBindRef = (e: any) => {
    this.refVideo = e;
  };

  private parseSeconds = (second: number) => {
    const vals = date.parseSeconds(second);
    if (vals) {
      let hour = vals.hour ? date.prefixZero(vals.hour, 2) : '';
      let minute = date.prefixZero(vals.minute, 2);
      let seconds = date.prefixZero(vals.seconds, 2);
      return hour
        ? hour + ':' + minute + ':' + seconds
        : minute + ':' + seconds;
    } else {
      return '';
    }
  };

  private togglePause = () => {
    console.log('togglePause');
    const {videoPaused} = this.state;
    if (videoPaused) {
      this.autoHideControls();
    }
    this.setState({videoPaused: !videoPaused});
  };
  private toggleHideControl = () => {
    const {hideControl} = this.state;
    if (hideControl) {
      this.autoHideControls();
    }
    this.setState({hideControl: !hideControl});
  };
  private autoHideTimeout: any = null;
  private autoHideControls = () => {
    if (this.autoHideTimeout) {
      clearTimeout(this.autoHideTimeout);
    }
    this.autoHideTimeout = setTimeout(() => {
      if (!this.state.videoPaused) {
        this.setState({hideControl: true});
      }
    }, 5000);
  };

  onVideoLoadStart = () => {
    this.setState({isLoading: true});
  };
  private onLoad = (data: OnLoadData) => {
    this.setState({duration: data.duration, isLoading: false});
    this.autoHideControls();
  };
  private onEnd = () => {
    this.setState({
      videoPaused: true,
      currentTime: 0,
    });
  };
  private onProgress = (data: OnProgressData) => {
    this.setState({currentTime: data.currentTime});
  };

  private seekTo = (second: number) => {
    this.refVideo?.seek(second);
  };
  private stepNumber: number = 5; //一次前进后退的秒数
  private headForward = () => {
    const {currentTime, duration} = this.state;
    let target = currentTime + this.stepNumber;
    target = target > duration ? duration : target;
    this.seekTo(target);
    this.autoHideControls();
  };
  private headBack = () => {
    const {currentTime} = this.state;
    let target = currentTime - this.stepNumber;
    target = target > 0 ? target : 0;
    this.seekTo(target);
    this.autoHideControls();
  };

  setNativeProps(nativeProps: any) {
    this.refVideo?.setNativeProps(nativeProps);
  }

  toPlay() {
    this.refVideo?.setNativeProps({paused: false});
    this.setState({videoPaused: false});
  }
  toPaused() {
    this.refVideo?.setNativeProps({paused: true});
    this.setState({videoPaused: true});
  }
}

const styles = StyleSheet.create({
  controlBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  controlBtns: {
    flexDirection: 'row',
  },
  playBtn: {
    width: 40,
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
  },
  towardBtn: {
    width: 40,
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
  },
  loadingBox: {},
  progressBox: {},

  videoView: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 4,
  },
  background: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  //底部信息
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  addressView: {
    padding: 10,
  },
  addressText: {
    color: '#FFF',
  },
  userInfoWrap: {
    width: '100%',
    padding: 10,
  },
  userName: {
    color: '#FFF',
  },
  //右侧信息
  rightBar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  userAval: {
    width: 50,
    height: 50,
    borderColor: '#FFF',
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 10,
  },
  actionBtn: {
    marginBottom: 10,
    alignItems: 'center',
  },
  actionTitle: {
    color: '#FFF',
  },
  //进度条
  progressView: {
    margin: 10,
    borderColor: 'red',
    borderWidth: 1,
  },
  progress: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    height: 5,
  },
  progressTrack: {
    backgroundColor: 'rgba(255,255,255,1)',
    height: '100%',
    width: '0%',
  },
});

export default DouYinVideoCell;
