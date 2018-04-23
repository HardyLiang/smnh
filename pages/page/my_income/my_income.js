var util = require('../../../utils/urlSet.js');
var app = getApp();
Page({
  data: {
  },
  onLoad: function (options) {
    this.getIncomeData();
  },
  getIncomeData: function () {
    var that = this;
    var IncomeUrl = util.getSale;
    console.log(IncomeUrl);
    wx.request({ 
      url: IncomeUrl,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({
          data: res.data.result

        })
      },
      fail: function (error) {
        // fail
        // console.log(error)
      }
    })
  },


})