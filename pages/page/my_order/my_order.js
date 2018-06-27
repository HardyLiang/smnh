var app = getApp()
var common = require('../../../utils/common.js')
var event =require('../../../utils/event.js')
let typeSend="send";
let typeModify="modify";
let tipLoading ="正在加载";
let tipAlready ="全部加载完毕";

Page({
  data: {
    navbar: ['待发货', '已发货'],
    currentTab: 0,
    orderNum: '',
    username: "",
    farmerType: "",
    notYetCount: "",
    shippedCount: "",
    pageIndex: 1,//未发货页码
    pageIndex1:1,//已发货页码
    isFirstEnter:true,//第一次进入页面
    isReFresh:false,//是否刷新
    isLoadMore:false,//是否加载更多
    isHideLoadMore: false,//是否隐藏加载更多
    isHideLoadIcon: false,//是否隐藏loading图标
    loadmoreTip: "正在加载",//加载文字
    typeNotYetStatus:false,//未发货加载更多页面状态，如果是true,表示这个页面已经加载完了
    typeAlreadyStatus: false,//已发货加载更多页面状态，如果是true,表示这个页面已经加载完了
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    console.log("选择当前页面" + this.data.currentTab + "状态===" + this.data.typeNotYetStatus)
    if (this.data.currentTab == 0 ){
       this.setData({
         isHideLoadMore: false,//是否隐藏加载更多
         isHideLoadIcon: this.data.typeNotYetStatus ? true : false,//是否隐藏loading图标
         loadmoreTip: this.data.typeNotYetStatus ? tipAlready : tipLoading,//加载文字
       })
    }else
      if (this.data.currentTab == 1 ){
        this.setData({
          isHideLoadMore: false,//是否隐藏加载更多
          isHideLoadIcon: this.data.typeAlreadyStatus ? true : false,//是否隐藏loading图标
          loadmoreTip: this.data.typeAlreadyStatus ? tipAlready : tipLoading,//加载文字
        })
    }
  },
  // 复制待发货订单编号
  copyPaidNum: function () {
    var self = this;
    var dataNum = self.data.orderNum;
    copyButton(dataNum);
  },
  onLoad: function () {
    //获取个人信息
    this.getOrderByStatus(typeSend);
    this.getOrderByStatus(typeModify);

  },
  onShow:function(e){
    var that =this;
    event.on(event.KDeliverGoodSuccessEventName, this, function (data) {
      console.log("发货成功待发货页面收到信息");
      //发货成功两边的列表都要刷新
      that.getOrderByStatus(typeSend);
      that.getOrderByStatus(typeModify);
    })
    event.on(event.KLogisiticsModifySuccessEventName, this, function (data) {
      console.log("修改物流成功已发货发货页面收到信息");
      //修改物流成功只是需要刷新已发货列表
      that.getOrderByStatus(typeModify);
    })
    
  },
  /**
   * 获取订单
   */
  getOrder: function (status,pageIndex,pageSize) {
    var that = this;
    if (that.data.isFirstEnter){//如果是第一次进来就显示loading
      wx.showLoading()
      that.setData({
        isFirstEnter:false
      })
    }


  getApp().func.getOrder(status,pageIndex, function (message, mPageIndex, res,maxPage) {
      wx.hideLoading();
      console.log("获取订单数据成功");
      console.log(res);
      if(that.data.isReFresh){//判断是否刷新操作
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        that.setData({
          isReFresh:false
        })
      }

      if (!res) {
        wx.showModal({
          title: '提示',
          content: message,
          showCancel:false,
          success:function(res){
          }
        })
          return;
      }
      
      if (mPageIndex == maxPage) {//如果当前页面是最大页面
        console.log("mPageIndex=" + mPageIndex );
        var mTypeNotYetStatus = that.data.typeNotYetStatus;
        var mTypeAlreadyStatus = that.data.typeAlreadyStatus;
         that.setData({
           isLoadMore: false,//是否加载更多
           loadmoreTip: tipAlready,//加载文字
           isHideLoadMore: false,//是否隐藏加载更多
           isHideLoadIcon: true,//是否隐藏loading图标
           typeNotYetStatus: status == "1" ? true : mTypeNotYetStatus,
           typeAlreadyStatus: status == "2" ? true : mTypeAlreadyStatus
         }) 
      }
      if(!res){
        return;
      }
        if (status != null && status == "1") {//未发货
          console.log("未发货");
          var list = that.data.notYetList;
          if (that.data.pageIndex==1){
             list =[];
             list = res.data;
           }else{
             for (var i = 0; i < res.data.length; i++) {
               list.push(res.data[i]);
             }
             console.log("加载更多")
             console.log(list);
           }
          that.setData({
            notYetList: list,
            notYetCount:res.count
          });
          
        } else
          if (status != null && status == "2") {//已发货
            console.log("已发货");
            var alreadyList = that.data.alreadyList;
            if (pageIndex == 1) {
              alreadyList=[];
              alreadyList = res.data;
            } else {
              for (var i = 0; i < res.data.length; i++) {
                alreadyList.push(res.data[i]);
              }
            }
            that.setData({
              alreadyList: alreadyList,
              shippedCount:res.count
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
    console.log(e)
    var position = e.currentTarget.dataset.id;
    console.log("第几项修改物流" + position);
    var shipInfoList = this.data.alreadyList[position].ship_info;
    var orderId = this.data.alreadyList[position].id;
    var goodInfoList = this.data.alreadyList[position].goods_info;
    //修改前存储产品物流信息
    wx.setStorageSync(common.CC_SHIPINFOLIST, shipInfoList);
    wx.setStorageSync(common.CC_GOODINFOLIST, goodInfoList);
    //跳转修改物流
    wx.navigateTo({
      url: '../deliver_goods/deliver_goods?orderId=' + orderId+"&type="+"modify",
    })
  },
  /**
   * 发货
   */
  deliverGoods:function(e){
    console.log(e)
    var position = e.currentTarget.dataset.id;
    console.log("第几项发货"+position);
    var goodsList = this.data.notYetList[position].goods_info;
    var orderId = this.data.notYetList[position].id;
    console.log(goodsList.length)
    //发货前存储产品列表
    wx.setStorageSync(common.CC_GOODINFOLIST, goodsList);
    //跳转发货
    wx.navigateTo({
      url: '../deliver_goods/deliver_goods?orderId=' + orderId+"&type="+"send",
    })
  },
  /**
   * 根据列表状态获取列表
   */
  getOrderByStatus:function(statusType){
    //获取未发货
    var name = wx.getStorageSync(common.CC_USERNAME);
    var idCard = wx.getStorageSync(common.CC_IDCARD);
    var res = wx.getStorageSync(common.CC_FARMERINFO);
    var farmerId = res.data.id;
    var status = "1";
    var statusAlready = "2";
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
      farmerType: personType,
    })
    if (statusType == typeModify) {//如果是修改物流
        this.getOrder( statusAlready,this.data.pageIndex1,this.data.pageSize);
      } else 
      if (statusType == typeSend) {//未发货
        this.getOrder(status, this.data.pageIndex,this.data.pageSize);
      } 
    
   
   
    
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    var mPageIndex=this.data.pageIndex;
    var mPageIndex1 = this.data.pageIndex1;
    var mTypeNotYetStatus = this.data.typeNotYetStatus;
    var mTypeAlreadyStatus = this.data.typeAlreadyStatus;
    this.setData({
      isReFresh: true,
      pageIndex: this.data.currentTab == 0 ? 1 : mPageIndex,
      pageIndex1: this.data.currentTab == 1 ? 1 : mPageIndex1,
      isHideLoadMore: false,
      isHideLoadIcon: false,
      loadmoreTip: tipLoading,
      typeNotYetStatus: this.data.currentTab == 0 ? false:mTypeNotYetStatus,
      typeAlreadyStatus: this.data.currentTab == 1 ? false : mTypeAlreadyStatus,
    })
    this.getOrderByStatus(this.data.currentTab == 0 ? typeSend : typeModify);
    console.log("刷新" + this.data.currentTab)
   
  },
  onReachBottom:function(){
    console.log("到达底部加载更多");
   
    if (this.data.currentTab==0){//如果当前是未发货
      if (this.data.typeNotYetStatus){
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
      this.getOrderByStatus(typeSend);
    }else{
      if (this.data.typeAlreadyStatus) {
        return;
      }
      var mPageIndex = this.data.pageIndex1 + 1;
      this.setData({
        isLoadMore: true,
        pageIndex1: mPageIndex,
        isHideLoadMore: false,
        isHideLoadIcon: false,
        loadmoreTip: tipLoading
      })
      this.getOrderByStatus(typeModify);
    }
   
  }


}) 
