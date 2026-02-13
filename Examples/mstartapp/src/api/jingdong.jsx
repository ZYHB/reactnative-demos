import {DeviceStorage, extraUtil} from '~/utils';

class JDRequest {
  async get(url) {
    console.log('请求：url', url);
    return new Promise(async (resolve, reject) => {
      this.loadDataFromCache(url)
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          return this.loadDataFromServer(url);
        })
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  loadDataFromServer(url) {
    return new Promise(function (resolve, reject) {
      console.log('开始请求服务器...');
      fetch(url)
        .then(response => response.json())
        .then(result => {
          console.log('请求服务器Success');
          resolve(result);
          DeviceStorage.storeData(url, result);
        })
        .catch(error => {
          console.log('请求服务器Failed:', error);
          reject(error);
        });
    });
  }

  loadDataFromCache(url) {
    return new Promise(async function (resolve, reject) {
      console.log('正在查询缓存...');
      const jsonValue = await DeviceStorage.getData(url);
      if (!extraUtil.isEmptyObj(jsonValue)) {
        console.log('本地有缓存数据');
        resolve(jsonValue);
      } else {
        console.log('本地无缓存数据');
        reject('暂无缓存数据');
      }
    });
  }

  static runAsync1() {
    var p = new Promise(function (resolve, reject) {
      //做一些异步操作
      setTimeout(function () {
        console.log('异步任务1执行完成');
        resolve('随便什么数据1');
      }, 1000);
    });
    return p;
  }
  static runAsync2() {
    var p = new Promise(function (resolve, reject) {
      //做一些异步操作
      setTimeout(function () {
        console.log('异步任务2执行完成');
        resolve('随便什么数据2');
      }, 2000);
    });
    return p;
  }
  static runAsync3() {
    var p = new Promise(function (resolve, reject) {
      //做一些异步操作
      setTimeout(function () {
        console.log('异步任务3执行完成');
        resolve('随便什么数据3');
      }, 2000);
    });
    return p;
  }
}

export let requestManager = new JDRequest();
