import {StyleSheet, View, FlatList, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import DeviceInfo from 'react-native-device-info';
import CommonSafeArea from '~/components/common-safe-area';
import CommonScreen from '~/components/common-screen';

export default function DeviceInfoScreen() {
  const [data, setData] = useState<any>([]);

  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    getDeviceInfo();
  }, []);
  useEffect(() => {
    return () => {
      console.log('DeviceInfoScreen 组件卸载');
    };
  }, []);

  //初始加载、获取物理硬件信息
  const getDeviceInfo = async () => {
    let data = [];
    //  await console.log('api版本:', DeviceInfo.getAPILevel());
    const getBrand = await DeviceInfo.getBrand();
    data.push({title: '品牌:', value: getBrand});

    const getApplicationName = await DeviceInfo.getApplicationName();
    data.push({title: '当前应用名称:', value: getApplicationName});

    const getBuildNumber = await DeviceInfo.getBuildNumber();
    data.push({title: '应用编译版本号:', value: getBuildNumber});

    const getBundleId = await DeviceInfo.getBundleId();
    data.push({title: '获取应用程序包标识符:', value: getBundleId});

    const getCarrier = await DeviceInfo.getCarrier();
    data.push({title: '运营商名称:', value: getCarrier});

    const getDeviceId = await DeviceInfo.getDeviceId();
    data.push({title: '设备ID:', value: getDeviceId});

    const getDeviceName = await DeviceInfo.getDeviceName();
    data.push({title: '设备名称:', value: getDeviceName});

    const getFirstInstallTime = await DeviceInfo.getFirstInstallTime();
    data.push({title: '获取应用初始安装时间:', value: getFirstInstallTime});

    const getFontScale = await DeviceInfo.getFontScale();
    data.push({title: '设备字体大小:', value: getFontScale});

    const getFreeDiskStorage = await DeviceInfo.getFreeDiskStorage();
    data.push({title: '剩余存储容量(字节):', value: getFreeDiskStorage});

    const getLastUpdateTime = await DeviceInfo.getLastUpdateTime();
    data.push({title: '获取应用上次更新时间:', value: getLastUpdateTime});

    const getManufacturer = await DeviceInfo.getManufacturer();
    data.push({title: '设备制造商:', value: getManufacturer});

    const getMaxMemory = await DeviceInfo.getMaxMemory();
    data.push({
      title: '获取JVM试图使用的最大内存量(字节):',
      value: getMaxMemory,
    });

    const getModel = await DeviceInfo.getModel();
    data.push({title: '获取设备模式:', value: getModel});

    const getPhoneNumber = await DeviceInfo.getPhoneNumber();
    data.push({title: '获取电话号码:', value: getPhoneNumber});

    const getReadableVersion = await DeviceInfo.getReadableVersion();
    data.push({title: '获取应用程序可读版本:', value: getReadableVersion});

    const getSerialNumber = await DeviceInfo.getSerialNumber();
    data.push({title: '设备唯一序列号:', value: getSerialNumber});

    const getSystemName = await DeviceInfo.getSystemName();
    data.push({title: '获取系统名称:', value: getSystemName});

    const getSystemVersion = await DeviceInfo.getSystemVersion();
    data.push({title: '获取系统版本:', value: getSystemVersion});

    const getTotalDiskCapacity = await DeviceInfo.getTotalDiskCapacity();
    data.push({title: '完整磁盘空间大小(字节):', value: getTotalDiskCapacity});

    const getTotalMemory = await DeviceInfo.getTotalMemory();
    data.push({title: '设备总内存(字节):', value: getTotalMemory});

    const getUserAgent = await DeviceInfo.getUserAgent();
    data.push({title: '设备用户代理:', value: getUserAgent});

    const getVersion = await DeviceInfo.getVersion();
    data.push({title: '设备(APP)版本:', value: getVersion});

    const isEmulator = await DeviceInfo.isEmulator();
    data.push({title: '程序是否允许在模拟器中:', value: isEmulator});

    const isTablet = await DeviceInfo.isTablet();
    data.push({title: '是否是平板电脑:', value: isTablet});

    setData(data);
  };

  /********************* 网络请求 **************************/
  return (
    <CommonScreen appbar={{title: '设备信息'}}>
      <CommonSafeArea />
      <FlatList
        style={{flex: 1}}
        data={data}
        initialNumToRender={data.length}
        renderItem={({item, index}) => {
          return (
            <View style={{marginTop: 5}}>
              <Text style={{color: '#000'}}>
                {item.title} <Text style={{color: '#666'}}>{item.value}</Text>
              </Text>
            </View>
          );
        }}
      />
    </CommonScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
