import {StyleSheet, Image} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '~/pages/home';
import NewsScreen from '~/pages/news';
import DiscoverScreen from '~/pages/discover';
import ShopcarScreen from '~/pages/shopcart';
import MineScreen from '~/pages/mine';

const Tab = createBottomTabNavigator();

type IProps = {
  navigation: any;
  route: any;
};

function Bottomtabs(props: IProps) {
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    console.log('Bottomtabs-first', JSON.stringify(props));
  }, []);

  const renderTabBarIcon = (
    route: any,
    props: {focused: boolean; color: string; size: number},
  ) => {
    var source;
    if (route.name === 'Home') {
      source = props.focused
        ? require('~/assets/image/tab/tabbar_home_sel.png')
        : require('~/assets/image/tab/tabbar_home.png');
    } else if (route.name === 'News') {
      source = props.focused
        ? require('~/assets/image/tab/tabbar_course_sel.png')
        : require('~/assets/image/tab/tabbar_course.png');
    } else if (route.name === 'Discover') {
      source = props.focused
        ? require('~/assets/image/tab/tabbar_ask_sel.png')
        : require('~/assets/image/tab/tabbar_ask.png');
    } else if (route.name === 'Shopcar') {
      source = props.focused
        ? require('~/assets/image/tab/tabbar_choose_sel.png')
        : require('~/assets/image/tab/tabbar_choose.png');
    } else if (route.name === 'Account') {
      source = props.focused
        ? require('~/assets/image/tab/tabbar_my_sel.png')
        : require('~/assets/image/tab/tabbar_my.png');
    }
    return (
      <Image
        style={{
          width: props.size,
          height: props.size,
          tintColor: props.focused ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.5)',
        }}
        source={source}
      />
    );
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: props => renderTabBarIcon(route, props),
        tabBarActiveTintColor: 'rgba(0,0,0,1)',
        tabBarInactiveTintColor: 'rgba(0,0,0,0.5)',
        tabBarStyle: {backgroundColor: '#FFF'},
      })}
      screenListeners={({navigation}) => ({
        state: e => {
          // Do something with the state
          console.log('state changed', e.data);

          // Do something with the `navigation` object
          if (!navigation.canGoBack()) {
            console.log("we're on the initial screen");
          }
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '首页',
          headerShown: false, //隐藏顶部导航
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarLabel: '新品',
        }}
        // listeners={({navigation, route}) => ({
        //   tabPress: e => {
        //     // 设置新品tab点击时跳转至设置页
        //     // Prevent default action
        //     e.preventDefault();

        //     // Do something with the `navigation` object
        //     // navigation.navigate('Setting'); //
        //     // router.push('Setting');
        //     router.push(RouteNames.Order, {index: 2});
        //   },
        // })}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarLabel: '发现',
        }}
        // listeners={{
        //   tabPress: e => {
        //     // Prevent default action
        //     e.preventDefault(); //设置tab无法被选中
        //   },
        // }}
      />
      <Tab.Screen
        name="Shopcar"
        component={ShopcarScreen}
        options={{
          tabBarLabel: '购物车',
        }}
      />
      <Tab.Screen
        name="Account"
        component={MineScreen}
        options={{
          tabBarLabel: '我的',
          headerShown: false, //隐藏顶部导航
        }}
      />
    </Tab.Navigator>
  );
}

// class Bottomtabs extends Component<IProps> {
//   componentDidMount() {
//     this.setOptions();
//   }
//   componentDidUpdate() {
//     this.setOptions();
//   }
//   setOptions = () => {
//     const { navigation, route } = this.props;
//     navigation.setOptions({
//       headerTitle: getHeaderTitle(route),
//     });
//   };
//   renderTabBarIcon = (
//     route: RouteProp<BottomTabParamList, keyof BottomTabParamList>,
//     props: { focused: boolean; color: string; size: number }
//   ) => {
//     var source;
//     if (route.name === "Home") {
//       source = props.focused
//         ? require("~/assets/image/tab/tabbar_home_sel.png")
//         : require("~/assets/image/tab/tabbar_home.png");
//     } else if (route.name === "News") {
//       source = props.focused
//         ? require("~/assets/image/tab/tabbar_course_sel.png")
//         : require("~/assets/image/tab/tabbar_course.png");
//     } else if (route.name === "Discover") {
//       source = props.focused
//         ? require("~/assets/image/tab/tabbar_ask_sel.png")
//         : require("~/assets/image/tab/tabbar_ask.png");
//     } else if (route.name === "Shopcar") {
//       source = props.focused
//         ? require("~/assets/image/tab/tabbar_choose_sel.png")
//         : require("~/assets/image/tab/tabbar_choose.png");
//     } else if (route.name === "Account") {
//       source = props.focused
//         ? require("~/assets/image/tab/tabbar_my_sel.png")
//         : require("~/assets/image/tab/tabbar_my.png");
//     }
//     return (
//       <Image
//         style={{ width: props.size, height: props.size }}
//         source={source}
//       />
//     );
//   };
//   render() {
//     return (
//       <Tab.Navigator
//         initialRouteName="Home"
//         screenOptions={({ route }) => ({
//           headerShown: false,
//           tabBarIcon: (props) => this.renderTabBarIcon(route, props),
//           tabBarActiveTintColor: "#e91e63",
//           tabBarInactiveTintColor: "gray",
//         })}
//         screenListeners={({ navigation }) => ({
//           state: (e) => {
//             // Do something with the state
//             console.log("state changed", e.data);

//             // Do something with the `navigation` object
//             if (!navigation.canGoBack()) {
//               console.log("we're on the initial screen");
//             }
//           },
//         })}
//       >
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             tabBarLabel: "首页",
//             headerShown: false, //隐藏顶部导航
//           }}
//         />
//         <Tab.Screen
//           name="News"
//           component={NewsScreen}
//           options={{
//             tabBarLabel: "新品",
//           }}
//           listeners={({ navigation, route }) => ({
//             tabPress: (e) => {
//               // 设置新品tab点击时跳转至设置页
//               // Prevent default action
//               e.preventDefault();

//               // Do something with the `navigation` object
//               navigation.navigate("Setting"); //
//             },
//           })}
//         />
//         <Tab.Screen
//           name="Discover"
//           component={DiscoverScreen}
//           options={{
//             tabBarLabel: "发现",
//           }}
//           listeners={{
//             tabPress: (e) => {
//               // Prevent default action
//               e.preventDefault(); //设置tab无法被选中
//             },
//           }}
//         />
//         <Tab.Screen
//           name="Shopcar"
//           component={ShopcarScreen}
//           options={{
//             tabBarLabel: "购物车",
//           }}
//         />
//         <Tab.Screen
//           name="Account"
//           component={MineScreen}
//           options={{
//             tabBarLabel: "我的",
//             headerShown: false, //隐藏顶部导航
//           }}
//         />
//       </Tab.Navigator>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEEEEE',
    height: '100%',
  },
});

export default Bottomtabs;
