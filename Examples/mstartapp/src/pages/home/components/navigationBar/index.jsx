/* eslint-disable no-undef */
import {StyleSheet, View, ImageBackground} from 'react-native';
import React from 'react';
import TabBar from '../segement';
import CommonSafeArea from '~/components/common-safe-area';
/**
参考：https://blog.csdn.net/sinat_17775997/article/details/123948392

使用 useImperativeHandle NavigationBar有自己的ref，通过 React.forwardRef 将父组件的 ref 透传过来，
通过 useImperativeHandle 方法来暴露指定的方法给父组件调用:
    updateModel: 父组件调用此方法更新导航条背景图等信息,
    onScroll: 父组件调用此方法来更新导航条背景图的Opacity值,
 */

const NavigationBar = (props, ref) => {
  const [info, setInfo] = React.useState({});
  const [bgImageOpacity, setBgImageOpacity] = React.useState(0);
  const [infoOpacity, setInfoOpacity] = React.useState(1);

  /********************* 供父组件调用 **************************/
  // updateModel = data => {
  //   console.log('NavigationBar[updateModel]:');
  //   updateInfo(data ?? {});
  // };

  changeOpacity = currentY => {
    const totalH = Math.max(insets.top, 22) + 44;
    let bgImageOpacity = 0;
    let infoOpacity = 0;
    if (currentY < 0) {
      bgImageOpacity = 0;
      infoOpacity = currentY / totalH;
    } else if (currentY === 0) {
      bgImageOpacity = 0;
      infoOpacity = 1;
    } else if (currentY < totalH) {
      bgImageOpacity = currentY / totalH;
      infoOpacity = 1;
    } else if (currentY === totalH) {
      bgImageOpacity = 1;
      infoOpacity = 1;
    } else {
      bgImageOpacity = 1;
      infoOpacity = 1;
    }
    setBgImageOpacity(bgImageOpacity);
    setInfoOpacity(infoOpacity);
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
  /********************* 更新数据 **************************/
  // updateInfo = data => {
  //   // 获取原始楼层数据
  //   var floorsArr = data.floors ?? [];

  //   let bgImage;
  //   let topNavigationBar;
  //   for (let index = 0; index < floorsArr.length; index++) {
  //     const element = floorsArr[index];
  //     const {refId} = element;
  //     if (refId === 'basefloorinfo') {
  //       topNavigationBar = element.data?.topNavigationBar;
  //     } else if (refId === 'userimage') {
  //       bgImage = element.data?.bgImgInfo?.bgImg;
  //     }
  //   }

  //   setInfo({
  //     topNavigationBar: topNavigationBar,
  //     bgImage: bgImage,
  //   });
  // };
  /********************* 点击事件 **************************/
  // handelSettingClick = () => {
  //   router.push('Setting');
  // };

  /********************* 渲染 **************************/
  renderNavigationBar = () => {
    const {tabDatas, initialIndex} = props;
    return (
      <View style={[styles.navigationBar]}>
        <View style={{borderRadius: 15, overflow: 'hidden'}}>
          <TabBar
            ref={ref => (this.tabbarRef = ref)}
            data={tabDatas}
            initialIndex={initialIndex}
            onChange={index => {
              props.onChange && props.onChange(index);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: info.bgImage}}
        style={{flex: 1}}
        imageStyle={{opacity: bgImageOpacity}}>
        <CommonSafeArea type="top" />
        {this.renderNavigationBar()}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    // borderColor: 'red',
    // borderWidth: 4,
  },
  navigationBar: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headImg: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  settingInfo: {
    marginRight: 12,
    width: 20,
    height: 20,
    tintColor: '#FFF',
  },
});

export default React.forwardRef(NavigationBar);
