var common = require('../../../../utils/common.js')
var util = require('../../../../utils/util.js')

Page({
  data: {
    imgUrls: [],//产品主图
    detailUrls: [],//产品详情图
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    minNumber: '',
    minPrice: '',
    preoutput: '',
    productDescription: '',
    productDetailName: '',
    productName: '',
    serveCharge: '',
    unitName: '',
    spec: '',
  },
  onLoad: function (options) {
    var id = options.id;
    //获取详情
    this.getProductDetail("1", id);
    //获取主图
    this.getPicLists(common.CC_PHOTO_TYPE_PRODUCT_MAIN, id);
    //获取土地图
    this.getPicLists(common.CC_PHOTO_TYPE_HEAD_IMG, id);
   

  },
  /**
   * 获取个人信息
   */
  getProductDetail: function (typeId, pageId) {
    var that = this;
    getApp().func.getProductDetail(typeId, pageId, function (message, res) {
      console.log(res);
      if (!res) {//失败
        wx.showModal({
          title: '提示',
          content: message,
          showCancel:false
        })
        return;
      }
      //成功
      that.setData({
        minNumber: res.data.minNumber,
        minPrice: res.data.minPrice,
        preoutput: res.data.preoutput,
        productDescription: res.data.productDescription,
        productDetailName: res.data.productDetailName,
        productName: res.data.productName,
        serveCharge: res.data.serveCharge,
        unitName: res.data.unitName,
        spec: res.data.spec,
      })
    });
  },
  getPicLists: function (typeId, pageId) {
    var that = this;
    getApp().func.getPicLists(pageId, typeId, function (message, res) {
      console.log("获取图片详情");
      console.log(res);
      if (!res) {
        wx.showToast({
          title: message,
          icon: "none"
        })

        return;
      }
      var list = [];
      //根据类型给图片赋值；
      if (typeId == common.CC_PHOTO_TYPE_PRODUCT_MAIN) { //如果是产品主图
        console.log("产品主图");
        that.setData({
          imgUrls: res.data
        })
        //如果是商品认证图，详情图
      } else
        if (typeId == common.CC_PHOTO_TYPE_LAND_TYPE ||
          typeId == common.CC_PHOTO_TYPE_HEAD_IMG ||
          typeId == common.CC_PHOTO_TYPE_PRODUCT_LIST
        ) {
          list = that.data.detailUrls;
          for(var i=0; i<res.data.length;i++){
            list.push(res.data[i]);
          }
          console.log("mmmmmmmm")
          console.log(list)
          that.setData({
            detailUrls: list
          })
        }

      if (typeId == common.CC_PHOTO_TYPE_HEAD_IMG){
          //获取土地图
        that.getPicLists(common.CC_PHOTO_TYPE_LAND_TYPE, pageId);
        }
      if (typeId == common.CC_PHOTO_TYPE_LAND_TYPE){
          //获取详情列表图
        that.getPicLists(common.CC_PHOTO_TYPE_PRODUCT_LIST, pageId);
        }
    });

  }


})