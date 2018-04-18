Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  LoginTap:function(){
    wx.navigateTo({
      url: "../auth/login/login"
    })
  }
})