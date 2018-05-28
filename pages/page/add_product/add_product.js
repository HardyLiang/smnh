
var event =require('../../../utils/event.js')
Page({
  data: {
    showView: false,  //是否分销

    imageList: [],
    chooseGoods:"", //显示用户选择的产品类型，
    chosseGoodsId:"",//存放用户选择的产品的Id
 
  },
  
  onLoad: function () {
    // 生命周期函数--监听页面加载
    var showView = true;
    showView: (showView == "true" ? true : false)
  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },

  // 上传图片
  chooseImage: function () {//这里是选取图片的方法
    var that = this,
      imageList = this.data.imageList;
    console.log(imageList.length)
    if (imageList.length <= 4){ 
    wx.chooseImage({
      count: 5 - imageList.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // const src = res.tempFilePaths[0]
        var imgsrc = res.tempFilePaths;
        // wx.navigateTo({
        //   url: `../upload/upload?imgsrc=${imgsrc}`
        // })
        // var imgsrc = res.tempFilePaths;
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
    }else{
      wx.showToast({
        icon: 'none',
        title: "最多只能上传5张哦~"
      })
    }
  },
  // 预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
/**
 * 用户点击跳转选择产品页面
 */
  onProductClassify: function (event) {
    wx.navigateTo({
      url: "product_classify/product_classify"
    })
  },
  onShow:function(){
    var that =this;
    //获取事件传递信息
    event.on(event.KChooseGoodItemSuccessEventName, this, function (data) {
      console.log("用户选完了产品了。我收到了");
      console.log(data);
      that.setData({
        chooseGoods: data.goodsName,
        chosseGoodsId: data.goodsId
      })
    })

  },
  onUnload: function () {
    //页面销毁清除页面event接收事件
    event.remove(event.KChooseGoodItemSuccessEventName, this);
  },
  


})
