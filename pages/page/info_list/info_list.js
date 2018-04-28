// pages/page/info_list/info_list.js

var common = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrlValue: "",
    name: "",
    sex: "",
    farmerType: "",
    mobile: "",
    idCard: "",
    bankNum: "",
    bankName: "",
    bankAccount: "",
    bankType: "",
    bankAddress: "",
    detailAddress: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户的个人信息，首先获取本地缓存数据
    var res = wx.getStorageSync(common.CC_FARMERINFO);
    var sex;
    if (res.data.sex == "1") {
      sex = "男";
    } else {
      sex = "女"
    }
    var bankType;
    if (res.data.priorpub == "B") {
      bankType = "公司账户"
    } else
      if (res.data.priorpub == "C") {
        bankType = "个人账户"
      }
    var personType;
    if (res.data.personType == "2") {
      personType = "普通"
    } else
      if (res.data.personType == "1") {
        personType = "贫困"
      }

    this.setData({
      imgUrlValue: res.data.picPath,
      name: res.data.name,
      sex: sex,
      farmerType: personType,
      mobile: res.data.mobile,
      idCard: res.data.idCard,
      bankNum: res.data.bankNumber,
      bankName: res.data.bankName,
      bankAccount: res.data.accountName,
      bankType: bankType,
      bankAddress: res.data.bankAddressName,
      detailAddress: res.data.sendAddressName
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