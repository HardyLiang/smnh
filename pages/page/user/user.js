var event =require('../../../utils/event.js')
var app =getApp();
Page({
  data: {
  
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
        console.log("message=" + message)
        if (!res){
          wx.showToast({
            title: message,
            icon:"none"
          })
        }
        //获取信息成功

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
    event.remove(event.kLoginSuccessEventName,this);
  }, 
  LoginTap:function(){
    wx.navigateTo({
      url: "../auth/login/login"
    })
  }
})