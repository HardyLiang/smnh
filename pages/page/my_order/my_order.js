var app = getApp()
var common = require('../../../utils/common.js')
var event =require('../../../utils/event.js')

Page({
  data: {
    navbar: ['待发货', '已发货'],
    currentTab: 0,
    orderNum: '985345833453534594583453',
    username: "",
    farmerType: "",
    notYetCount: "",
    shippedCount: "",
    pageSize: 10,
    pageIndex: 1,


  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  // 复制待发货订单编号
  copyPaidNum: function () {
    var self = this;
    var dataNum = self.data.orderNum;
    copyButton(dataNum);
  },
  onLoad: function () {
    //获取个人信息
    var name = wx.getStorageSync(common.CC_USERNAME);
    var idCard = wx.getStorageSync(common.CC_IDCARD);
    var res = wx.getStorageSync(common.CC_FARMERINFO);
    var farmerId = res.data.id;
    var status = "2";
    var alreadyStatus = "3";
    console.log("name=" + name + "idCard=" + idCard + "farmerID=" + farmerId);
    var personType;
    if (res.data.personType == "2") {
      personType = "普通户"
    } else
      if (res.data.personType == "1") {
        personType = "贫困户"
      }
    //信息赋值
    this.setData({
      username: name,
      farmerType: personType
    })
    //获取未发货
    this.getOrder(idCard, farmerId, status, this.data.pageSize, this.data.pageIndex);
    //获取已发货
    this.getOrder(idCard, farmerId, alreadyStatus, this.data.pageSize, this.data.pageIndex);

  },
  onShow:function(e){
    event.on(event.KDeliverGoodSuccessEventName, this, function (data) {
      console.log("发货成功待发货页面收到信息");
      //获取未发货
      var idCard = wx.getStorageSync(common.CC_IDCARD);
      var res = wx.getStorageSync(common.CC_FARMERINFO);
      var farmerId = res.data.id;
      var status = "2";
      this.setData({
        pageSize:10,
        pageIndex:1
      })
      this.getOrder(idCard, farmerId, status, this.data.pageSize, this.data.pageIndex);
    })
  },
  /**
   * 获取订单
   */
  getOrder: function (idCard, farmerId, status, pageSize, pageIndex) {
    var that = this;
    //联网获取订单数量和订单
    getApp().func.getOrderCountInfo(idCard, function (message, res) {
      console.log("获取订单数量成功");
      console.log(res);
      that.setData({
        notYetCount: res.data[0].notYetCount,
        shippedCount: res.data[0].shippedCount,
      })
    })

    getApp().func.getOrder(farmerId, status, pageSize, pageIndex, function (message, pageIndex, res) {
      console.log("获取订单数据成功");
      console.log(res);
      if (status != null && status == "2") {//未发货
        console.log("未发货");
        that.setData({
          notYetList: res.data.lists
        });
      } else
        if (status != null && status == "3") {//已发货
          console.log("已发货");
          that.setData({
            alreadyList: res.data.lists
          });
        }
    })


  },// 复制文本的方法
  copyButton: function (e) {
    console.log(e)
    var copyType = e.currentTarget.dataset.type;
    var copyValue = '';
    if (copyType == "order") {//复制订单
      copyValue = e.currentTarget.dataset.suborderid;
    } else
      if (copyType == "receiverInfo") {
        var name = e.currentTarget.dataset.name;
        var mobile = e.currentTarget.dataset.mobile;
        var orderaddress = e.currentTarget.dataset.orderaddress;
        copyValue = "收件人:" + name+"\n"+
                    "手机号:"+mobile+"\n"+
                    "地址"+orderaddress
      }
    wx.setClipboardData({
      data: copyValue,
      success: function (res) {
        wx.showToast({
          title: "复制到剪贴板",
          icon: 'none'
        })
      },
      fail: function (res) {
        wx.showToast({
          title: "复制失败",
          icon: 'none'
        })
      }
    });
  },
  /**
   * 查看物流
   */
  viewLogistics:function(e){
    console.log(e)
    var oid =e.currentTarget.dataset.oid;
    wx.navigateTo({
      url: '../../page/deliver_goods/check_logistics/check_logistics?oid='+oid,
    })

  },
  /**
   * 修改物流
   */
  modifyLogistics: function (e) {

  },
  /**
   * 发货
   */
  deliverGoods:function(e){
    console.log(e)
    var position = e.currentTarget.dataset.id;
    console.log("第几项发货"+position);
    var goodsList = this.data.notYetList[position].goodInfoList;
    var orderId = this.data.notYetList[position].id;
    console.log(goodsList.length)
    //发货前存储产品列表
    wx.setStorageSync(common.CC_GOODINFOLIST, goodsList);
    //跳转发货
    wx.navigateTo({
      url: '../deliver_goods/deliver_goods?orderId=' + orderId,
    })
  }


}) 
