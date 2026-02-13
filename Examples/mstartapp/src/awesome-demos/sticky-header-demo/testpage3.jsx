import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PixelRatio,
  Dimensions,
} from 'react-native';
import {
  useSafeAreaInsets,
  SafeAreaInsetsContext,
} from 'react-native-safe-area-context';

function getUIPt(px) {
  const {width} = Dimensions.get('window');
  return PixelRatio.roundToNearestPixel((px * width) / 750);
}

const STICK_HEADER_HEIGHT = 44;

export default class TestPage3 extends Component {
  scrollY = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      list: null,
      topIndexList: [], // 被指定的index
      pageNum: 0,
      isLoading: false,
      headerH: 0,
    };
  }

  timer1 = null;

  // 模拟请求接口的
  getTempList = from => {
    const {list, topIndexList, pageNum} = this.state;
    console.log('getTempList', from, list, topIndexList, pageNum);
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
    this.setState({isLoading: true});
    this.timer1 = setTimeout(() => {
      if (!list) {
        topIndexList.push(0);
        this.setState({
          list: [
            {title: `0我是一个准备置顶的`, stickable: true},
            ...this.randomDate(),
          ],
          topIndexList,
          pageNum: pageNum + 1,
          isLoading: false,
        });
      } else if (list && pageNum < 5) {
        topIndexList.push(list.length);
        list.push({title: `${list.length}我是一个准备置顶的`, stickable: true});
        list.push(...this.randomDate());
        this.setState({
          list,
          topIndexList,
          pageNum: pageNum + 1,
          isLoading: false,
        });
      } else {
        this.setState({isLoading: false});
      }
    }, 300);
  };

  // 瞎几把随机数据的
  randomDate() {
    const tempDate = parseInt(Math.random() * 80, 10) + 1;
    const arr = [];
    for (let index = 0; index < tempDate; index++) {
      arr.push({title: `我是一个普通的列表数据¥${index}`, stickable: false});
    }
    return arr;
  }

  renderItem = ({item, index}) => {
    const {stickable, title} = item;
    if (stickable) {
      return (
        <View>
          <Text style={styles.stickableTitle}>{title}</Text>
        </View>
      );
    }
    return (
      <View
        style={{
          borderColor: 'red',
          borderWidth: 1,
        }}>
        <Text style={styles.originTitle}>{title}</Text>
      </View>
    );
  };

  componentDidMount() {
    this.getTempList(0);
  }

  componentWillUnmount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
  }

  renderFooter = (isLoading, pageNum, dataList) => {
    const listLength = dataList.length;
    if (listLength <= 3) {
      return <View style={{height: (5 - listLength) * getUIPt(100)}} />;
    }
    if (isLoading && pageNum > 1) {
      return <Text>加载中…</Text>;
    }
    return null;
  };

  _onLayoutHeader = event => {
    const y = event.nativeEvent.layout.y;
    const height = event.nativeEvent.layout.height;
    console.log('_onLayoutHeader', height);
    this.setState({headerH: height});
  };

  render() {
    const {list, topIndexList, pageNum, isLoading, headerH} = this.state;
    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => {
          const appBarH = Math.max(insets.top, 22) + 44;

          return (
            <View style={styles.Container}>
              <AppBar></AppBar>
              <View style={{flex: 1}}>
                <Header1
                  scrollY={this.scrollY}
                  onLayout={e => this._onLayoutHeader(e)}
                />
                {!!list && list.length > 0 && (
                  <Animated.FlatList
                    contentContainerStyle={[
                      styles.FlatListContainer,
                      {
                        paddingTop: headerH,
                      },
                    ]}
                    data={list}
                    initialNumToRender={30}
                    ListFooterComponent={() =>
                      this.renderFooter(isLoading, pageNum, list)
                    }
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => `${index}`}
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={topIndexList}
                    scrollEventThrottle={1}
                    onEndReached={() => {
                      this.getTempList(1);
                    }}
                    onEndReachedThreshold={0.3}
                    onScroll={Animated.event(
                      [
                        {
                          nativeEvent: {
                            contentOffset: {y: this.scrollY},
                          },
                        },
                      ],
                      {
                        useNativeDriver: true,
                      },
                    )}
                  />
                )}
              </View>
            </View>
          );
        }}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

class Header1 extends Component {
  state = {
    totalH: -1,
  };
  // 兼容代码，防止没有传头部高度
  _onLayout = event => {
    const y = event.nativeEvent.layout.y;
    const height = event.nativeEvent.layout.height;
    this.setState({totalH: height});
    this.props.onLayout && this.props.onLayout(event);
  };

  render() {
    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => {
          const {scrollY} = this.props;
          const appBarH = Math.max(insets.top, 22) + 44;
          let translateY;
          const isFirst = this.state.totalH === -1;
          const totalH = isFirst ? appBarH + 44 : this.state.totalH; //整个组件高度
          const minOffSetY = appBarH;
          const minCanOffSetY = totalH - minOffSetY;

          translateY = scrollY.interpolate({
            inputRange: [-totalH * 4, 0, minCanOffSetY, minCanOffSetY + 1],
            outputRange: [totalH * 4, 0, -minCanOffSetY, -minCanOffSetY],
            extrapolate: 'clamp', //阻止输出值超过outputRange
          });

          return (
            <Animated.View
              onLayout={event => this._onLayout(event)}
              style={[
                styles.HeaderContaioner,
                !isFirst ? {transform: [{translateY}]} : undefined,
              ]}>
              <View style={[styles.Header1, {height: appBarH}]}></View>
              <Text style={[styles.Header1, {height: 44}]}>
                我是一个很高的头部固定的1
              </Text>
              <Text style={[styles.Header1, {height: 44}]}>
                我是一个很高的头部固定的2
              </Text>
              <Text style={[styles.Header1, {height: 44}]}>
                我是一个很高的头部固定的3
              </Text>
              <Text style={[styles.Header1, {height: 44}]}>
                我是一个很高的头部固定的4
              </Text>
            </Animated.View>
          );
        }}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}
const styles = StyleSheet.create({
  HeaderContaioner: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
  },
  Header1: {
    backgroundColor: '#FFDDEE',
    width: getUIPt(750),
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.4,
  },
  FlatListContainer: {
    borderColor: 'red',
    borderWidth: 3,
  },
  Container: {
    flex: 1,
  },

  stickableTitle: {
    color: '#fff',
    backgroundColor: '#A0BB66',
    height: STICK_HEADER_HEIGHT,
  },
  originTitle: {
    height: getUIPt(84),
    backgroundColor: '#A0BBE7',
    color: '#999',
  },
});

const AppBar = React.forwardRef((props, ref) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      ref={ref}
      style={{
        width: '100%',
        position: 'absolute',
        backgroundColor: 'white',
        opacity: 0.7,
        zIndex: 4,
      }}>
      <View style={[{width: '100%', height: Math.max(insets.top, 22)}]} />
      <View
        style={{height: 44, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{'AppBar'}</Text>
      </View>
    </View>
  );
});
