var common = require('../../../utils/common.js');
var util = require('../../../utils/util.js');
var app = getApp();
Page({
  data: {
    imgValue:"",
    mobile: "",
    idCard: "",
    vercode: "",
    second: 60,
    selected: false,
    selected1: true,
    // dialogViewHiddlen: false,
    // dialogTitle: "",
    // dialogContent: "",
    encryptedData:"",
    iv:"",
    session_key:'',
    nickName:"",
    storeName:"",
    isShowBand:false,
    bandTime:"",
    vrcode:""//保存用户输入地vrCode
  },
  onLoad: function (options) {
    //进入这个页面，我们会获取用户的openID，身份证，手机
    var openID = wx.getStorageSync(common.CC_OPENID);
    var farmerInfo = wx.getStorageSync(common.CC_FARMERINFO);
    var storeName = farmerInfo.data.store_information.store_name;
    var bandTime = farmerInfo.data.store_information.farmer_idcard_date;
    var imgUrl = wx.getStorageSync(common.CC_HEAD_IMG);
    var openID = wx.getStorageSync(common.CC_OPENID);
    var userName = wx.getStorageSync(common.CC_NICK_NAME);
    var encryData=wx.getStorageSync(common.CC_ENCRY_KEY);
    var ivData = wx.getStorageSync(common.CC_IV_KEY); 
    var sessionKey = wx.getStorageSync(common.CC_SESSION_KEY);
    var userMobile = wx.getStorageSync(common.CC_MOBILE);
    var userIdCard = getApp().globalData.idCard;
    if(userIdCard==""){
      userIdCard = farmerInfo.data.user_information.sCard;
    }
    

    console.log(farmerInfo)
    var isBand = wx.getStorageSync(common.CC_BAND_STATUS);
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
      isShowBand:isBand,
      idCard:userIdCard,
      bandTime:bandTime
    })
   
  },
  /**
     * 生命周期函数--监听页面初次渲染完成
     */
  onReady: function () {
    //获得dialog组件
    // this.dialog = this.selectComponent("#dialog");

  },
  /**
   * 获取验证码
   */
  getphone: function () {
    var that = this;
    //联网获取数据
    app.func.fotgetPass(that.data.idCard, that.data.mobile, function (message, res) {
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
        vercode: verCode
      })
    })

    

  },

  /**
 * 提交表单
 */
  bindSubmit: function (e) {
    var that =this;
    console.log(e.detail.value);
    var verCode = e.detail.value.vercode;
    //检测用户输入值情况
    if (verCode == null || util.trim(verCode) == "") {
      wx.showToast({
        title: '请输入验证码！',
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
            var isBand = wx.setStorageSync(common.CC_BAND_STATUS, true);
            that.setData({
              isShowBand:true
            })
          }
        })
      }
    });
  },
  modifyVrCode:function(e){
    var content =e.detail.value;
    if(content!=null){
      this.setData({
        vrcode: content
      })
    }

  },

// 解绑微信
  unbindBtn: function (e) {
  var that =this;
   console.log(111);
   console.log(e.detail.value);
   var verCode = this.data.vrcode;
    //检测用户输入值情况
    if (verCode == null || util.trim(verCode) == "") {
      wx.showToast({
        title: '请输入验证码！',
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
             var isBand = wx.setStorageSync(common.CC_BAND_STATUS, false);
             that.setData({
               isShowBand: false
             })
           }
         }
       })
     }
   });
  },
  // //弹出窗取消事件
  // _cancelEvent() {
  //   console.log('你点击了取消');
  //   this.dialog.hideDialog();
  // },
//   //弹出窗确认事件
//   _confirmEvent(e) {
//     console.log('你点击了确定');
//     this.dialog.hideDialog();
//     //获取用户输入的值
//     var content = wx.getStorageSync("dialogContent");
//     console.log("获取用户输入" + content);
//   }
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