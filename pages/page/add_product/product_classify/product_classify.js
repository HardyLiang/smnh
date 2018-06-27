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
   this.setData({
     dishesList: this.data.navList[index].child_list
   })
  },

  onLoad() {
    var that =this;
    var firstItemId="";
    var res = wx.getStorageSync(common.CC_FARMERINFO);
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
      dishesList: res.data[that.data.curIndex].child_list
    })
    console.log(that.data.dishesList)
  })
  },
  /**
   * 小类点击
   */
  subGoodItem:function(e){
    console.log(e)
    //获取当前点击小类的信息
    var goodsId=e.currentTarget.dataset.id;
    var goodsName = e.currentTarget.dataset.name;
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