var app = getApp()
var common =require('../../../../utils/common.js')
var event =require('../../../../utils/event.js')
Page({
  data: {
    hidden: false,
    curNav: 0,
    curIndex: 0,
    navList: [],//存放左侧产品大类列表
    dishesList: [],
    dishes: [],
    deviceId:'',
  },
  loadingChange() {
    setTimeout(() => {
      this.setData({
        hidden: true
      })
    }, 1000)
  },
  /**
   * 点击大类获取小类
   */
  selectNav(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id,
    index = parseInt(e.target.dataset.index);
    this.setData({
      curNav: id,
      curIndex: index
    })
    this.getProductDictSub(id,this.data.deviceId);
  },

  onLoad() {
    var that =this;
    var firstItemId="";
    var res = wx.getStorageSync(common.CC_FARMERINFO);
    var deviceId = res.data.deviceId;
    //页面进入首先加载左侧菜单
    getApp().func.getProductDict(function(message,res){
      if(!res){//失败
        wx.showModal({
          title: '提示',
          content: message,
          showCancel:false,
          success:function(res){
            if(res.confirm){//左侧菜单获取不了退出页面
              wx.navigateBack();
            }
          }
        })
        return;
      }
    //成功给左侧列表赋值,并且默认第一项为点击
    firstItemId = res.data[0].id;
    that.setData({
      navList:res.data,
      curNav: firstItemId,
      deviceId: deviceId,
    })
    //获取右侧页面的项目
    that.getProductDictSub(firstItemId,deviceId);

    });

  },
  /**
   * 根据产品大类获取产品小类
   */
  getProductDictSub: function (id,deviceId){
    var that =this;
    getApp().func.getProductDictSub(id, deviceId, function (message, res) {
      console.log(res);
      if (!res) {//获取失败
        wx.showModal({
          title: '提示',
          content: 'message',
          confirmText: "重新获取",
          success: function (res) {
            if (res.confirm) {
              getProductDictSub(id, deviceId);
            }
          }
        })
      }
     //成功获取更新右侧列表产品小类列表、
     that.setData({
       dishesList:res.data
     })

    });
  },
  /**
   * 小类点击
   */
  subGoodItem:function(e){
    console.log(e)
    //获取当前点击小类的信息
    var goodsId=e.currentTarget.dataset.id;
    var goodsName=e.currentTarget.dataset.name;
    console.log("goodsId=" + goodsId + "goodsName=" + goodsName)
     var goodsItem={
       parrentId: this.data.curNav,
       goodsId: goodsId,
       goodsName: goodsName
     }
     //给上一个页面传信息
     event.emit(event.KChooseGoodItemSuccessEventName, goodsItem);
     //页面关闭
     wx.navigateBack();

  },
 

})