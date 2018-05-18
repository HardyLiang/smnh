Page({
  data: {
  
  },

  onLoad: function (options) {
  
  },
  // 下一步
  nextRegister: function (e) {
    wx.navigateTo({
      url: `../register_license/register_license`
    })
  },
})