var event=require('../../../../utils/event.js')
var util=require('../../../../utils/util.js')
var app=getApp()
Page({
  data: {
    imgUrlValue: "",
    imageList: [],
    cropBack:"prodectImgBack",//这个是设置裁剪返回的消息名称，可自定义，但是要唯一；

  },

  onLoad: function () {

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
  chooseImage: function () {//这里是选取图片的方法
    var that = this,
      imageList = this.data.imageList;
    // console.log(imageList.length)
    if (imageList.length <= 3) {
      wx.chooseImage({
        count: 4 - imageList.length, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          var imgsrc = res.tempFilePaths;
          imageList = imageList.concat(imgsrc);
          that.setData({
            imageList: imageList
          });
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
      that.setData({
        imgUrlValue: data
      })

    });
  },
  onUnload: function (options) {
    console.log('user=====onUnload');
    //页面销毁清除页面event接收事件
    event.remove(this.data.cropBack, this);
  }, 
  /**
   * 确认上传
   */
  confirmUpLoad:function(){
    //首先检查封面图是否上传了；
    if (util.checkEmpty(this.data.imgUrlValue,"请上传封面图")){
      return;
    }
    //将图片先上传到服务上并返回路径作为产品发布的入参；
  
    

  }




})
