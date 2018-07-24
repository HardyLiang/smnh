//此JS用于放置请求function
var md5 = require('../utils/md5.js')
var urlSet = require('../utils/urlSet.js')
var util = require('../utils/util.js')
var common =require('../utils/common.js')
var that = this;
let user_id = wx.getStorageSync("user_id");
let token = wx.getStorageSync("token");
let verify = wx.getStorageSync("verify");

//登录方法
function onLogin(usename, pass, cb) {
  var passwork = md5.hexMD5(pass);
  console.log(passwork);
  wx.request({
    url: urlSet.login,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data: util.json2Form({ userName: usename, password: passwork }),
    complete: function (res) {
      console.log(res)
      var statusCode = res.statusCode;
      var code = res.data.code;
      console.log(code)
      if (statusCode = 200 && code == "100") {
        var service_id = res.data.service_id;
        var mToken = res.data.token;
        var name = res.data.userName;
        var mUserId = res.data.user_id;
        var mVerify = res.data.verify;
        //保存至值
        wx.setStorageSync("user_id", mUserId);
        wx.setStorageSync("verify", mVerify)
        wx.setStorageSync("token", mToken);
        //保存后要获取一次要不然不是最新的值
        user_id = wx.getStorageSync("user_id");
        token = wx.getStorageSync("token");
        verify = wx.getStorageSync("verify");
        //保存关键数据
        getApp().globalData.userName = name;
        getApp().globalData.idCard = usename;
        return typeof cb == "function" && cb("登录成功！", res)
      } else
        if (code == "-100") {
          return typeof cb == "function" && cb("用户不存在", false)
        } if (code == "-300") {
          return typeof cb == "function" && cb("密码错误！", false)
        } else {
        return typeof cb == "function" && cb("登录失败", false)
      }




    },
    fail: function () {
      return typeof cb == "function" && cb('登录失败！', false)
    }
  })

}

//忘记密码,获取忘记密码验证码
function fotgetPass(idCard, mobile, cb) {
  console.log("fotgetPass");
  wx.request({
    url: urlSet.forgotPass + "?userName=" + idCard + "&mobile=" + mobile,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "get",
    complete: function (res) {
      console.log(res);
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, res.data)
      } else {
        return typeof cb == "function" && cb(message, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb("获取验证码失败！", false)
    }
  })


}
//忘记密码,获取忘记密码验证码
function getVerifyCode(mobile, cb) {
  console.log("getVerifyCode");
  wx.request({
    url: urlSet.getVerifyCode + "?&mobile=" + mobile,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "get",
    complete: function (res) {
      console.log(res);
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, res.data)
      } else {
        return typeof cb == "function" && cb(message, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb("获取验证码失败！", false)
    }
  })


}


//更新密码
function updatePassword(idCard, newPass, strCode, cb) {
  var md5pass = md5.hexMD5(newPass);
  console.log("updatePassword");
  wx.request({
    url: urlSet.updatePassword + "?userName=" + idCard + "&code=" + strCode + "&password=" + md5pass,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "get",
    complete: function (res) {
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, true)
      } else {
        return typeof cb == "function" && cb(message, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb("修改密码失败！", false)
    }
  })


}
//添加农户
function addPersonMsg(params,
  cb) {
  console.log("addPersonMsg");
  wx.request({
    url: urlSet.addPersonMsg,
    header: {
      "Content-Type": "application/x-www-form-urlencoded;"
    },
    method: "post",
    data: util.json2Form(params),
    complete: function (res) {
      console.log(res);
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      if (statusCode == "200") {
        return typeof cb == "function" && cb(message, res.data)
      } else {
        if (message == null || message == "") {
          message = "注册失败！"
        }
        return typeof cb == "function" && cb(message, false)
      }


    },
    fail: function () {
      return typeof cb == "function" && cb("注册失败！", false)
    }
  })


}

//获取农户信息
function getPersonMsg(cb) {
  console.log("getPersonMsg");
  wx.request({
    url: urlSet.getPersonMsg,
    header: {
      "Content-Type": "application/x-www-form-urlencoded;",
      "verify": verify

    },
    method: "post",
    data: util.json2Form({
      user_id: user_id,
      token: token
    }),
    complete: function (res) {
      console.log("获取personmsg")
      console.log(res)
      if (util.tokenError(res.data)){
        return;
      }
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      console.log(message)
      console.log(statusCode)
      if (statusCode != null && "200" == statusCode) {
        wx.setStorageSync(common.CC_FARMERINFO, res.data);
        return typeof cb == "function" && cb(message, res.data)
      } else {
        return typeof cb == "function" && cb(message, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb('获取个人信息失败！', false)
    }
  })


}
//获取订单数量
function getOrderCountInfo(idCard, cb) {
  console.log("getOrderCountInfo");
  wx.request({
    url: urlSet.getOrderCountInfo + idCard,
    header: {
      "Content-Type": "application/json"
    },
    method: "GET",
    success: function (res) {
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      var count = res.data.count;
      console.log(message);
      console.log("statusCode" + statusCode + " count=" + count);
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, res.data)
      } else {
        return typeof cb == "function" && cb(message, false)
      }


    },
    fail: function () {
      return typeof cb == "function" && cb("获取订单数量失败！", false)
    }
  })

}
//获取农户结算记录
function getSetRec(card, pageSize, pageIndex, beginTime, endTime, cb) {
  console.log("getSetRec");
  wx.request({
    url: urlSet.getSetRec,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: {
      card: card, pageSize: pageSize, pageIndex: pageIndex,
      beginTime: beginTime, endTime: endTime
    },
    complete: function (res) {
      console.log(res);
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      var pageIndex = res.data.data.pageIndex;
      var list = res.data.data.lists;
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, pageIndex, list)
      } else {
        return typeof cb == "function" && cb(message, pageIndex, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb("获取结算列表失败", 0, pageIndex, false)
    }
  })


}
//获取农户结算记录
function getSale(card, cb) {
  console.log("getSale");
  wx.request({
    url: urlSet.getSale,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: {
      card: card
    },
    complete: function (res) {
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, res.data)
      } else {
        return typeof cb == "function" && cb(message, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb("获取收入失败！", false)
    }
  })


}
//通过身份证获取手机号
function checkMobileByCard(idCard, cb) {
  console.log("checkMobileByCard");
  wx.request({
    url: urlSet.checkMobileByCard + "?userName=" + idCard,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "get",
    complete: function (res) {
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      console.log(message);
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, res.data)
      } else {
        return typeof cb == "function" && cb(message, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb("获取手机号失败！", false)
    }
  })


}
//获取协议消息详细信息
function getAgreementMessageInfo(messId, cb) {
  console.log("getAgreementMessageInfo");
  wx.request({
    url: urlSet.getAgreementMessageInfo,
    header: {
      "Content-Type": "application/x-www-form-urlencoded;"
    },
    method: "post",
    data: util.json2Form({
      messId: messId
    }),
    success: function (res) {
      var message = res.data.message;
      console.log(message);
      return typeof cb == "function" && cb(res.data)

    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })

}

//获取协议消息列表
function getAgreementMessageList(pageIndex, cb) {
  console.log("getAgreementMessageList");
  wx.request({
    url: urlSet.getAgreementMessageList,
    header: {
      "Content-Type": "application/x-www-form-urlencoded;",
      "verify": verify
    },
    method: "post",
    data: util.json2Form({
      user_id: user_id,
      token: token,
      currentPage: pageIndex
    }),
    success: function (res) {
      if (util.tokenError(res.data)) {
        return;
      }
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, res.data)
      } else {
        return typeof cb == "function" && cb(message, false)
      }
    },
    fail: function () {
      return typeof cb == "function" && cb("获取消息失败！", false)
    }
  })

}
//农户协议URL
function farmerPrototal(accNo, cb) {
  console.log("farmerPrototal");
  wx.request({
    url: urlSet.farmerPrototal,
    header: {
      "Content-Type": "application/json"
    },
    method: "GET",
    success: function (res) {
      var message = res.data.message;
      console.log(message);
      return typeof cb == "function" && cb(res.data)

    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })

}
//获取订单物流信息
function getLogisticsInfo(oid, cb) {
  console.log("getLogisticsInfo");
  wx.request({
    url: urlSet.getLogisticsInfo,
    header: {
      "Content-Type": "application/x-www-form-urlencoded;",
      "verify": verify
    },
    method: "post",
    data: util.json2Form({
      order_id: oid,
      user_id: user_id,
      token: token

    }),
    success: function (res) {
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      console.log(res);
      console.log(message);
      console.log("statusCode" + statusCode);
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, res.data)
      } else {
        if (message == null || message == "") {
          message = "获取物流信息失败！"
        }
        return typeof cb == "function" && cb(message, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb("获取物流信息失败！", false)
    }
  })

}

//修改物流信息
function orderShippingUpdate(params, cb) {
  console.log("orderShippingUpdate");
  wx.request({
    url: urlSet.orderShippingUpdate + "?user_id=" + user_id + "&token=" + token,
    header: {
      "Content-Type": "application/x-www-form-urlencoded;",
      "verify": verify
    },
    method: "post",
    data: util.json2Form(params),
    success: function (res) {
      if (util.tokenError(res.data)) {
        return;
      }
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      console.log(message);
      console.log("statusCode" + statusCode);
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb("修改物流成功！", true)
      } else {
        return typeof cb == "function" && cb("修改物流失败！", false)
      }
    },
    fail: function () {
      return typeof cb == "function" && cb("修改物流失败！", false)
    }
  })

}
//录入物流信息
function orderShippingSave(params, cb) {
  console.log("orderShippingSave");
  wx.request({
    url: urlSet.orderShippingSave + "?user_id=" + user_id + "&token=" + token,
    header: {
      "Content-Type": "application/x-www-form-urlencoded;",
      "verify": verify
    },
    method: "post",
    data: util.json2Form(params),
    success: function (res) {
      if (util.tokenError(res.data)) {
        return;
      }
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      console.log(message);
      console.log("statusCode" + statusCode);
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb("发货成功！", true)
      } else {
        return typeof cb == "function" && cb("发货失败！", false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb("发货失败！", false)
    }
  })

}
//获取快递字典（全部）
function getAllExpCompany(cb) {
  console.log("getAllExpCompany");
  wx.request({
    url: urlSet.getAllExpCompany + "?user_id=" + user_id + "&token=" + token,
    header: {
      "Content-Type": "application/json;charset=UTF-8",
      "verify": verify
    },
    method: "GET",
    success: function (res) {
      if (util.tokenError(res.data)) {
        return;
      }
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      console.log(message);
      console.log("statusCode" + statusCode);
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, res.data)
      } else {
        return typeof cb == "function" && cb(message, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb("获取物流公司失败", false)
    }
  })

}
//农户查询消费者订单列表
function getOrder(status, pageIndex, cb) {
  console.log("getOrder");
  wx.request({
    url: urlSet.getOrder,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "verify": verify
    },
    method: "post",
    data: util.json2Form({
      user_id: user_id,
      token: token,
      type: status,
      currentPage: pageIndex
    }),
    success: function (res) {
      if (util.tokenError(res.data)) {
        return;
      }
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      var count = res.data.count;
      var maxPage = 0;
      if (count <= 12) {
        maxPage = 1;
      } else {
        maxPage = Math.ceil(count / 12);
      }
      console.log(message);
      console.log("statusCode" + statusCode + "maxPage=" + maxPage);
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, pageIndex, res.data, maxPage)
      } else {
        return typeof cb == "function" && cb(message, pageIndex, false, 1)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb("获取订单失败！", pageIndex, false, 1)
    }
  })

}


//单一农产品详细信息
function getProductDetail(goodId, cb) {
  console.log("getProductDetail");
  wx.request({
    url: urlSet.getProductDetail+"?user_id=" + user_id + "&token=" + token,
    header: {
      "Content-Type": "application/x-www-form-urlencoded;",
      "verify": verify
    },
    method: "post",
    data: util.json2Form({
      goods_id: goodId
    }),
    success: function (res) {
      if (util.tokenError(res.data)) {
        return;
      }
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, res.data)
      } else {
        return typeof cb == "function" && cb("获取产品详情信息失败！", false)
      }
    },
    fail: function () {
      return typeof cb == "function" && cb("获取产品详情信息失败！", false)
    }
  })

}

//修改单一农产品信息
function updateOnlyProduct(params, cb) {
  console.log("updateOnlyProduct");
  params["user_id"] = user_id;
  params["token"] = token;
  wx.request({
    // url: urlSet.updateOnlyProduct + "?user_id=" + user_id + "&token=" + token,
    url: urlSet.updateOnlyProduct,
    header: {
      "Content-Type": "application/x-www-form-urlencoded;",
      "verify": verify
    },
    method: "post",
    data: util.json2Form(params),
     success: function (res) {
       if (util.tokenError(res.data)) {
         return;
       }
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, true)
      } else {
        if (message == null || message == "") {
          message = "更新失败！"
        }
        return typeof cb == "function" && cb(message, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb("更新失败！", false)
    }
  })

}

//农户新增单一农产品登记信息
function addOnlyProduct(params, cb) {
  console.log("addOnlyProduct");
  wx.request({
    url: urlSet.addOnlyProduct + "?user_id=" + user_id + "&token=" + token,
    header: {
      "Content-Type": "application/x-www-form-urlencoded;",
      "verify": verify
    },
    method: "post",
    data: util.json2Form(params),
    success: function (res) {
      if (util.tokenError(res.data)) {
        return;
      }
      var message = res.data.message;

      var statusCode = res.data.statusCode;
      console.log(message);
      console.log("statusCode" + statusCode);
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, res.data)
      } else {
        if (message == null || message == "") {
          message = "发布失败！"
        }
        return typeof cb == "function" && cb(message, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb("发布失败！", false)
    }
  })

}


//查询全部农产品
function getProducts(cb) {
  console.log("getProducts");
  wx.request({
    url: urlSet.getProducts,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "GET",
    success: function (res) {
      var message = res.data.message;
      console.log(message);
      return typeof cb == "function" && cb(res.data)

    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })

}

//获取产品字典表所有产品大类
function getProductDict(cb) {
  console.log("getProductDict");
  wx.request({
    url: urlSet.getProductDict,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "verify": verify
    },
    method: "post",
    data: util.json2Form({
      user_id: user_id,
      token: token
    }),
    success: function (res) {
      if (util.tokenError(res.data)) {
        return;
      }
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      console.log(res)
      console.log(message);
      console.log("statusCode" + statusCode);
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, res.data)
      } else {
        return typeof cb == "function" && cb(message, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb("获取产品大类失败！", false)
    }
  })

}
//完善农户信息
function updatePersonMsg(params, cb) {
  console.log("updatePersonMsg");
  wx.request({
    url: urlSet.updatePersonMsg + "?user_id=" + user_id + "&token=" + token,
    header: {
      "Content-Type": "application/x-www-form-urlencoded;",
      "verify": verify
    },
    method: "post",
    data: util.json2Form(params),
    success: function (res) {
      if (util.tokenError(res.data)) {
        return;
      }
      console.log(res);
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      if (statusCode == "200") {
        return typeof cb == "function" && cb(message, true)
      } else {
        if (message == null || message == "") {
          message = "修改失败！"
        }
        return typeof cb == "function" && cb(message, false)
      }


    },
    fail: function () {
      return typeof cb == "function" && cb("修改失败！",false)
    }
  })

}

function getOpenId(code, appid, secret, cb) {

  wx.request({
    // url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + code,
    url: urlSet.getOpenId,
    header: {
      "content-type": "application/x-www-form-urlencoded;"
    },
    method: "post",
    data: util.json2Form({
      appId: appid,
      secret: secret,
      code: code
    }),
    complete: function (res) {
      console.log("数据获取openid成功")
      console.log(res)
      var data =res.data.data
      if(data!=null&&data!=""){
        data=JSON.parse(data)
      }
      console.log(data)
      var openId = data.openid;
      var sessionKey = data.session_key;
      var unionId = data.unionid;
      wx.setStorageSync(common.CC_SESSION_KEY, sessionKey);
      wx.setStorageSync("unionId", unionId)
      console.log("openId=" + openId);
      if (openId) {
        return typeof cb == "function" && cb(openId)
      } else {
        return typeof cb == "function" && cb(false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })

}

//农户农产品列表信息
function getGoodsInfoByCard(pageindex, cb) {
  wx.request({
    url: urlSet.getGoodsInfoByCard,
    header: {
      "content-type": "application/x-www-form-urlencoded;",
      "verify": verify
    },
    method: "post",
    data: util.json2Form({
      user_id: user_id, token: token,
      currentPage: pageindex
    }),
    complete: function (res) {
      if (util.tokenError(res.data)) {
        return;
      }
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      var count = res.data.count;
      var maxPage = 0;
      if (count <= 12) {
        maxPage = 1;
      } else {
        maxPage = Math.ceil(count / 12);
      }
      console.log(message);
      console.log("statusCode" + statusCode + "maxPage=" + maxPage);
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, res.data, maxPage)
      } else {
        return typeof cb == "function" && cb(message, false, 1)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb('获取产品列表失败！', false, 1)
    }
  })

}

function getIdCardCheck(idCard, cb) {
  wx.request({
    url: urlSet.checkIdcard + "?idCard=" + idCard,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "get",
    success: function (res) {
      console.log(res)
      var message = res.data.message;
      var statusCode = res.statusCode
      if (statusCode == 200) {
        return typeof cb == "function" && cb(message, true)
      } else {
        return typeof cb == "function" && cb(message, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })

}
function getmobileCheck(idCard, cb) {
  wx.request({
    url: urlSet.checkMobile + "?mobile=" + idCard,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "get",
    success: function (res) {
      console.log(res)
      var message = res.data.message;
      var statusCode = res.statusCode
      if (statusCode == 200) {
        return typeof cb == "function" && cb(message, true)
      } else {
        return typeof cb == "function" && cb(message, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb("获取失败", false)
    }
  })

}
/**
 * 检测敏感词
 */
function checkWork(message, cb) {
  wx.request({
    url: urlSet.checkWork + "?message=" + message,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "get",
    success: function (res) {
      console.log(res)
      var message = res.data.message;
      var statusCode = res.data.statusCode
      if (statusCode == "200") {
        return typeof cb == "function" && cb(message, res.data.data)
      } else
        if (statusCode == "0") {
          return typeof cb == "function" && cb(message, false)
        }

    },
    fail: function () {
      return typeof cb == "function" && cb("查询失败", false)
    }
  })
}
/**
 *获取经营类目 
 */
function getBusinessCategory(cb) {

  wx.request({
    url: urlSet.businessCategory,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "get",
    success: function (res) {
      console.log(res)
      var message = res.data.message;
      var statusCode = res.data.statusCode
      if (statusCode == "200") {
        return typeof cb == "function" && cb(message, res.data.data)
      } else
        if (statusCode == "0") {
          return typeof cb == "function" && cb(message, false)
        }

    },
    fail: function () {
      return typeof cb == "function" && cb("查询失败", false)
    }
  })
}


//查询全部农产品
function getStoreTypeList(cb) {
  console.log("getProducts");
  wx.request({
    url: urlSet.getStoreTypeList,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "GET",
    success: function (res) {
      console.log(res);
      var message = res.data.message;
      var statusCode = res.data.statusCode
      console.log(message);
      console.log(statusCode);
      if (statusCode == "200") {
        return typeof cb == "function" && cb(message, res.data)
      } else
        if (statusCode == "0") {
          return typeof cb == "function" && cb(message, false)
        }
    },
    fail: function () {
      return typeof cb == "function" && cb("查询失败", false)
    }
  })

}

/**
 * 绑定微信
 */
function bandWX(encryptedData, session_key, iv, cb) {
  wx.request({
    url: urlSet.bandWX,
    header: {
      "content-type": "application/x-www-form-urlencoded;",
      "verify": verify
    },
    method: "post",
    data: util.json2Form({
      user_id: user_id, token: token,
      encryptedData: encryptedData,
      sessionKey: session_key,
      iv: iv
    }),
    complete: function (res) {
      if (util.tokenError(res.data)) {
        return;
      }
      console.log(res);
      var statusCode = res.data.statusCode
      var message = res.data.message;
      console.log(message);
      console.log(statusCode);
      if (statusCode == "200") {
        return typeof cb == "function" && cb(message, res.data)
      } else {
        if (message == null || message == "") {
          message = "绑定失败！"
        }
        return typeof cb == "function" && cb(message, false)
      }
    },
    fail: function () {
      return typeof cb == "function" && cb("绑定失败！", false)
    }
  })

}
/**
 * 解绑微信
 */
function unBandWX(cb) {
  wx.request({
    url: urlSet.unBandWX,
    header: {
      "content-type": "application/x-www-form-urlencoded;",
      "verify": verify
    },
    method: "post",
    data: util.json2Form({
      user_id: user_id, token: token
    }),
    complete: function (res) {
      if (util.tokenError(res.data)) {
        return;
      }
      console.log(res);
      var statusCode = res.data.statusCode
      var message = res.data.message;
      console.log(message);
      console.log(statusCode);
      if (statusCode == "200") {
        return typeof cb == "function" && cb(message, res.data)
      } else {
        if (message == null || message == "") {
          message = "解绑失败！"
        }
        return typeof cb == "function" && cb(message, false)
      }
    },
    fail: function () {
      return typeof cb == "function" && cb("解绑失败！", false)
    }
  })

}
/**
 * 上传图片
*/
function upLoadPicture(id,method,filePath,isMain,oldId,cb) {
  var params={};
   if(isMain=="1"||isMain=="2"){
     if (oldId!=null&&oldId!=""){
       params = {
         user_id: user_id,
         token: token,
         id: id,
         method: method,
         isMainPicture: isMain,
         old_id: oldId
       }
     }else{
       params = {
         user_id: user_id,
         token: token,
         id: id,
         method: method,
         isMainPicture: isMain
       }
     }
    
   }else{
    params={
      user_id: user_id,
      token: token,
      id: id,
      method: method
    }
   }
   console.log(params)
  wx.uploadFile({
    url: urlSet.uploadPicture,
    filePath: filePath,
    name: 'imgFile',
    header: {
      "content-type": "multipart/form-data;",
      "verify": verify
    },
    formData: params,
    complete: function (res) {
      if (util.tokenError(res.data)) {
        return;
      }
      console.log(res);
      var result = res.data
      if (!Array.isArray(result)){
        result = JSON.parse(result)
      }
      var statusCode = result.statusCode
      var message = result.message;
      console.log(message);
      console.log(statusCode);
      if (statusCode == "200") {
        return typeof cb == "function" && cb(message, result.data)
      } else {
        if (message == null || message == "") {
          message = "上传失败！"
        }
        return typeof cb == "function" && cb(message, false)
      }
    },
    fail: function () {
      return typeof cb == "function" && cb("上传失败！", false)
    },
    
  })
}


/**
 * 获取银行类型
 */
function getBankType(cb) {
  wx.request({
    url: urlSet.getBankType,
    header: {
      "content-type": "application/json;charset=UTF-8",
    },
    method: "get",
    complete: function (res) {
      console.log(res);
      var statusCode = res.data.statusCode
      var message = res.data.message;
      console.log(message);
      console.log(statusCode);
      if (statusCode == "200") {
        return typeof cb == "function" && cb(message, res.data)
      } else {
        if (message == null || message == "") {
          message = "获取银行列表失败！"
        }
        return typeof cb == "function" && cb(message, false)
      }
    },
    fail: function () {
      return typeof cb == "function" && cb("获取银行列表失败！", false)
    }
  })

}

/**
 * 上传图片
*/
function modifyMainPic(goods_id, pictureUrls, cb) {
  var picList = JSON.stringify(pictureUrls);
  wx.request({
    url: urlSet.updataGoodsDetail,
    header: {
      "content-type": "application/x-www-form-urlencoded;",
      "verify": verify
    },
    method: "post",
    data: util.json2Form({
      user_id: user_id,
      token: token,
      goods_id: goods_id,
      pictureUrls: picList,
    }),
    success: function (res) {
      if (util.tokenError(res.data)) {
        return;
      }
      console.log(res);
      var statusCode = res.data.statusCode
      var message = res.data.message;
      console.log(statusCode);
      if (statusCode == "200") {
        return typeof cb == "function" && cb("保存产品详情成功！", true)
      } else {
       
        return typeof cb == "function" && cb("保存产品详情失败！", false)
      }
    },
    fail: function () {
      return typeof cb == "function" && cb("保存产品详情失败！", false)
    },

  })
}
/**
 * 上传图片
*/
function removeGoodsPicture(goods_id, picId, cb) {
  wx.request({
    url: urlSet.removeGoodsPicture,
    header: {
      "content-type": "application/x-www-form-urlencoded;",
      "verify": verify
    },
    method: "post",
    data: util.json2Form({
      user_id: user_id,
      token: token,
      goods_id: goods_id,
      pictureId: picId,
    }),
    success: function (res) {
      if (util.tokenError(res.data)) {
        return;
      }
      console.log(res);
      var statusCode = res.data.statusCode
      var message = res.data.message;
      console.log(statusCode);
      if (statusCode == "200") {
        return typeof cb == "function" && cb("删除次图成功", true)
      } else {
        return typeof cb == "function" && cb("删除次图失败", false)
      }
    },
    fail: function () {
      return typeof cb == "function" && cb("删除次图失败", false)
    },

  })
}
/**
 * 修改密码
*/
function modifyPass(password, cb) {
  var md5Pass = md5.hexMD5(password)
  wx.request({
    url: urlSet.modifyPass,
    header: {
      "content-type": "application/x-www-form-urlencoded;",
      "verify": verify
    },
    method: "post",
    data: util.json2Form({
      user_id: user_id,
      token: token,
      password: md5Pass
    }),
    success: function (res) {
      if (util.tokenError(res.data)) {
        return;
      }
      console.log(res);
      var statusCode = res.data.statusCode
      var message = res.data.message;
      console.log(statusCode);
      if (statusCode == "200") {
        return typeof cb == "function" && cb(message, true)
      } else {
        return typeof cb == "function" && cb(message, false)
      }
    },
    fail: function () {
      return typeof cb == "function" && cb("验证密码失败", false)
    },

  })
}



module.exports = {
  onLogin: onLogin,
  fotgetPass: fotgetPass,
  updatePassword: updatePassword,
  addPersonMsg: addPersonMsg,
  getPersonMsg: getPersonMsg,
  getOrderCountInfo: getOrderCountInfo,
  getSetRec: getSetRec,
  getSale: getSale,
  checkMobileByCard: checkMobileByCard,
  getAgreementMessageInfo: getAgreementMessageInfo,
  getAgreementMessageList: getAgreementMessageList,
  farmerPrototal: farmerPrototal,
  getLogisticsInfo: getLogisticsInfo,
  orderShippingUpdate: orderShippingUpdate,
  orderShippingSave: orderShippingSave,
  getAllExpCompany: getAllExpCompany,
  getOrder: getOrder,
  getProductDetail: getProductDetail,
  updateOnlyProduct: updateOnlyProduct,
  addOnlyProduct: addOnlyProduct,
  getProducts: getProducts,
  getProductDict: getProductDict,
  updatePersonMsg: updatePersonMsg,
  getOpenId: getOpenId,
  getGoodsInfoByCard: getGoodsInfoByCard,
  getIdCardCheck: getIdCardCheck,
  getmobileCheck: getmobileCheck,
  checkWork: checkWork,
  getBusinessCategory: getBusinessCategory,
  getStoreTypeList: getStoreTypeList,
  bandWX: bandWX,
  unBandWX: unBandWX,
  upLoadPicture: upLoadPicture,
  getBankType: getBankType,
  modifyMainPic: modifyMainPic,
  removeGoodsPicture: removeGoodsPicture,
  getVerifyCode: getVerifyCode,
  modifyPass: modifyPass,
}