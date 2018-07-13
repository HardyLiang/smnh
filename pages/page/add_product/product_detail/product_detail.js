var event = require('../../../../utils/event.js')
var util = require('../../../../utils/util.js')
var common = require('../../../../utils/common.js')
Page({
  data: {
    photoBoxList:[],
    saveImgList:[],
    goodId:"",
    status:"",
    index:0,//记录要保存图片Index，
    isModify:false,
  },

  onLoad: function (options) {
    //获取传送过来的类型
    var that = this;
    //获取传过来的状态
    var typeStatus = options.type
    var thisId = options.goodId;
    console.log(typeStatus)
    console.log(thisId)
    //保存属性信息
    that.setData({
      goodId: thisId,
      status: typeStatus,
    })
    
    //判断当前属性是修改还是新增
    var item = {
      id: "",
      url: ""
    }
    if (typeStatus == "modify") {
      var info = wx.getStorageSync(common.CC_GOOD_INFO);
      console.log(info);
      var detailList = info.goods_details_img_list;
      var list =[];
      if(detailList!=null&&detailList.length>0){
        //给页面展示列表赋值
        for (var i = 0; i < detailList.length;i++){
          var item ={id:"",url:""}
          item.url = detailList[i]
          list.push(item)
        }
        this.setData({
          saveImgList: detailList,
          photoBoxList:list
        })
        
      }else{
        this.insertPhoto(item);
      }
     
    }else{
      this.insertPhoto(item);
    }
  
  
  },
  /**
    * 上传详情图 只能一张
    */
  chooseDetailImage: function (e) {
    var that = this;
    var index =e.currentTarget.dataset.index;
    console.log(e)
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          console.log(res)
          // var indexPic = res.currentTarget.dataset.indexPic;
          var imgUrlDetail = res.tempFilePaths;
         
          getApp().func.upLoadPicture(that.data.goodId, 
            common.CC_UPLOAD_STATUS_MAIN_OTHER, imgUrlDetail[0], "", "", function(message,res){
              console.log(res);
              var list = [];
              if (index < that.data.photoBoxList.length){
                var newList = that.data.photoBoxList;
                newList[index].url = res.url;
                newList[index].id =res.id 
                that.setData({
                  photoBoxList: newList,
                  isModify:true
                })
              }else{
                list.push(res)
                that.setData({
                  photoBoxList: list,
                  isModify: true
                });
              }
             
              
          });
          console.log(that.data.photoBoxList)
        },
        fail: function () {
          wx.showToast({
            icon: 'none',
            title: "上传失败~"
          })
        },
        complete: function () {
          // complete
        }
      })
   
  }, 
  addPicture:function(){
    var item={
      id:"",
      url:""
    }
    this.insertPhoto(item)
  },
  // 添加图片部分
  insertPhoto: function (imgUrlDetail) {
    console.log(111);
    var list =[];
    if (this.data.photoBoxList != null && this.data.photoBoxList.length>0){
      for (var i = 0; i < this.data.photoBoxList.length;i++){
        list.push(this.data.photoBoxList[i])
      }
      
      console.log("列表"+list.toString)
    }
    list.push(imgUrlDetail);
    console.log(list)
    this.setData({
      photoBoxList: list
    })
  },
  /**
   * 保存图片
   */
  uploadPic:function(e){
    var that =this;
    var oldPictureUrl=''
    var index = that.data.index;
    if(that.data.status!="modify"){
      for (var i = 0; i < that.data.photoBoxList.length;i++){
        if (that.data.photoBoxList[i].url==""){
         wx.showToast({
           title: '请选择图片上传，再保存！',
         })
         return;
        }
      }
    }else{
      if (!that.data.isModify){
        wx.showToast({
          title: '亲，请先修改再保存！',
        })
        return;
      }
    }
    console.log('index====' + index + that.data.photoBoxList[index].id)
    if (that.data.saveImgList != null && that.data.saveImgList.length > index){
      oldPictureUrl = that.data.saveImgList[index]
    }
    getApp().func.modifyMainPic(
      this.data.goodId, oldPictureUrl, that.data.photoBoxList[index].id, function(message,res){
        console.log(res)
        if(res){
          index++
            event.emit(event.KUploadDetailSuccess, index) 
        }else{
          wx.showModal({
            title: '提示',
            content: message,
            showCancel:false
          })
        }

    })
  

  },
  onShow:function(e){
    var that =this;
    event.on(event.KUploadDetailSuccess,this,function(res){
      console.log("姜哥，成功了，我收到信息了"+res)
      that.setData({
        index:res
      })
      if (res >= that.data.photoBoxList.length){
        
          wx.showModal({
            title: '提示',
            content: "保存产品详情成功！",
            confirmText: that.data.status == "modify" ? "返回详情" : "返回列表",
            success: function (res) {
              if (res.confirm) {
                if(that.data.status=="modify"){
                  event.emit(event.KUpdateGoodInfoSuccess, "修改成功")
                }else{
                  
                }
               
              wx.navigateBack()
              }
            }
          })
        
      }else{
        that.uploadPic();
      }
     
    })
  },
  /**
   * 删除
   */
  deleteList:function(e){
    var that =this;
    var list =[];
    list = that.data.photoBoxList
    console.log(e);
   var index =e.currentTarget.dataset.index;
   if (list.length==1){
     wx.showToast({
       title: '亲，不能再删除了！',
     })
     return;
   }
   if (index < list.length){
     list.splice(index,1)
   }
   console.log(list)
   that.setData({
     photoBoxList:list
   })

  },
  /**
   * 上移
   */
  upChangePosition:function(e){
    var that = this;
    console.log(e);
    var index = e.currentTarget.dataset.index;
    if(index==0){
      wx.showToast({
        title: '亲，不能再上移了！',
      })
      return;
    }
    var changeList =this.changePosition(index, index-1)
    that.setData({
      photoBoxList: changeList
    })
    
  },
  /**
  * 下移
  */
  downChangePosition: function (e) {
    var that = this;
    console.log(e);
    console.log(that.data.photoBoxList.length);
    var index = e.currentTarget.dataset.index;
    if (that.data.photoBoxList.length == 0 || index== that.data.photoBoxList.length-1) {
      wx.showToast({
        title: '亲，不能再下移了！',
      })
      return;
    }
    var changeList=this.changePosition(index, index + 1)
    that.setData({
      photoBoxList: changeList
    })

  },
  /**
   *更新位置
   */
  changePosition(oldPosition,newPosition){
    var list = [];
    list = this.data.photoBoxList
    var itemOld,itemNew;
    if (oldPosition < list.length && newPosition < list.length){
      itemOld=list[oldPosition]
      itemNew = list[newPosition]
      list[oldPosition]=itemNew;
      list[newPosition] = itemOld;
      console.log(list)
    }
    return list;

  }
})