var util=require("../../../../utils/util.js")
var common = require("../../../../utils/common.js");
var event = require("../../../../utils/event.js")
var app = getApp();
Page({
  data: {
    imageList:[],
    imageUploadPath:"",
    tWidth: "",
    tHeight: ""
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
      wx.showLoading()
      getApp().func.upLoadPicture("", status, path, "","",function(message,res){
        
        wx.hideLoading();
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
              wx.setStorageSync(common.CC_BUSINESS_LICENSE, res.url);
              event.emit(event.KInfoModifySuccess,this)
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
        imageList: res.tempFilePaths,
        imageUploadPath: res.tempFilePaths[0]
        });
      if (res.tempFiles[0].size > 2000000) {
        console.log(res.tempFiles[0].size)
        that.drawCanvas(res.tempFilePaths[0])
      }
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
  // 缩放图片
  drawCanvas: function (url) {
    var that = this;
    wx.getImageInfo({
      src: url,
      success: function (res) {
        console.log(res);
        var ctx = wx.createCanvasContext('attendCanvasId');
        var canvasWidth = res.width//原图宽度 
        var canvasHeight = res.height;//原图高度
        console.log("canvasWidth=" + canvasWidth + "canvasHeight=" + canvasHeight)
        var tWidth = 320; //设置缩略图初始宽度 //可调
        var tHeight = 480; //设置缩略图初始高度 //可调
        if (canvasWidth > tWidth || canvasHeight > tHeight) {
          //按比例计算出缩略图的宽度和高度
          if (canvasWidth > canvasHeight * 1.8) {
            tHeight = Math.floor(parseFloat(canvasHeight) * (parseFloat(tWidth) / parseFloat(canvasWidth)));
          }
          else {
            tWidth = Math.floor(parseFloat(canvasWidth) * (parseFloat(tHeight) / parseFloat(canvasHeight)));
          }
        }
        else {
          tWidth = canvasWidth;
          tHeight = canvasHeight;
        }
        console.log("tWidth=" + tWidth + "tHeight=" + tHeight)
        that.setData({
          tWidth: tWidth,
          tHeight: tHeight
        })
        // //绘制新图
        ctx.drawImage(res.path, 0, 0, tWidth, tHeight)
        // ctx.drawImage(res.path,0, 0) 
        ctx.draw(false, function () {
          that.prodImageOpt(url, tWidth, tHeight)
        });//在回调进行保存不会出现空白
      }
    })



  },
  // 生成图片
  prodImageOpt: function (url, width, height) {
    console.log(url);
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'attendCanvasId',
      width: width,
      height: height,
      destWidth: width,
      destHeight: height,
      success: function success(res) {
        console.log(res)
        var path = res.tempFilePath;
        wx.getImageInfo({
          src: path,
          success: function (res) {
            console.log(res)
          }
        })
        console.log(path);
          that.setData({
            imageUploadPath: path
          });
      }
    });
  },
})
