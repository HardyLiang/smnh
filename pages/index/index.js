//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js')
var event = require('../../utils/event.js')
var common = require('../../utils/common.js')
var pageIndex = 1;
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
    isReFresh: false,//是否刷新
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
          'icon': '../images/ic_main_info_edit.png',
          'text': '我的信息',
          'url': 'info_list'
        },
        {
          'icon': '../images/ic_main_wei_xin.png',
          'text': '微信绑定',
          'url': 'wechat_bind'
         },
         {
          'icon': '../images/ic_main_my_income.png',
          'text': '我的收入',
          'url': 'my_income'
        }
      ]

    })
  },
  onLoad: function () {
    this.fetchData();
    var that = this;
    var userName = wx.getStorageSync(common.CC_LOGIN_USERNAME);
    var pass = wx.getStorageSync(common.CC_LOGIN_PASS);

    if (userName != null && userName != "") {
      this.getLogin(userName, pass)
    }

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
  onShow: function () {
    var that = this;
    event.on(event.kLoginSuccessEventName, this, function (data) {
      console.log("我去我收到信息了");
      var name = wx.getStorageSync("userName");
      var farmerId = wx.getStorageSync('farmerId');
      console.log("farmerId=" + farmerId);
      //联网刷新数据
      this.getPersonMsg();

    })
  },
  hrefLink: function (e) {
    console.log(e);
    var url = e.currentTarget.dataset.id;
    if (!util.checkIsLogin('../page/auth/login/login')) {
      return;
    }
    var typeId = e.currentTarget.dataset.id;
    if (typeId == "product_publish" || typeId == "my_order") {//如果是发布产品与订单的时候还要检测店铺属性
      var info = wx.getStorageSync(common.CC_FARMERINFO);
      if (info.data.store_information.store_status == 10 || info.data.store_information.store_status == 11) {
        wx.showModal({
          title: '提示',
          content: '店铺审核未成功，该功能无法使用！',
          showCancel: false
        })
        return;
      }
    }

    wx.navigateTo({
      url: `../page/${url}/${url}`
    })
  },
  onUnload: function () {
    event.remove(event.kLoginSuccessEventName, this)
  },
  getLogin: function (userName, pass) {
    wx.showLoading({
      title: '自动登录中',
    })
    getApp().func.onLogin(userName, pass, function (messgae, res) {
      //隐藏loading弹窗
      wx.hideLoading()
      //判断是否登录成功；
      var data = res;
      if (!res) {
        wx.showToast({
          title: "自动登录失败！请手动登录！",
          icon: 'none'
        });
        return;
      }
      wx.setStorageSync(common.CC_LOGIN_USERNAME, userName);
      wx.setStorageSync(common.CC_LOGIN_PASS, pass);
      event.emit(event.kLoginSuccessEventName, messgae);
    })
  },

  /**
     * 下拉刷新
     */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    this.setData({
      isReFresh: true
    })
    this.getPersonMsg();
  },
  getPersonMsg: function () {
    var that = this;
    app.func.getPersonMsg(function (message, res) {
      console.log(res)
      if (that.data.isReFresh) {//判断是否刷新操作
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        that.setData({
          isReFresh: false
        })
      }
      if (!res) {
        wx.showToast({
          title: message,
          icon: "none"
        })
      }
      //保存个人信息列表
      wx.setStorageSync(common.CC_MOBILE, res.data.store_information.store_telephone);
      wx.setStorageSync(common.CC_STORE_URL, res.data.store_information.store_url);
      wx.setStorageSync(common.CC_BAND_STATUS, res.data.store_information.farmer_idcard_status);
      var storeStatus = res.data.store_information.store_status;
      var storeAll = res.data.store_information.store_all
      setTimeout(function () {
        if (storeStatus != 15) {
          var message = "店铺异常,请联系客服！";
          if (storeStatus == 20) {
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
            if (storeStatus == 10 || storeStatus == 11
              || storeStatus == 5 || storeStatus == 6
            ) {
              if (storeAll && storeStatus != 10) {
                message = "店铺待审核,请耐心等待"
              } else
                if (storeStatus == 10) {
                  message = "店铺审核中，如需修改，请重新上传相关信息！"
                } else
                  if (storeStatus == 11) {
                    message = "店铺审核失败，请重新上传相关信息！"
                  } else
                    if (storeStatus == 5) {
                      message = "公司等待信息审核，如需修改，请重新上传相关信息！"
                    }
                    else
                      if (storeStatus == 6) {
                        message = "公司信息审核失败，请重新上传相关信息！"
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
                      url: '/pages/page/auth/company_idCard/company_idCard?type=modify',
                    })
                  } else
                    if (res.cancel) {//跳转上传营业执照
                      wx.navigateTo({
                        url: '/pages/page/auth/company_license/company_license?type=modify',
                      })
                    } 
                }
                
              })
            }

        }
      }, 1000);
      //检测店铺头像是不是使用了默认头像，如果是，就给他上传一个本地头像
      if (res.data.store_information.store_logo != null &&
        res.data.store_information.store_logo.indexOf("store.jpg") != -1) {
        var imgUrl = wx.getStorageSync(common.CC_HEAD_IMG);
        if (imgUrl != null) {
          wx.getImageInfo({
            src: imgUrl,
            success: function (res) {
              console.log(res)
              var urlPath = res.path;
              if (urlPath != null) {
                var status = "2";
                getApp().func.upLoadPicture("", status, urlPath, "", "", function (messge, res) {
                  console.log("上传店铺头像成功！")
                  event.emit(event.kLoginSuccessEventName, this);
                })
              }
            }
          })
        }

      }

    });
  }




})
