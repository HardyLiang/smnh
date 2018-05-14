var common = require('../../../utils/common.js')
var util = require('../../../utils/util.js')
 
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
    currentStatus:3
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户的个人信息，首先获取本地缓存数据
    var res = wx.getStorageSync(common.CC_FARMERINFO);
    var idCard = util.hideIdCardMiddle(res.data.idCard);
    this.setData({
      imgUrlValue: res.data.picPath,
      name: res.data.name,
      mobile: res.data.mobile,
      idCard: idCard,
      descriptionEvaluate: res.data.descriptionEvaluate,
      serviceEvaluate: res.data.serviceEvaluate,
      shipEvaluate: res.data.shipEvaluate
    })
    //获取产品列表
    this.getGoodsInfoByCard(res.data.idCard);
  },
  goGoodsDetail: function (e) {
    var detailId = e.currentTarget.dataset.id;
    console.log(detailId);
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
    wx.navigateTo({
      url: ""
    })
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
    
  },
  /**
   *获取产品列表
   */
  getGoodsInfoByCard: function (card) {
    var that = this;
    getApp().func.getGoodsInfoByCard(card, function (message, res) {
      if (!res) {
        wx.showModal({
          title: '提示',
          content: message,
          cancelText: false
        })
        return;
      }
      console.log('获取产品列表成功');
      console.log(res);
      that.setData({
        list: res
      })
      
    })
    
  },
  modifyShareCommission:function(e){
   console.log("点击修改让利")
   console.log(e)
   var goodsid =e.currentTarget.dataset.goodsid;
   var shareComission = e.currentTarget.dataset.sharecommission;
   var index = parseInt(e.currentTarget.dataset.index);
   var goodsStatus = e.currentTarget.dataset.goodsstatus;
   if (goodsStatus == 1) {
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
  updateShareCommission: function (orderId, shareCommission,index) {
    var that =this;
    wx.showLoading({
      title: '加载中...',
    })
    getApp().func.updateShareCommission(orderId, shareCommission, function (message, res) {
      wx.hideLoading();
      //修改失败
      if(!res){
        wx.showModal({
          title: '提示',
          content: '修改让利金失败',
          cancelText:false
        })
        return;
      }
      wx.showToast({
        title: '修改成功！',
      })
      //刷新页面数据
      var mShareCommission = 'list[' + index+'].shareCommission'
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
    if (goodsStatus ==1){
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
    getApp().func.updateGoodInventory(id,goodsInventory,function(message,res){
      wx.hideLoading();
      if(!res){
        wx.showModal({
          title: '提示',
          content: message,
          cancelText:false
        });
        return;
      }
      //修改成功
      wx.showToast({
        title: '修改库存成功！',
      })
      //刷新页面数据
      var mGoodsInventory = 'list[' + index + '].goodsInventory'
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
    //弹窗询问用户是否真的要下架
    wx.showModal({
      title: '注意',
      content: '亲，你确认要下架么？',
      success:function(res){
        //确认下架
        if(res.confirm){
          getApp().func.stopProduct(goodsid,function(message,res){
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
            that.getGoodsInfoByCard(res.data.idCard);
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
    
  }
})