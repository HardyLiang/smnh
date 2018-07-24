var common = require('../../../utils/common.js')
var util = require('../../../utils/util.js')
var event = require('../../../utils/event.js')
let tipLoading = "正在加载";
let tipAlready = "全部加载完毕";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrlValue: "",
    name: "",
    mobile: "",
    idCard: "",
    descriptionEvaluate: "",
    serviceEvaluate: "",
    shipEvaluate: "",
    dialogViewHiddlen:true,
    dialogTitle:"",
    dialogContent:"",
    orderId:"",
    index:0,
    currentStatus:3,
    pageIndex: 1,//页数
    isLoadMore: false,//是否加载更多
    isHideLoadMore: false,//是否隐藏加载更多
    isHideLoadIcon: false,//是否隐藏loading图标
    loadmoreTip: "正在加载",//加载文字
    typeAlreadyStatus:false,//是否加载全部完毕
    productlist:[],//产品列表
    isReFresh:false,
    isHideList:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户的个人信息，首先获取本地缓存数据
    var res = wx.getStorageSync(common.CC_FARMERINFO);
    var idCard = util.hideIdCardMiddle(res.data.user_information.sCard);
    this.setData({
      imgUrlValue: res.data.store_information.store_logo,
      name: res.data.store_information.store_name,
      mobile: res.data.store_information.store_telephone,
      idCard: idCard,
      descriptionEvaluate: res.data.store_information.descriptionEvaluate,
      serviceEvaluate: res.data.store_information.serviceEvaluate,
      shipEvaluate: res.data.store_information.shipEvaluate
    })
    //获取产品列表
    this.getGoodsInfoByCard(this.data.pageIndex);
  },
  goGoodsDetail: function (e) {
    var detailId = e.currentTarget.dataset.id;
    console.log("获取的Id"+detailId);
    wx.navigateTo({
      url: "goods_detail/goods_detail?id=" + detailId
    })
  },
  AddProductTap: function (e) {
    wx.navigateTo({
      url: "../add_product/add_product"
    })
  },
  rePublish: function (e) {
    var that = this;
    var goodsid = e.currentTarget.dataset.goodsid;
    getApp().globalData.productModify = {};
    getApp().globalData.productModify[common.CC_PRODUCT_GOOD_ID] = goodsid;
    getApp().globalData.productModify[common.CC_PRODUCT_GOOD_STATUS] = 0;
    var params = getApp().globalData.productModify;
    //弹窗询问用户是否真的要下架
    wx.showModal({
      title: '注意',
      content: '亲，你确认要上架么？',
      success: function (res) {
        //确认下架
        if (res.confirm) {
          getApp().func.updateOnlyProduct(params, function (message, res) {
            console.log(res);
            //失败
            if (!res) {
              wx.showToast({
                title: message,
              })
              return;
            }
            //成功
            wx.showToast({
              title: "上架成功"
            })
            //刷新列表
            var res = wx.getStorageSync(common.CC_FARMERINFO);
            //获取产品列表
            that.setData({
              pageIndex: 1
            })
            that.getGoodsInfoByCard(that.data.pageIndex);
          })
        }
      }
    })
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
    
  },
  onShow:function(){
    event.on(event.KProductPublishSuccess,this,function(res){
      wx.showNavigationBarLoading(); //在标题栏中显示加载
      this.setData({
        isReFresh: true,
        pageIndex: 1,
        isHideLoadMore: false,
        isHideLoadIcon: false,
        loadmoreTip: tipLoading,
      })
      this.getGoodsInfoByCard(1)
    })

  },
  /**
   *获取产品列表
   */
  getGoodsInfoByCard: function (pageIndex) {
    var that = this;
    if(pageIndex==1){
      wx.showLoading()
    }
    getApp().func.getGoodsInfoByCard(pageIndex, function (message, res,maxPage) {
    wx.hideLoading();
      if (that.data.isReFresh) {//判断是否刷新操作
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        that.setData({
          isReFresh: false
        })
      }
      if(pageIndex==1){
        if(!res||res.data.length==0){
          that.setData({
            isHideList:false
          })
        }else{
          that.setData({
            isHideList: true
          })
        }
      }
      
      if (!res) {
        wx.showModal({
          title: '提示',
          content: message,
          cancelText: false
        })
        return;
      }
      console.log('获取产品列表成功'+pageIndex);
      console.log(res);

      if (pageIndex==1){
        that.setData({
          productlist: res.data
        })
        console.log(that.data.productlist);
      }else{
        var list =[];
       list = that.data.productlist;
        for (var i = 0; i < res.data.length; i++) {
          list.push(res.data[i]);
        }
        that.setData({
          productlist: list
        })
      }
      if (maxPage==1||pageIndex==maxPage){
        that.setData({
          isLoadMore: false,
          isHideLoadMore: false,
          isHideLoadIcon: true,
          loadmoreTip: tipAlready,
          typeAlreadyStatus:true
        })
      }
      
    })
    
  },
  modifyShareCommission:function(e){
   console.log("点击修改让利")
   console.log(e)
   var goodsid =e.currentTarget.dataset.goodsid;
   var shareComission = e.currentTarget.dataset.sharecommission;
   var index = parseInt(e.currentTarget.dataset.index);
   var goodsStatus = e.currentTarget.dataset.goodsstatus;
   if (goodsStatus == 0) {
   wx.setStorageSync('dialogContent', shareComission);
   console.log("orderId=" + goodsid + "sharecomission=" + shareComission + "index=" + index)
   this.setData({
     dialogTitle:"修改让利金",
     dialogContent: shareComission,
     orderId: goodsid,
     index:index
   })
   this.dialog.showDialog();
   } else {
     wx.showToast({
       icon: 'none',
       title: "还不能修改哦~"
     })
   }
  },
  
  /**
   * 修改让利金
   */
  updateShareCommission: function (id, shareCommission,index) {
    var that =this;
    wx.showLoading({
      title: '加载中...',
    })
    getApp().globalData.productModify = {};
    getApp().globalData.productModify[common.CC_PRODUCT_GOOD_ID] = util.trim(id);
    getApp().globalData.productModify[common.CC_PRODUCT_PROFIT_2] = shareCommission;
    var params = getApp().globalData.productModify;
    getApp().func.updateOnlyProduct(params, function (message, res) {
      wx.hideLoading();
      //修改失败
      if(!res){
        wx.showModal({
          title: '提示',
          content: '修改让利金失败',
          showCancel:false
        })
        return;
      }
      wx.showToast({
        title: '修改成功！',
      })
      //刷新页面数据
      var mShareCommission = 'productlist[' + index+'].shareCommission'
      that.setData({
        dialogContent: shareCommission,
        [mShareCommission]: shareCommission
      })
     
    });


  },
  /**
   * 点击修改库存按钮
   */
  modifyGoodsInventory:function(e){
    // console.log("点击修改库存")
    // console.log(e)
    var goodsid = e.currentTarget.dataset.goodsid;
    var goodsinventory = e.currentTarget.dataset.goodsinventory;
    var index = parseInt(e.currentTarget.dataset.index);
    var goodsStatus = e.currentTarget.dataset.goodsstatus;
   
    if (goodsStatus == 0){
      wx.setStorageSync('dialogContent', goodsinventory);
      console.log("orderId=" + goodsid + "goodsinventory=" + goodsinventory + "index=" + index)
      this.setData({
        dialogTitle: "修改库存",
        dialogContent: goodsinventory,
        orderId: goodsid,
        index: index
      })
      this.dialog.showDialog();
    }else{
      wx.showToast({
        icon:'none',
        title: "还不能修改哦~"
      })
    }
  },
  /**
   * 修改库存
   */
  updateGoodInventory: function (id, goodsInventory,index){
    var that=this;
    wx.showLoading();
    getApp().globalData.productModify={};
    getApp().globalData.productModify[common.CC_PRODUCT_GOOD_ID] = id;
    getApp().globalData.productModify[common.CC_PRODUCT_STOCK] = goodsInventory;
    getApp().globalData.productModify[common.CC_PRODUCT_INV_TYPE] = "all";
    var params = getApp().globalData.productModify;
    getApp().func.updateOnlyProduct(params,function(message,res){
      wx.hideLoading();
      console.log("修改返回" + message)
      if(!res){
        wx.showModal({
          title: '提示',
          content: message,
          showCancel:false
        });
        return;
      }
      //修改成功
      wx.showToast({
        title: '修改库存成功！',
      })
      //刷新页面数据
      
      var mGoodsInventory = 'productlist[' + index + '].goodsInventory'
      that.setData({
        dialogContent: goodsInventory,
        [mGoodsInventory]: goodsInventory
      })
    });


  },
  /**
   * 点击停止出售
   */
  mddifyStopProduct:function(e){
    console.log("点击停止出售")
    console.log(e)
    var that =this;
    var goodsid = e.currentTarget.dataset.goodsid;
    getApp().globalData.productModify = {};
    getApp().globalData.productModify[common.CC_PRODUCT_GOOD_ID] = goodsid;
    getApp().globalData.productModify[common.CC_PRODUCT_GOOD_STATUS] = 1;
    var params = getApp().globalData.productModify;
    //弹窗询问用户是否真的要下架
    wx.showModal({
      title: '注意',
      content: '亲，你确认要下架么？',
      success:function(res){
        //确认下架
        if(res.confirm){
          getApp().func.updateOnlyProduct(params,function(message,res){
            console.log(res);
            //失败
            if(!res){
              wx.showToast({
                title: message,
              })
              return;
            }
            //成功
            wx.showToast({
              title: "下架成功"
            })
            //刷新列表
            var res = wx.getStorageSync(common.CC_FARMERINFO);
            //获取产品列表
            that.setData({
              pageIndex:1
            })
            that.getGoodsInfoByCard(that.data.pageIndex);
          })
        }
      }
    })
  

  },


  //弹出窗取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //弹出窗确认事件
  _confirmEvent(e) {
    console.log('你点击了确定');
    this.dialog.hideDialog();
    //获取用户输入的值
    var content =wx.getStorageSync("dialogContent");
    console.log("获取用户输入" + content);

    //判断当前是修改让利还是修改库存还是其他
    if (this.data.dialogTitle =="修改让利金"){
      this.updateShareCommission(this.data.orderId, content,this.data.index);
    }else
      if (this.data.dialogTitle == "修改库存"){
        this.updateGoodInventory(this.data.orderId,content,this.data.index);
    }
    
  },
  /**
   * 下拉刷新
   */
  onReachBottom :function(e){
    console.log("到达底部加载更多");
    if (this.data.typeAlreadyStatus){//如果加载全部就返回
      return;
    }
    var mPageIndex = this.data.pageIndex + 1;
    this.setData({
      isLoadMore: true,
      pageIndex: mPageIndex,
      isHideLoadMore: false,
      isHideLoadIcon: false,
      loadmoreTip: tipLoading
    })
    this.getGoodsInfoByCard(this.data.pageIndex)
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    this.setData({
      isReFresh: true,
      pageIndex:  1,
      isHideLoadMore: false,
      isHideLoadIcon: false,
      loadmoreTip: tipLoading,
    })
    this.getGoodsInfoByCard(this.data.pageIndex)
  },
  onUnload:function(){
    event.remove(event.KProductPublishSuccess, this)
  }

})