// pages/page/agreement/agreement.js
var urlSet=require('../../../utils/urlSet.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   urlValue:""
  },
  onLoad:function(){
    var url = urlSet.farmerPrototal;
    console.log(url);
    this.setData({
      urlValue:url
    })
  }

})