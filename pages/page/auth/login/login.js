// var api = require('../../../config/api.js');
var util = require('../../../../utils/util.js');
var app = getApp();
var event =require('../../../../utils/event.js')
var common = require('../../../../utils/common.js')

Page({
  data: {
    username: '',
    usernameHide: true,
    password: '',
    passwordSrc:'../../../images/ic_pass_gray_hide.png',
    passFocus:false,
    passFlag:true,
    loginErrorCount: 0,
    hidden: true,
    typeFlag: 'password'
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成
    var name = wx.getStorageSync(common.CC_LOGIN_USERNAME);
    var pass = wx.getStorageSync(common.CC_LOGIN_PASS);
    if (name!=null&&name!=""){
      this.setData({
        username: name,
        password: pass
      })

    }
   
  },

  startLogin: function (e) {
    var that = this;
    //获得表单数据
    var objData = e.detail.value;
    console.log(e.detail.value);
    var name = objData.username;
    var password = objData.password;
    //检查数据完成性
    if (util.checkNullContent(name, '账号不能为空！')) {
      return;
    }
    if (util.checkNullContent(password, '密码不能为空！')) {
      return;
    }
    //显示loading弹窗
    that.isHideLoading();
    console.log(11);
    //调用登录方法
    app.func.onLogin(name, password, function (messgae, res) {
      //隐藏loading弹窗
      that.isHideLoading();
      //判断是否登录成功；
      var data = res;
      if (!res) {
        wx.showToast({
          title: messgae,
          icon: 'none'
        });
        return;
      }
      wx.setStorageSync(common.CC_LOGIN_USERNAME, name);
      wx.setStorageSync(common.CC_LOGIN_PASS, password);
      wx.showToast({
        title: '登录成功',
        icon: "success",
        duration: 500,
        success: function () {
          event.emit(event.kLoginSuccessEventName, messgae);
          //延迟1秒跳转,跳转回主页
          setTimeout(function () {
            wx.switchTab({
              url: '../../../index/index',
            })
          }, 500);

        }

      })
    })


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
  isHideLoading: function () {
    this.setData({
      hidden: !this.data.hidden
    });
  },

  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: '',
          usernameHide: false
        });
        break;
    }
  },

  changePass: function (e) {
    console.log("changePass")
    if (this.data.passFlag) {
      this.setData({
        passFlag: false,
        passFocus:true,
        typeFlag: 'text',
        passwordSrc: '../../../images/ic_pass_gray_show.png'
      });
    } else {
      this.setData({
        passFlag: true,
        passFocus: true,
        typeFlag: 'password',
        passwordSrc: '../../../images/ic_pass_gray_hide.png'
      });
    }

  },
  bindChange: function (e) {
    console.log("-----------")
    console.log(e.detail.value)
    wx.setStorageSync("username", e.detail.value)
   
    if (e.detail.value){
      this.setData({
        usernameHide: true
      })
    }else{
      this.setData({
        usernameHide: false
      })
    }

  }

})