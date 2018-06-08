var common =require('../../../utils/common.js')
Page({
  data: {
    messageList:[]
  },
  onMessageDetail: function (e) {
    var position =e.currentTarget.dataset.position;
    wx.navigateTo({
      url: "message_detail/message_detail?id=" + position
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取消息列表
    var list = wx.getStorageSync(common.CC_MESSAGELIST);
    console.log(list);
    //给消息列表赋值
    if(list!=null&&list.length>0){
      this.setData({
        messageList:list
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