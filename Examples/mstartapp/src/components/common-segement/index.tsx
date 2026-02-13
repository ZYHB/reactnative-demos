import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from 'react';
const dimen = Dimensions.get('window');
const deviceWidth = dimen.width;

type Props = {
  style?: StyleProp<ViewStyle> | undefined;
  textAtiveStyle?: StyleProp<ViewStyle> | undefined;
  textInactiveStyle?: StyleProp<ViewStyle> | undefined;
  data: Array<any>;
  initialSelectIndex?: number | undefined;
  ref?: React.Ref<unknown> | undefined;
  onChange?: ((index: number) => void) | undefined;
};

const CommonSegement = (
  {
    style,
    textAtiveStyle,
    textInactiveStyle,
    data,
    initialSelectIndex,
    onChange,
  }: Props,
  ref: React.Ref<unknown> | undefined,
) => {
  const [selectIndex, setSelectIndex] = useState(initialSelectIndex ?? -1);
  const [layoutInfoMap, setLayoutInfoMap] = useState<any>({}); //所有标签的Layout信息
  const [layoutReady, setLayoutReady] = useState(false); //标识是否Layout结束
  const scrollViewRef = useRef<any>(null);

  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    // console.log('TabBar：这里传空数组,只在第一次渲染时调用', props);
  }, []);
  useEffect(() => {
    return () => {
      console.log('CommonSegement:组件卸载');
    };
  }, []);
  //监听layoutInfoMap的变化
  useEffect(() => {
    const keys = Object.keys(layoutInfoMap);
    /// 获取到Layouts和传入的数组长度一致，说明已经获取到所有的Layouts信息
    if (keys.length === data?.length && layoutReady === false) {
      setLayoutReady(true);
      goToInitialIndex();
    }
  }, [layoutInfoMap]);
  //暴露指定的方法给父组件调用
  useImperativeHandle(ref, () => ({
    updateSelectIndex: updateSelectIndex,
  }));

  /********************* render **************************/
  const updateSelectIndex = (index: number) => {
    goToSelectIndex(index, true);
  };
  /********************* render **************************/
  // 获取标签的Layout信息
  const getLableLayoutInfo = (layout: any, item: any) => {
    const name = item.name;
    const newObj = {...layoutInfoMap};
    newObj[name] = layout;
    setLayoutInfoMap(newObj);
  };

  // 设置默认选中项
  const goToInitialIndex = () => {
    if (initialSelectIndex != null) {
      goToSelectIndex(initialSelectIndex, true);
    }
  };

  // 设置选中项
  const goToSelectIndex = (index: number, bl = true) => {
    const element = data[index];
    setSelectIndex(index);

    const layout = layoutInfoMap[element.name];
    if (layout === undefined) {
      return;
    }

    let rx = deviceWidth / 2;

    var left = 0;
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const lablayout = layoutInfoMap[item.name];
      if (lablayout !== undefined) {
        if (i < index) {
          left += lablayout.width;
        }
      }
    }
    left -= rx;
    left += layout.width / 2;

    scrollViewRef.current?.scrollToOffset({animated: bl, offset: left});

    onChange && onChange(index);
  };

  /********************* render **************************/
  return (
    <View style={[styles.tab, style]}>
      <FlatList
        ref={scrollViewRef}
        style={{borderColor: '#FFF', borderWidth: 1}}
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={data.length}
        keyExtractor={(item: any, index: number) => `index${index}`}
        onScroll={e => {
          const currentX = e?.nativeEvent?.contentOffset?.x;
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => goToSelectIndex(index)}
              onLayout={e => getLableLayoutInfo(e.nativeEvent.layout, item)}
              key={item.id}
              style={styles.itemBtn}>
              <Text
                style={[
                  selectIndex === index
                    ? styles.textActive
                    : styles.textInActive,
                  selectIndex === index ? textAtiveStyle : textInactiveStyle,
                ]}>
                {item.name}
              </Text>
              <View
                style={[
                  selectIndex === index
                    ? styles.lineActive
                    : styles.lineInActive,
                ]}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  textActive: {
    fontSize: 18,
    color: '#d0648f',
  },
  textInActive: {
    fontSize: 15,
    color: '#858385',
  },
  lineActive: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
    backgroundColor: '#d0648f',
  },
  lineInActive: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
    backgroundColor: '#fbfafc',
  },
});

export default forwardRef(CommonSegement);
