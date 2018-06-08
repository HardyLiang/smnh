var util=require('../../../../utils/util.js')
var common =require('../../../../utils/common.js')
var app=getApp();
Page({
  data: {
    imageListZ: [],
    imageListF: [],

  },
  onLoad: function () {
    // 生命周期函数--监听页面加载

  },
  // 下一步
  nextcompanyInfo: function (e) {
    if (util.checkListEmpty(this.data.imageListZ,"亲，请上传身份证正面照喔！")){
      return;
    }
    if (util.checkListEmpty(this.data.imageListF, "亲，请上传身份证反面照喔！")) {
      return;
    }

    wx.navigateTo({
      url: `../company_info/company_info`
    })
  },
  // 上传身份证正面
  chooseImageIdCardZ: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        that.setData({
          imageListZ: res.tempFilePaths
        })
        app.globalData.userRegister[common.CC_IDCARD_FRONT] =that.data.imageListZ[0];
        console.log(app.globalData.userRegister)
      }
    })
  },
  // 上传身份证反面
  chooseImageIdCardF: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        that.setData({
          imageListF: res.tempFilePaths
        })
        app.globalData.userRegister[common.CC_IDCARD_BACK] = that.data.imageListF[0];
        console.log(app.globalData.userRegister)
      }
    })
  },
  // 预览图片
  // previewImage: function (e) {
  //   var current = e.target.dataset.src
  //   wx.previewImage({
  //     current: current,
  //     urls: this.data.imageList
  //   })
  // },
})
