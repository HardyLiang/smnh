var util= require('../../../../utils/util.js')
var common =require('../../../../utils/common.js')
Page({
  data: {
    companyName:"",
    legalPersonName:"",
    legalPersonIdCard:"",
  },

  onLoad: function (options) {
  
  },
  // 下一步
  nextRegister: function (e) {
    if (util.checkEmpty(this.data.companyName,"请输入企业名称")){
      return;
    }
    if (util.checkEmpty(this.data.legalPersonName,"请输入公司法人名称")) {
      return;
    }
    if (util.checkEmpty(this.data.legalPersonIdCard,"请输入法人身份证号")) {
      return;
    }
    
    wx.navigateTo({
      url: `../company_license/company_license`
    })
  },
  bingContentChange:function(e){
    console.log(e)
    var typeIndex=e.currentTarget.dataset.index;
    var content =e.detail.value;
    if (typeIndex==1){//企业名称
    this.setData({
      companyName:content
    })
    getApp().globalData.userRegister[common.CC_COMPANY_NAME]=content;
    }else
      if (typeIndex == 2){//法人名称
        this.setData({
          legalPersonName: content,
        })
        getApp().globalData.userRegister[common.CC_LEGAL_NAME] = content;
      } else
        if (typeIndex == 3) {//法人身份证
          this.setData({
            legalPersonIdCard: content
          })
          getApp().globalData.userRegister[common.CC_LEGAL_IDCARD] = content;
        }
    console.log(getApp().globalData.userRegister)
  }

})