//app.js
var http = require('utils/reques.js')
var common = require('utils/common.js')
var urlSet =require('utils/urlSet.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that=this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //检测网络是否可用
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        console.log(networkType);
        if (networkType == "none") {
          wx.showModal({
            title: '提示',
            content: '亲，当前网络不可用喔！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              }
            }
          })
        }
      }
    })
    //从缓存上面获取openID 
    var openId = (wx.getStorageSync(common.CC_OPENID))
    console.log("openId==" + openId)
    if (!openId) {//如果没有openId 就联网进行获取
      console.log('没有openID 申请')
      wx.login({
        success: function (res) {
          if (res.code) {
            console.log("成功获取用户信息")
            var appid = urlSet.APPID;
            var secret = urlSet.SECRET;
            that.func.getOpenId(res.code, appid,secret
            ,function(res){
              if(res){
                var openId =res;
                console.log("openId---------" + openId);
                wx.setStorageSync(common.CC_OPENID, openId)
              }else{
                console.log("获取openId失败");
              }
            })
          } 
        },
        fail: function () {
          console.log("没有获取到")
        }
      })
    }

  },
  globalData: {
    userInfo: null,
    userName: "", //农户姓名
    idCard: "",   //农户身份证
    farmerId: ""  //农户id
  },
  func: {
    onLogin: http.onLogin,
    getFPManager: http.getFPManager,
    checkMobileByCard: http.checkMobileByCard,
    fotgetPass: http.fotgetPass,
    updatePassword: http.updatePassword,
    getPersonMsg: http.getPersonMsg,
    getOpenId: http.getOpenId,
    getAgreementMessageList:http.getAgreementMessageList,
    getStoreStatusByCard:http.getStoreStatusByCard,
    checkWXBoundStatus: http.checkWXBoundStatus,
    getSale: http.getSale,
    getSetRec: http.getSetRec,
    getGoodsInfoByCard: http.getGoodsInfoByCard,
    updateShareCommission: http.updateShareCommission,
  }
})