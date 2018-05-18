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
