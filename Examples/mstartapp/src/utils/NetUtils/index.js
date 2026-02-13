import {Alert} from 'react-native';

class NetUtils {
  /** * GET 请求 */
  static get(url, params, success, error) {
    if (params) {
      let paramsArray = [];
      //拼接参数
      Object.keys(params).forEach(key =>
        paramsArray.push(key + '=' + params[key]),
      );
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&');
      } else {
        url += '&' + paramsArray.join('&');
      }
    }

    console.log(url, params); // fetch 请求
    fetch(url, {
      headers: {
        //看后台需求决定配置参数,例如我们后台要求将appId放在这里请求
        // appId: '1234345656'
      },
    })
      .then(response => response.json())
      //把response转为json
      .then(responseJson => {
        // 拿到上面的转好的json
        // console.log(responseJson); //Alert.alert("ccccaaa", url);
        success && success(responseJson);
      })
      .catch(e => {
        console.log(e);
        error && error(e);
        // Alert.alert('提示信息', '请检查您的网络是否已经连接');
      });
  }
  /** * POST 请求，经测试用FormData传递数据也可以 */
  static post(url, params, success, error) {
    // new Request();
    console.log(url, params);
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        //媒体格式类型key/value格式
        // 'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'multipart/form-data',
      },
      body: params, //JSON.stringify(params)
    })
      .then(response => response.json())
      //把response转为json
      .then(responseJson => {
        // 拿到上面的转好的json
        // console.log(responseJson);
        success && success(responseJson);
      })
      .catch(e => {
        console.log(e);
        error && error(error);
        // Alert.alert("e", e);
        // Alert.alert('提示信息', '请检查您的网络是否已经连接');
      });
  }

  /** * POST 请求，经测试用FormData传递数据也可以 Json格式 */
  static postJson(url, params, success, error) {
    console.log(url, params);
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        //媒体格式类型key/value格式
        // 'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      //把response转为json
      .then(responseJson => {
        // 拿到上面的转好的json
        console.log(responseJson);
        success && success(responseJson);
      })
      .catch(e => {
        console.log(e);
        error && error(error);
        Alert.alert('错误提示', '请检查您的网络是否已经连接');
        // Alert.alert("e", e);
      });
  }

  /** * @images uri数组 * @param FormData格式,没有参数的话传null */
  static uploadFile(url, images, params, success, error) {
    console.log(url, images);
    let formData = new FormData();
    if (params) {
      formData = params;
    }
    for (var i = 0; i < images.length; i++) {
      var uri = images[i];
      var date = new Date();
      var name = date.getTime() + '.png';
      //用时间戳保证名字的唯一性
      let file = {uri: uri, type: 'multipart/form-data', name: name};
      formData.append('file', file);
    }
    console.log(url, formData);
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        //媒体格式类型key/value格式
        'Content-Type': 'multipart/form-data',
        // customerId: customerId,
        // appId: appId
      },
      body: formData,
    })
      .then(response => response.json())
      //把response转为json
      .then(responseJson => {
        // 拿到上面的转好的json
        console.log(responseJson);
        success && success(responseJson);
      })
      .catch(e => {
        console.log(e);
        error && error(error);
      });
  }
}

export {NetUtils};
