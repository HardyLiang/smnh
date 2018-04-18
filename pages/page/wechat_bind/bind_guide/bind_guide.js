Page({
  data: {
    winHeight: 0,
    imgUrls: [
      {
        text: '打开微信扫一扫',
        imgs: '../../../images/bg_wei_xin_help_two.png'
      },
      {
        text: '识别二维码',
        imgs: '../../../images/bg_wei_xin_help_three.png'
      },
      {
        text: '进入实名商城',
        imgs: '../../../images/bg_wei_xin_help_four.png'
      },
      {
        text: '点击进入我的页面',
        imgs: '../../../images/bg_wei_xin_help_five.png'
      },
      {
        text: '点击进入农户认证',
        imgs: '../../../images/bg_wei_xin_help_six.png'
      },
      {
        text: '按要求填写信息',
        imgs: '../../../images/bg_wei_xin_help_seven.png'
      },
      {
        text: '绑定成功',
        imgs: '../../../images/bg_wei_xin_help_eight.png'
      },
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  onLoad: function () {
    // 获取屏幕高度
    var winHeight = 0;
    wx.getSystemInfo({
      success: function (res) {
        winHeight = res.windowHeight
      }
    })
    this.setData({
      winHeight: winHeight
    })
  },
})