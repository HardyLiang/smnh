var event = require('../../../../utils/event.js')
var util = require('../../../../utils/util.js')
var common = require('../../../../utils/common.js')
Page({
  data: {
    photoBoxList:[],
    goodId:"",
    status:"",
    index:0,//记录要保存图片Index，
    tWidth: "",
    tHeight: ""
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
    if (typeStatus == "modify") {
      var info = wx.getStorageSync(common.CC_GOOD_INFO);
      console.log(info);
      var detailList = info.goods_details_img_list;
      var list =[];
      if(detailList!=null&&detailList.length>0){
        //给页面展示列表赋值
        this.setData({
          photoBoxList: detailList
        })
      }else{
        this.insertPhoto("");
      }
     
    }else{
      this.insertPhoto("");
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
          if (res.tempFiles[0].size > 2000000) {
            console.log(res.tempFiles[0].size)
            that.drawCanvas(res.tempFilePaths[0], index)
          }else{
            that.uploadImg(imgUrlDetail[0],index)
          }
          
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
  uploadImg:function(imgUrl,index){
    var that =this;
    wx.showLoading({
      title: '上传中...',
    })
    getApp().func.upLoadPicture(that.data.goodId,
      common.CC_UPLOAD_STATUS_MAIN_OTHER, imgUrl, "", "", function (message, res) {
        wx.hideLoading();
        console.log(res);
        var list = [];
        if (index < that.data.photoBoxList.length) {
          var newList = that.data.photoBoxList;
          newList[index] = res.url;
          that.setData({
            photoBoxList: newList,
          })
        } else {
          list.push(res)
          that.setData({
            photoBoxList: list,
          });
        }


      });
    console.log(that.data.photoBoxList)

  },

  addPicture:function(){
    var item="";
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
    var index = that.data.index;
      for (var i = 0; i < that.data.photoBoxList.length;i++){
        if (that.data.photoBoxList[i]==""){
         wx.showToast({
           title: '请选择图片上传，再保存！',
         })
         return;
        }
      }
      console.log('index====' + index + that.data.photoBoxList.length)
      wx.showLoading({
        title: '保存中',
      })
    getApp().func.modifyMainPic(
      this.data.goodId, this.data.photoBoxList, function(message,res){
        wx.hideLoading()
        console.log(res)
        if(res){
          wx.showModal({
            title: '提示',
            content: "保存产品详情成功！",
            confirmText: that.data.status == "modify" ? "返回详情" : "返回列表",
            success: function (res) {
              if (res.confirm) {
                if (that.data.status == "modify") {
                  event.emit(event.KUpdateGoodInfoSuccess, "修改成功")
                } else {

                }

                wx.navigateBack()
              }
            }
          })
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

  },
  // 缩放图片
  drawCanvas: function (url,index) {
    var that = this;
    wx.getImageInfo({
      src: url,
      success: function (res) {
        console.log(res);
        var ctx = wx.createCanvasContext('attendCanvasId');
        var canvasWidth = res.width//原图宽度 
        var canvasHeight = res.height;//原图高度
        console.log("canvasWidth=" + canvasWidth + "canvasHeight=" + canvasHeight)
        var tWidth = 320; //设置缩略图初始宽度 //可调
        var tHeight = 480; //设置缩略图初始高度 //可调
        if (canvasWidth > tWidth || canvasHeight > tHeight) {
          //按比例计算出缩略图的宽度和高度
          if (canvasWidth > canvasHeight * 1.8) {
            tHeight = Math.floor(parseFloat(canvasHeight) * (parseFloat(tWidth) / parseFloat(canvasWidth)));
          }
          else {
            tWidth = Math.floor(parseFloat(canvasWidth) * (parseFloat(tHeight) / parseFloat(canvasHeight)));
          }
        }
        else {
          tWidth = canvasWidth;
          tHeight = canvasHeight;
        }
        console.log("tWidth=" + tWidth + "tHeight=" + tHeight)
        that.setData({
          tWidth: tWidth,
          tHeight: tHeight
        })
        // //绘制新图
        ctx.drawImage(res.path, 0, 0, tWidth, tHeight)
        // ctx.drawImage(res.path,0, 0) 
        ctx.draw(false, function () {
          that.prodImageOpt(url, tWidth, tHeight,index)
        });//在回调进行保存不会出现空白
      }
    })



  },
  // 生成图片
  prodImageOpt: function (url, width, height,index) {
    console.log(url);
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'attendCanvasId',
      width: width,
      height: height,
      destWidth: width,
      destHeight: height,
      success: function success(res) {
        console.log(res)
        var path = res.tempFilePath;
        console.log(path);
        that.uploadImg(path,index)
      }
    });
  },
})