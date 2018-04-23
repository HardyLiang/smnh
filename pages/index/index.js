//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '../images/img_main_auto_0.png',
      '../images/img_main_auto_1.png',
      '../images/img_main_auto_2.png'
    ], 
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indexmenu: [],
 
  },
  fetchData: function () {
    this.setData({
      indexmenu: [
        {
          'icon': '../images/ic_main_release_products.png',
          'text': '产品发布',
          'url': 'product_publish'
        },
        {
          'icon': '../images/ic_main_order_delivery.png',
          'text': '我的订单',
          'url': 'my_order'
        },
        {
          'icon': '../images/ic_main_farmer_shop.png',
          'text': '我的店铺',
          'url': 'my_shop'
        },
        {
          'icon': '../images/ic_main_my_income.png',
          'text': '我的收入',
          'url': 'my_income'
        },
        {
          'icon': '../images/ic_main_info_edit.png',
          'text': '我的信息',
          'url': 'info_list'
        },
        {
          'icon': '../images/ic_main_wei_xin.png',
          'text': '微信绑定',
          'url': 'wechat_bind'
        }
      ]
      
    })
  },
  onLoad: function () {
    this.fetchData();
    // console.log(url);
  //  我的消息列表
    this.setData({
      msgList: [
        { url: "url", title: "这里是测试公告点击" },
        { url: "url", title: "撒的开发急啊是快点发就332222222" },
        { url: "url", title: "公告哈 点击加了收快递费静安寺开发就是" }]
    });
  },
  hrefLink: function (e) {
      console.log(e);
      var url = e.currentTarget.dataset.id;
      if (!util.checkIsLogin()) {
        return;
      }
    wx.navigateTo({
      url: `../page/${url}/${url}`
    })
  }
 
})
