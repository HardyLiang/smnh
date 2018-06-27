var app = getApp()
Page({
  data: {
    navbar: [],//包裹列表
    goodlist:[],//发货的商品列表
    logisticsList:[],//物流信息
    currentTab: 0,
    itemGoodName:"",
    expressShipCode:"",
    transList:[]
  },
  navbarTap: function (e) {
    var position = parseInt(e.currentTarget.dataset.idx) ;
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      goodlist: this.data.transList[position].transGoodInfo,
      logisticsList: this.data.transList[position].transInfo,
      itemGoodName: this.data.transList[position].express_company_name,
      expressShipCode: this.data.transList[position].express_ship_code
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
      console.log("获取物流返回");
      console.log(res);
      //如果失败
      if(!res){
       wx.showModal({
         title: '提示',
         content: message,
         showCancel:false,
         success:function(res){
           wx.navigateBack()
         }
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
        expressShipCode: tansInfoList[0].express_ship_code,
        transList: tansInfoList
      })
     
    
    });
   
    
  }

}) 