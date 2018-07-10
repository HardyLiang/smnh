var util=require("../../../../utils/util.js")
var common = require("../../../../utils/common.js");
var app = getApp();
Page({
  data: {
    imageList:[],
    imageUploadPath:""
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var status =options.type;
    if (status!=null&&status=="modify"){//修改，先复制
      var farmerInfo = wx.getStorageSync(common.CC_FARMERINFO);
      var storeLicense=farmerInfo.data.store_information.store_license;
      if(storeLicense==null||storeLicense==""){
        storeLicense = wx.getStorageSync(common.CC_BUSINESS_LICENSE);
      }
      var list = this.data.imageList;
      if(storeLicense!=""){
        list[0] = storeLicense;
        this.setData({
          imageList: list
        })
      }
    }
  
  },
  // 下一步
  nextUpLoadIdCard: function (e) {
    var path = this.data.imageUploadPath;
    var status = common.CC_UPLOAD_STATUS_COMMITMENT;
    if (path==null||path==""){
      wx.showModal({
        title: '提示',
        content: '亲，请先选择一张图片喔！',
        showCancel:false
      })
    }else{ 
      getApp().func.upLoadPicture("", status, path, "",function(message,res){
            wx.showModal({
              title: '提示',
              content: message,
              confirmText:"上传证件",
              success:function(res){
                if(res.confirm){
                 wx.navigateTo({
                   url: '../company_idCard/company_idCard',
                 })
                }
              }
            })
            if(res){
              wx.setStorageSync(common.CC_BUSINESS_LICENSE, res);
            }
      })

    }
   
  },
  // 上传图片
  chooseImage: function () {
    var that = this;
    util.choosePhoto(1,function(res){
      console.log(res)
      that.setData({
        imageList: res,
        imageUploadPath: res[0]
        });
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
