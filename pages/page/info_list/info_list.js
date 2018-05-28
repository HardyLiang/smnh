// pages/page/info_list/info_list.js

var common = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrlValue: "",
    name: "",
    sex: "",
    farmerType: "",
    mobile: "",
    idCard: "",
    bankNum: "",
    bankName: "",
    bankAccount: "",
    bankType: "",
    bankAddress: "",
    detailAddress: "", 
    isReFresh: false,//是否刷新
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户的个人信息，首先获取本地缓存数据
    var res = wx.getStorageSync(common.CC_FARMERINFO);
    var sex;
    if (res.data.sex == "1") {
      sex = "男";
    } else {
      sex = "女"
    }
    var bankType;
    if (res.data.priorpub == "B") {
      bankType = "公司账户"
    } else
      if (res.data.priorpub == "C") {
        bankType = "个人账户"
      }
    var personType;
    if (res.data.personType == "2") {
      personType = "普通"
    } else
      if (res.data.personType == "1") {
        personType = "贫困"
      }

    this.setData({
      imgUrlValue: res.data.picPath,
      name: res.data.name,
      sex: sex,
      farmerType: personType,
      mobile: res.data.mobile,
      idCard: res.data.idCard,
      bankNum: res.data.bankNumber,
      bankName: res.data.bankName,
      bankAccount: res.data.accountName,
      bankType: bankType,
      bankAddress: res.data.bankAddressName,
      detailAddress: res.data.sendAddressName
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    this.setData({
      isReFresh:true
    })
    this.getPersonMsg();
  },
  getPersonMsg:function(){
    var that =this;
    var farmerId = wx.getStorageSync(common.CC_FARMERID);
    getApp().func.getPersonMsg(farmerId,function(message,res){
      console.log(res)
      if (that.data.isReFresh) {//判断是否刷新操作
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        that.setData({
          isReFresh: false
        })
      }
      if(!res){
        return;
      }
      var sex;
      if (res.data.sex == "1") {
        sex = "男";
      } else {
        sex = "女"
      }
      var bankType;
      if (res.data.priorpub == "B") {
        bankType = "公司账户"
      } else
        if (res.data.priorpub == "C") {
          bankType = "个人账户"
        }
      var personType;
      if (res.data.personType == "2") {
        personType = "普通"
      } else
        if (res.data.personType == "1") {
          personType = "贫困"
        }

      that.setData({
        imgUrlValue: res.data.picPath,
        name: res.data.name,
        sex: sex,
        farmerType: personType,
        mobile: res.data.mobile,
        idCard: res.data.idCard,
        bankNum: res.data.bankNumber,
        bankName: res.data.bankName,
        bankAccount: res.data.accountName,
        bankType: bankType,
        bankAddress: res.data.bankAddressName,
        detailAddress: res.data.sendAddressName
      })
      console.log("更新成功" + sex + personType)

    })
  },
  /**
 * 
 */
  uploadImg: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]

        wx.navigateTo({
          url: `../upload/upload?src=${src}`
        })
      }
    })
  }
})