var app = getApp()
Page({
  data: {
    navbar: ['待发货', '已发货'],
    currentTab: 0,
    orderNum:'985345833453534594583453'
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  // 复制待发货订单编号
  copyPaidNum:function(){
    var self = this;
    var dataNum = self.data.orderNum;
    copyButton(dataNum);
  },
}) 
// 复制文本的方法
function copyButton(dataSet) {
  wx.setClipboardData({
    data: dataSet,
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
}