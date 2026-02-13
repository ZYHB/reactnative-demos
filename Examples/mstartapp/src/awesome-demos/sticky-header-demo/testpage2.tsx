import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PixelRatio,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  findNodeHandle,
  LayoutChangeEvent,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CommonSafeArea from '~/components/common-safe-area';
import {DATA} from './data';

export default function MemberAnalysis() {
  const [pageBgColor, setPageBgColor] = React.useState('white');
  const [selectionFixed, setSelectionFixed] = React.useState(false);
  const [appBarH, setAppBarH] = React.useState(-1);
  const [filterBarOffSetY, setFilterBarOffSetY] = React.useState(-1);
  const appBarRef = React.useRef<any>();
  const listHeaderRef = React.useRef<any>();
  const selectionRef = React.useRef<any>();

  const dataRef = React.createRef<View>();
  const listRef = React.createRef<FlatList>();
  React.useEffect(() => {
    console.log('MemberAnalysis: init');
    setTimeout(() => {
      /// 获取selectionRef组件在listRef组件中的位置
      console.log('MemberAnalysis: init selectionRef', selectionRef);

      selectionRef.current?.measureLayout(
        findNodeHandle(listHeaderRef.current) || 0,
        (left: number, top: number) => {
          console.log('setSelectionFixed =>offsetTop top', 0, top);
          setFilterBarOffSetY(top);
        },
        () => {},
      );
    }, 3000);
  }, []);

  const onPageScroll = (nativeEvent: NativeScrollEvent) => {
    const offsetTop = nativeEvent.contentOffset.y;
    appBarRef.current?.onScroll(offsetTop);

    // console.log(
    //   'onPageScroll =>offsetTop',
    //   offsetTop,
    //   appBarH,
    //   filterBarOffSetY,
    // );
    // if (filterBarOffSetY != -1) {
    //   if (offsetTop >= filterBarOffSetY - appBarH) {
    //     setSelectionFixed(true);

    //     listRef.current?.scrollToOffset({
    //       animated: false,
    //       offset: filterBarOffSetY,
    //     });
    //   } else {
    //     setSelectionFixed(false);
    //   }
    // } else {
    //   setSelectionFixed(false);
    // }
    // dataRef.current?.measureLayout(
    //   findNodeHandle(listRef.current) || 0,
    //   (left: number, top: number) => {
    //     // console.log('setPageBgColor =>offsetTop top', offsetTop, top);
    //     setPageBgColor(offsetTop >= top ? 'blue' : 'white');
    //   },
    //   () => {},
    // );

    // if (selectionRefOffsetTop != -1) {
    //   console.log(
    //     'setSelectionFixed =>selectionRefOffsetTop',
    //     selectionRefOffsetTop,
    //   );
    //   //   setSelectionFixed(offsetTop >= selectionRefOffsetTop + 44 ? true : false);

    //   setSelectionFixed(data => (selectionRefOffsetTop ? true : false));
    //   // data标识存储的是更新a后的对象，用这样的方式可以解决连续触发2次带来的问题
    //   //         setObj((data) => ({...data, b: 3}))
    // } else {
    //   selectionRef.current?.measureLayout(
    //     findNodeHandle(listRef.current) || 0,
    //     (left: number, top: number) => {
    //       console.log('setSelectionFixed =>offsetTop top', offsetTop, top);
    //       setSelectionFixed(offsetTop >= top ? true : false);
    //     },
    //     () => {},
    //   );
    // }
  };

  // 兼容代码，防止没有传头部高度
  const _onLayout = (event: LayoutChangeEvent) => {
    const y = event.nativeEvent.layout.y;
    const height = event.nativeEvent.layout.height;
    setAppBarH(y + height);
  };

  return (
    <View style={{flex: 1, backgroundColor: pageBgColor}}>
      {/* {selectionFixed ? <FixedUserListSelection /> : undefined} */}
      <FlatList
        style={{marginTop: selectionFixed ? appBarH : 0}}
        ref={listRef}
        data={DATA}
        scrollEventThrottle={16}
        onScroll={({nativeEvent}) => onPageScroll(nativeEvent)}
        stickyHeaderIndices={[0]} //第一个子元素即头部组件，上滑时吸顶
        // ListHeaderComponent={
        //   <View ref={listHeaderRef}>
        //     <CardStatistics />
        //     <View ref={dataRef} style={styles.bg}>
        //       <ConsumptionData />
        //       <UserListSelection ref={selectionRef} isFixed={false} />
        //     </View>
        //   </View>
        // }
        renderItem={({item, index}) => {
          return (
            <Text style={styles.scrollText} key={item.id}>
              {item.title}
            </Text>
          );
        }}
      />
      <AppBar ref={appBarRef} onLayout={_onLayout} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollText: {
    fontSize: 19,
    textAlign: 'center',
    padding: 20,
    color: '#000',
  },
  bg: {
    backgroundColor: 'transparent',
  },
});

const AppBar = React.forwardRef((props: any, ref: any) => {
  const insets = useSafeAreaInsets();
  const [bgImageOpacity, setBgImageOpacity] = React.useState(0);
  /********************* 供父组件调用 **************************/
  // updateModel = data => {
  //   console.log('NavigationBar[updateModel]:');
  //   updateInfo(data ?? {});
  // };

  const changeOpacity = (currentY: number) => {
    const totalH = Math.max(insets.top, 22) + 44;
    let bgImageOpacity = 0;
    if (currentY < 0) {
      bgImageOpacity = 0;
    } else if (currentY === 0) {
      bgImageOpacity = 0;
    } else if (currentY < totalH) {
      bgImageOpacity = currentY / totalH;
    } else if (currentY === totalH) {
      bgImageOpacity = 1;
    } else {
      bgImageOpacity = 1;
    }
    setBgImageOpacity(bgImageOpacity * 0.7);
  };

  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  React.useEffect(() => {
    // console.log('这里传空数组,只在第一次渲染时调用', props);
    // updateInfo(props.data ?? {});
  }, []);
  //暴露指定的方法给父组件调用
  React.useImperativeHandle(ref, () => ({
    // updateModel: updateModel,
    onScroll: changeOpacity,
  }));
  /********************* Render **************************/

  return (
    <View
      ref={ref}
      onLayout={props.onLayout}
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        opacity: bgImageOpacity,
      }}>
      <CommonSafeArea type="top" />
      <View
        style={{height: 44, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{'AppBar'}</Text>
      </View>
    </View>
  );
});

const CardStatistics = (props: any) => {
  return (
    <View
      style={{
        backgroundColor: 'red',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{'CardStatistics'}</Text>
    </View>
  );
};

const ConsumptionData = (props: any) => {
  return (
    <View
      style={{
        backgroundColor: 'green',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{'ConsumptionData'}</Text>
    </View>
  );
};

const UserListSelection = React.forwardRef((props: any, ref: any) => {
  return (
    <View
      ref={ref}
      style={{
        backgroundColor: 'yellow',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{'我是筛选项'}</Text>
    </View>
  );
});

const FixedUserListSelection = React.forwardRef((props: any, ref: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      ref={ref}
      style={{
        backgroundColor: 'pink',
        position: 'absolute',
        top: Math.max(insets.top, 22) + 44,
        left: 0,
        right: 0,
        zIndex: 100,
      }}>
      <View style={{height: 44}}>
        <Text>{'FixedUserListSelection'}</Text>
      </View>
    </View>
  );
});
