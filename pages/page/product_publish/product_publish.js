// pages/page/proudct_publish/product_publish.js
var common =require('../../../utils/common.js')
var util =require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrlValue:"",
    name:"",
    mobile:"",
    idCard:"",
    descriptionEvaluate:"",
    serviceEvaluate:"",
    shipEvaluate:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户的个人信息，首先获取本地缓存数据
    var res = wx.getStorageSync(common.CC_FARMERINFO);
    var idCard = util.hideIdCardMiddle(res.data.idCard);
    this.setData({
      imgUrlValue: res.data.picPath,
      name: res.data.name,
      mobile: res.data.mobile,
      idCard: idCard,
      descriptionEvaluate: res.data.descriptionEvaluate,
      serviceEvaluate: res.data.serviceEvaluate,
      shipEvaluate: res.data.shipEvaluate,
    })
  },
  AddProductTap: function (event) {
    wx.navigateTo({
      url: "../add_product/add_product"
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
  
  }
})