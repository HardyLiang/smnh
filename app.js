//app.js
var http = require('utils/reques.js')
var common = require('utils/common.js')
var urlSet =require('utils/urlSet.js')
var util =require('utils/util.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that=this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //检测网络是否可用
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        console.log(networkType);
        if (networkType == "none") {
          wx.showModal({
            title: '提示',
            content: '亲，当前网络不可用喔！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              }
            }
          })
        }
      }
    })
    //获取微信头像和openId等
    util.getOpenId('../page/auth/authorize/authorize');
   
  },
  globalData: {
    userInfo: null,
    userName: "", //农户姓名
    idCard: "",   //农户身份证
    farmerId: "" , //农户id;
    userRegister:{},//用户注册参数暂存；
    productPublic:{},//用户发布产品参数暂存；
    infoModify:{},//用户修改信息参数暂存；
    productModify: {},//用户修改产品参数暂存；

  },
  

  func: {
    onLogin: http.onLogin,
    getFPManager: http.getFPManager,
    checkMobileByCard: http.checkMobileByCard,
    fotgetPass: http.fotgetPass,
    updatePassword: http.updatePassword,
    getPersonMsg: http.getPersonMsg,
    getOpenId: http.getOpenId,
    getAgreementMessageList:http.getAgreementMessageList,
    getStoreStatusByCard:http.getStoreStatusByCard,
    checkWXBoundStatus: http.checkWXBoundStatus,
    getSale: http.getSale,
    getSetRec: http.getSetRec,
    getGoodsInfoByCard: http.getGoodsInfoByCard,
    updateShareCommission: http.updateShareCommission,
    updateGoodInventory: http.updateGoodInventory,
    stopProduct: http.stopProduct,
    getOrderCountInfo: http.getOrderCountInfo,
    getOrder: http.getOrder,
    getLogisticsInfo: http.getLogisticsInfo,
    getAllExpCompany: http.getAllExpCompany,
    orderShippingSave: http.orderShippingSave,
    getProductDict: http.getProductDict,
    getProductDictSub: http.getProductDictSub,
    getProductDetail:http.getProductDetail,
    getPicLists: http.getPicLists,
    orderShippingUpdate: http.orderShippingUpdate,
    getOrderNew: http.getOrderNew,
    getPersonShopURL:http.getPersonShopURL,
    addOnlyProduct:http.addOnlyProduct,
    getIdCardCheck: http.getIdCardCheck,
    getmobileCheck: http.getmobileCheck,
    addPersonMsg: http.addPersonMsg,
    checkWork: http.checkWork,
    getBusinessCategory: http.getBusinessCategory,
    getStoreTypeList: http.getStoreTypeList,
    bandWX: http.bandWX,
    unBandWX: http.unBandWX,
    upLoadPicture: http.upLoadPicture,
    getBankType: http.getBankType,
    updatePersonMsg: http.updatePersonMsg,
    updateOnlyProduct: http.updateOnlyProduct,
    modifyMainPic: http.modifyMainPic,
    removeGoodsPicture: http.removeGoodsPicture,
    getVerifyCode: http.getVerifyCode,
  }
})
