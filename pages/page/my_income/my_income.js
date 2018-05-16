var app = getApp();
var common =require('../../../utils/common.js');

Page({
  data: {
    allIncome: '', //累计金额
    allCount: '',  //累计笔数
    alreadyBalanceIncome: '', //已结算
    balanceIncome: '', //结算中
    dayCount: '',   //今日比赛
    dayIncome: '',  //今日金额
    noIncome: '',   //待结算
    tradeIncome: '', //交易中
    isReFresh:false,//刷新
  },
  onLoad: function (options) {
    //首先获取手机
    var idCard = wx.getStorageSync(common.CC_IDCARD);
    //联网获取收入
    this.getSale(idCard);
  },
  /**
   * 获取收入 
   */
  getSale: function(card){
    var that =this;
    app.func.getSale(card,function(message,res){
      if (that.data.isReFresh) {//判断是否刷新操作
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        that.setData({
          isReFresh: false
        })
      }
        if(!res){
          console.log("获取收入失败！")
          return;
        }
      console.log("成功获取收入")
      console.log(res);
      that.setData({
        allIncome: res.data.all_income,
        allCount: res.data.all_count,
        alreadyBalanceIncome: res.data.already_balance_income,
        balanceIncome: res.data.balance_income,
        dayCount: res.data.day_count,
        dayIncome: res.data.day_income,
        noIncome: res.data.no_income,
        tradeIncome: res.data.trade_income,
      })

    })
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    this.setData({
      isReFresh: true
    })
    //首先获取手机
    var idCard = wx.getStorageSync(common.CC_IDCARD);
    //联网获取收入
    this.getSale(idCard);
  }


})