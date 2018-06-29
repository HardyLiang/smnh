//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js')
var event = require('../../utils/event.js')
var common =require('../../utils/common.js')
var pageIndex=1;
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
    var that = this;
    //进来首先是获取系统信息；
    app.func.getAgreementMessageList(pageIndex,function(message,res){
      if(res){
        console.log("获取消息成功");
        console.log(res);
        var list =res.data;
        that.setData({
          msgList:list
        })
        wx.setStorageSync(common.CC_MESSAGELIST, res.data);
      }
    })
    
   
  },
  onShow:function(){   
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
  },
 






})
