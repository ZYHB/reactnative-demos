import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
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
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          mapType={MapType.Bus}
          compassEnabled={true}
          myLocationButtonEnabled={true}
          initialCameraPosition={{
            target: {
              latitude: 39.91095,
              longitude: 116.37296,
            },
            zoom: 8,
          }}
        />
        <View style={{flex: 1}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
