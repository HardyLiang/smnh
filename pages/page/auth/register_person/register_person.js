var common =require('../../../../utils/common.js');
var util =require("../../../../utils/util.js")
var event =require("../../../../utils/event.js")
Page({
  data: {
    infoType:"个人信息",//抬头信息
    index: 0,
    idCard:"",
    name:"",
    tipIdcardMessage:"",//身份证信息是否可用提示
    mobile:"",
    tipMobileMessage: "",//手机号码信息是否可用提示
    sex: ['男', '女'],
    sexValue:"1",
    Farmerindex: 0,
    FarmerType: ['贫困户', '普通户'],
    region: ['广东省', '广州市'],
    Address: ['广东省', '广州市', '天河区'],
    customItem: '全部',
    bankTypeindex: 0,
    bankType: ['个人账户', '公司账户'],
    bankIndex: 0,
    bank: [],
    addressValue: "请选择发货地区",
    detailAddress:"",
    bankAccount: "",//银行户口
    bankName: "",//持卡人
    bankAddressValue: "请选择开户地区"
  },
  bindSexChange: function (e) {
    // console.log('picker携带值', e.detail.value)
    var sex =e.detail.value;
    var sexId="";
    if(sex=="男"){
      sexId="1";
    }else{
      sexId="2";
    }
    this.setData({
      index: e.detail.value,
      sexValue:sexId
    })
    getApp().globalData.userRegister[common.CC_REGISTER_SEX] = sexId;
  },
  bindFarmerChange: function (e) {
    this.setData({
      Farmerindex: e.detail.value
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
    var index =e.detail.value
    var bankName = this.data.bank[index].bankName;
    var bankId =this.data.bank[index].id;
    console.log("bankName=" + bankName + "bankId=" + bankId);
    getApp().globalData.userRegister[common.CC_BANK_TYPE_ID] = bankId;
  },
  onLoad: function (options) {
    var that =this;
    console.log(options)
    //进来这个页面默认性别是男
    getApp().globalData.userRegister[common.CC_REGISTER_SEX] = "1";
    //进来默认是个人账户
    getApp().globalData.userRegister[common.CC_BANKCODE] = "个人账户";

    //获取过来的企业状态
    var regType = options.type;
    if(regType!=null&&regType=="company"){//公司注册
      this.setData({
        infoType: "联系人信息"
      })

    }else
      if (regType != null && regType == "person"){//个人注册
      this.setData({
        infoType:"个人信息"
      })
      }
    //获取银行信息
    getApp().func.getBankType(function (message,res){
      console.log("获取银行成功")
      console.log(res)
      that.setData({
        bank: res.data

      })
      
      getApp().globalData.userRegister[common.CC_BANK_TYPE_ID] = res.data[0].id;
    })
   //弹出窗口
    this.dialog = this.selectComponent("#dialog");
    // this.dialog.showDialog();
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 身份证失去焦点后触发
   */
  bindblurIdCard:function(e){
    var content =e.detail.value;
    var that =this;
    console.log(content);
    //如果用户输入地长度大于10以上检测该身份证是否可以用
    if(content.length>10){
      getApp().func.getIdCardCheck(content,function(message,res){
        if(!res){
          return;
        }
        if (message != null && message.search("该身份证已被使用")!=-1){
          that.setData({
            tipIdcardMessage: message
          })

        }else{
          that.setData({
            tipIdcardMessage: ""
          })
        }
      });
      getApp().globalData.userRegister[common.CC_REGISTER_IDCARD] = content; 
    }
    that.setData({
      idCard: content
    })
  },
  /**
   * 手机号码失去焦点后触发
   */
  bindblurIdMobile: function (e) {
    var content = e.detail.value;
    var that = this;
    console.log(content);
    //如果用户输入地长度大于7以上检测该身份证是否可以用
    if (content.length > 7) {
      getApp().func.getmobileCheck(content, function (message, res) {
        if (!res) {
          return;
        }
        if (message != null && message.search("该手机号已被使用") != -1) {
          that.setData({
            tipMobileMessage: message
          })
        }else{
          that.setData({
            tipMobileMessage: ""
          })
        }
      });
    }
    getApp().globalData.userRegister[common.CC_REGISTER_MOBILE] = content;
    that.setData({
      mobile: content
    })
  },
  /**
   * 姓名
   */
  bindblurIdName:function(e){
    var content = e.detail.value;

    getApp().globalData.userRegister[common.CC_REGISTER_NAME] = content;
    this.setData({
      name: content
    })

  },
  /**
   * 详细地址
  */
  bindblurIdDetailAddress: function (e) {
    var content = e.detail.value;
    getApp().globalData.userRegister[common.CC_ADDRESS_DETAIL] = content;
    this.setData({
      detailAddress: content
    })
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
    var addressId = e.detail[e.detail.length-1].id;
      if (typeValue == "detail") {
        this.setData({
          addressValue: province
        })
        getApp().globalData.userRegister[common.CC_ADDRESS] = addressId;
        getApp().globalData.userRegister[common.CC_SEND_ADDRESSID] = addressId; 
      } else
        if (typeValue == "bank") {
          this.setData({
            bankAddressValue: province
          })
          getApp().globalData.userRegister[common.CC_BANKADDRESS] = addressId; 
        }
     

  },
  /**
   * 注册店铺
   */
  registerShop:function(){
    var that = this;
    this.dialog.showDialog();
    return;
    if (util.checkEmpty(this.data.idCard,"请输入您的身份证号码!")){
      return;
    }
    if (util.checkEmpty(this.data.name, "请输入您姓名!")) {
      return;
    }
    if (util.checkEmpty(this.data.mobile, "请输入您的手机号!")) {
      return;
    }
    if (util.checkEmptyChoose(this.data.addressValue, "请选择发货区域！")) {
      return;
    }
    if (util.checkEmpty(this.data.detailAddress, "请输入详细地址")) {
      return;
    }
    if (util.checkEmpty(this.data.bankAccount, "请输入银行卡号")) {
      return;
    }
    if (util.checkEmpty(this.data.bankName, "请输入持卡人姓名")) {
      return;
    }
    if (util.checkEmpty(this.data.bankAddressValue, "请选择开户省市")) {
      return;
    }
    console.log(getApp().globalData.userRegister)
    getApp().func.addPersonMsg(getApp().globalData.userRegister,function(message,res){
      console.log("注册返回成功")
      console.log(res)
      if(!res){
        wx.showModal({
          title: '提示',
          content: message,
          showCancel:false
        })
        return;
      }else{
        wx.showModal({
          title: '提示',
          content: message,
          showCancel: false,
          success:function(res){
            if(res.confirm){//注册成功直接登录
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
   * 银行卡号输入监听
   */
  bindInputBank:function(e){
    var bankCotent = e.detail.value;
    this.setData({
      bankAccount:bankCotent
    })
    console.log(bankCotent)
    getApp().globalData.userRegister[common.CC_BANKACCOUNT] = bankCotent;
  },
  /**
  * 持卡人输入监听
  */
  bindInputBankName: function (e) {
    var bankCotentName = e.detail.value;
    this.setData({
      bankName: bankCotentName
    })
    console.log(bankCotentName)
    getApp().globalData.userRegister[common.CC_BANKNAME] = bankCotentName;
  },
  /**
   * 开户类型
   */
  bankTypeChange:function(e){
    console.log(e)
    var position = e.detail.value
    var name = this.data.bankType[position];
    getApp().globalData.userRegister[common.CC_BANKCODE] = name;
    console.log(getApp().globalData.userRegister[common.CC_BANKCODE])
  },

  
  //取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    this.dialog.hideDialog();
  }

})