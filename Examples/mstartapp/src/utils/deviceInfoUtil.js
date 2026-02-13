/**
 * Created by guangqiang on 2017/8/27.
 */

/** 设备信息 **/

import {Dimensions} from 'react-native';

const deviceInfoUtil = {
  deviceWidth: () => {
    return Dimensions.get('window').width;
  },

  deviceHeight: () => {
    return Dimensions.get('window').height;
  },
};

export {deviceInfoUtil};
