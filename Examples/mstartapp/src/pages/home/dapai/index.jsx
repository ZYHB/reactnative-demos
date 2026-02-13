import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CommonStateView, {ViewState} from '~/components/common-view-state';
import CommonSafeArea from '~/components/common-safe-area';

export default function DaPaiScreen(props) {
  const insets = useSafeAreaInsets();
  const [viewState, setViewState] = useState(ViewState.default);
  const [datas, setDatas] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [headHeight, setHeadHeight] = useState(-1);

  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  React.useEffect(() => {
    setViewState(ViewState.loading);
    setTimeout(() => {
      setViewState(ViewState.empty);
      // const arr = Array.from({length: 100}, (v, k) => k + 'eee');
      // setDatas(arr);
    }, 2000);
  }, []);

  const _renderView = () => {
    return (
      <Animated.FlatList
        data={datas}
        initialNumToRender={30}
        scrollEventThrottle={1}
        style={[styles.gridView]}
        // onScroll={
        //   Animated.event(
        //     [
        //       {
        //         nativeEvent: {contentOffset: {y: scrollY}}, // 记录滑动距离
        //       },
        //     ],
        //     {useNativeDriver: true},
        //   ) // 使用原生动画驱动
        // }
        // stickyHeaderIndices={[0]}
        // StickyHeaderComponent={
        //   <Text>{'// 里面放入第一部分组件'}</Text>

        //   // <View>
        //   //   <Text>{'// 里面放入第一部分组件'}</Text>
        //   //   <Text>{'// 里面放入第一部分组件'}</Text>
        //   //   <Text>{'// 里面放入第一部分组件'}</Text>
        //   //   <Text>{'// 里面放入第一部分组件'}</Text>
        //   //   <Text>{'// 里面放入第一部分组件'}</Text>
        //   // </View>
        // }
        ListHeaderComponent={
          <>
            <CommonSafeArea type="appBar" />
            <View
              onLayout={e => {
                let {height} = e.nativeEvent.layout;
                setHeadHeight(height); // 给头部高度赋值
              }}>
              <Text>{'// 里面放入第一部分组件'}</Text>
              <Text>{'// 里面放入第一部分组件'}</Text>
              <Text>{'// 里面放入第一部分组件'}</Text>
              <Text>{'// 里面放入第一部分组件'}</Text>
              <Text>{'// 里面放入第一部分组件'}</Text>
            </View>
            {/* <StickyHeader
              stickyHeaderY={headHeight} // 把头部高度传入
              stickyScrollY={scrollY} // 把滑动距离传入
            >
              <View style={{}}>
                <Text>{'// 里面放入第二部分组件,滑动吸顶效果'}</Text>
                <Text>{'// 里面放入第二部分组件,滑动吸顶效果'}</Text>
                <Text>{'// 里面放入第二部分组件,滑动吸顶效果'}</Text>
              </View>
            </StickyHeader> */}
          </>
        }
        renderItem={({item, index}) => {
          return (
            <View key={index} style={[styles.itemContainer]}>
              <Text style={styles.itemName}>{index}</Text>
            </View>
          );
        }}
      />
    );
  };

  return (
    <CommonStateView
      viewState={viewState}
      onPress={state => {
        if (state === ViewState.error) {
        }
      }}>
      {viewState === ViewState.success ? this._renderView() : undefined}
    </CommonStateView>
  );
}

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 44,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
  },
});
