var event =require('../../../utils/event.js')
var app =getApp();
var util=require('../../../utils/util.js')
var common =require('../../../utils/common.js')
Page({
  data: {
    imgValue:"../../images/ic_web_center.png",
    mobileValue:'暂无电话',
    userNameValue:'暂无店铺名称',
    shipValue:'描述：5.0',
    serviceValue:'服务：5.0',
    storeValue:'发货：5.0',
    btnFlag:false,
    btnValue:"登录农户账户",
    cropBack: "headImgBack",//这个是设置裁剪返回的消息名称，可自定义，但是要唯一；
  },
  onLoad: function (option) {
    console.log('user===onLoad');
    let { avatar } = option
    if (avatar) {
      this.setData({
        src: avatar
      })
    }

 
  },
  onShow: function (options) {
    console.log('user=====onShow');
    var that =this ;
    event.on(event.kLoginSuccessEventName, this, function (data) {
      console.log("我去我收到信息了");
      var name =wx.getStorageSync("userName");
      var farmerId =wx.getStorageSync('farmerId');
      console.log("farmerId=" + farmerId);
      //联网刷新数据
      app.func.getPersonMsg(function(message,res){
        console.log(res)
        if (!res){
          wx.showToast({
            title: message,
            icon:"none"
          })
        }
        console.log()
        //获取信息成功.给页面赋值
        that.setData({
          imgValue: res.data.store_information.store_logo,
          mobileValue: res.data.store_information.store_telephone,
          userNameValue: res.data.store_information.store_name,
          shipValue: '描述：' + res.data.store_information.descriptionEvaluate ,
          serviceValue: '服务：' + res.data.store_information.serviceEvaluate,
          storeValue: '发货：' + res.data.store_information.shipEvaluate,
          btnFlag:true,
          btnValue:"注销登录"
        })
        //保存个人信息列表
        wx.setStorageSync(common.CC_MOBILE, res.data.store_information.store_telephone);
        
        wx.setStorageSync(common.CC_STORE_URL, res.data.store_information.store_url);
        wx.setStorageSync(common.CC_BAND_STATUS, res.data.store_information.farmer_idcard_status);
        var storeStatus = res.data.store_information.store_status;
        var storeAll = res.data.store_information.store_all
        setTimeout(function(){
          if (storeStatus != "15") {
            var message = "店铺异常,请联系客服！";
            if (storeStatus == "20") {
              message = "违规关店,请联系客服!"
              wx.showModal({
                title: '注意',
                content: message,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    //店铺违规了。。应该做神马东西
                  }
                }
              })
            } else
              if (storeStatus == "10" || storeStatus == "11") {
                if (storeAll && storeStatus != "11"){
                  message = "店铺待审核,请耐心等待"
                }else
                  if (storeAll && storeStatus == "11"){
                  message = "店铺审核失败，请重新上传相关信息！"
                }else{
                    message ="请上传相关证件审核以激活店铺"
                }
                wx.showModal({
                  title: '注意',
                  content: message,
                  cancelText:"上传执照",
                  confirmText: "上传证件",
                  success: function (res) {
                    if (res.confirm) {//跳转上传身份证
                      wx.navigateTo({
                        url: '../page/auth/company_idCard/company_idCard?type=modify',
                      })
                    }else
                      if (res.cancel){//跳转上传营业执照
                        wx.navigateTo({
                          url: '../page/auth/company_license/company_license?type=modify',
                        })
                    }
                  }
                })
              }
            
          }
        },2000);
       
      });
     
    })
    //收到剪切返回
    event.on(this.data.cropBack, this, function (data) {
      console.log("我收到裁剪图片啦" + data);
      var imgUrl=data;
      //联网修改图片
      getApp().func.upLoadPicture('', common.CC_UPLOAD_STATUS_HEAD, imgUrl,"",function (message, res) {
        console.log(res)
        if (!res) {
          wx.showModal({
            title: '提示',
            content: message,
            showCancel: false
          })
        } else {
          wx.showToast({
            title: message,
          })
          that.setData({
            imgValue:res
          })
        }
      });
      event.remove(that.data.cropBack, that);
    });
  
  },
  onReady: function (options) {
    console.log('user=====onReady');
  },
  onHide: function (options) {
    console.log('user=====onHide');
  }, 
  onUnload:function(options) {
    console.log('user=====onUnload');
    //页面销毁清除页面event接收事件
    event.remove(event.kLoginSuccessEventName,this);
    event.remove(this.data.cropBack, this);
  }, 
  LoginTap:function(){
    if (this.data.btnFlag){
      //注销用户
      //首先清楚缓存
      util.clearStorageData();
      //清空页面信息
      this.setData({
        imgValue: "../../images/ic_web_center.png",
        mobileValue: '暂无电话',
        userNameValue: '昵称',
        shipValue: '描述：5.0',
        serviceValue: '服务：5.0',
        storeValue: '发货：5.0',
        btnFlag: false,
        btnValue: "登录农户账户"
      })
      //跳转登录页面
      wx.navigateTo({
        url: "../auth/login/login"
      })
    }else{
      //跳转登录
       wx.navigateTo({
        url: "../auth/login/login"
      })
    }
   
  },
  /**
   * 进入个人信息
   */
  InInfoList:function(){
    // if (!util.checkIsLogin()) {
    //   return;
    // }
    wx.navigateTo({
      url: "../info_list/info_list"
    })
  },
  /**
   * 修改头像
   */
  uploadImg:function(){
    // if (!util.checkIsLogin()) {
    //   return;
    // }
    var that =this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        wx.navigateTo({
          url: `../upload/upload?src=${src}&cropBack=` + that.data.cropBack
        })
      }
    })
  },

})