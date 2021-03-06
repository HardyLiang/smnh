var common = require('../../../utils/common.js')
var event = require('../../../utils/event.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrlValue: "",
    name: "",
    sex: "",
    storeType: "",
    storeTypeId: "",
    mobile: "",
    idCard: "",
    bankNum: "",
    bankName: "",
    bankAccount: "",
    bankType: "",
    bankAddress: "",
    detailAddress: "", 
    isReFresh: false,//是否刷新
    isHideStore:true,// 是否隐藏店铺信息，默认是隐藏,
    companyName:"",//
    legalPersonName:"",
    legalPersonIdCard:"",
    cropBack: "headImgInfoBack",//这个是设置裁剪返回的消息名称，可自定义，但是要唯一；
    storeName:"",
    storeType:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  onShow:function(){
    var that =this;
    //页面重现如果收到信息
    event.on(event.KInfoModifySuccess, this, function (data){
      console.log(data);
      that.getPersonMsg();
    });
    event.on(this.data.cropBack, this, function (data) {
      console.log("我收到裁剪图片啦" + data);
      var imgUrl = data;
      //联网修改图片
      wx.showLoading({
        title: '上传中',
      })
      getApp().func.upLoadPicture('', common.CC_UPLOAD_STATUS_HEAD, imgUrl, "", "", function (message, res) {
        wx.hideLoading()
        console.log("成功返回");
        console.log(res)
        if (!res) {
          wx.showModal({
            title: '提示',
            content: message,
            showCancel: false
          })
        } else {
          console.log(message)
          wx.showModal({
            title: '提示',
            content: message,
            showCancel: false
          })
          that.setData({
            imgUrlValue: res.url
          })
          var info=wx.getStorageSync(common.CC_FARMERINFO)
          info.data.store_information.store_logo = res.url
          wx.setStorageSync(common.CC_FARMERINFO, info);
          console.log(res.url)
        }
      });
    });

  },
  onUnload:function(){
    event.remove(this.data.cropBack,this);
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
    getApp().func.getPersonMsg(function(message,res){
      console.log("获取信息返回")
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
      
      console.log("更新信息")
      that.updateView(res);
    })
  },
  /**
 * 
 */
  uploadImg: function () {
    var that =this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        wx.navigateTo({
          url: `../upload/upload?src=${src}&cropBack=` + that.data.cropBack
        })
      }
    })
  },
  /**
   * 修改信息
   */
  bindEditInfo:function(res){

    //如果是公司，修改是让用户选择修改哪种信息；
    if (this.data.storeType == "旗舰店" || this.data.storeTypeId=="9"){
      wx.showActionSheet({
        itemList: ['修改基本信息', '修改营业执照', '修改身份证'],
        success: function (res) {
          console.log(res.tapIndex)
          if (res.tapIndex == 0) {
            console.log(res.tapIndex)
            wx.navigateTo({
              url: 'edit_info/edit_info',
            })
          } else
            if (res.tapIndex == 1) {
              console.log(res.tapIndex)
              wx.navigateTo({
                url: '../../page/auth/company_license/company_license?type=modify',
              })
            } else
              if (res.tapIndex == 2) {
                console.log(res.tapIndex)
                wx.navigateTo({
                  url: '../../page/auth/company_idCard/company_idCard?type=modify',
                })
              }
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    }else{
      wx.navigateTo({
        url: 'edit_info/edit_info',
      })
    }
  

  },
  /**
   * 更新页面信息
   */
  updateView:function(res){
    console.log("更新信息开始")
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
    var detailAddress = res.data.store_information.ship_area_name + res.data.store_information.ship_address;
    var storeType = res.data.store_information.store_type;
    var storeTypeId= res.data.store_information.store_type_id;
    var isHideStore = true;
    if (storeType != null && storeType == "旗舰店"||storeTypeId=="9") {
      isHideStore = false;
    } else {
      isHideStore = true;
    }
    this.setData({
      imgUrlValue: res.data.store_information.store_logo,
      name: res.data.user_information.true_name,
      sex: sex,
      storeType: storeType,
      storeTypeId: storeTypeId,
      mobile: res.data.store_information.store_telephone,
      idCard: res.data.user_information.sCard,
      bankNum: res.data.store_information.bank_c_account,
      bankName: res.data.store_information.bank_type_name,
      bankAccount: res.data.store_information.bank_account_name,//持卡人
      bankType: res.data.store_information.bank_line_num,
      bankAddress: res.data.store_information.bank_area_name,
      detailAddress: detailAddress,
      isHideStore: isHideStore,
      storeName: res.data.store_information.store_name,
      storeType: res.data.store_information.store_type,
      companyName: res.data.store_information.license_c_name,//
      legalPersonName: res.data.store_information.license_legal_name,
      legalPersonIdCard: res.data.store_information.license_legal_idCard
    })
    console.log("更新成功结束")
  }
})