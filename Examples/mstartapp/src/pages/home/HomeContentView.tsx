/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  NavigationState,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view';
import TanguanScreen from './tanguan';
import ShouyeScreen from './shouye';
import DaPaiScreen from './dapai';
import ShanghaiScreen from './shanghai';
import CommonImageBackground from '~/components/common-imageBackground';

type Route = {
  key: string;
  title: string;
  backgroundColor?: string;
};

type State = NavigationState<Route>;

const HomeContentView = () => {
  const insets = useSafeAreaInsets();
  const [index, onIndexChange] = React.useState(0);
  const [naviBackgroundColor, setNaviBackgroundColor] = React.useState('white');
  const [routes] = React.useState<Route[]>([
    {key: 'dapai', title: '大牌', backgroundColor: '#EEEEEE'},
    {key: 'shanghai', title: '上海', backgroundColor: '#FFFFFF'},
    {key: 'shouye', title: '首页'},
    {key: 'tanguan', title: '探馆', backgroundColor: '#334455'},
  ]);

  const renderItem =
    ({navigationState, position}: {navigationState: State; position: any}) =>
    ({route, index}: {route: Route; index: number}) => {
      const inputRange = navigationState.routes.map((_, i) => i);

      const activeOpacity = position.interpolate({
        inputRange,
        outputRange: inputRange.map((i: number) => (i === index ? 1 : 0)),
      });
      const inactiveOpacity = position.interpolate({
        inputRange,
        outputRange: inputRange.map((i: number) => (i === index ? 0 : 1)),
      });

      return (
        <View style={styles.tab}>
          <Animated.View style={[styles.item, {opacity: inactiveOpacity}]}>
            <Text style={[styles.label, styles.inactive]}>{route.title}</Text>
          </Animated.View>
          <Animated.View
            style={[styles.item, styles.activeItem, {opacity: activeOpacity}]}>
            <Text style={[styles.label, styles.active]}>{route.title}</Text>
          </Animated.View>
        </View>
      );
    };

  const renderTabBar = (
    props: SceneRendererProps & {navigationState: State},
  ) => {
    const background_style: StyleProp<ViewStyle> = {
      width: '100%',
      paddingTop: Math.max(insets.top, 22),
      backgroundColor: naviBackgroundColor,
      position: 'absolute',
      zIndex: 100000,
    };

    return (
      <CommonImageBackground style={background_style}>
        <StatusBar
          barStyle={'dark-content'}
          translucent
          backgroundColor="rgba(0, 0, 0, 0)"
        />
        <View style={[styles.navigationbar]}>
          <View style={[styles.segement]}>
            {props.navigationState.routes.map((route: Route, index: number) => {
              return (
                <TouchableWithoutFeedback
                  key={route.key}
                  onPress={() => {
                    setNaviBackgroundColor(
                      route.backgroundColor ?? 'transparent',
                    );
                    props.jumpTo(route.key);
                  }}>
                  {renderItem(props)({route, index})}
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </View>
      </CommonImageBackground>
    );
  };

  const _renderScene = (props: any) => {
    const {index, route} = props;
    if (route.key === 'tanguan') {
      return <TanguanScreen key={route.key} tabDatas={route} />;
    } else if (route.key === 'shouye') {
      return <ShouyeScreen key={route.key} tabDatas={route} />;
    } else if (route.key === 'dapai') {
      return <DaPaiScreen key={route.key} tabDatas={route} />;
    } else if (route.key === 'shanghai') {
      return <ShanghaiScreen key={route.key} tabDatas={route} />;
    }
    return <View key={route.key} />;
  };

  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={_renderScene}
      renderTabBar={renderTabBar}
      tabBarPosition="top"
      animationEnabled={false}
      swipeEnabled={false}
      onIndexChange={onIndexChange}
      lazy={true}
    />
  );
};

const styles = StyleSheet.create({
  tabbar: {},
  navigationbar: {
    width: '100%',
    height: 44,
    justifyContent: 'center',
  },
  segement: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 22,
    borderColor: 'blue',
    borderWidth: 1,
  },

  tab: {
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .2)',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeItem: {
    position: 'absolute',
    justifyContent: 'center',
  },
  active: {
    color: '#0084ff',
  },
  inactive: {
    color: '#939393',
  },
  icon: {
    height: 50,
    width: 50,
    borderColor: 'red',
    borderWidth: 1,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
});

export default HomeContentView;
