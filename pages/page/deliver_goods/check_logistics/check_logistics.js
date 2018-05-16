var app = getApp()
Page({
  data: {
    navbar: [],//包裹列表
    goodlist:[],//发货的商品列表
    logisticsList:[],//物流信息
    currentTab: 0,
    itemGoodName:"",
    expressShipCode:""
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  onLoad: function (options){
    console.log(options)
    //获取传送过来的订单ID
     var oid =options.oid;
    //联网获取物流信息
     this.getLogisticsInfo(oid);

  }
,
  getLogisticsInfo:function(oid){
    var that =this;
    wx.showLoading({
      title: '物流信息加载中...',
    })
    getApp().func.getLogisticsInfo(oid,function(message,res){
      wx.hideLoading();
      console.log(res);
      //如果失败
      if(!res){
        wx.showToast({
          title: message,
        })
        return;
      }
      //成功
      var tansInfoList = res.data.tansInfoList;
      console.log(tansInfoList.length)
      var list =[];
      for (var i = 0; i < tansInfoList.length; i++) {
        var num = i + 1;
        list[i] = "包裹" + num;
      }
      console.log(list)
      that.setData({
        navbar: list,
        goodlist: tansInfoList[0].transGoodInfo,
        logisticsList: tansInfoList[0].transInfo,
        itemGoodName: tansInfoList[0].express_company_name,
        expressShipCode: tansInfoList[0].express_ship_code
      })
     
    
    });
   
    
  }

}) 