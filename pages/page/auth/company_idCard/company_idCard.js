var util=require('../../../../utils/util.js')
var common =require('../../../../utils/common.js')
var app=getApp();
Page({
  data: {
    imageListZ: [],
    imageListF: [],
    foreImagePath:"",
    backImagePath: ""
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var status = options.type;
    if (status != null && status == "modify") {//修改，先复制
      var farmerInfo = wx.getStorageSync(common.CC_FARMERINFO);
      var fore = farmerInfo.data.store_information.license_legal_idCard_image;
      var back = farmerInfo.data.store_information.license_legal_idCard_image1;
      if (fore == null || fore == "") {
        fore = wx.getStorageSync(common.CC_IDCARD_FRONT);
      }
      if (back == null || back == "") {
        back = wx.getStorageSync(common.CC_IDCARD_BACK);
      }
      var forelist = this.data.imageListZ;
      var backlist = this.data.imageListF;
      if (fore != "") {
        forelist[0] = fore;
        this.setData({
          imageListZ: forelist,
        })
      }
      if (back != "") {
        backlist[0] = back;
        this.setData({
          imageListF: backlist,
        })
      }
    }

  },
  // 下一步
  nextcompanyInfo: function (e) {
    var that =this;
    if (util.checkListEmpty(this.data.foreImagePath,"亲，请上传身份证正面照喔！")){
      return;
    }
    if (util.checkListEmpty(this.data.backImagePath, "亲，请上传身份证反面照喔！")) {
      return;
    }
    var statusFore = common.CC_UPLOAD_STATUS_IDCARD;
    var statusBack = common.CC_UPLOAD_STATUS_IDCARD_BACK;
  
    that.updataFile(statusFore, that.data.foreImagePath, function(res){
      if(res){
        that.updataFile(statusBack, that.data.backImagePath,function(res){
          if(res){
            wx.showModal({
              title: '提示',
              content: '上传成功，是否跳转回首页？',
              success:function(res){
                if(res.confirm){
                  wx.switchTab({
                    url: '../../../../pages/index/index',
                  })
                }
              }
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '上传失败，请重新上传',
              showCancel: false
            })
          }
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '上传失败，请重新上传',
          showCancel:false
        })
      }
    });

  
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
          imageListZ: res.tempFilePaths,
          foreImagePath: res.tempFilePaths[0]
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
          imageListF: res.tempFilePaths,
          backImagePath: res.tempFilePaths[0]
        })
        app.globalData.userRegister[common.CC_IDCARD_BACK] = that.data.imageListF[0];
        console.log(app.globalData.userRegister)
      }
    })
  },
  updataFile:function(status,path,cb){
    getApp().func.upLoadPicture("", status, path,"", function (message, res) {
      if (res) {
        if (status == common.CC_UPLOAD_STATUS_IDCARD){
          wx.setStorageSync(common.CC_IDCARD_FRONT, res);
        }else
          if (status == common.CC_UPLOAD_STATUS_IDCARD_BACK){
            wx.setStorageSync(common.CC_IDCARD_BACK, res);
        }
        return typeof cb == "function" && cb(true)
      }else{
        return typeof cb == "function" && cb(false)
      }
    })

  }
  // 预览图片
  // previewImage: function (e) {
  //   var current = e.target.dataset.src
  //   wx.previewImage({
  //     current: current,
  //     urls: this.data.imageList
  //   })
  // },
})
