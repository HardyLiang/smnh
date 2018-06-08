var common =require('../../../../utils/common.js');
var event =require('../../../../utils/event.js') ;
Page({
  data: {
    index: 0,
    stroeType: ['个人店铺', '企业店铺', '县域家乡'],
    imgValue:"",
    storeName:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  stroeTypeChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    getApp().globalData.userRegister[common.CC_SHOP_TYPE] = this.data.stroeType[this.data.index];
  },
  nextRegister: function (e) {
    
    if (this.data.storeName==""){
      wx.showModal({
        title: '提示',
        content: '请输入店铺名称',
        showCancel:false
      });
      return;

    }
    wx.navigateTo({
      url: `../register_company/register_company`
    })
  },

  onLoad: function (options) {
    var  that =this;
    //给注册信息设置默认值；
    getApp().globalData.userRegister[common.CC_SHOP_TYPE] = this.data.stroeType[this.data.index];

    //首先获取用户的头像等信息
    wx.login({
      success:function(res){
        console.log("登录+"+res.code)
        if(res.code){
          wx.getUserInfo({
            success:function(resUser){
              console.log(resUser)
              that.setData({
                imgValue:resUser.userInfo.avatarUrl
              })
              getApp().globalData.userRegister[common.CC_HEAD_IMG] = resUser.userInfo.avatarUrl;
              console.log(getApp().globalData.userRegister)
            },
            fail:function(res){
              console.log("失败"+res)
              wx.showModal({
                title: '警告',
                content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.navigateTo({
                      url: '../authorize/authorize',
                    });}
                }
              })
            },
            complete:function(){

            }

          })
        }
      }
    })

    
  },
  onShow:function(res){
    var that =this;
    event.on(event.KGetUserInfoSuccess,this,function(data){
      console.log(data)
      console.log("授权成功啦");
      that.setData({
        imgValue: data
      })
      getApp().globalData.userRegister[common.CC_HEAD_IMG] = data;
    })
  },
  onUnload:function(){
    //页面销毁清除页面event接收事件
    event.remove(event.KGetUserInfoSuccess, this);
  },
  /**
   * 店铺名称输入改变保存
   */
  bindStoreNameChange:function(e){
    var mStoreName =e.detail.value;
    this.setData({
      storeName: mStoreName
    })
    //保存全局注册参数
    getApp().globalData.userRegister[common.CC_SHOP_NAME] = mStoreName;
  }

})