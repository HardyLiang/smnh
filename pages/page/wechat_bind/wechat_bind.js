var common=require('../../../utils/common.js')
Page({
  data: {
     idCard:"",
     mobile:"",
  },
  onLoad: function (options) {
    //进入这个页面，我们会获取用户的openID，身份证，手机
    var openID = wx.getStorageSync(common.CC_OPENID);
    var userIdCard = wx.getStorageSync(common.CC_IDCARD);
    var userMobile = wx.getStorageSync(common.CC_MOBILE);
    console.log("openID=" + openID + "  userIdCard=" + userIdCard + "  userMobile=" + userMobile)
    this.setData({
      idCard: userIdCard,
      mobile: userMobile,
    })
      
  },
})