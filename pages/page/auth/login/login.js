// var api = require('../../../config/api.js');
var util = require('../../../../utils/util.js');
var app = getApp();
Page({
  data: {
    username: '',
    password: '',
    loginErrorCount: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成

  },
<<<<<<< Updated upstream
  startLogin: function () {
    wx.navigateTo({
      url: "../../../index/index"
    })
=======
  startLogin: function (e) {
    console.log(11);
    //获得表单数据
    var objData = e.detail.value;
    console.log(e.detail.value);
    app.func.onLogin("440684198812271518","123456",function(res){
      console.log(res.data);
    })
    
>>>>>>> Stashed changes
  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },

  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  }
  
})