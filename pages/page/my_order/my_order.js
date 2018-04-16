var app = getApp()
Page({
  data: {
    navbar: ['待发货', '已发货'],
    currentTab: 0
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }
}) 