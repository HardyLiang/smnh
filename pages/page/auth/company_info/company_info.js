// pages/page/auth/register/register.js
var util = require('../../../../utils/util.js')
var common = require('../../../../utils/common.js')
var app = getApp();
Page({
  data: {
    region: ['广东省', '广州市'],
    Address: ['广东省', '广州市', '天河区'],
    customItem: '全部',
    bankTypeindex: 0,
    bankType: ['个人账户', '公司账户'],
    bankIndex: 0,
    bank: ['建设银行', '建设银行'],
    detailAddress: "",//详细地址
    bankAccount: "",//银行户口
    bankName:"",//持卡人
    name:"",//姓名
    mobile:'',//手机号码
    addressValue:"请选择发货地区",
    bankAddressValue:"请选择开户地区"
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
  /**
   * 注册
   */
  bindregister: function () {
    if (util.checkListEmpty(this.data.Address, "亲，请选择地址喔!")) {
      return;
    }
    if (util.checkEmpty(this.data.detailAddress, "亲，请输入详细地址喔!")) {
      return;
    }

    if (util.checkEmpty(this.data.bankAccount, "亲，请输入银行号码!")) {
      return;
    }
    if (util.checkEmpty(this.data.bankName, "亲，请输入持卡人姓名!")) {
      return;
    }
    if (util.checkEmpty(this.data.name, "亲，请输入姓名!")) {
      return;
    }
    if (util.checkEmpty(this.data.mobile, "亲，请输入电话号码!")) {
      return;
    }
    console.log(getApp().globalData.userRegister)
    
    getApp().func.addPersonMsg(getApp().globalData.userRegister, function (message, res) {
      console.log("注册返回成功")
      console.log(res)
      if (!res) {
        wx.showModal({
          title: '提示',
          content: message,
          showCancel: false
        })
        return;
      } else {
        wx.showModal({
          title: '提示',
          content: message,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {//注册成功直接登录
              var that = this;
              var idCard = that.data.idCard;
              var password = idCard.substr(6, 8) + idCard.substr(16, 1);
              console.log(password);
              getApp().func.onLogin(idCard, password, function (message, res) {
                if (res) {//如果登录成功
                  event.emit(event.kLoginSuccessEventName, message);
                  setTimeout(function () {
                    wx.switchTab({
                      url: '../../../index/index',
                    })
                  }, 1000);

                } else {//登录失败，跳转登录页面
                  wx.navigateTo({
                    url: '../../auth/login/login',
                  })
                }
              })
            }
          }
        })
      }


    })

  },
  /**
   * 用户实时输入保存
   */
  bindAddressInput: function (e) {
    console.log(e.detail.value);
    var content = e.detail.value;
    var typeIndex = e.currentTarget.dataset.index;
    //根据类型进行赋值与保存
    if (typeIndex == "detailAddress") {//详细地址
      //赋值
      this.setData({
        detailAddress: content
      }),
        //保存入参
        app.globalData.userRegister[common.CC_ADDRESS] = content;

    } else
      if (typeIndex == "bankAccount") {//银行账号
        //赋值
        this.setData({
          bankAccount: content
        }),
          //保存入参
          app.globalData.userRegister[common.CC_BANKACCOUNT] = content;

      } else
        if (typeIndex == "bankName") {//持卡人
          //赋值
          this.setData({
            bankName: content
          }),
            //保存入参
            app.globalData.userRegister[common.CC_BANKNAME] = content;

        } else
          if (typeIndex == "name") {//姓名
            //赋值
            this.setData({
              name: content
            }),
              //保存入参
              app.globalData.userRegister[common.CC_REGISTER_NAME] = content;

          } else
            if (typeIndex == "mobile") {//手机号码
              //赋值
              this.setData({
                mobile: content
              }),
                //保存入参
                app.globalData.userRegister[common.CC_REGISTER_MOBILE] = content;

            }


    console.log(app.globalData.userRegister);
  },
  /**
   * 选择地址返回
   */
  selectArea(e){
    console.log(e.detail)
    var typeValue =e.currentTarget.dataset.typeid;

    console.log(typeValue)
    var province = "";
    for (var i = 0; i < e.detail.length; i++) {
      province = province + e.detail[i].name + " "
    }
    if(typeValue=="detail"){
      this.setData({
        addressValue: province
      })
    }else
      if (typeValue=="bank"){
        this.setData({
          bankAddressValue: province
        })
      }
    
  },
})