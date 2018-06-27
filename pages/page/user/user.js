var event =require('../../../utils/event.js')
var app =getApp();
var util=require('../../../utils/util.js')
var common =require('../../../utils/common.js')
Page({
  data: {
    imgValue:"../../images/ic_web_center.png",
    mobileValue:'暂无电话',
    userNameValue:'昵称',
    shipValue:'描述：5.0',
    serviceValue:'服务：5.0',
    storeValue:'发货：5.0',
    btnFlag:false,
    btnValue:"登录农户账户",
  
  },
  onLoad: function (option) {
    console.log('user===onLoad');
    let { avatar } = option
    if (avatar) {
      this.setData({
        src: avatar
      })
    }

 
  },
  onShow: function (options) {
    console.log('user=====onShow');
    var that =this ;
    event.on(event.kLoginSuccessEventName, this, function (data) {
      console.log("我去我收到信息了");
      var name =wx.getStorageSync("userName");
      var farmerId =wx.getStorageSync('farmerId');
      console.log("farmerId=" + farmerId);
      //联网刷新数据
      app.func.getPersonMsg(function(message,res){
        console.log(res)
        if (!res){
          wx.showToast({
            title: message,
            icon:"none"
          })
        }
        console.log()
        //获取信息成功.给页面赋值
        that.setData({
          imgValue: res.data.store_logo,
          mobileValue: res.data.store_telephone,
          userNameValue: res.data.store_name,
          shipValue: '描述：' + res.data.descriptionEvaluate ,
          serviceValue: '服务：' + res.data.serviceEvaluate,
          storeValue: '发货：' + res.data.shipEvaluate,
          btnFlag:true,
          btnValue:"注销登录"
        })
        //保存个人信息列表
        wx.setStorageSync(common.CC_MOBILE, res.data.mobile);
        wx.setStorageSync(common.CC_FARMERINFO, res);
        wx.setStorageSync(common.CC_STORE_URL, res.data.store_url);
        var storeStatus= res.data.store_status;
        setTimeout(function(){
          if (storeStatus != "15") {
            var message = "店铺异常,请联系客服！";
            if (storeStatus == "20") {
              message = "违规关店,请联系客服!"
            } else
              if (storeStatus == "10") {
                message = "店铺待审核,请联系客服"
              }
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
          }
        },2000);
       
      });
    })
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
    event.remove(event.kLoginSuccessEventName,this);
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
        shipValue: '描述：5.0',
        serviceValue: '服务：5.0',
        storeValue: '发货：5.0',
        btnFlag: false,
        btnValue: "登录农户账户"
      })
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
   * 
   */
  uploadImg:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]

        wx.navigateTo({
          url: `../upload/upload?src=${src}`
        })
      }
    })
  }
 
  
 
})