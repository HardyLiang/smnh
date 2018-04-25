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

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
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

module.exports = {
  json2Form: json2Form,
  checkIsLogin: checkIsLogin,
  trim: trim,
  previewImage: previewImage,
  choosePhoto: choosePhoto,
  drawCanvas: drawCanvas,
  checkNullContent: checkNullContent,

}