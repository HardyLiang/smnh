
var event = require('../../../utils/event.js')
var common = require('../../../utils/common.js')
var util = require('../../../utils/util.js')
var app = getApp()
Page({
  data: {
    status:'',//状态，是发布还是修改
    showView: false,  //是否分销
    showInv: false,//是否显示规格配置
    imageList: [],
    chooseGoods: "", //显示用户选择的产品类型，
    chosseGoodsId: "",//存放用户选择的产品的Id，
    goodname: "",//产品名称
    miniNumber: "",//零售价
    spec: "",//规格
    specdescription: "",//规格描述
    stock: "",//库存
    profit: "",//让利
    remark: "",//发货说明
    normLists: [], //规格列表，
    invType:"all",//库存配置存储字段
    allItem:[{   //全局配置的项目内容暂存
      sequence:0,
      price:"",
      count:"",
      name:""
    }],
    packDetails:"",//全局规格的时候的规格描述
    allCheck:true,
    specCheck:false,
    isShowSpec:false,//是否显示库存配置，如果是修改就不能显示
    isShowModify:false,//是否显示修改规格，
    confirmName:"确认发布",//底部按钮名称
  },

  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    app.globalData.productPublic={}
    var statusType =options.type
    var goodId = options.goodId
    if (statusType!=null){
      this.setData({
        status: statusType
      })
    }
    
    if (statusType=="modify"){//修改
      wx.setNavigationBarTitle({
        title: "产品修改",//页面标题为路由参数
      })
      app.globalData.productPublic[common.CC_PRODUCT_GOOD_ID] = goodId;
     
      var info = wx.getStorageSync(common.CC_GOOD_INFO);
      var profit = info.shareCommission == null ? 0 : info.shareCommission;
      app.globalData.productPublic[common.CC_PRODUCT_PROFIT_2] = profit;
      console.log(info)
      var goodsInvenType = info.goodsInventoryType;
      var showInv =false;
      var allCheck =true;
      var specCheck =false;
      var showView =false;
      var isShowModify=false;
      app.globalData.productPublic[common.CC_GOODS_INVENTORY_DETAIL] = info.goodsInventoryDetail;
      app.globalData.productPublic[common.CC_PRODUCT_SPECS_INFO] = info.goods_gsp_val;
      if (goodsInvenType=="spec"){//规格配置
        app.globalData.productPublic[common.CC_PRODUCT_INV_TYPE] = "spec"
      console.log("规格配置")
        showInv =true;
        allCheck=false;
        specCheck=true;
        var goodsInventoryDetail = info.goodsInventoryDetail;
        var goodsGspVal = info.goods_gsp_val;
        if (goodsInventoryDetail.length > 0) {
          var id = goodsInventoryDetail[0].id;
          var idList = id.split('_')
          if(idList.length>2){//多维
            isShowModify =true;
          }else{//单维规格
            isShowModify=false;
            console.log("单维规格" + goodsInventoryDetail.length)
            
            //增加规格
            for (var i = 0; i < goodsInventoryDetail.length;i++){
              var name ="";
              var idlists = goodsInventoryDetail[i].id.split("_")
              var idlistsId = idlists[0]
              for (var y = 0; y < goodsGspVal.length;y++){
                if (idlistsId == goodsGspVal[y].id){
                  name = goodsGspVal[y].name
                }
              }
              this.addNormListByContent(name, goodsInventoryDetail[i].price, goodsInventoryDetail[i].count)
            }

          }
        } else {
          isShowModify=false;
        }
      } else {
        app.globalData.productPublic[common.CC_PRODUCT_INV_TYPE] = "all"
        var mAllItemPrice = 'allItem[' + 0 + '].price';
        var mAllItemName = 'allItem[' + 0 + '].name';
        var mAllItemCount = 'allItem[' + 0 + '].count';
        this.setData({
          [mAllItemPrice]: info.goodsPrice,
          [mAllItemCount]: info.goodsInventory,
          [mAllItemName]: info.goods_gsp_val[0].name,
          spec: info.goods_gsp_val[0].name
        })
        console.log(this.data.allItem)
        console.log(this.data.spec)
        showInv = false;
        allCheck = true;
        specCheck = false;
      }
      if (info.shareCommission == null && info.shareCommission == "" || info.shareCommission=="0"){
        showView=false;
      }else{
        showView = true;
      }

      var goodsPrice=info.goodsPrice;
      console.log(goodsPrice)
      //给页面赋值
      this.setData({
        status: statusType,
        chooseGoods:info.goodsName,//产品类型
        goodname: info.dsbGoodsName,//产品名称
        miniNumber: goodsPrice,//零售价
        showInv: showInv,
        allCheck: allCheck,
        specCheck: specCheck,
        stock: info.goodsInventory,//库存
        profit: info.shareCommission,//让利
        remark: info.deliveryTips,//发货说明
        invType: goodsInvenType,//库存配置存储字段
        specdescription: info.packDetails,//规格描述
        showView: showView,
        isShowSpec:true,
        isShowModify: isShowModify,
        confirmName: "确认修改"
      })
    }else{
      //进入页面首先赋值给让利金0；让利金现在是必传。没有传0
      app.globalData.productPublic[common.CC_PRODUCT_PROFIT] = 0;
    var showView = true;
    showView: (showView == "true" ? true : false)
    //默认进去就是全局配置
    app.globalData.productPublic[common.CC_PRODUCT_INV_TYPE] = 'all';
    //默认进去就获取店铺的发货地址
    var farmerInfo = wx.getStorageSync(common.CC_FARMERINFO);
    var areaId = farmerInfo.data.store_information.area_id;
    if (areaId != null && areaId != "") {//地址不为空的时候给组参进行赋值
      app.globalData.productPublic[common.CC_PRODUCT_AREA_ID] = areaId;
    } else {
      app.globalData.productPublic["goodsDetails"] =this.data.remark; 
      wx.showModal({
        title: '提示',
        content: '亲，你没有设置发货地址，请进入我的信息进行修改！',
        success: function (res) {
          if (res.confirm) {//跳转到我的信息
          wx.navigateTo({
            url: '../../../../../info_list/info_list',
          })
          }
        }
      })
    }
    }

  },
  onChangeShowState: function (e) {
    console.log(e)
    var that = this;
    var profit = that.data.profit
    that.setData({
      showView: (!that.data.showView),
      profit: that.data.showView ? "" : profit
    })
    if (that.data.status=="modify"){
      app.globalData.productPublic[common.CC_PRODUCT_PROFIT_2] = "0";
    }else{
      app.globalData.productPublic[common.CC_PRODUCT_PROFIT] = "0";
    }
  },

  // 上传图片
  chooseImage: function () {//这里是选取图片的方法
    var that = this,
      imageList = this.data.imageList;
    console.log(imageList.length)
    if (imageList.length <= 4) {
      wx.chooseImage({
        count: 5 - imageList.length, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          // const src = res.tempFilePaths[0]
          var imgsrc = res.tempFilePaths;
          // wx.navigateTo({
          //   url: `../upload/upload?imgsrc=${imgsrc}`
          // })
          // var imgsrc = res.tempFilePaths;
          imageList = imageList.concat(imgsrc);
          that.setData({
            imageList: imageList
          });
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
      return;
    } else {
      wx.showToast({
        icon: 'none',
        title: "最多只能上传5张哦~"
      })
    }
  },
  // 预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  /**
   * 用户点击跳转选择产品页面
   */
  onProductClassify: function (event) {
    if (this.data.status=="modify"){
      wx.showModal({
        title: '提示',
        content: '亲，不能修改产品名称',
        showCancel:false
      })
      return;
    }
    wx.navigateTo({
      url: "product_classify/product_classify"
    })
  },
  /**
 * 用户点击跳转产品主图
 */
  onProductImg: function (event) {
    wx.navigateTo({
      url: "product_img/product_img"
    })
  },
  /**
 * 用户点击跳转产品详情页
 */
  onProductDetail: function (event) {
    wx.navigateTo({
      url: "product_detail/product_detail"
    })
  },
  /**
* 编辑更多规格
*/
  editMoreNorm: function (event) {
    wx.navigateTo({
      url: "edit_more_norm/edit_more_norm"
    })
  },

  /**
* 新增规格
*/
  addNormList: function (e) {
    var position = this.data.normLists.length;
    var newNormItem = {
      sequence: position,
      name: "",
      price: "",
      count: "",
    }
    var normList = this.data.normLists;
    console.log(newNormItem)
    normList.push(newNormItem);
    this.setData({
      normLists: normList
    })
    if (this.data.status == "modify") {
      app.globalData.productPublic[common.CC_PRODUCT_SPECS_INFO].push(newNormItem)
    }
    console.log(app.globalData.productPublic[common.CC_PRODUCT_SPECS_INFO])

  },
  addNormListByContent: function (strName, strPrice, strCount) {
    var position = this.data.normLists.length;
    var newNormItem = {
      sequence: position,
      name: strName,
      price: strPrice,
      count: strCount,
    }
    var normList = this.data.normLists;
    console.log(newNormItem)
    normList.push(newNormItem);
    this.setData({
      normLists: normList
    })
  },
  /**
* 删除规格列表
*/
  deleteNormList: function (e) {
    var normIndex = e.currentTarget.dataset.index;
    console.log(e);
    console.log(normIndex);
    var newNormList = this.data.normLists;
    newNormList.splice(normIndex,1);
    this.setData({
      normLists: newNormList
    })
    if (this.data.status == "modify" &&this.data.invType == "spec") {
      var specList = app.globalData.productPublic[common.CC_PRODUCT_SPECS_INFO];
      var inveList = app.globalData.productPublic[common.CC_GOODS_INVENTORY_DETAIL];
      if (normIndex >= inveList.length && normIndex< specList.length){
        specList.splice(normIndex, 1)
      }else{
        var thisInveList = inveList[normIndex];
        var idList = thisInveList.id.split('_')
        var idListId = idList[0];
        for (var i = 0; i < specList.length; i++) {
          if (idListId == specList[i].id) {
            specList.splice(i, 1)
          }
        }
        inveList.splice(normIndex, 1)
      }
      app.globalData.productPublic[common.CC_PRODUCT_SPECS_INFO] = specList;
      app.globalData.productPublic[common.CC_GOODS_INVENTORY_DETAIL] = inveList;
      }
    console.log(app.globalData.productPublic[common.CC_PRODUCT_SPECS_INFO] )
  },
  onShow: function () {
    var that = this;
    //获取事件传递信息
    event.on(event.KChooseGoodItemSuccessEventName, this, function (data) {
      console.log("用户选完了产品了。我收到了");
      console.log(data);
      that.setData({
        chooseGoods: data.goodsName,
        chosseGoodsId: data.goodsId
      })
      app.globalData.productPublic[common.CC_PRODUCT_TYPE] = data.goodsId;
    })
    event.on(event.KEVGGspValSuccess,this,function(data){
      console.log("修改完多规格。我收到了");
      console.log(data);
      app.globalData.productPublic[common.CC_GOODS_INVENTORY_DETAIL]=data;

    })

  },
  onUnload: function () {
    event.remove(event.KChooseGoodItemSuccessEventName, this)
    event.remove(event.KEVGGspValSuccess, this)
  },
  /**
   * 用户输入绑定
   */
  bindInputChange: function (e) {
    console.log(e)
    var typeName = e.currentTarget.dataset.typename;
    var content = e.detail.value;
    console.log(content);
    if (!typeName) {
      return;
    }
    
    switch (typeName) {
      case "goodname":
        console.log("goodname")
        app.globalData.productPublic[common.CC_PRODUCT_NAME] = content;
        this.setData({
          goodname: content
        })
        break;
      case "mininumber":
        console.log("mininumber")
        app.globalData.productPublic[common.CC_PRODUCT_MININUMBER] = content;
        var mAllItem = 'allItem[' + 0 + '].price';
        this.setData({
          mininumber: content,
          [mAllItem]:content
        })
        break;
      case "spec":
        console.log("spec")
        app.globalData.productPublic[common.CC_PRODUCT_SPEC] = content;
        this.setData({
          spec: content
        })
        break;
      case "specdescription":
        console.log("specdescription")
        app.globalData.productPublic[common.CC_PRODUCT_SPEC_DESCRIPTION] = content;
        this.setData({
          specdescription: content
        })
        break;
      case "stock":
        console.log("stock")
        app.globalData.productPublic[common.CC_PRODUCT_STOCK] = content;
        var mAllItem = 'allItem[' + 0 + '].count';
        this.setData({
          stock: content,
          [mAllItem]: content
        })
        break;
      case "profit":
        console.log("profit")
        if (this.data.status == "modify") {
          app.globalData.productPublic[common.CC_PRODUCT_PROFIT_2] = content;
        } else {
          app.globalData.productPublic[common.CC_PRODUCT_PROFIT] = content;
        }
        
        this.setData({
          profit: content
        })
        break;
      case "remark":
        console.log("remark")
        app.globalData.productPublic[common.CC_PRODUCT_REMARK] = content;
        this.setData({
          remark: content
        })
        break;
      case "allItemName":
        var mAllItem = 'allItem[' + 0 + '].name';
        app.globalData.productPublic[common.CC_PRODUCT_DSB_GOOD_UNIT] = content;
        app.globalData.productPublic[common.CC_PRODUCT_SPECS_INFO][0].name=content;
        this.setData({
          [mAllItem]: content
        })
      break;
      case "packDetails":
        app.globalData.productPublic[common.CC_PRODUCT_SPEC_DESCRIPTION] = content;
       this.setData({
         packDetails:content
       })
      default:
        break;


    }
    console.log(app.globalData.productPublic)

  },
  /**
   * 确认发布
   */
  nextRegister: function (e) {
    console.log("下一步")
    var params = app.globalData.productPublic;
    console.log(params)
    if (this.data.status=="modify"){//修改
      if (JSON.stringify(params) == "{}"){
        wx.showToast({
          title: '请至少修改一个参数',
        })
      }
       var specInfo= app.globalData.productPublic[common.CC_PRODUCT_SPECS_INFO]
       var inveInfo = app.globalData.productPublic[common.CC_GOODS_INVENTORY_DETAIL]
       if (specInfo != null && specInfo.length>0){
         app.globalData.productPublic[common.CC_PRODUCT_SPECS_INFO] = JSON.stringify(specInfo);
         app.globalData.productPublic[common.CC_GOODS_INVENTORY_DETAIL] = JSON.stringify(inveInfo);
       }
    
      getApp().func.updateOnlyProduct(params, function (message, res) {
        wx.hideLoading();
        console.log("修改返回" + message)
        if (!res) {
          wx.showModal({
            title: '提示',
            content: message,
            showCancel: false
          });
          return;
        }
        //修改成功
        wx.showToast({
          title: '修改信息成功',
        })
        event.emit(event.KUpdateGoodInfoSuccess, message)
        wx.navigateBack()
      });

    }else{
    //首先检测用户每个参数是否填写完整；
    if (util.checkEmpty(this.data.chooseGoods,"请选择产品类型")){
      return;
    }
    if (util.checkEmpty(this.data.goodname, "请输入产品名称")) {
      return;
    }
    console.log(this.data.mininumber)
    if (util.checkEmpty(this.data.mininumber, "请输入零售价")) {
      return;
    }
    if (this.data.invType == "all"){
      if (util.checkEmpty(this.data.allItem[0].count, "请输入库存")) {
        return;
      }
      if (util.checkEmpty(this.data.allItem[0].name, "请输入规格")){
        return;
      }
    }else
      if (this.data.invType == "spec"){
        for(var i =0 ;i<this.data.normLists.length;i++){
          if (util.checkEmpty(this.data.normLists[i].name, "请输入第"+(i+1)+"个的规格")) {
            return;
          }
          if (util.checkEmpty(this.data.normLists[i].price, "请输入第" + (i + 1) +"个的价格")) {
            return;
          }
          if (util.checkEmpty(this.data.normLists[i].count, "请输入第" + (i + 1) + "个的库存")) {
            return;
          }
        }
        
      }

    
    if (this.data.invType=="spec"){//规格配置
      params[common.CC_PRODUCT_SPECS_INFO] = JSON.stringify(this.data.normLists);
    }else
      if (this.data.invType == "all"){//全局配置
        params[common.CC_PRODUCT_SPECS_INFO] = JSON.stringify(this.data.allItem);
        params[common.CC_PRODUCT_PACK_DETAILS] = this.data.packDetails;
      }
    //联网获取数据
    app.func.addOnlyProduct(params, function (message, res) {
      console.log(res)
      if (!res) {//失败
        wx.showModal({
          title: '提示',
          content: message,
          showCancel: false
        })
        return;
      } else {//成功，跳转回产品列表页
        //通知我的产品列表页面告诉他老子发布成功了
        var goodId = res.data;
        event.emit(event.KProductPublishSuccess, message);
        //发布成功跳转到上传产品主图
        wx.redirectTo({
          url: "product_img/product_img?type=add&goodId=" + goodId
        })
      } 
    });
    }
  },
  /**
   * 选择规格配置
   */
  radioChange: function (e) {
    console.log(e)
    var invType = e.detail.value;
    if (invType != null) {//不为空，给组参设置内容
      app.globalData.productPublic[common.CC_PRODUCT_INV_TYPE] = invType;
      var showView = false;
      if (invType == "all") {//如果是全局配置
        showView = false;
      } else
        if (invType == "spec") {//如果是局部配置
          showView = true;
        }
    }
    this.setData({
      showInv: showView,
      invType:invType
    })
  },
  /**
   * 规格配置库存等输入监听
   */
  bindTypeInput: function (e) {
    var that =this;
    var position = e.currentTarget.dataset.index;
    var content = e.detail.value;
    var invType = e.currentTarget.dataset.type;
    console.log("position=" + position + "content=" + content + "invType=" + invType)
  
    if (invType == "inv") {//规格
      var mNormLists = 'normLists[' + position + '].name';
      that.setData({
        [mNormLists]: content
      })
      if (this.data.status == "modify"){
          app.globalData.productPublic[common.CC_PRODUCT_SPECS_INFO][position].name = content;
      }
     
      
    } else
      if (invType == "invPrice") {//价格
        var mNormLists = 'normLists[' + position + '].price';
        that.setData({
          [mNormLists]: content
        })
        if (this.data.status == "modify") {
          if (position >= app.globalData.productPublic[common.CC_GOODS_INVENTORY_DETAIL].length){
            app.globalData.productPublic[common.CC_PRODUCT_SPECS_INFO][position].price = content;
          }else{
            app.globalData.productPublic[common.CC_GOODS_INVENTORY_DETAIL][position].price = content;
          }
          
        }
      } else
        if (invType == "invStory") {//库存
          var mNormLists = 'normLists[' + position + '].count';
          that.setData({
            [mNormLists]: content
          })
          if (this.data.status == "modify") {
            if (position >= app.globalData.productPublic[common.CC_GOODS_INVENTORY_DETAIL].length) {
              app.globalData.productPublic[common.CC_PRODUCT_SPECS_INFO][position].count = content;
            }else{
              app.globalData.productPublic[common.CC_GOODS_INVENTORY_DETAIL][position].count = content;
            }
         
          }
          var productStock = 0;
          for (var i = 0; i < that.data.normLists.length; i++) {
            productStock = productStock + parseInt(that.data.normLists[i].count);
          }
          console.log(productStock)
          app.globalData.productPublic[common.CC_PRODUCT_STOCK] = productStock;
        }
    console.log(that.data.normLists);
    console.log(app.globalData.productPublic);
    
  }
})
