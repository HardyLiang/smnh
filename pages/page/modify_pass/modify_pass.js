var util = require('../../../utils/util.js');
var common = require('../../../utils/common.js');
var event = require('../../../utils/event.js');
var md5 =require('../../../utils/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icCardValue:"",
    passTips:"",
    isOldPassCorrent:true,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    //进入首先获取身份证
    var info = wx.getStorageSync(common.CC_FARMERINFO);
    var idCard =info.data.user_information.sCard;
    console.log(idCard)
    if(idCard!=null){
      this.setData({
        icCardValue:idCard
      })
    }
  
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
  
  /**
   * 检测密码是否正确
   */
  },
  checkPass:function(e){
    var that =this;
    var content =e.detail.value;
    //联网检测密码是否正常
    console.log(content)
    if(content!=null&&content!=""){
      wx.showLoading()
      getApp().func.modifyPass(content,function(message,res){
        wx.hideLoading();
        console.log(message)
        if(!res){
          that.setData({
            passTips:message,
            isOldPassCorrent:false
          })
        }else{
          that.setData({
            passTips: message,
            isOldPassCorrent: true
          })
        }

      })
      
    }

  },
  /**
   * 更新密码
   */
  updatePass:function(e){
    console.log(e)
    var info =e.detail.value;
    var newPass=info.newPass;
    var confirmPass =info.confirmPass;

    if (!this.data.isOldPassCorrent){
      wx.showModal({
        title: '提示',
        content: '旧密码输入错误',
        showCancel: false
      })
      return;
    }
    if(newPass!=confirmPass){
      wx.showModal({
        title: '提示',
        content: '两次输入的密码不一致',
        showCancel:false
      })
      return;
    }
    //联网更新秘密：
    var md5Pass = md5.hexMD5(newPass)
    var params={
      password: md5Pass
    }
    this.updatePersonMsg(params) 

  },
  updatePersonMsg: function (params) {
    getApp().func.updatePersonMsg(params, function (message, res) {
      console.log(res);
      if (!res) {
        wx.showModal({
          title: '提示',
          content: message,
          showCancel: false,
          success: function (res) {
          }
        })
      } else {
        event.emit(event.KModifyPassSuccess,this);
        wx.showModal({
          title: '提示',
          content: message,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
             wx.redirectTo({
               url: '../auth/login/login',
             })
            }
          }
        })
      }
    })
  }
 

 
})