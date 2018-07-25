var common = require('../../../../utils/common.js')
var util = require('../../../../utils/util.js')
var event = require('../../../../utils/event.js')


Page({
  data: {
    imgUrls: [],//产品主图
    detailUrls: [],//产品详情图
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    minPrice: '',
    preoutput: '',
    productDescription: '',
    productDetailName: '',
    productName: '',
    serveCharge: '',
    unitName: '',
    spec: '',
    goodId:"",
    goodInfo:{},//产品列表
    isReFresh:false
  },
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      goodId:id
    })
    //获取详情
    this.getProductDetail(id);
    // 获取屏幕高度
    var ImgHeight = 0;
    wx.getSystemInfo({
      success: function (res) {
        ImgHeight = res.windowWidth
      }
    })
    this.setData({
      ImgHeight: ImgHeight
    })
  },
  onShow:function(e){
    var that =this;
    event.on(event.KUpdateGoodInfoSuccess,this,function(data){
      console.log("修改信息成功返回")
      that.getProductDetail(that.data.goodId);
    })
  },
  onUnload:function(){
    event.remove(event.KUpdateGoodInfoSuccess,this)
  },
  /**
   * 获取个人信息
   */
  getProductDetail: function (goodsId) {
    var that = this;
    wx.showLoading()
    getApp().func.getProductDetail(goodsId,function (message, res) {
      wx.hideLoading()
      if (that.data.isReFresh) {//判断是否刷新操作
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        that.setData({
          isReFresh: false
        })
      }
      console.log(res);
      if (!res) {//失败
        wx.showModal({
          title: '提示',
          content: message,
          showCancel:false
        })
        return;
      }
      
      var mainList =[];
      var secondaryList = res.data.goods_photos;
      mainList[0] = res.data.goodsPicturesUrl;
      if (secondaryList!=null){
        for (var i = 0; i < secondaryList.length;i++){
          mainList.push(secondaryList[i].url)
        }
      }
      console.log(mainList)
      //规格
      // var goodsGspVal = res.data.goods_gsp_val[0].name;
      //规格描述

      //发货描述
      var proDescription = res.data.deliveryTips;
      if (proDescription == null || proDescription==""){
        proDescription="暂无信息"
      }
      var spec = res.data.packDetails;
      if (spec == null || spec == ""){
        spec ="暂无信息"
      }

      //成功
      that.setData({
        // minNumber: goodsGspVal,
        minPrice: res.data.goodsPrice,
        preoutput: res.data.goodsInventory,
        productDescription: proDescription,
        productDetailName: res.data.goods_name,
        productName: res.data.goodsName,
        serveCharge: res.data.shareCommission,
        spec: spec,
        imgUrls: mainList,
        goodInfo:res.data,
        detailUrls: res.data.goods_details_img_list
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

  },
  /**
   * 修改信息
   */
  modifyProduct:function(e){
    console.log("修改信息")
    var goodId = this.data.goodId;
    var goodInfo = this.data.goodInfo;
    wx.showActionSheet({
      itemList: ['修改商品信息', '修改主图', '修改详情图'],
      success(res) {
        wx.setStorageSync(common.CC_GOOD_INFO, goodInfo);
        if (res.tapIndex === 0) {//修改商品信息
          wx.navigateTo({
            url: '../../add_product/add_product?type=modify&goodId=' + goodId,
          })
        } else if (res.tapIndex === 1) {//修改主图
          wx.navigateTo({
            url: '../../add_product/product_img/product_img?type=modify&goodId=' + goodId,
          })
        } else if (res.tapIndex === 2) {//修改详情图
          wx.navigateTo({
            url: '../../add_product/product_detail/product_detail?type=modify&goodId=' + goodId,
          })
        }
      }
    })

  },
  onPullDownRefresh: function () {
    var that =this;
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    that.setData({
      isReFresh: true
    })
    that.getProductDetail(that.data.goodId);
  }


})