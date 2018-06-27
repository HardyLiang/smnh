var app = getApp();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatTimeByHorizontal= date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-') 
}

function formatTimeFirstDayOfYear(date){
  date.setDate(1);
  date.setMonth(0);
  return formatTimeByHorizontal(date);
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

//判断是否登录了
function checkIsLogin() {
  if ("" == this.trim(getApp().globalData.userName) || "" == this.trim(getApp().globalData.idCard)) {
    wx.showModal({
      title: '提示',
      content: '亲，请先登录哦！',
      confirmColor: '#3CC51F',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../page/auth/login/login',
          })
        } else if (res.cancel) {

        }
      }
    })
    return false
  } else {
    return true
  }

}
// 去前后空格  
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

//预览、分享、保存、识别
function previewImage(){
  var img ="http://www.e-smnh.com/upload/system/adb072ff-1b26-4306-8d1a-f756c818a720.png";
  wx.previewImage({
    current: img,
    urls: [img],
    success: function (res) { 
      console.log(res.whdth)
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}

//选择相册
function choosePhoto(countNum,cb){
  wx.chooseImage({
    count: countNum, //数量
    sizeType: ['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有  
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
    success: function(res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
      return typeof cb == "function" && cb(res.tempFilePaths);
    },
    fail:function(){
      return typeof cb == "function" && cb(false);
    }
  })
}
// 缩放图片
function drawCanvas(imgurl,cb) {
  var canvasImgUrl="";
  const ctx = wx.createCanvasContext('attendCanvasId');
  ctx.drawImage(imgurl, 0, 0, 94, 96);
  ctx.draw();
  wx.canvasToTempFilePath({
    canvasId: 'attendCanvasId',
    success:function success(res){
      return typeof c == "function" && cb(res.tempFilePaths);
    },
    fail:function(){
      return typeof c == "function" && cb(false);
    }
  }, this)
}
//检测空值
function checkNullContent(content,tip){
  if ("" == this.trim(content)) {
  wx.showToast({
    title: tip,
    image: '../../../images/ic_img_delete_pressed.png'
  })
  return true;
}else{
  return false;
}
}
//注销登录清楚数据；
function clearStorageData(){
  //清除微信的缓存
  wx.clearStorageSync();
  //设置全局信息为空
  getApp().globalData.userName="";
  getApp().globalData.idCard="";
  getApp().globalData.farmerId="";

}

//设置身份证号中间部分省略
function hideIdCardMiddle(idCard){
 if(idCard.length==18){
   var newIdCard = idCard.substring(0, 6) + "****" + idCard.substring (16, idCard.length);
   return newIdCard
 }else{
   return idCard;
 }

}
/**
 * 检测code
 */
function verifyCode(code, message) {
  if (code == -100) {
    wx.showModal({
      title: '提示',
      content: message,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../page/auth/login/login',
          })
        }
      }
    })
    return;
  }

}
/**
 * 检测是否为空
 */
function checkEmpty(content,message){
  if(content==null||content==""){
    wx.showModal({
      title: '提示',
      content: message,
      showCancel:false
    })
    return true;
  }else{
    return false;
  }

}
/**
 * 检测是否为空
 */
function checkEmptyChoose(content, message) {
  if (content == null || content == "" || content.search("请选择")!=-1) {
    wx.showModal({
      title: '提示',
      content: message,
      showCancel: false
    })
    return true;
  } else {
    return false;
  }

}
/**
 * 检测数组是否为空
 */
function checkListEmpty(content, message) {
  if (content == null || content.length==0) {
    wx.showModal({
      title: '提示',
      content: message,
      showCancel: false
    })
    return true;
  } else {
    return false;
  }

}
/**
 * 检测敏感词，很多地方都用就可以写成公用方法
 */
function checkWorkIsSensitive(message, cb){
  getApp().func.checkWork(message,function(message,res){
  if (!res){
      return typeof cb == "function" && cb(false)
    }else{
      wx.showModal({
        title: '提示',
        content: '存在敏感词！'+res,
        showCancel:false,
         success:function(res){
           if(res.confirm){
             return typeof cb == "function" && cb(true)
           }
         }
      })
    
    }
  })
}
/**
 * 自动登录
 * (默认密码状态)
 */
function autoLogin(idCard){
 
}



module.exports = {
  formatTime: formatTime,
  formatTimeByHorizontal: formatTimeByHorizontal,
  formatTimeFirstDayOfYear: formatTimeFirstDayOfYear,
  json2Form: json2Form,
  checkIsLogin: checkIsLogin,
  trim: trim,
  previewImage: previewImage,
  choosePhoto: choosePhoto,
  drawCanvas: drawCanvas,
  checkNullContent: checkNullContent,
  clearStorageData: clearStorageData,
  hideIdCardMiddle: hideIdCardMiddle,
  verifyCode: verifyCode,
  checkEmpty: checkEmpty,
  checkListEmpty: checkListEmpty,
  checkEmptyChoose: checkEmptyChoose,
  checkWorkIsSensitive: checkWorkIsSensitive,
  autoLogin: autoLogin,

}