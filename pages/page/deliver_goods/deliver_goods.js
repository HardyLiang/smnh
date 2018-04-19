Page({

  data: {
    packageLists: ['']
  },
  onLoad: function (options) {

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
  }
})