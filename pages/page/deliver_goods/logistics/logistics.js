
Page({
  data: {
    companyItem: ['中通快递', '邮政快递', '韵达快递', '圆通快递'],
    state: ''
  },
  selectCompany: function (e) {
    // console.log(e.target.dataset.key)
    this.setData({
      state: e.currentTarget.dataset.key,
    });
  },

})