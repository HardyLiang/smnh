var common = require('../../../utils/common.js');
var util = require('../../../utils/util.js');
var app = getApp();
Page({
  data: {
    idCard: "",
    mobile: "",
    vercode: "",
    second: 60,
    selected: false,
    selected1: true,
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

  /**
   * 获取验证码
   */
  getphone: function () {
    var that = this;
    console.log(this.data.idCard);
    console.log(this.data.mobile);
    //先检测身份证等信息是否为空
    if (util.trim(this.data.idCard) == "") {
      wx.showToast({
        title: '身份证为空',
        icon: 'none'
      })
    }
    //联网获取数据

  },

  /**
 * 提交表单
 */
  bindSubmit: function (e) {
    console.log(e.detail.value);
    var idCard = e.detail.value.idCard;
    var password = e.detail.value.password;
    var mobile = e.detail.value.mobile;
    var verCode = e.detail.value.vercode;
    //检测用户输入值情况
    if (idCard == null || util.trim(idCard) == "") {
      wx.showToast({
        title: '请输入身份证！',
        icon: 'none'
      })
      return;
    }
    if (password == null || util.trim(password) == "") {
      wx.showToast({
        title: '请输入密码！',
        icon: 'none'
      })
      return;
    }
    if (verCode == null || util.trim(verCode) == "") {
      wx.showToast({
        title: '请输入验证码！',
        icon: 'none'
      })
      return;
    }
    if (password != this.data.password) {
      wx.showToast({
        title: '请输入正确的密码！',
        icon: 'none'
      })
      return;
    }
    if (verCode != this.data.vercode) {
      wx.showToast({
        title: '请输入正确的验证码！',
        icon: 'none'
      })
      return;
    }
    //联网获取

  },
})

/**
 * 公用方法 获取验证码倒计时
 */
function countdown(that) {
  var second = that.data.second;
  if (second == 0) {
    // console.log("Time Out...");
    that.setData({
      selected: false,
      selected1: true,
      second: 60,
    });
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }
    , 1000)
}