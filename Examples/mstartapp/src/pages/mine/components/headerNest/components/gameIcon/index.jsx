import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import React, {Component, PureComponent} from 'react';
import SmallItem from './item';
import ScrollIndicator from './scrollIndicator';

const windowWidth = Dimensions.get('window').width;

export default class GameIconFloor extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.card]}>
          <ContentView {...this.props} />
        </View>
        <View style={{height: 5}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
});

///// --- 底部订单ContentView
class ContentView extends Component {
  translateX = new Animated.Value(0);
  flatListWidth = windowWidth - 20;
  itemW = this.flatListWidth / 5;

  constructor(props) {
    super(props);
    this.state = {
      layoutItems: [],
      flatListContentWidth: 0,
      sliderMaxX: 0,
      scrollIndicator: {containerWidth: 40, indicatorWidth: 20},
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const {layoutItems} = this.state;
      var flatListContentWidth = layoutItems.reduce(
        (previousValue, currentValue) => {
          return previousValue + currentValue.layout.width;
        },
        0,
      );
      const sliderMaxX = flatListContentWidth - this.flatListWidth;

      this.setState({
        flatListContentWidth: flatListContentWidth,
        sliderMaxX: sliderMaxX,
      });
    }, 500);
  }

  handlePress = item => {};

  onLayoutSmallItem = (event, item) => {
    const {layoutItems} = this.state;
    const {functionId} = item;
    let hasExist = false;
    for (let index = 0; index < layoutItems.length; index++) {
      const element = layoutItems[index];
      if (element.functionId === functionId) {
        hasExist = true;
      }
    }

    // <!--重点在这里，计算每个item的高度-->
    const newItem = {
      layout: event.nativeEvent.layout,
      functionId: functionId,
    };
    if (!hasExist) {
      this.setState({layoutItems: layoutItems.concat(newItem)});
    }
  };

  renderScrollIndicator = () => {
    const {
      scrollIndicator: {containerWidth, indicatorWidth},
    } = this.state;
    return (
      <ScrollIndicator
        containerWidth={containerWidth}
        indicatorWidth={indicatorWidth}
        translateX={this.translateX}
      />
    );
  };

  onScroll = e => {
    const {
      sliderMaxX,
      scrollIndicator: {containerWidth, indicatorWidth},
    } = this.state;
    const currentX = e?.nativeEvent?.contentOffset?.x;
    const left = (currentX / sliderMaxX) * (containerWidth - indicatorWidth);
    // 更新scrollIndicator
    Animated.timing(this.translateX, {
      toValue: left,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  onScrollBeginDrag = e => {
    const offsetX = e?.nativeEvent?.contentOffset?.x; //记录拖拽开始时的X偏移量
    console.log('开始拖拽', offsetX);
  };

  onScrollEndDrag = e => {
    const offsetX = e?.nativeEvent?.contentOffset?.x; //记录拖拽停止时的X偏移量
    console.log('停止拖拽', offsetX);
  };

  render() {
    const {nodes} = this.props.floor.data;

    return (
      <View style={{}}>
        <Text style={{}}>更多游戏</Text>
        <FlatList
          ref={ref => (this.chatView = ref)}
          data={nodes}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
            return (
              <SmallItem
                width={this.itemW}
                data={item}
                onLayout={(event, data) => this.onLayoutSmallItem(event, data)}
              />
            );
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={nodes.length}
          scrollEventThrottle={300}
          onScroll={this.onScroll}
          onScrollBeginDrag={this.onScrollBeginDrag} // 开始拖拽时调用的方法
          onScrollEndDrag={this.onScrollEndDrag} // 结束拖拽时调用的方法
        />
        {this.renderScrollIndicator()}
      </View>
    );
  }
}

const contentStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  topicItem: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  flatList: {},
});
