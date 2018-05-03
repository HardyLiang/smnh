//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js')
var event = require('../../utils/event.js')
var common =require('../../utils/common.js')
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
    app.func.getAgreementMessageList(function(message,res){
      if(res){
        console.log("获取消息成功");
        console.log(res);
        var list =res.data;
        that.setData({
          msgList:list
        })
      }
    })
    this.checkUserData();
    
   
  },
  onShow:function(){
    var that =this;
    event.on(event.kLoginSuccessEventName, this, function (data) {
      console.log("我去主页我收到信息了");
      //页面没有消失，但是我们这边已经收到消息了，所以要加延迟，要不然会出现问题
      setTimeout(function () {
        that.checkUserData();
      },1500)
    
       
    })
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
  /**
   * 
   * 主页检测用户数据
   */
  checkUserData: function(){
    //如果有登录信息就直接获取店铺状态
    if ("" != util.trim(getApp().globalData.userName) && "" != util.trim(getApp().globalData.idCard)) {
      app.func.getStoreStatusByCard(getApp().globalData.idCard, function (message, res) {
        console.log("获取店铺状态");
        console.log(res);
        if (!res) {
          wx.showModal({
            title: '提示',
            content: message,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                //点击确认
              }
            }
          })
        }else{
          //检测用户是否进行了微信绑定
          app.func.checkWXBoundStatus(getApp().globalData.idCard,function(message,res){
           console.log("微信"+message);
           console.log(res);
           var openId = res.data.openId;
           wx.setStorageSync(common.CC_WEIXININFO, res);
           if(""==openId){
            wx.showModal({
              title: '提示',
              content: '微信未绑定！',
              confirmText:'去绑定',
              success:function(res){
                if (res.confirm) {
                  //点击确认
                wx.navigateTo({
                  url: '../page/wechat_bind/wechat_bind',
                })
                }
              }
            })
          }
          });

        }

      });



    }

  }






})
