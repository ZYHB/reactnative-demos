/* eslint-disable react/no-unstable-nested-components */

import * as React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view';
import Albums from './components/Albums';
import Article from './components/Article';
import Chat from './components/Chat';
import Contacts from './components/Contacts';

type Route = {
  key: string;
  title: string;
};

type State = NavigationState<Route>;

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

const CommonCustomTabBarDemo = () => {
  const insets = useSafeAreaInsets();
  const [index, onIndexChange] = React.useState(0);
  const [routes] = React.useState<Route[]>([
    {key: 'contacts', title: 'Contacts'},
    {key: 'albums', title: 'Albums'},
    {key: 'article', title: 'Article'},
    {key: 'chat', title: 'Chat'},
  ]);

  const renderTabBar = (
    props: SceneRendererProps & {navigationState: State},
  ) => {
    const tabbar_style: ViewStyle = {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    };

    return (
      <View style={[styles.tabbar, tabbar_style]}>
        {props.navigationState.routes.map((route: Route, index: number) => {
          return (
            <TouchableWithoutFeedback
              key={route.key}
              onPress={() => props.jumpTo(route.key)}>
              {renderItem(props)({route, index})}
            </TouchableWithoutFeedback>
          );
        })}
        {/* <TouchableOpacity onPress={() => onIndexChange(0)}>
            <Text>点击切换</Text>
          </TouchableOpacity> */}
      </View>
    );
  };

  //这种方式没有给组件设置对应的key,会导致切换场景时，组件重新渲染
  const renderScene = SceneMap({
    contacts: () => <Contacts />,
    albums: () => <Albums />,
    article: () => <Article />,
    chat: () => <Chat />,
  });

  const _renderScene = (props: any) => {
    const {index, route} = props;
    if (route.key === 'contacts') {
      return <Contacts key={route.key} />;
    } else if (route.key === 'albums') {
      return <Albums key={route.key} />;
    } else if (route.key === 'article') {
      return <Article key={route.key} />;
    } else if (route.key === 'chat') {
      return <Chat key={route.key} />;
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
      onIndexChange={onIndexChange}
      lazy={true}
    />
  );
};

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    // position: 'absolute',
    // zIndex: 100000,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .2)',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  activeItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 3,
    marginBottom: 1.5,
    backgroundColor: 'transparent',
  },
});

export default CommonCustomTabBarDemo;
