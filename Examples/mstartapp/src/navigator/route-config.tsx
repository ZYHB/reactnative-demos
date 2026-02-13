import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';

import Bottomtabs from './bottomtabs';
import SettingScreen from '~/pages/setting';
import UserInfoScreen from '~/pages/userInfo';
import AddressManagerScreen from '~/pages/address-manager';
import GeneralScreen from '~/pages/general';
import BrowseHistoryScreen from '~/pages/browse-history';
import MyOrdersScreen from '~/pages/order';
import ProductScreen from '~/pages/product';
import SplashScreen from '~/pages/splash';
import GuideScreen from '~/pages/guide';
import LoginScreen from '~/pages/account/login';
import SMSCodeLoginScreen from '~/pages/account/sms-code-login';
import RegisterScreen from '~/pages/account/register';
import WebScreen from '~/pages/h5';
import FeedBackScreen from '~/pages/feedback';
import FavoriteScreen from '~/pages/favorite';
import DeviceInfoScreen from '~/pages/deviceInfo';
import LoactionAddressScreen from '~/pages/location-address';
import DebugDemosScreen from '~/awesome-demos';
import StickyHeaderDemo from '~/awesome-demos/sticky-header-demo';
import FormInputsDemo from '~/awesome-demos/form-inputs-demo';
import VerticalTabLayoutDemo from '~/awesome-demos/vertical-tab-layout-demo';
import ReactNativeRenimatedDemo from '~/awesome-demos/react-native-renimated-demo';
import CommonCustomTabBarDemo from '~/awesome-demos/custom-tabbar-demo';
import DouYinDemo from '~/awesome-demos/douyin';
import RouteNames from './route-names'; // the variable name is arbitrary since it's exported as default

function createRouter(name: string, component: any) {
  let option: StackNavigationOptions;
  if (name === RouteNames.Login) {
    option = {
      headerShown: false, //隐藏顶部导航
      ...TransitionPresets.ModalSlideFromBottomIOS,
    };
  } else {
    option = {
      headerShown: false, //隐藏顶部导航
    };
  }
  return {name: name, component: component, options: option};
}

const RouteConfig = [
  createRouter(RouteNames.Guide, GuideScreen),
  createRouter(RouteNames.Splash, SplashScreen),
  createRouter(RouteNames.Bottomtabs, Bottomtabs),
  createRouter(RouteNames.Setting, SettingScreen),
  createRouter(RouteNames.UserInfo, UserInfoScreen),
  createRouter(RouteNames.AddressManager, AddressManagerScreen),
  createRouter(RouteNames.General, GeneralScreen),
  createRouter(RouteNames.Product, ProductScreen),
  createRouter(RouteNames.BrowseHistory, BrowseHistoryScreen),
  createRouter(RouteNames.Order, MyOrdersScreen),
  createRouter(RouteNames.Detail, GuideScreen),
  createRouter(RouteNames.Login, LoginScreen),
  createRouter(RouteNames.SMSCodeLogin, SMSCodeLoginScreen),
  createRouter(RouteNames.Register, RegisterScreen),
  createRouter(RouteNames.Web, WebScreen),
  createRouter(RouteNames.FeedBack, FeedBackScreen),
  createRouter(RouteNames.Favorite, FavoriteScreen),
  createRouter(RouteNames.DeviceInfo, DeviceInfoScreen),
  createRouter(RouteNames.LocationAddress, LoactionAddressScreen),
  createRouter(RouteNames.DebugDemo, DebugDemosScreen),
  createRouter(RouteNames.StickyHeaderDemo, StickyHeaderDemo),
  createRouter(RouteNames.FormInputsDemo, FormInputsDemo),
  createRouter(RouteNames.VerticalTabLayoutDemo, VerticalTabLayoutDemo),
  createRouter(RouteNames.ReactNativeRenimatedDemo, ReactNativeRenimatedDemo),
  createRouter(RouteNames.CommonCustomTabBarDemo, CommonCustomTabBarDemo),
  createRouter(RouteNames.DouYinDemo, DouYinDemo),
];

export {RouteConfig, RouteNames};
