var sourceType = [ ['camera'], ['album'], ['camera', 'album'] ]
var sizeType = [ ['compressed'], ['original'], ['compressed', 'original'] ]
var event =require('../../../utils/event.js')
Page({
  data: {
    showView: false,  //是否分销

    imageList: [],
    sourceTypeIndex: 2,
    // sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    // sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
  
  sourceTypeChange: function (e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange: function (e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange: function (e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  // 上传图片
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
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
