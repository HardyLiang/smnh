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
    var card = wx.getStorageSync(common.CC_IDCARD);
    getApp().func.getPersonShopURL(card,function(message,res){
       console.log(res);
       if(!res){
         wx.showModal({
           title: '提示',
           content: message,
           showCancel:false,
           success:function(res){
             if(res.confirm){
               wx.navigateBack();
             }
           }
         })
         return;
       }
       //成功给URL赋值
       that.setData({
         urlValue: res.data.shopURL,
         title: res.data.storeName
       })
       console.log(that.data.urlValue)
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
    return {
      title: this.data.title,
      desc: '实名农户，为你精选农户直供，安全放心的好产品!',
      path: "../page/my_shop/my_shop"
    }
  }
})