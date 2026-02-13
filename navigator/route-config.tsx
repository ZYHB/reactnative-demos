import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';

import LoginScreen from '@/app/pages/account/login';
import RegisterScreen from '@/app/pages/account/register';
import SMSCodeLoginScreen from '@/app/pages/account/sms-code-login';
import AddressManagerScreen from '@/app/pages/address-manager';
import BrowseHistoryScreen from '@/app/pages/browse-history';
import DeviceInfoScreen from '@/app/pages/deviceInfo';
import FavoriteScreen from '@/app/pages/favorite';
import FeedBackScreen from '@/app/pages/feedback';
import GeneralScreen from '@/app/pages/general';
import GuideScreen from '@/app/pages/guide';
import WebScreen from '@/app/pages/h5';
import LoactionAddressScreen from '@/app/pages/location-address';
import MyOrdersScreen from '@/app/pages/order';
import ProductScreen from '@/app/pages/product';
import SettingScreen from '@/app/pages/setting';
import SplashScreen from '@/app/pages/splash';
import UserInfoScreen from '@/app/pages/userInfo';
import Bottomtabs from './bottomtabs';
import RouteNames from './route-names';

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
];

export { RouteConfig, RouteNames };

