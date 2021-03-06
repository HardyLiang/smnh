// pages/page/operation_guide/operation_detail/operation_detail.js
/**
     * URl列表：
     * 实名开店：http://mp.weixin.qq.com/s/rW2pK6-vq0ptA2wHEMzeSA
     * 发布产品：http://mp.weixin.qq.com/s/FuUWKM1MoDqB-wKBGDvoXw
     * 管理已发布产品 http://mp.weixin.qq.com/s/OTjw1xKxov9gAduDLqLxBw
     * 订单发货：http://mp.weixin.qq.com/s/yIEZvk-bivjyY2BfsI10og
     * 修改个人信息：http://mp.weixin.qq.com/s/pp3zSFo_i0pVFdc4cWHUBQ
     * 分享店铺：http://mp.weixin.qq.com/s/w2TXF6Q1GQYgHttCDjK0WQ
     */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlValue:"",
    detailList:{
      "smkd":"https://mp.weixin.qq.com/s/bWaDCerhVLlBG8Nrj6s1Xw",
      "fbcp":"https://mp.weixin.qq.com/s/rLHdFGGgtSI09_wGNtFoIw",
      "glyfb":"https://mp.weixin.qq.com/s/8rYKsCKlY082ay-CXQVBJA",
      "ddfh":"https://mp.weixin.qq.com/s/yiBi3LCMxIl1Ntl4VuohKQ",
      "xggrxx":"https://mp.weixin.qq.com/s/J5pqcsgTcylm2leM6RdvSg",
      "fxdp":"https://mp.weixin.qq.com/s/cuJ-Rp2dhHI1tErOIRWBrA" ,
      "wxbd":"https://mp.weixin.qq.com/s/RyQviZ539ap_zfouG0dIKQ" ,
    },
    detailTitleList: {
      "smkd": "实名开店",
      "fbcp": "发布产品",
      "glyfb": "管理已发布",
      "ddfh": "订单发货",
      "xggrxx": "修改个人信息",
      "fxdp": "分享店铺",
      "wxbd": "微信绑定",

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
     var status =options.status;
     var url = this.data.detailList[status];
     console.log(url)
     if(url!=null){
       this.setData({
         urlValue: url
       })
     }
     wx.setNavigationBarTitle({
       title: this.data.detailTitleList[status]
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})