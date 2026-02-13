/* eslint-disable react-native/no-color-literals */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PixelRatio,
  Dimensions,
} from 'react-native';

function getUIPt(px) {
  const {width} = Dimensions.get('window');
  return PixelRatio.roundToNearestPixel((px * width) / 750);
}

export default class TestPage9 extends Component {
  scrollY = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      list: null,
      topIndexList: [], // 被指定的index
      pageNum: 0,
      isLoading: false,
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
      <View>
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

  render() {
    const {list, topIndexList, pageNum, isLoading} = this.state;
    return (
      <View style={styles.Container}>
        <HeaderLayout />
        <MyFilter scrollY={this.scrollY} />
        {!!list && list.length > 0 && (
          <Animated.FlatList
            contentContainerStyle={styles.FlatListContainer}
            data={list}
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
    );
  }
}
class MyFilter extends Component {
  render() {
    const {scrollY} = this.props;
    const translateY = scrollY.interpolate({
      inputRange: [0, getUIPt(230), getUIPt(230) + 1],
      outputRange: [getUIPt(230), 0, 0],
    });
    return (
      <Animated.View
        style={[styles.MyFilterContaioner, {transform: [{translateY}]}]}>
        <Text style={styles.MyFilterContaionerLabel}>
          我是赛选条件，我需要固定
        </Text>
      </Animated.View>
    );
  }
}
class HeaderLayout extends Component {
  render() {
    return <Text style={styles.headerLayout}>我是一个很高的头部固定的</Text>;
  }
}
const styles = StyleSheet.create({
  headerLayout: {
    position: 'absolute',
    backgroundColor: '#FEEBC9',
    width: getUIPt(750),
    height: getUIPt(230),
    lineHeight: getUIPt(230),
    textAlign: 'center',
  },
  FlatListContainer: {
    paddingTop: getUIPt(230),
    marginTop: getUIPt(80),
    paddingBottom: getUIPt(80),
  },
  Container: {},
  MyFilterContaioner: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
  },
  MyFilterContaionerLabel: {
    lineHeight: getUIPt(80),
    height: getUIPt(80),
    textAlign: 'center',
    backgroundColor: '#70BB66',
    color: '#000',
    width: getUIPt(750),
  },
  stickableTitle: {
    color: '#fff',
    backgroundColor: '#A0BB66',
    lineHeight: getUIPt(80),
  },
  originTitle: {
    height: getUIPt(84),
    backgroundColor: '#A0BBE7',
    color: '#999',
  },
});
