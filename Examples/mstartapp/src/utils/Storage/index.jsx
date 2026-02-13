import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {JMGL_PATH} from '~/common/common-const';
import lmd5 from './lmd5';

class DeviceStorage {
  static async storeData(key, value) {
    try {
      if ((await RNFS.exists(JMGL_PATH)) === false) {
        console.log(`文件夹不存在，开始创建 ${JMGL_PATH}`);
        await RNFS.mkdir(JMGL_PATH);
      }
      const key_md5 = lmd5.hex_md5(key);
      const path = `${JMGL_PATH}/${key_md5}`;
      console.log('storeData path', path);
      const jsonValue = JSON.stringify(value);
      await RNFS.writeFile(path, jsonValue);
    } catch (e) {
      console.log('storeData error', e);
    }
    console.log('storeData---Done.');
  }

  static async getData(key) {
    try {
      const key_md5 = lmd5.hex_md5(key);
      const path = `${JMGL_PATH}/${key_md5}`;
      const jsonValue = await RNFS.readFile(path);
      return jsonValue != null ? JSON.parse(jsonValue) : null;

      // const jsonValue = await AsyncStorage.getItem(key);
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
    console.log('getData---Done.');
  }

  static async clear() {
    try {
      await RNFS.unlink(JMGL_PATH);
    } catch (e) {
      // error reading value
    }
    console.log('clear---Done.');
  }
}

class CommonAsyncStorage {
  static async storeData(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log('storeData error', e);
    }
    console.log('storeData---Done.');
  }

  static async updateData(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.mergeItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
    console.log('updateData---Done.');
  }

  static async getData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
    console.log('getData---Done.');
  }

  static async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // error reading value
    }
    console.log('removeData---Done.');
  }

  static async clear(key) {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // error reading value
    }
    console.log('clear---Done.');
  }
}

export {DeviceStorage, CommonAsyncStorage};
