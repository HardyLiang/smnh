// pages/page/auth/forget/forget.js

var util = require('../../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icCardValue: '',
    mobile: "",
    vercode:"",
    second: 60,
    selected: false,
    selected1: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //进入页面首先根据身份证加载我们得手机号码
    //获取身份证
    var idCard = wx.getStorageSync('idCard')
    console.log(idCard);
    //给页面赋值
    this.setData({
      icCardValue: idCard
    })
    //联网获取手机号
    getApp().func.checkMobileByCard(idCard, function (message, res) {
      console.log(res);
      if (!res) {
        wx.showToast({
          title: message,
          icon: 'none'
        })
        return;
      }
      //给页面手机号赋值
      that.setData({
        mobile: res.data
      });
      console.log(res.data);
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取验证码
   */
  getphone: function () {
    var that = this;
    console.log(this.data.icCardValue);
    console.log(this.data.mobile);
    //先检测身份证等信息是否为空
    if (util.trim(this.data.icCardValue) == "") {
      wx.showToast({
        title: '身份证为空',
        icon: 'none'
      })
    }
    if (util.trim(this.data.mobile) == "") {
      wx.showToast({
        title: '手机号为空',
        icon: 'none'
      })
    }
    //联网获取数据
    app.func.fotgetPass(this.data.icCardValue, this.data.mobile, function (message, res) {
      console.log(res)
      if (!res) {
        wx.showToast({
          title: message,
          icon: 'none'
        })
        return;
      }
      //设置按钮是否可点
      that.setData({
        selected: true,
        selected1: false,
      });
      countdown(that);
      var verCode = res.data;
      console.log(verCode);
      that.setData({
        vercode:verCode
      })

    });
  },
  //更新密码
  updatePass:function(e){
    //获取用户的输入值
    console.log(e.detail.value);
    var idCard = e.detail.value.idCard;
    var mobile = e.detail.value.mobile;
    var verCode = e.detail.value.vercode;
    var newPass = e.detail.value.newPass;
    var confirmPass = e.detail.value.confirmPass;
    console.log('idCard='+idCard+"verCode=" + verCode + "newPass=" + newPass + "confirmPass=" + confirmPass);
    //检测用户输入值情况
    if (idCard==null||util.trim(idCard)=="") {
      wx.showToast({
        title: '请输入身份证！',
        icon:'none'
      })
      return;
    }
    if (mobile==null||util.trim(mobile)=="") {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return;
    }
    if (verCode==null||util.trim(verCode)==""){
      wx.showToast({
        title: '请输入验证码！',
        icon: 'none'
      })
      return;
    }
    if (newPass==null||util.trim(newPass)=="") {
      wx.showToast({
        title: '请输入新密码！',
        icon: 'none'
      })
      return;
    }
    if (confirmPass==null||util.trim(confirmPass)=="") {
      wx.showToast({
        title: '请再次输入新密码！',
        icon: 'none'
      })
      return;
    }
    if (newPass!=confirmPass) {
      wx.showToast({
        title: '两次输入的密码不一致！',
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
    //联网更新密码
    app.func.updatePassword(idCard,newPass,mobile,verCode,function(message,res){
      //判断返回的信息
      if(!res){
        wx.showToast({
          title: message,
          icon:"none"
        })
        return;
      }else{
        //正常修改；
        wx.showToast({
          title: message,
          icon: "success",
          duration: 1000,
          success: function () {
            //延迟1秒跳转,跳转回主页
            setTimeout(function () {
              wx.navigateBack({ 
              })
            }, 1000);
        }});
      }
    



    });

  }


})
/**
 * 
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