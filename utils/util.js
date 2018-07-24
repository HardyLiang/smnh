var app = getApp();
var common =require("../utils/common.js")
var urlSet =require("../utils/urlSet.js")
var event =require("../utils/event.js")
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
function checkIsLogin(url) {
  if ("" == this.trim(getApp().globalData.userName) || "" == this.trim(getApp().globalData.idCard)) {
    wx.showModal({
      title: '提示',
      content: '亲，请先登录哦！',
      confirmColor: '#3CC51F',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            // url: '../page/auth/login/login',
            url: url,
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

function getOpenId(url) {
  //从缓存上面获取openID 
  var openId = wx.getStorageSync(common.CC_OPENID)
  var sessionKey = wx.getStorageSync(common.CC_SESSION_KEY)
  console.log("openId==" + openId)
  wx.login({
    success: function (res) {
      console.log(res)
      if (res.code) {
        console.log("成功获取用户信息")
        //成功获取用户信息
        wx.getUserInfo({
          success: function (resUser) {
            console.log(resUser)
            var encryptedData = resUser.encryptedData;//加密数据需要解码
            var iv = resUser.iv;
            var nickName = resUser.userInfo.nickName;
            console.log("encryptedData=" + encryptedData + "iv=" + iv)
            wx.setStorageSync(common.CC_IV_KEY, iv);
            wx.setStorageSync(common.CC_ENCRY_KEY, encryptedData);
            wx.setStorageSync(common.CC_HEAD_IMG, resUser.userInfo.avatarUrl);
            wx.setStorageSync(common.CC_NICK_NAME, nickName)
            event.emit(event.KGetWeiXinOpenIDSuccess, resUser)
          },
          fail: function (res) {
            console.log("失败" + res)
            wx.showModal({
              title: '警告',
              content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateTo({
                    // url: '../page/auth/authorize/authorize',
                    url:url
                  });
                }
              }
            })
           
          }
        })
        if (!openId) {//如果没有openId 就联网进行获取
          console.log('没有openID 申请')
          var appid = urlSet.APPID;
          var secret = urlSet.SECRET;
          getApp().func.getOpenId(res.code, appid, secret
            , function (res) {
              if (res) {
                var openId = res;
                console.log("openId---------" + openId);
                wx.setStorageSync(common.CC_OPENID, openId)
              } else {
                console.log("获取openId失败");
              }
            })
        }
      }
    },
    fail: function () {
      console.log("没有获取到")
    }
  })

}
/**
 * token等错误的时候提示用户需要重新登录
 */
function tokenError(data){
  console.log(data)
  var code =data.code;
  console.log(code)
  if(code==-100){
    wx.hideLoading()
   wx.showModal({
     title: '提示',
     content: '亲，你的账号在其他设备登录或者密码已经被修改，请注意账号安全并重新登录',
     showCancel:false,
     success:function(res){
       wx.reLaunch({
         url: '/pages/page/auth/login/login',
       })
     }
     
   })
    return true;
  }else{
    return false;
  }
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
  getOpenId: getOpenId,
  tokenError: tokenError,

}