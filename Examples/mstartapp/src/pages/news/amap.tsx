import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {AMapSdk, MapType, MapView} from 'react-native-amap3d';
import {Platform} from 'react-native';

export default class CommonAMap extends Component {
  constructor(props: any) {
    super(props);
    AMapSdk.init(
      Platform.select({
        android: 'c52c7169e6df23490e3114330098aaac',
        ios: '186d3464209b74effa4d8391f441f14d',
      }),
    );
  }
  render() {
    return (
      <MapView
        mapType={MapType.Satellite}
        initialCameraPosition={{
          target: {
            latitude: 39.91095,
            longitude: 116.37296,
          },
          zoom: 8,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});
