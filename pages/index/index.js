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
        // {
        //   'icon': '../images/ic_main_farmer_shop.png',
        //   'text': '我的店铺',
        //   'url': 'my_shop'
        // },
        // {
        //   'icon': '../images/ic_main_my_income.png',
        //   'text': '我的收入',
        //   'url': 'my_income'
        // },
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
    // app.func.getAgreementMessageList(pageIndex,function(message,res){
    //   if(res){
    //     console.log("获取消息成功");
    //     console.log(res);
    //     var list =res.data;
    //     that.setData({
    //       msgList:list
    //     })
    //     wx.setStorageSync(common.CC_MESSAGELIST, res.data);
    //   }
    // })
    
   
  },
  onShow:function(){   
    event.on(event.kLoginSuccessEventName, this, function (data) {
      console.log("我去我收到信息了");
      var name = wx.getStorageSync("userName");
      var farmerId = wx.getStorageSync('farmerId');
      console.log("farmerId=" + farmerId);
      //联网刷新数据
      app.func.getPersonMsg(function (message, res) {
        console.log(res)
        if (!res) {
          wx.showToast({
            title: message,
            icon: "none"
          })
        }
        console.log()
        
        //保存个人信息列表
        wx.setStorageSync(common.CC_MOBILE, res.data.store_information.store_telephone);
        wx.setStorageSync(common.CC_STORE_URL, res.data.store_information.store_url);
        wx.setStorageSync(common.CC_BAND_STATUS, res.data.store_information.farmer_idcard_status);
        var storeStatus = res.data.store_information.store_status;
        var storeAll = res.data.store_information.store_all
        setTimeout(function () {
          if (storeStatus != "15") {
            var message = "店铺异常,请联系客服！";
            if (storeStatus == "20") {
              message = "违规关店,请联系客服!"
              wx.showModal({
                title: '注意',
                content: message,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    //店铺违规了。。应该做神马东西
                  }
                }
              })
            } else
              if (storeStatus == "10" || storeStatus == "11") {
                if (storeAll && storeStatus != "11") {
                  message = "店铺待审核,请耐心等待"
                } else
                  if (storeAll && storeStatus == "11") {
                    message = "店铺审核失败，请重新上传相关信息！"
                  } else {
                    message = "请上传相关证件审核以激活店铺"
                  }
                wx.showModal({
                  title: '注意',
                  content: message,
                  cancelText: "上传执照",
                  confirmText: "上传证件",
                  success: function (res) {
                    if (res.confirm) {//跳转上传身份证
                      wx.navigateTo({
                        url: '../page/auth/company_idCard/company_idCard?type=modify',
                      })
                    } else
                      if (res.cancel) {//跳转上传营业执照
                        wx.navigateTo({
                          url: '../page/auth/company_license/company_license?type=modify',
                        })
                      }
                  }
                })
              }

          }
        }, 2000);

      });

    })
  },
  hrefLink: function (e) {
    console.log(e);
    var url = e.currentTarget.dataset.id;
    if (!util.checkIsLogin('../page/auth/login/login')) {
      return;
    }
    wx.navigateTo({
      url: `../page/${url}/${url}`
    })
  },
  onUnload:function(e){
    event.remove(event.kLoginSuccessEventName, this);
  }
 





})
