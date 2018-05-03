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
    btnValue:"登录农户账户"
  
  },
  onLoad: function (options) {
    console.log('user===onLoad');
    
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
      app.func.getPersonMsg(farmerId,function(message,res){
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
          imgValue: res.data.picPath,
          mobileValue: res.data.mobile,
          userNameValue: res.data.name,
          shipValue: '描述：' +res.data.shipEvaluate ,
          serviceValue: '服务：' + res.data.serviceEvaluate,
          storeValue: '发货：' + res.data.storeEvaluate,
          btnFlag:true,
          btnValue:"注销登录"
        })
        //保存个人信息列表
        wx.setStorageSync(common.CC_MOBILE, res.data.mobile)
        wx.setStorageSync(common.CC_FARMERINFO, res)
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
   
  }
})