var event =require('../../../utils/event.js')
var app =getApp();
var util=require('../../../utils/util.js')
var common =require('../../../utils/common.js')
Page({
  data: {
    imgValue:"../../images/ic_web_center.png",
    mobileValue:'暂无电话',
    userNameValue:'暂无店铺名称',
    shipValue:'描述：5.0 分',
    serviceValue:'服务：5.0 分',
    storeValue:'发货：5.0 分',
    btnFlag:false,
    btnValue:"登录农户账户",
    cropBack: "headImgBack",//这个是设置裁剪返回的消息名称，可自定义，但是要唯一；
  },
  onLoad: function (option) {
    console.log('user===onLoad');
    let { avatar } = option
    if (avatar) {
      this.setData({
        src: avatar
      })
    }
    //获取信息
    this.updateData();
 
  },
  onShow: function (options) {
    console.log('user=====onShow');
    var that =this ;
    this.updateData();
    //收到剪切返回
    event.on(this.data.cropBack, this, function (data) {
      console.log("我收到裁剪图片啦" + data);
      var imgUrl=data;
      //联网修改图片
      getApp().func.upLoadPicture('', common.CC_UPLOAD_STATUS_HEAD, imgUrl, "", "",function (message, res) {
        console.log(res)
        if (!res) {
          wx.showModal({
            title: '提示',
            content: message,
            showCancel: false
          })
        } else {
          wx.showToast({
            title: message,
          })
          that.setData({
            imgValue:res.url
          })
          var info = wx.getStorageSync(common.CC_FARMERINFO)
          info.data.store_information.store_logo = res.url
          wx.setStorageSync(common.CC_FARMERINFO, info);
        }
      });
    });
  
  },
  onReady: function (options) {
    console.log('user=====onReady');
  },
  onHide: function (options) {
    console.log('user=====onHide');
  }, 
  onUnload:function(options) {
    console.log('user=====onUnload');
    //页面销毁清除页面event接收事件
    event.remove(this.data.cropBack, this)
  }, 
  LoginTap:function(){
    if (this.data.btnFlag){
      //注销用户
      //首先清楚缓存
      util.clearStorageData();
      //清空页面信息
      this.setData({
        imgValue: "../../images/ic_web_center.png",
        mobileValue: '暂无电话',
        userNameValue: '昵称',
        shipValue: '描述：5.0 分',
        serviceValue: '服务：5.0 分',
        storeValue: '发货：5.0 分',
        btnFlag: false,
        btnValue: "登录农户账户"
      })
      wx.setStorageSync(common.CC_LOGIN_USERNAME, "");
      wx.setStorageSync(common.CC_LOGIN_PASS, "");
      //跳转登录页面
      wx.navigateTo({
        url: "../auth/login/login"
      })
    }else{
      //跳转登录
       wx.navigateTo({
        url: "../auth/login/login"
      })
    }
   
  },
  /**
   * 进入个人信息
   */
  InInfoList:function(){
    if (!util.checkIsLogin('../../page/auth/login/login')) {
      return;
    }
    wx.navigateTo({
      url: "../info_list/info_list"
    })
  },
  /**
   * 修改头像
   */
  uploadImg:function(){
    if (!util.checkIsLogin('../../page/auth/login/login')) {
      return;
    }
    var that =this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        wx.navigateTo({
          url: `../upload/upload?src=${src}&cropBack=` + that.data.cropBack
        })
      }
    })
  },
  updateData:function(){
    if ("" != getApp().globalData.userName || "" != getApp().globalData.idCard) {
      console.log("已登录")
      var res = wx.getStorageSync(common.CC_FARMERINFO);
      if (res != null) {
        //获取信息成功.给页面赋值
        this.setData({
          imgValue: res.data.store_information.store_logo,
          mobileValue: res.data.store_information.store_telephone,
          userNameValue: res.data.store_information.store_name,
          shipValue: '描述：' + res.data.store_information.descriptionEvaluate +" 分",
          serviceValue: '服务：' + res.data.store_information.serviceEvaluate + " 分",
          storeValue: '发货：' + res.data.store_information.shipEvaluate + " 分",
          btnFlag: true,
          btnValue: "注销登录"
        })
      }
    }
  }

})