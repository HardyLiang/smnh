// pages/page/operation_guide/operation_guide.js
Page({
  data: {
  },
  onLoad: function (options) {
    this.fetchData();
  },
  fetchData: function () {
    this.setData({
      indexmenu: [
        {
          'icon': '../../images/ic_web_order_delivery.png',
          'text': '订单发货',
          'url': ''
        },
        {
          'icon': '../../images/ic_web_info_edit.png',
          'text': '修改个人信息',
          'url': 'https://mp.weixin.qq.com/s/pp3zSFo_i0pVFdc4cWHUBQ'
        },
        {
          'icon': '../../images/ic_web_share_shop.png',
          'text': '分享店铺',
          'url': ''
        },
        {
          'icon': '../../images/ic_web_release_products.png',
          'text': '发布产品',
          'url': ''
        },
        {
          'icon': '../../images/ic_web_management_release.png',
          'text': '管理已发布',
          'url': ''
        },
        {
          'icon': '../../images/ic_web_farmer_register.png',
          'text': '实名开店',
          'url': ''
        },
        {
          'icon': '../../images/ic_web_more.png',
          'text': '更多',
          'url': ''
        }
      ]
    })
  },
})