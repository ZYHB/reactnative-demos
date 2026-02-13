/**
 * Created by guangqiang on 2017/11/24.
 */

const copyUtil = {
  deepClone: data => {
    var obj = {};
    var originQueue = [data];
    var copyQueue = [obj];
    //以下两个队列用来保存复制过程中访问过的对象，以此来避免对象环的问题（对象的某个属性值是对象本身）
    var visitQueue = [];
    var copyVisitQueue = [];
    while (originQueue.length > 0) {
      var _data = originQueue.shift();
      var _obj = copyQueue.shift();
      visitQueue.push(_data);
      copyVisitQueue.push(_obj);
      for (var key in _data) {
        var _value = _data[key];
        if (typeof _value !== 'object') {
          _obj[key] = _value;
        } else {
          //使用indexOf可以发现数组中是否存在相同的对象(实现indexOf的难点就在于对象比较)
          var index = visitQueue.indexOf(_value);
          if (index >= 0) {
            _obj[key] = copyVisitQueue[index];
          }
          originQueue.push(_value);
          _obj[key] = {};
          copyQueue.push(_obj[key]);
        }
      }
    }
    return obj;
  },

  deepCopy: data => {
    if (data.constructor.name === 'Array') {
      // 判断为数组类型
      var arrCopy = [];
      for (var i = 0, len = data.length; i < len; i++) {
        //遍历数组
        if (data[i] instanceof Object) {
          arrCopy.push(copyUtil.deepCopy(data[i]));
        } else {
          // 基本类型
          arrCopy.push(data[i]);
        }
      }
      return arrCopy;
    } else {
      // 为对象
      var objCopy = {};
      for (let x in data) {
        if (data[x] instanceof Object) {
          objCopy[x] = copyUtil.deepCopy(data[x]);
        } else {
          // 基本类型
          objCopy[x] = data[x];
        }
      }
      return objCopy;
    }
  },
};

export {copyUtil};
