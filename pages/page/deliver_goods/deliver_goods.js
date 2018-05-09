var common =require('../../../utils/common.js')
Page({

  data: {
    packageLists: [''],
    goodInfoList:{},
    logisticsList:{},
    index:0,
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.text_sheet = this.selectComponent("#text_sheet");
   
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
      var packages = this.data.packageLists;
      console.log(packages);
      packages.pop(this.data.packageLists.length);
      this.setData({
        packageLists: packages
      });
    }
  },
  /**
   * 选择产品
   */
  chooseGoods:function(e){
    console.log(e)
   var goodlist =e.currentTarget.list;
   var position =e.currentTarget.position;


  },
  /**
   * 选择物流公司
   */
  chooseLogisitics:function(e){
    console.log(e); 
    var that =this;
    var position = e.currentTarget.position;
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
      //
      that.text_sheet.showDialog();

    })
   

  }
})