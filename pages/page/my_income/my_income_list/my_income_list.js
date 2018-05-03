// pages/page/my_income/my_income_list/my_income_list.js
var common =require('../../../../utils/common.js');
var util =require('../../../../utils/util.js');
var app = getApp();
var pageIndex =1;
var pageSize =10;

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //首先获取身份证
   var idCard =wx.getStorageSync(common.CC_IDCARD);
   var beginTime = util.formatTimeFirstDayOfYear(new Date());
   var endTime = util.formatTimeByHorizontal(new Date());
   //获取列表
   this.getSetRec(idCard, this.pageIndex, this.pageSize, beginTime, endTime);
    
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
  
  },

  getSetRec:function(idCard,pageIndex,pageSize,beginTime,endTime){
    var  that =this;
    app.func.getSetRec(idCard, pageSize, pageIndex, beginTime, endTime,
    function(message,pageIndex,res){
      console.log("获取收入列表成功")
      console.log(res);
      that.setData({
        list:res
      })

    });

  }


})