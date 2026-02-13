import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

const dimen = Dimensions.get('window');
const deviceWidth = dimen.width;

export default class TabBar extends Component {
  layoutEndFlag = false;
  layoutInfoMap = {};
  constructor(props) {
    super(props);
    this.state = {
      selectIndex: props.initialIndex,
      contentSizeW: 0,
    };
  }

  /********************* render **************************/
  updateSelectIndex = index => {
    this.goToSelectIndex(index, true);
  };
  /********************* render **************************/
  // 获取标签的Layout信息
  getLableLayoutInfo = (layout, item) => {
    this.layoutInfoMap[item.name] = layout;
    const keys = Object.keys(this.layoutInfoMap);
    if (keys.length === this.props.data.length && !this.layoutEndFlag) {
      this.didEndLayout();
    }
  };
  //获取所有布局信息后
  didEndLayout = () => {
    let contentSizeW = 0;
    for (let i = 0; i < this.props.data.length; i++) {
      const element = this.props.data[i];
      const lablayout = this.layoutInfoMap[element.name];
      contentSizeW += lablayout.width;
    }
    this.setState({contentSizeW});
    this.goToInitialIndex();
  };

  // 设置默认选中项
  goToInitialIndex = () => {
    if (this.props.initialIndex != null) {
      this.goToSelectIndex(this.props.initialIndex, true);
    }
  };

  // 设置选中项
  goToSelectIndex = (index, bl = true) => {
    this.props.onChange && this.props.onChange(index);

    const element = this.props.data[index];

    this.setState({selectIndex: index});

    const layout = this.layoutInfoMap[element.name];

    let rx = deviceWidth / 2;

    var left = 0;
    for (let i = 0; i < this.props.data.length; i++) {
      const element = this.props.data[i];
      const lablayout = this.layoutInfoMap[element.name];
      if (lablayout !== undefined) {
        if (i < index) {
          left += lablayout.width;
        }
      }
    }
    left -= rx;
    left += layout.width / 2;

    this.scrollViewRef.scrollToOffset({animated: bl, offset: left});
  };

  render() {
    const {selectIndex} = this.state;
    return (
      <View style={[tabBarStyle.tab, this.props.style]}>
        <FlatList
          ref={ref => (this.scrollViewRef = ref)}
          style={{borderColor: '#FFF', borderWidth: 1}}
          data={this.props.data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={this.props.data.length}
          onScroll={e => {
            const currentX = e?.nativeEvent?.contentOffset?.x;
            console.log('TabBar：currentX', currentX);
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                key={item.title}
                onPress={() => this.goToSelectIndex(index)}
                onLayout={e =>
                  this.getLableLayoutInfo(e.nativeEvent.layout, item)
                }
                style={tabBarStyle.itemBtn}>
                <Text
                  style={[
                    tabBarStyle.item,
                    selectIndex === index ? tabBarStyle.active : null,
                  ]}>
                  {item.title}
                </Text>
                <View
                  style={[
                    tabBarStyle.line,
                    selectIndex === index ? tabBarStyle.active2 : null,
                  ]}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const tabBarStyle = StyleSheet.create({
  tab: {
    backgroundColor: '#fbfafc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  },
  itemBtn: {
    paddingHorizontal: 12,
    paddingTop: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
  },
  item: {
    fontSize: 15,
    // color: '#858385',
  },
  active: {
    color: '#d0648f',
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: '#fbfafc',
    marginTop: 5,
    marginBottom: 2,
  },
  active2: {
    backgroundColor: '#d0648f',
  },
  sortimg: {
    width: 55,
    height: 40,
  },
});
