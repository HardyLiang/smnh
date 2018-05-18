// pages/page/auth/register/register.js
Page({
  data: {
    region: ['广东省', '广州市'],
    Address: ['广东省', '广州市', '天河区'],
    customItem: '全部',
    bankTypeindex: 0,
    bankType: ['个人账户', '公司账户'],
    bankIndex: 0,
    bank: ['建设银行', '建设银行']
  },
  bindSexChange: function (e) {
    // console.log('picker携带值', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  AddressChange: function (e) {
    this.setData({
      Address: e.detail.value
    })
  },
  bankTypeChange: function (e) {
    this.setData({
      bankTypeindex: e.detail.value
    })
  },
  bindBankChange: function (e) {
    this.setData({
      bankIndex: e.detail.value
    })
  },
  onLoad: function (options) {

  },

})