var util=require('../../../../utils/util.js')
var common =require('../../../../utils/common.js')
var event =require('../../../../utils/event.js')
var statusFore = common.CC_UPLOAD_STATUS_IDCARD;
var statusBack = common.CC_UPLOAD_STATUS_IDCARD_BACK;
var fore="fore";
var back="back";
var app=getApp();
Page({
  data: {
    imageListZ: [],
    imageListF: [],
    foreImagePath:"",
    backImagePath: "",
    modifyPosition:[],
    status:"",
    tWidth:"",
    tHeight:""
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var status = options.type;
    this.setData({
      status:status
    })
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
    var that = this;
    if (that.data.status=="modify"){
      if (that.data.modifyPosition.length == 0) {
        wx.showModal({
          title: '提示',
          content: '亲，请先选择图片！',
        })

      }else
        if (that.data.modifyPosition.length==1){
          if (that.data.modifyPosition[0]==1){
            that.upLoadFore()
        }else
            if (that.data.modifyPosition[0] == 2){
              that.upLoadBack()
            }

      }else
          if (that.data.modifyPosition.length == 2){
            that.upLoadFore()
      }
      
    }else{
      
      if (util.checkListEmpty(this.data.foreImagePath, "亲，请上传身份证正面照喔！")) {
        return;
      }
      if (util.checkListEmpty(this.data.backImagePath, "亲，请上传身份证反面照喔！")) {
        return;
      }
     
      that.upLoadFore();
    }
  },
   upLoadFore:function(){
     var that =this;
     that.updataFile(statusFore, that.data.foreImagePath, function (res) {
       if(res){
         if (that.data.status == "modify") {
           var  thisFlag =false;
           for (var i = 0; i < that.data.modifyPosition.length;i++){
             if (2 == that.data.modifyPosition[i]){
               thisFlag =true
               that.upLoadBack();
             }
           }  
           if (!thisFlag){
             event.emit(event.KInfoModifySuccess, this)
             wx.showModal({
               title: '提示',
               content: '上传成功，是否跳转回首页？',
               showCancel:false,
               success: function (res) {
                 if (res.confirm) {
                   wx.switchTab({
                     url: '../../../../pages/index/index',
                   })
                 }
               }
             })
           }
         } else {
           that.upLoadBack();
         }
       }else{
         wx.showModal({
           title: '提示',
           content: '上传失败，请重新上传',
           showCancel:false
         })
       }
      
     })
   },
   upLoadBack: function (){
    var that =this ;
    this.updataFile(statusBack, this.data.backImagePath, function (res) {
      event.emit(event.KInfoModifySuccess, this)
      if (res) {
          wx.showModal({
            title: '提示',
            content: '上传成功，是否跳转回首页？',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../../../../pages/index/index',
                })
              }
            }
          })
        
      } else {
        wx.showModal({
          title: '提示',
          content: '上传失败，请重新上传',
          showCancel: false
        })
      }
    })
  },
  // 上传身份证正面
  chooseImageIdCardZ: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        var list =[1]
        that.setData({
          imageListZ: res.tempFilePaths,
          foreImagePath: res.tempFilePaths[0],
          modifyPosition:list
        })
        if(res.tempFiles[0].size>2000000){
          console.log(res.tempFiles[0].size)
        that.drawCanvas(res.tempFilePaths[0],fore)
        }
       
      }
    })
  },
  // 上传身份证反面
  chooseImageIdCardF: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        var list = that.data.modifyPosition;
        list.push(2);
        that.setData({
          imageListF: res.tempFilePaths,
          backImagePath: res.tempFilePaths[0],
          modifyPosition: list
        })
        app.globalData.userRegister[common.CC_IDCARD_BACK] = that.data.imageListF[0];
        console.log(app.globalData.userRegister)
        if (res.tempFiles[0].size > 2000000) {
          console.log(res.tempFiles[0].size)
          that.drawCanvas(res.tempFilePaths[0], back)
        }
      }
    })
  },
  updataFile:function(status,path,cb){
    console.log("上传")
    wx.showLoading({
      title: '上传中',
    })
    getApp().func.upLoadPicture("", status, path, "", "", function (message, res) {
      console.log("返回")
      wx.hideLoading();
      if (res) {
        if (status == common.CC_UPLOAD_STATUS_IDCARD){
          wx.setStorageSync(common.CC_IDCARD_FRONT, res.url);
        }else
          if (status == common.CC_UPLOAD_STATUS_IDCARD_BACK){
            wx.setStorageSync(common.CC_IDCARD_BACK, res.url);
        }
        return typeof cb == "function" && cb(true)
      }else{
        return typeof cb == "function" && cb(false)
      }
    })

  },
  bindCancel:function(){
    wx.navigateBack()
  },
  // 缩放图片
  drawCanvas: function (url,flag) {
    var that = this;
    wx.getImageInfo({
      src: url,
      success:function(res){
        console.log(res);
        var ctx = wx.createCanvasContext('attendCanvasId');
        var  canvasWidth = res.width//原图宽度 
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
          that.prodImageOpt(url, tWidth, tHeight,flag)
        });//在回调进行保存不会出现空白
      }
    })
    
    
   
  },
  // 生成图片
  prodImageOpt: function (url,width,height,flag) {
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
          success:function(res){
          console.log(res)
          }
        })
        console.log(path);
        if (flag == fore){
          that.setData({
            foreImagePath: path
          });
        }else{
          that.setData({
            backImagePath: path
          });
        }
        
      }
    });
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
