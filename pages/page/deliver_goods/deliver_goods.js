var common = require('../../../utils/common.js')
Page({

  data: {
    packageLists: [],  //这个是每个包裹的列表
    goodInfoList: [],  //这个是传过来的产品列表
    logisticsList: [], //这个是放物流公司的列表
    chooseGoodsPosition:0, //这个是保存每次用户选择的那个产品列表位置

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.action_sheet = this.selectComponent("#action_sheet");
    //首次进来添加一列数据
    this.insert();

  },
  onLoad: function (options) {
    //给列表初始
    var that = this;
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
    console.log("添加一个");
    var newItem = {
        name: '请选择物流公司',
        orderNum: '',
        goods: ''
      }
    var packages = this.data.packageLists;
    console.log(newItem)
    packages.push(newItem);
    console.log(packages)
    this.setData({
      packageLists: packages
    })
  },
  // 删除包裹
  delBind: function (e) {
    //获取当前的item 位置
    var position = e.currentTarget.dataset.position;
    if (position == 0) {//如果是第一个，就不能删除
      wx.showToast({
        title: '默认包裹不可删除',
        icon: 'none',
        duration: 10000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      console.log("删除第" + position + "个");
      var newLogisticsInfo = this.data.packageLists;
      newLogisticsInfo.splice(position, 1);
      this.setData({
        packageLists: newLogisticsInfo
      })
    }
  },
  /**
   * 选择产品
   */
  chooseGoods: function (e) {
    console.log(e)
    var goodlist = e.currentTarget.dataset.list;
    var position = e.currentTarget.dataset.position;
    console.log(position)
    //每次都给位置赋值，让程序知道用户点击了那个包裹的产品列表弹窗
    this.setData({
      chooseGoodsPosition: position
    })
    //显示弹窗
    this.action_sheet.showDialog();
  },
  /**
   * 获取物流公司数据
   */
  chooseLogisitics: function (e) {
    console.log(e);
    var that = this;
    wx.showLoading();
    //获取快递
    getApp().func.getAllExpCompany(function (message, res) {
      wx.hideLoading();
      if (!res) {
        wx.showToast({
          title: message,
        })
        return;
      }
      var list = res.data;
      console.log(list);
      that.setData({
        logisticsList: list
      })

    })

  },
  /**
   * 获取物流公司
   */
  bindPickerChange: function (e) {
    var that = this;
    var position = e.currentTarget.dataset.position;
    var choosePosition = e.detail.value;
    var chooseName = this.data.logisticsList[choosePosition].companyName;
    var mPackageLists = "packageLists[" + position + "].name";
    this.setData({
      [mPackageLists]: chooseName
    })

  },
  /**
   * 点击确认选择产品回调方法
   */
  _confirmChoose(e) {
    console.log("点击了确认选择产品")
    //隐藏弹出窗
    this.action_sheet.hideDialog();
    //获取列表信息
    var chooseList = e.detail.chooseList;
    var choose = "";
    console.log(chooseList);
    //给产品赋值
    for (var i = 0; i < chooseList.length; i++) {
      choose = chooseList[i].goodName + " "
    }
    //根据位置更新选择了的产品
    var mPackageLists = "packageLists[" + this.data.chooseGoodsPosition + "].goods";
    this.setData({
      [mPackageLists]: choose
    }) 
  },
  /**
   * 保存用户输入的数据
   */
  bindInputOrder: function (e) {
    var position = e.currentTarget.dataset.orderposition;
    var value =e.detail.value;
    var mPackageLists = "packageLists[" + position +"].orderNum";
    this.setData({
      [mPackageLists]: value
    })

  },
  /**
   * 确认发货
   */
  confirmDelicer :function(e){
    console.log("确认发货")
    console.log(e)
   
    //检测发货信息是否填完整；
    for (var i = 0; i < this.data.packageLists.length;i++){
      var position =i+1;
      if (this.data.packageLists[i].name == "" || this.data.packageLists[i].name=="请选择物流公司"){
        wx.showToast({
          title: '请选择包裹' +position+'的物流公司',
          icon: 'none'
        })
        return;
      }
      if (this.data.packageLists[i].orderNum == "") {
        wx.showToast({
          title: '请填写包裹' + position + '的物流单号',
          icon: 'none'
        })
        return;
      }
      if (this.data.packageLists[i].goods == "") {
        wx.showToast({
          title: '请选择包裹' + position + '的产品',
          icon:'none'
        })
        return;
      }
    }
    //组装参数
    var idCard = wx.getStorageSync(common.CC_IDCARD);
    
    //联网发货
    getApp().func.orderShippingSave();
  }
})