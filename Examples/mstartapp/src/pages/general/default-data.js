export const dataSource = [
  {
    title: 'Main dishes',
    data: [
      {title: '消息推送设置', route: ''},
      {title: '隐私设置', route: ''},
      {
        title: '无门店服务时仍显示附近',
        switchValue: false,
        cellType: 'switch',
      },
      {
        title: 'WLAN环境下自动播放视频',
        switchValue: true,
        cellType: 'switch',
      },
      {title: '截屏弹出分享弹框', switchValue: true, cellType: 'switch'},
      {title: '暗黑模式', route: ''},
      {title: '图片文字识别', switchValue: true, cellType: 'switch'},
      {title: '首页摇一摇', switchValue: true, cellType: 'switch'},
      {title: '网络诊断', route: ''},
      {title: '清除本地缓存', subtitle: '---'},
      {title: '查看沙盒', subtitle: ''},
    ],
  },
  {
    title: 'Drinks',
    data: [{title: '切换站点', route: ''}],
  },
];
