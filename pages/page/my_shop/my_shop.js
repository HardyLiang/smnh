// pages/page/my_shop/my_shop.js
var common =require("../../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlValue:'',
    title:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
      //首先联网获取农户店铺URL
    var farmerInfo = wx.getStorageSync(common.CC_FARMERINFO);
    var storeUrl = farmerInfo.data.store_information.store_url;
    var storeName = farmerInfo.data.user_information.true_name+"邀请你开店";
    var status = farmerInfo.data.store_information.store_status;
    if (!storeUrl){
      wx.showModal({
        title: '提示',
        content: '获取店铺URL失败',
        showCancel:false,
        success:function(res){
          if(res.confirm){
            wx.navigateBack();
            return;
          }
        }
      })
    }
    var message ='';
    switch (status){
      case 0:
      message="未提交开店申请，无法查看"
      break;
      case 5:
        message = "公司等待信息审核，无法查看"
        break;
      case 6:
        message = "公司信息审核失败，无法查看"
        break;
      case 10:
        message = "店铺等待信息审核，无法查看"
        break;
      case 11:
        message = "店铺审核失败，无法查看"
        break;
      case 15://正常营业
        message = ""
        break;
      case 25:
        message = "店铺到期关闭，无法查看"
        break;
      case 26:
        message = "店铺到期需续费，无法查看"
        break;
        default:
        break;
    }
    if(message!=""){
      wx.showModal({
        title: '提示',
        content: message,
        showCancel:false,
        success:function(res){
          if(res.confirm){
            wx.navigateBack()
          }
        }
      })
      return;
    }
    

       //成功给URL赋值
       that.setData({
         urlValue: storeUrl ,
         title: storeName
       })
       console.log(that.data.urlValue)
       console.log(that.data.title)
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
    return {
      title: this.data.title,
      desc: '实名农户，为你精选农户直供，安全放心的好产品!',
      path: "/pages/page/auth/login/login"
    }
  }
})