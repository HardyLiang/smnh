var common =require('../../../utils/common.js')
Page({

  data: {
    packageLists: [],
    logisticsInfo: {
      name: '',
      orderNum: '',
      goods: ''
    },
    goodInfoList:{},
    logisticsList:[],
    index:0,
    chooseCompanyName:'请选择物流公司',
    chooseValue:''
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.action_sheet = this.selectComponent("#action_sheet");
    //给列表初始
    this.data.packageLists.push(this.data.logisticsInfo)
   
  },
  onLoad: function (options) {
    var that =this;
    //获取产品列表
    var goodList = wx.getStorageSync(common.CC_GOODINFOLIST);
    console.log(goodList);
    //给产品列表赋值；
    that.setData({
      goodInfoList: goodList
    })
    //获取物流列表
    this.chooseLogisitics();
  },
// 添加物流
  insert: function () {
    var packages = this.data.packageLists;
    console.log(packages);
    packages.push(this.data.packageLists.length);
    this.setData({
      packageLists: packages
    });
  },
  // 删除包裹
  delBind: function (id) {
    if (this.data.packageLists.length == 1) {
      wx.showToast({
        title: '默认包裹不可删除',
        icon: 'none',
        duration: 10000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      var newLogisticsInfo = this.data.logisticsInfo;
      console.log(newLogisticsInfo);
      this.data.packageLists.push(newLogisticsInfo);
    }
  },
  /**
   * 选择产品
   */
  chooseGoods:function(e){
    console.log(e)
   var goodlist =e.currentTarget.list;
   var position =e.currentTarget.position
   this.action_sheet.showDialog();
  },
  /**
   * 获取物流公司数据
   */
  chooseLogisitics:function(e){
    console.log(e); 
    var that =this;
    wx.showLoading();
    //获取快递
    getApp().func.getAllExpCompany(function (message, res) {
      wx.hideLoading();
      if(!res){
        wx.showToast({
          title: message,
        })
        return;
      }
      var list =res.data;
      console.log(list);
      that.setData({
        logisticsList:list
      })

    })

  },
  /**
   * 获取物流公司
   */
  bindPickerChange:function(e){
    var that =this;
    var choosePosition =e.detail.value;
    var chooseName = this.data.logisticsList[choosePosition].companyName;
    this.setData({
      chooseCompanyName: chooseName
    })

  },
  _confirmChoose(e){
    console.log("点击了确认选择产品")
    var chooseList = e.detail.chooseList;
    var choose ="";
    console.log(chooseList);
    this.action_sheet.hideDialog();
    //给产品赋值
    for (var i = 0; i < chooseList.length;i++){
      choose=chooseList[i].goodName+" "
    }
    this.setData({
      chooseValue: choose
    })
  }
})