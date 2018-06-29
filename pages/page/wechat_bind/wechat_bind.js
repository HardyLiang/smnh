var common = require('../../../utils/common.js');
var util = require('../../../utils/util.js');

var app = getApp();
Page({
  data: {
    imgValue:"",
    mobile: "",
    vercode: "",
    second: 60,
    selected: false,
    selected1: true,
    dialogViewHiddlen: false,
    dialogTitle: "",
    dialogContent: "",
    encryptedData:"",
    iv:"",
    session_key:'',
    nickName:"",
    storeName:"",
    isShowBand:false,
  },
  onLoad: function (options) {
    //进入这个页面，我们会获取用户的openID，身份证，手机
    var openID = wx.getStorageSync(common.CC_OPENID);
    var farmerInfo = wx.getStorageSync(common.CC_FARMERINFO);
    var storeName = farmerInfo.data.store_name;
    var imgUrl = wx.getStorageSync(common.CC_HEAD_IMG);
    var openID = wx.getStorageSync(common.CC_OPENID);
    var userName = wx.getStorageSync(common.CC_NICK_NAME);
    var encryData=wx.getStorageSync(common.CC_ENCRY_KEY);
    var ivData = wx.getStorageSync(common.CC_IV_KEY); 
    var sessionKey = wx.getStorageSync(common.CC_SESSION_KEY);
    var userMobile = wx.getStorageSync(common.CC_MOBILE);

    console.log(farmerInfo)
    var isBand = farmerInfo.data.farmer_idcard_status
    console.log("openID=" + openID + "  userName=" + userName + "  userMobile=" + userMobile
      + "isBand=" + isBand)
    this.setData({
      mobile: userMobile,
      encryptedData: encryData,
      iv: ivData,
      session_key: sessionKey,
      imgValue: imgUrl,
      nickName: userName,
      storeName: storeName,
      isShowBand:isBand
    })
   
  },
  /**
     * 生命周期函数--监听页面初次渲染完成
     */
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");

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
    var that =this;
    console.log(e.detail.value);
    var verCode = e.detail.value.vercode;
    //检测用户输入值情况
    // if (verCode == null || util.trim(verCode) == "") {
    //   wx.showToast({
    //     title: '请输入验证码！',
    //     icon: 'none'
    //   })
    //   return;
    // }
    // if (password != this.data.password) {
    //   wx.showToast({
    //     title: '请输入正确的密码！',
    //     icon: 'none'
    //   })
    //   return;
    // }
    // if (verCode != this.data.vercode) {
    //   wx.showToast({
    //     title: '请输入正确的验证码！',
    //     icon: 'none'
    //   })
    //   return;
    // }
    //联网获取
    getApp().func.bandWX(this.data.encryptedData, this.data.session_key, this.data.iv, function(message,res){
      console.log(res);
      if(!res){
        wx.showModal({
          title: '提示',
          content: message,
          showCancel:false,
          success:function(res){
          }
        })
      }else{
        wx.showModal({
          title: '提示',
          content: message,
          showCancel: false,
          success: function (res) {
            //更新页面
            that.setData({
              isShowBand:true
            })
          }
        })
      }
    });
  },

// 解绑微信
  unbindBtn: function (e) {
    var that =this;
   console.log(111);
   this.setData({
     dialogTitle: "输入收到的验证码",
     dialogContent: "111",
   })
   this.dialog.showDialog();
   //联网解绑
   getApp().func.unBandWX(function(message,res){
     console.log(res)
     if(!res){
       wx.showModal({
         title: '提示',
         content: message,
         showCancel:false
       })
     }else{
       wx.showModal({
         title: '提示',
         content: message,
         showCancel: false,
         success:function(res){
           if(res.confirm){
             //解绑成功；显示绑定页面
             that.setData({
               isShowBand: false
             })
           }
         }
       })
     }
   });
  },
  //弹出窗取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //弹出窗确认事件
  _confirmEvent(e) {
    console.log('你点击了确定');
    this.dialog.hideDialog();
    //获取用户输入的值
    var content = wx.getStorageSync("dialogContent");
    console.log("获取用户输入" + content);
  }
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