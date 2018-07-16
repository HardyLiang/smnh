// pages/page/info_list/edit_info/edit_info.js
var common = require('../../../../utils/common.js')
var event = require('../../../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    sex: "",
    storeType: "",
    mobile: "",
    idCard: "",
    bankList:"",
    bankIndex: 0,
    bankNum: "",
    bankName: "",
    bankAccount: "",
    bankTypeindex: 0,
    bankTypeList: ['个人账户', '公司账户'],
    bankType: "",
    bankAddress: "请选择地址",
    addressValue:"",
    detailAddress: "",
    isReFresh: false,//是否刷新
    isHideStore: true,// 是否隐藏店铺信息，默认是隐藏,
    companyName: "",//
    legalPersonName: "",
    legalPersonIdCard: "",
    sexList: ['男', '女'],
    sexIndex:0,
    storeName:"",
    // stroeTypeList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    //清空一下修改组参字段
    getApp().globalData.infoModify={};
    //获取银行信息
    getApp().func.getBankType(function (message, res) {
      console.log("获取银行成功")
      console.log(res)
      that.setData({
        bankList: res.data
      }) 
    })
    //获取用户的个人信息，首先获取本地缓存数据
    var res = wx.getStorageSync(common.CC_FARMERINFO);
    console.log(res)
    this.updateView(res);

    
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
  
  },
  bindContentInput:function(e){
    console.log(e)
    var content =e.detail.value;
    var contentType= e.currentTarget.dataset.type;
    switch (contentType){
      case "name":
        getApp().globalData.infoModify[common.CC_REGISTER_NAME] = content;
      break;
      case "mobile":
        getApp().globalData.infoModify[common.CC_REGISTER_MOBILE] = content;
        break;
      case "bankNum":
        getApp().globalData.infoModify[common.CC_BANKACCOUNT] = content;
        break;
      case "bankAccount":
        getApp().globalData.infoModify[common.CC_BANKNAME] = content;
        break;
      case "detailAddress":
        getApp().globalData.infoModify[common.CC_ADDRESS_DETAIL] = content;
        this.setData({
          detailAddress: content
        })
        break;
      case "storeName":
        getApp().globalData.infoModify[common.CC_SHOP_NAME] = content;
        break;
      case "companyName":
        getApp().globalData.infoModify[common.CC_COMPANY_NAME] = content;
        break;
      case "legalPersonName":
        getApp().globalData.infoModify[common.CC_LEGAL_NAME] = content;
        break;
      case "legalPersonIdCard":
        getApp().globalData.infoModify[common.CC_LEGAL_IDCARD] = content;
        break;
        

    }
    console.log(getApp().globalData.infoModify)
   
  },
  /**
  * 更新页面信息
  */
  updateView: function (res) {
    console.log(res);
    var sex;
    if (res.data.user_information.sex == "1") {
      sex = "男";
    } else
      if (res.data.user_information.sex == "0") {
        sex = "女"
      } else {
        sex = "保密"
      }
    
    var storeType = res.data.store_information.store_type;
    var isHideStore = true;
    if (storeType != null && storeType == "旗舰店") {
      isHideStore = false;
    } else {
      isHideStore = true;
    }
    this.setData({
      imgUrlValue: res.data.store_information.store_logo,
      name: res.data.user_information.true_name,
      sex: sex,
      storeType: storeType,
      mobile: res.data.store_information.store_telephone,
      idCard: res.data.user_information.sCard,
      bankNum: res.data.store_information.bank_c_account,
      bankName: res.data.store_information.bank_type_name,
      bankAccount: res.data.store_information.bank_account_name,//持卡人
      bankType: res.data.store_information.bank_line_num,
      bankAddress: res.data.store_information.bank_area_name,
      addressValue: res.data.store_information.ship_area_name,
      detailAddress: res.data.store_information.ship_address,
      isHideStore: isHideStore,
      companyName: res.data.store_information.license_c_name,//
      legalPersonName: res.data.store_information.license_legal_name,
      legalPersonIdCard: res.data.store_information.license_legal_idCard,
      storeName: res.data.store_information.store_name
    })

  },
  /**
   * 更新信息
   */
  updateStoreInfo:function(e){
    var params = getApp().globalData.infoModify;
    console.log(params)
    console.log(params)
    if (JSON.stringify(params) == "{}"){
      wx.showModal({
        title: '提示',
        content: '亲，至少修改一个信息喔！',
        showCancel:false,
        success:function(res){
        }
      })
    }else{
      getApp().func.updatePersonMsg(params,function(message,res){
        console.log(res);
        if(!res){
          wx.showModal({
            title: '提示',
            content: message,
            showCancel: false,
            success: function (res) {
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: message,
            showCancel: false,
            success: function (res) {
              if(res.confirm){
                //发信息给上个页面告诉他有更新
                event.emit(event.KInfoModifySuccess, "修改成功！");
                //退出当前页面
                wx.navigateBack()
              }
            }
          })
        }
      })
    }
  },
  /**
   * 性别修改
   */
  bindSexChange:function(e){
    var sexValue =e.detail.value;
    var sexContent ="";
    if(sexValue==0){//男
      sexContent = "男";
      getApp().globalData.infoModify[common.CC_REGISTER_SEX]=1;
    }else
      if (sexValue == 1){//女
        sexContent = "女";
        getApp().globalData.infoModify[common.CC_REGISTER_SEX] = 0;
    }
    this.setData({
      sex: sexContent
    })

  },
  stroeTypeChange: function (e) {
    this.setData({
      storeTypeIndex: e.detail.value,
      stroeType: this.data.stroeTypeList[e.detail.value].gradeName
    })
    getApp().globalData.infoModify[common.CC_SHOP_TYPE] = this.data.stroeTypeList[e.detail.value].id;
    console.log(getApp().globalData.infoModify)
  },
  bindBankChange: function (e) {
    var index = e.detail.value;
    var bankName = this.data.bankList[index].bankName;
    var bankId = this.data.bankList[index].id;
    this.setData({
      bankIndex: e.detail.value,
      bankName: bankName
    })
    console.log("bankName=" + bankName + "bankId=" + bankId);
    getApp().globalData.infoModify[common.CC_BANK_TYPE_ID] = bankId;
  },
  bankTypeChange: function (e) {
    var bankIndex = e.detail.value;
    var bankTypeName = this.data.bankTypeList[bankIndex]
    this.setData({
      bankTypeindex: e.detail.value,
      bankType: bankTypeName
    })
    getApp().globalData.infoModify[common.CC_BANKCODE] = bankTypeName;
  },
  /**
  * 选择地址返回
  */
  selectArea(e) {
    console.log(e.detail)
    var typeValue = e.currentTarget.dataset.typeid;
    var province = "";
    for (var i = 0; i < e.detail.length; i++) {
      province = province + e.detail[i].name + " "
    }
    var addressId = e.detail[e.detail.length - 1].id;
    if (typeValue == "detail") {
      this.setData({
        addressValue: province
      })
      getApp().globalData.infoModify[common.CC_ADDRESS] = addressId;
      getApp().globalData.infoModify[common.CC_SEND_ADDRESSID] = addressId;
      getApp().globalData.infoModify[common.CC_ADDRESS_DETAIL] = this.data.detailAddress;
    } else
      if (typeValue == "bank") {
        this.setData({
          bankAddress: province
        })
        getApp().globalData.infoModify[common.CC_BANKADDRESS] = addressId;
      }


  },
  
})