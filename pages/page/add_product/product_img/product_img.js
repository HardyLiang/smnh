var event=require('../../../../utils/event.js')
var util=require('../../../../utils/util.js')
var common=require('../../../../utils/common.js')
var app=getApp()
Page({
  data: {
    imgUrlValue: "",//主图
    imageList: [],//次图
    imageListClone:[],//次图列表克隆
    imageListSave:[],//次图修改保存
    cropBack:"prodectImgBack",//这个是设置裁剪返回的消息名称，可自定义，但是要唯一；
    status:"",//记录当前状态
    goodId:""//记录当前产品Id
  },

  onLoad: function (options) {
    var that =this;
    //获取传过来的状态
    var typeStatus = options.type
    var thisId = options.goodId;
    console.log(typeStatus)
    console.log(thisId)
    if(typeStatus=="modify"){
      var info = wx.getStorageSync(common.CC_GOOD_INFO);
      var secList=[];
      for (var i = 0; i < info.goods_photos.length;i++){
        secList.push(info.goods_photos[i])
      }
      console.log(info)
        that.setData({
          imgUrlValue: info.goodsPicturesUrl,
          imageList: secList,
          status: typeStatus,
          goodId: thisId,
          imageListSave: info.goods_photos
        })

    }else{
      that.setData({
        goodId: thisId
      })

    }
  

  },
  /**
  * 上传主图 
  */
  uploadImg: function () {
    var  that=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        wx.navigateTo({
          url: `../../upload/upload?src=${src}&cropBack=` + that.data.cropBack
        })
      }
    })
  },
  // 上传其他图片，没规定大小
  chooseImageSec: function () {//这里是选取图片的方法
    var that = this;
    var list=[]; //用于保存展示的list
    var cloneList=[];//用于保存要上传的列表
    // console.log(imageList.length)
    if (that.data.imageList.length <= 3) {
      wx.chooseImage({
        count: 4 - that.data.imageList.length, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          console.log(res)
           if(that.data.imageList.length>0){
             for (var y = 0; y < that.data.imageList.length;y++){
               list.push(that.data.imageList[y])
             }
           }
          console.log(list)
          var index = list.length==0?0:list.length-1;
          var imgsrc = res.tempFilePaths;
          for (var i = 0; i < imgsrc.length;i++){
            // imageList = imageList.concat(imgsrc[i]);
            list.push(imgsrc[i])
            cloneList.push(imgsrc[i])
          }
          that.setData({
            imageList: list,
            imageListClone:cloneList
          });
         that.modifySec();
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
      return;
    } else {
      wx.showToast({
        icon: 'none',
        title: "一共最多只能上传5张哦~"
      })
    }
  },
  // 预览图片
  previewImage: function (e) {
    var index = e.currentTarget.dataset.index;
    var imageList = this.data.imageList;
    wx.previewImage({
      current: imageList[index],
      urls: this.data.imageList
    })
  },
  // 删除图片
  deleteImg: function (e) {
    var imageList = this.data.imageList;
    var index = e.currentTarget.dataset.index;
    imageList.splice(index, 1);
    this.setData({
      imageList: imageList
    });
  },
  onShow :function(e){
    var that =this;
    console.log("onShow");
    event.on(this.data.cropBack, this, function (data) {
      console.log("我收到裁剪图片啦" + data);
      var url =data;
      that.modifyMain(url,function(res){
         if(res){
           that.setData({
             imgUrlValue: data,
           })
         }
      });
    });

    //上传图片
    event.on(event.KUploadMainImgSuccess, this, function (data) {
      console.log("我收到上传成功返回" + data);
      var index= data;
      var maxIndex = that.data.imageListClone.length
      if (index<maxIndex){
        var oldId=""
        if (index<that.data.imageListSave.length){
          oldId = that.data.imageListSave[index].id;
        }
      that.uploadSecPic(that.data.goodId, common.CC_UPLOAD_STATUS_MAIN,
        index, that.data.imageListClone[index], oldId);
      }else{
        wx.showToast({
          title: '上传次图成功',
        })
      }
    })
  },
  onUnload: function (options) {
    console.log('user=====onUnload');
  }, 
  /**
   * 跳转
   */
  confirmUpLoad:function(){
    if(this.data.status=="modify"){
      wx.redirectTo({
        url: '../product_detail/product_detail?type=modify&goodId=' + this.data.goodId,
      })
    }else{
      wx.redirectTo({
        url: '../product_detail/product_detail?type=add&goodId=' + this.data.goodId,
      })
    }
    
  },
  /**
   * 修改主图
   */
  modifyMain:function(url,cb){
    var that = this;
    var goodId = util.trim(this.data.goodId);
    var status = common.CC_UPLOAD_STATUS_MAIN;
    getApp().func.upLoadPicture(goodId, status, url, "1", "", function (message, res) {
      if (res) {//成功，
        wx.showToast({
          title: '主图上传成功',
        })
        return typeof cb == "function" && cb(true)
      } else {
        wx.showToast({
          title: message,
        })
        return typeof cb == "function" && cb(false)
      }

    });

  },
  /**
   * 修改次图
   */
  modifySec:function(e){
    var that =this;
    var goodId = util.trim(this.data.goodId);
    var status = common.CC_UPLOAD_STATUS_MAIN;
    if (that.data.imageListClone.length > 0) {
      var oldId = ""
      if (that.data.imageListSave.length > 0) {
        oldId = that.data.imageListSave[0].id;
      }
      that.uploadSecPic(goodId, status, 0, that.data.imageListClone[0], oldId)
    } 

  },
  uploadSecPic: function (goodId, status, index, img,oldId){
    var that =this;
    getApp().func.upLoadPicture(goodId, status, img, "2",oldId,function (message, res) {
      index=index+1
      if(res){
          event.emit(event.KUploadMainImgSuccess,index)
      }else{
        wx.showModal({
          title: '提示',
          content: message,
          showCancel: false
        })
      }

    })

  },
  showSuccessDialog:function(message){
    wx.showModal({
      title: '提示',
      content: message,
      confirmText:"上传详情",
      cancelText:"返回上级",
      success:function(res){
        if(res.confirm){//跳转详情
          wx.redirectTo({
            url: '../product_detail/product_detail?type=modify&goodId=' + that.data.goodId,
        })
        }else{
         wx.navigateBack()
        }
      }
    })
  }




})
