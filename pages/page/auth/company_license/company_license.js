var util=require("../../../../utils/util.js")
var common = require("../../../../utils/common.js");
var app = getApp();
Page({
  data: {
    imageList:[],
  },
  onLoad: function () {
    // 生命周期函数--监听页面加载
  
  },
  // 下一步
  nextUpLoadIdCard: function (e) {
    if (util.checkEmpty(this.data.imageList,'亲，请上传营业执照喔!')){
      return;
    }
    wx.navigateTo({
      url: `../company_idCard/company_idCard`
    })
  },
  // 上传图片
  chooseImage: function () {
    var that = this;
    util.choosePhoto(1,function(res){
      console.log(res)
      that.setData({
        imageList: res
        });
      app.globalData.userRegister[common.CC_BUSINESS_LICENSE] = res[0];
        console.log(app.globalData.userRegister)
    })
    
  },
  // 预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
})
