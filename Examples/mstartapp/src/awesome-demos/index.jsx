import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {RouteNames, router} from '~/navigator/NavigationService';
import CommonCell from '~/components/common-cell';
import CommonScreen from '~/components/common-screen';
import CommonSafeArea from '~/components/common-safe-area';
export default class App extends Component {
  render() {
    return (
      <CommonScreen appbar={{title: 'demo'}}>
        <CommonSafeArea />
        <ScrollView style={{flex: 1}}>
          <CommonCell
            title="sticky-header-demo"
            onPress={() => {
              router.push(RouteNames.StickyHeaderDemo);
            }}
          />
          <CommonCell
            title="form-inputs-demo"
            onPress={() => {
              router.push(RouteNames.FormInputsDemo);
            }}
          />
          <CommonCell
            title="vertical-tab-layout-demo"
            onPress={() => {
              router.push(RouteNames.VerticalTabLayoutDemo);
            }}
          />
          <CommonCell
            title="react-native-renimated-demo"
            onPress={() => {
              router.push(RouteNames.ReactNativeRenimatedDemo);
            }}
          />
          <CommonCell
            title="custom-tabbar-demo"
            onPress={() => {
              router.push(RouteNames.CommonCustomTabBarDemo);
            }}
          />
          <CommonCell
            title="抖音"
            onPress={() => {
              router.push(RouteNames.DouYinDemo);
            }}
          />
        </ScrollView>
      </CommonScreen>
    );
  }
}

const styles = StyleSheet.create({});
