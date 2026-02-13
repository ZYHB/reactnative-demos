import {TouchableOpacity, Animated, Dimensions} from 'react-native';
import React, {Component} from 'react';
import CommonDialog from '~/components/common-dialog';
import Geolocation from '@react-native-community/geolocation';

const kCoordtype = 'wgs84ll';
const kAk = 'QwbUaVG93ReMoYwvCnuy0WsN6F99Ld2Q';

export class GlobalLocation {
  windowDialogRef: CommonDialog | null | undefined;
  latitude: number | null | undefined;
  longitude: number | null | undefined;
  formatted_address: string | null | undefined;
  result: any | null | undefined;

  getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      /** 获取当前位置信息 */
      Geolocation.getCurrentPosition(
        location => {
          this.longitude = location.coords.longitude; //经度
          this.latitude = location.coords.latitude; //纬度

          //通过调用百度地图逆地理接口，传入经纬度获取位置信息
          fetch(
            `https://api.map.baidu.com/reverse_geocoding/v3/?ak=${kAk}&output=json&coordtype=${kCoordtype}&location=${this.latitude},${this.longitude}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: ``,
            },
          )
            .then(response => response.json())
            .then(jsonData => {
              this.result = jsonData.result ?? {};
              this.formatted_address = jsonData.result?.formatted_address ?? '';
              resolve(jsonData);
            })
            .catch(error => {
              console.error(error);
              resolve(error);
            });
        },
        error => {
          console.error(error);
          resolve(error);
        },
      );
    });
  };
}

export let globalLocation = new GlobalLocation();

/*
{
    "status": 0,
    "result": {
        "location": {
            "lng": 121.50989077799084,
            "lat": 31.22932842411674
        },
        "formatted_address": "上海市黄浦区中山南路187",
        "business": "外滩,陆家嘴,董家渡",
        "addressComponent": {
            "country": "中国",
            "country_code": 0,
            "country_code_iso": "CHN",
            "country_code_iso2": "CN",
            "province": "上海市",
            "city": "上海市",
            "city_level": 2,
            "district": "黄浦区",
            "town": "",
            "town_code": "",
            "distance": "91",
            "direction": "东北",
            "adcode": "310101",
            "street": "中山南路",
            "street_number": "187"
        },
        "pois": [],
        "roads": [],
        "poiRegions": [],
        "sematic_description": "",
        "cityCode": 289
    }
}
*/
