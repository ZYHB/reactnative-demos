export const dataSource = [
  {
    title: 'Drinks',
    data: [
      {
        type: 'userInfo',
        title: '用户信息',
        subtitle: '',
        route: 'UserInfo',
      },
      {title: '地址管理', subtitle: '', route: 'AddressManager'},
      {title: '浏览历史', subtitle: '', route: 'BrowseHistory'},
    ],
  },
  {
    title: 'Drinks',
    data: [
      {title: '账户与安全', subtitle: '账户保障可升级', badge: '1'},
      {title: '设置字体大小', subtitle: '', badge: ''},
      {title: '支付设置', subtitle: '', badge: ''},
      {title: '发票抬头管理', subtitle: '增加增票资质', badge: ''},
      {title: '我的档案', subtitle: '添加设备/宝宝等档案', badge: ''},
      {
        title: '通用',
        subtitle: '清除本地缓存',
        badge: '',
        route: 'General',
      },
      {title: '长辈版', subtitle: '长辈版/标准版', badge: '1'},
    ],
  },
  {
    title: 'Drinks',
    data: [
      {title: 'PLUS会员', subtitle: '每月5张运费券'},
      {title: '家庭号设置', subtitle: '帮我付/快捷聊/亲密卡等'},
      {title: '功能实验室', subtitle: '提前体验新功能'},
      {title: '功能反馈', subtitle: ''},
      {title: '关于APP', subtitle: '', route: 'DeviceInfo'},
      {title: '隐私政策简要版', subtitle: ''},
      {title: '个人信息收集清单', subtitle: '', badge: ''},
      {title: '应用权限说明', subtitle: '', badge: ''},
      {title: '第三方共享个人信息清单', subtitle: '', badge: ''},
    ],
  },
  {
    title: 'Drinks',
    data: [{type: 'logout', title: '退出', subtitle: '每月5张运费券'}],
  },
];
