Page({
  data: {
    index: 0,
    stroeType: ['个人店铺', '企业店铺', '县域家乡']
  },
  stroeTypeChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  nextRegister: function (e) {
    wx.navigateTo({
      url: `../register_company/register_company`
    })
  },

  onLoad: function (options) {
  
  },

})