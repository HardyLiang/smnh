Page({
  data: {
    photoBoxList:[""],
    imgUrlDetail:'',
    textBoxList:[""],//添加文字部分
  },

  onLoad: function (options) {
    //获取传送过来的类型
    var that = this;
    //获取传过来的状态
    var typeStatus = options.type
    var thisId = options.goodId;
    console.log(typeStatus)
    console.log(thisId)
    //判断当前属性是修改还是新增
    if (typeStatus == "modify") {

    }else{
      
    }
  
  
  },
  /**
    * 上传详情图 只能一张
    */
  chooseDetailImage: function (e) {
    var that = this;
    console.log(e)
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          console.log(res)
          // var indexPic = res.currentTarget.dataset.indexPic;
          var imgUrlDetail = res.tempFilePaths;
          that.setData({
            imgUrlDetail: imgUrlDetail
          });
          console.log(1231231)
        },
        fail: function () {
          wx.showToast({
            icon: 'none',
            title: "上传失败~"
          })
        },
        complete: function () {
          // complete
        }
      })
   
  },
  // 添加图片部分
  insertPhoto: function (imgUrlDetail) {
    console.log(111);
    var newPhoto = {
      imgUrlDetail: imgUrlDetail
    }
    var photoBox = this.data.photoBoxList;
    console.log(newPhoto)
    photoBox.push(newPhoto);
    console.log(photoBox)
    this.setData({
      photoBoxList: photoBox
    })
  },
  // 添加文字部分
  insertText: function (textVal) {
    var newTextarea = {
      textVal: textVal
    }
    var textBox = this.data.textBoxList;
    console.log(newTextarea)
    textBox.push(newTextarea);
    console.log(textBox)
    this.setData({
      textBoxList: textBox
    })
  },
  //删除文字事件
})