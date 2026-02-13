/**
 * Created by guangqiang on 2017/10/3.
 */

const formatTime = {
  //1、将毫秒，转换成时间字符串。例如说，xx 分钟
  getDate(ms) {
    const day = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hour = Math.floor(ms / (60 * 60 * 1000) - day * 24);
    const minute = Math.floor(ms / (60 * 1000) - day * 24 * 60 - hour * 60);
    const second = Math.floor(
      ms / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60,
    );
    if (day > 0) {
      return day + '天' + hour + '小时' + minute + '分钟';
    }
    if (hour > 0) {
      return hour + '小时' + minute + '分钟';
    }
    if (minute > 0) {
      return minute + '分钟';
    }
    if (second > 0) {
      return second + '秒';
    } else {
      return 0 + '秒';
    }
  },
  //2、获取当前时间 timeStr 时分秒 字符串 格式为 xx:xx:xx（23:59:59）

  getNowDateTime(timeStr) {
    let now = new Date();
    let year = now.getFullYear(); //得到年份
    let month = (now.getMonth() + 1).toString().padStart(2, '0'); //得到月份
    let day = now.getDate().toString().padStart(2, '0'); //得到日期

    if (timeStr != null) {
      return `${year}-${month}-${day} ${timeStr}`;
    }
    let hours = now.getHours().toString().padStart(2, '0'); // 得到小时;
    let minutes = now.getMinutes().toString().padStart(2, '0'); // 得到分钟;
    let seconds = now.getSeconds().toString().padStart(2, '0'); // 得到秒;
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },

  //3、时间戳转年月日时分秒（例：Thu Sep 01 2022 08:00:00 GMT+0800 (中国标准时间)）

  timestampToTime(time) {
    if (time) {
      var date = new Date(time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-';
      let M =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1) + '-'
          : date.getMonth() + 1 + '-';
      let D =
        date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
      let h =
        date.getHours() < 10
          ? '0' + date.getHours() + ':'
          : date.getHours() + ':';
      let m =
        date.getMinutes() < 10
          ? '0' + date.getMinutes() + ':'
          : date.getMinutes() + ':';
      let s =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    } else {
      return '';
    }
  },

  //4、时间戳转年月日星期（例：Thu Sep 01 2022 08:00:00 GMT+0800 (中国标准时间)）

  timestampToDay(time) {
    if (time) {
      var date = new Date(time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '年';
      let M =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1) + '月'
          : date.getMonth() + 1 + '月';
      let D =
        date.getDate() < 10
          ? '0' + date.getDate() + '日'
          : date.getDate() + '日';
      const w = date.getDay();
      const weekObj = {
        1: '星期一',
        2: '星期二',
        3: '星期三',
        4: '星期四',
        5: '星期五',
        6: '星期六',
        0: '星期日',
      };
      return Y + M + D + weekObj[w];
    } else {
      return '';
    }
  },

  //5、时间戳转年月（例：Thu Sep 01 2022 08:00:00 GMT+0800 (中国标准时间)）

  timestampToMonth(time) {
    if (time) {
      var date = new Date(time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '年';
      let M =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1) + '月'
          : date.getMonth() + 1 + '月';
      return Y + M;
    } else {
      return '';
    }
  },

  //6、时间戳转年月日（例：Thu Sep 01 2022 08:00:00 GMT+0800 (中国标准时间)）

  timestamp(time) {
    if (time) {
      var date = new Date(time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-';
      let M =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1) + '-'
          : date.getMonth() + 1 + '-';
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate();
      return Y + M + D;
    } else {
      return '';
    }
  },

  formatMediaTime: duration => {
    let min = Math.floor(duration / 60);
    let second = duration - min * 60;
    min = min >= 10 ? min : '0' + min;
    second = second >= 10 ? second : '0' + second;
    return min + ':' + second;
  },

  timeTohhmmss: seconds => {
    let hh, mm, ss;

    if (seconds === null || seconds < 0) {
      return;
    }

    let pseconds = parseInt(seconds);

    //得到小时
    hh = (pseconds / 3600) | 0;

    pseconds = parseInt(pseconds) - parseInt(hh) * 3600;

    if (parseInt(hh) < 10) {
      hh = '0' + hh;
    }

    if (parseInt(hh) >= 24) {
      hh = '00';
    }

    //得到分钟
    mm = (parseInt(pseconds) / 60) | 0;

    //得到秒
    ss = parseInt(pseconds) - parseInt(mm) * 60;

    if (parseInt(mm) < 10) {
      mm = '0' + mm;
    }

    if (parseInt(ss) < 10) {
      ss = '0' + ss;
    }

    return hh + ':' + mm + ':' + ss;
  },

  getTodayDate: () => {
    let now = new Date();
    let yy = now.getFullYear();
    let mm = now.getMonth() + 1;
    let dd = now.getDate();
    let day = new Array();
    day[0] = '星期日';
    day[1] = '星期一';
    day[2] = '星期二';
    day[3] = '星期三';
    day[4] = '星期四';
    day[5] = '星期五';
    day[6] = '星期六';
    return yy + '年' + mm + '月' + dd + '日 ' + day[now.getDay()];
  },
};

export {formatTime};
