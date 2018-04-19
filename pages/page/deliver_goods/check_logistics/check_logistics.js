var app = getApp()
Page({
  data: {
    navbar: ['包裹1', '包裹2', '包裹3', '包裹2', '包裹3'],
    currentTab: 0
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }
}) 