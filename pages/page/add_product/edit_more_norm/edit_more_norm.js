// pages/page/add_product/edit_more_norm/edit_more_norm.js
var event = require('../../../../utils/event.js')
var util = require('../../../../utils/util.js')
var common = require('../../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    specList:[],
    inveList:[],
    infoList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //首先获取两个列表；
    var specList=getApp().globalData.productPublic[common.CC_PRODUCT_SPECS_INFO] 
    var inveList=getApp().globalData.productPublic[common.CC_GOODS_INVENTORY_DETAIL]
    var infoList=[];
    console.log(specList)
    console.log(inveList)
    this.setData({
      specList: specList,
      inveList: inveList
    })
    //组参显示页面
    for (var i = 0; i < inveList.length;i++){
      infoList.push({
        name: "",
        price: "",
        count: ""
      });
      infoList[i].count = inveList[i].count;
      infoList[i].price = inveList[i].price;
      var name ="";
      var nameIds = inveList[i].id;
      var nameList = nameIds.split("_");
      console.log(nameList)
      if(nameList!=null&&nameList.length>0){
        for (var y = 0; y < nameList.length;y++){
          var nameId =nameList[y];
          for (var x = 0; x < specList.length;x++){
            if(nameId==specList[x].id){
              name=name+specList[x].name+";"
            }
          }
        }
      }
      infoList[i].name=name;
    }
    this.setData({
      infoList: infoList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  nextRegister:function(e){
    //点击保存发数据信息给上一个页面；并关上当前页面；
    event.emit(event.KEVGGspValSuccess, this.data.inveList);
    wx.navigateBack()
  },
  bindInputChange:function(e){
    console.log(e)
    var content =e.detail.value;
    var typeName =e.currentTarget.dataset.typename;
    var index = e.currentTarget.dataset.index;
    console.log("content===" + content + "typeName==" + typeName + "index===" + index)

    var invList = this.data.inveList;
    if(typeName=="count"){
      invList[index].count = content;
    }else
    if(typeName=="price"){
      invList[index].price = content;
    }
    console.log(invList)
    this.setData({
      inveList: invList
    })
  }
})