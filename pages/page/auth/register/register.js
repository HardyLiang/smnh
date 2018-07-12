var common =require('../../../../utils/common.js');
var event =require('../../../../utils/event.js') ;
var util= require('../../../../utils/util.js')
Page({
  data: {
    index: 0,
    stroeType: [],
    shopName:"",
    imgValue:"",
    storeName:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    businessCategory:[],//经营类目
    businessCategoryName:"",
    businessCategoryIndex:0,

  },
  stroeTypeChange: function (e) {
    this.setData({
      index: e.detail.value,
      shopName: this.data.stroeType[e.detail.value].gradeName
    })
    getApp().globalData.userRegister[common.CC_SHOP_TYPE] = this.data.stroeType[this.data.index].id;
    console.log(getApp().globalData.userRegister)
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

    console.log("下一步"+this.data.shopName)
    if (this.data.shopName.indexOf("旗舰店")==-1){
      wx.navigateTo({
        url: `../register_person/register_person?type=person`
      })
    }else{
      wx.navigateTo({
        url: `../register_company/register_company`
      })
    }
   
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
              var encryptedData = resUser.encryptedData;//加密数据需要解码
              var iv =resUser.iv;
              // getApp().globalData.userRegister[common.CC_HEAD_IMG] = resUser.userInfo.avatarUrl;
              getApp().globalData.userRegister[common.CC_HEAD_IMG]="";
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
    //获取经营类目
    // getApp().func.getBusinessCategory(function(message,res){
    //   console.log("获取经营类目");
    //   console.log(res);
    //   that.setData({
    //     businessCategory:res,
    //     businessCategoryName: res[0].className
    //   })
    //   getApp().globalData.userRegister[common.CC_BUSINESS_CATEGORY] = that.data.businessCategory[0].id;
    // })
    getApp().globalData.userRegister[common.CC_BUSINESS_CATEGORY] = 1;
    //获取店铺类型
    getApp().func.getStoreTypeList(function(message,res){
      console.log(res)
      that.setData({
        stroeType:res.data
      })
      getApp().globalData.userRegister[common.CC_SHOP_TYPE] = that.data.stroeType[0].id;
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
  },
  /**
   * 店铺名称输入改变保存
   */
  bindStoreNameChange:function(e){
    var that =this;
    var mStoreName =e.detail.value;
    util.checkWorkIsSensitive(mStoreName,function(res){
      if(res){//有敏感词
        that.setData({
          storeName: ""
        })
        //保存全局注册参数
        getApp().globalData.userRegister[common.CC_SHOP_NAME] = "";
      }else{//没有敏感词
        that.setData({
          storeName: mStoreName
        })
        //保存全局注册参数
        getApp().globalData.userRegister[common.CC_SHOP_NAME] = mStoreName;
      }
    })
 
  }, 
  bindStoreNameInput:function(e){
    var content =e.detail.value;
    this.setData({
      storeName: content
    })

  },
  /**
   * 经营类目改变
   */
  businessCategoryChange:function(e){
    console.log("经营类目改变");
    console.log(e);
    var index =e.detail.value;
    this.setData({
      businessCategoryIndex:index,
      businessCategoryName: this.data.businessCategory[this.data.businessCategoryIndex].className
    })
    //保存全局注册参数
    getApp().globalData.userRegister[common.CC_BUSINESS_CATEGORY] = this.data.businessCategory[this.data.businessCategoryIndex].id;
    console.log(getApp().globalData.userRegister)
  }

})