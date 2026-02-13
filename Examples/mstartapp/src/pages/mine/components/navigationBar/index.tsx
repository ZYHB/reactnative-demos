import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CommonFastImage from '~/components/common-fast-image';
import CommonVectorIcon from '~/components/common-vector-icons';
import {router, RouteNames} from '~/navigator/NavigationService';
import CommonSafeArea from '~/components/common-safe-area';
/**
参考：https://blog.csdn.net/sinat_17775997/article/details/123948392

使用 useImperativeHandle NavigationBar有自己的ref，通过 React.forwardRef 将父组件的 ref 透传过来，
通过 useImperativeHandle 方法来暴露指定的方法给父组件调用:
    updateModel: 父组件调用此方法更新导航条背景图等信息,
    onScroll: 父组件调用此方法来更新导航条背景图的Opacity值,
 */
function NavigationBar(props: any, ref: React.Ref<unknown> | undefined) {
  const insets = useSafeAreaInsets();
  const [info, setInfo] = React.useState<any>({});
  const [bgImageOpacity, setBgImageOpacity] = React.useState(0);
  const [infoOpacity, setInfoOpacity] = React.useState(1);

  /********************* 供父组件调用 **************************/
  const updateModel = (data: any) => {
    console.log('NavigationBar[updateModel]:');
    updateInfo(data ?? {});
  };

  const changeOpacity = (currentY: number) => {
    console.log('changeOpacity-currentY', currentY);
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
    updateInfo(props.data ?? {});
  }, []);
  //暴露指定的方法给父组件调用
  React.useImperativeHandle(ref, () => ({
    updateModel: updateModel,
    onScroll: changeOpacity,
    refreshInfo: () => {
      console.log('子组件refreshInfo方法');
    },
  }));

  /********************* 更新数据 **************************/
  const updateInfo = (data: any) => {
    // 获取原始楼层数据
    var floorsArr = data?.floors ?? [];

    let bgImage;
    let topNavigationBar;
    for (let index = 0; index < floorsArr.length; index++) {
      const element = floorsArr[index];
      const {refId} = element;
      if (refId === 'basefloorinfo') {
        topNavigationBar = element.data?.topNavigationBar;
      } else if (refId === 'userimage') {
        bgImage = element.data?.bgImgInfo?.bgImg;
      }
    }

    setInfo({
      topNavigationBar: topNavigationBar,
      bgImage: bgImage,
    });
  };
  /********************* 点击事件 **************************/
  const handelSettingClick = () => {
    router.push(RouteNames.Setting);
  };
  const handelProductClick = () => {
    // router.push(RouteNames.Product);
    router.push(RouteNames.DebugDemo);
  };

  const onSwitchTheme = () => {};
  /********************* 渲染 **************************/
  const renderTopSafeArea = () => {
    return <CommonSafeArea type="top" />;
  };
  const renderNavigationBar = () => {
    const headImg = info?.topNavigationBar?.headImg ?? '';
    const buttonIcon = info?.topNavigationBar?.settingInfo?.buttonIcon ?? '';

    return (
      <View style={[styles.navigationBar]}>
        <CommonFastImage
          source={{uri: headImg}}
          style={[styles.headImg, {opacity: bgImageOpacity}]}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CommonVectorIcon
            name="moon"
            style={{opacity: infoOpacity}} //控制按钮背景色
            onPress={onSwitchTheme}
          />
          <CommonVectorIcon
            name="address-book"
            style={{opacity: infoOpacity}} //控制按钮背景色
            onPress={handelProductClick}
          />
          <TouchableOpacity onPress={handelSettingClick}>
            <CommonFastImage
              source={{uri: buttonIcon}}
              style={[styles.settingInfo, {opacity: infoOpacity}]}
              tintColor={'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            info.bgImage ??
            'https://img0.baidu.com/it/u=3021883569,1259262591&fm=253&fmt=auto&app=120&f=JPEG?w=1140&h=641',
        }}
        style={{flex: 1}}
        imageStyle={{opacity: bgImageOpacity}}>
        {renderTopSafeArea()}
        {renderNavigationBar()}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  navigationBar: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headImg: {
    marginLeft: 12,
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
  },
  settingInfo: {
    marginRight: 12,
    width: 20,
    aspectRatio: 1,
    tintColor: 'red',
  },
});

export default React.forwardRef(NavigationBar);
