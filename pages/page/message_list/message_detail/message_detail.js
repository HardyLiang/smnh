// pages/page/message_list/message_detail/message_detail.js
var common = require('../../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:"",
    title:"",
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取
    var position =options.id;
     //获取消息数据;
    var detail = wx.getStorageSync(common.CC_MESSAGELIST);
    console.log(detail);
    //给页面赋值；
    this.setData({
      time: detail[position].createTime,
      title: detail[position].title,
      content: detail[position].message
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