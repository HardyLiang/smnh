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
//修改让利金
function updateShareCommission(orderId, shareCommission, cb) {
  console.log("updateShareCommission");
  wx.request({
    url: urlSet.updateShareCommission,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: { id: orderId, shareCommission: shareCommission },
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
      return typeof cb == "function" && cb("修改让利金失败！", false)
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
//获取扶贫干部信息
function getFPUser(mgrid, cb) {
  console.log("getFPUser");
  wx.request({
    url: urlSet.getFPUser,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      mgrid: mgrid
    }),
    complete: function (res) {
      var message = res.data.message;
      console.log(message);
      return typeof cb == "function" && cb(res.data)

    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })


}
//获取扶贫单位信息
function getFPManager(cb) {
  console.log("getFPManager");
  wx.request({
    url: urlSet.getFPManager,
    header: {
      "Content-Type": "application/json"
    },
    method: "GET",
    complete: function (res) {
      var message = res.data.message;
      console.log(message);
      return typeof cb == "function" && cb(res.data)

    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })


}

//根据身份证号检测农户openId
function checkWXBoundStatus(card, cb) {
  console.log("checkWXBoundStatus");
  wx.request({
    url: urlSet.checkWXBoundStatus,
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
      return typeof cb == "function" && cb("获取绑定失败！", false)
    }
  })


}
//根据银行卡号获取银行信息
function findBank(accNo, cb) {
  console.log("findBank");
  wx.request({
    url: urlSet.findBank,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      accNo: accNo
    }),
    complete: function (res) {
      var message = res.data.message;
      console.log(message);
      return typeof cb == "function" && cb(res.data)

    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })


}
//根据银行卡号获取银行信息
function getAllBank(accNo, cb) {
  console.log("getAllBank");
  wx.request({
    url: urlSet.getAllBank,
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
//获取农户店铺状态
function getStoreStatusByCard(card, cb) {
  console.log("getStoreStatusByCard");
  wx.request({
    url: urlSet.getStoreStatusByCard,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: {
      card: card
    },
    success: function (res) {
      var message = res.data.message;
      var statusCode = res.data.statusCode;

      if (statusCode != null && "200" == statusCode) {
        var storeStatus = res.data.data.storeStatus;
        if ("15" == storeStatus) {
          message = "正常营业";
          return typeof cb == "function" && cb(message, true)
        } else
          if ("20" == storeStatus) {
            message = "违规关店";
            return typeof cb == "function" && cb(message, false)
          } else
            if ("25" == storeStatus) {
              message = "到期关闭";
              return typeof cb == "function" && cb(message, false)
            }

      } else {
        return typeof cb == "function" && cb(message, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb("店铺异常！", false)
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
//检测农户头像认证示意图
function checkPersonHeadImg(idCard, cb) {
  console.log("checkPersonHeadImg");
  wx.request({
    url: urlSet.checkPersonHeadImg,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      idCard: idCard
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
//修改库存 
function updateGoodInventory(id, goodsInventory, cb) {
  console.log("updateGoodInventory");
  wx.request({
    url: urlSet.updateGoodInventory,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: {
      id: id,
      goodsInventory: goodsInventory
    },
    success: function (res) {
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
      return typeof cb == "function" && cb("修改库存失败！", false)
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
//获取农户店铺URL
function getPersonShopURL(card, cb) {
  console.log("getPersonShopURL");
  wx.request({
    url: urlSet.getPersonShopURL,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: {
      card: card
    },
    success: function (res) {
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
      return typeof cb == "function" && cb("获取农户店铺URL失败！", false)
    }
  })

}
//新增产品详情图片或文本时排序
function addGoodsDetailPicSort(busId, id, serial, cb) {
  console.log("addGoodsDetailPicSort");
  wx.request({
    url: urlSet.addGoodsDetailPicSort,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      busId: busId,
      id: id,
      serial: serial
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
//修改产品详情图片
function updateGoodsDetailPicture(id, gId, oldPictureUrl, newPictureId, serial, cb) {
  console.log("updateGoodsDetailPicture");
  wx.request({
    url: urlSet.updateGoodsDetailPicture,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      id: id,
      gId: gId,
      oldPictureUrl: oldPictureUrl,
      newPictureId: newPictureId,
      serial: serial
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

//修改产品主图
function updateGoodsMainPicture(method, gId, changPictureId, newPictureId, cb) {
  console.log("updateGoodsMainPicture");
  wx.request({
    url: urlSet.updateGoodsMainPicture,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      method: method,
      gId: gId,
      changPictureId: changPictureId,
      newPictureId: newPictureId,
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
//删除文本信息接口（无图片）
function delTextInfo(busId, imgId, serial, cb) {
  console.log("delTextInfo");
  wx.request({
    url: urlSet.delTextInfo,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      busId: busId,
      imgId: imgId,
      serial: serial
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

//文本信息交换顺序接口（无图片）
function changeTextInfo(startId, nextId, cb) {
  console.log("changeTextInfo");
  wx.request({
    url: urlSet.changeTextInfo,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      startId: startId,
      nextId: nextId
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
//修改文本信息接口（无图片）
function updateTextInfo(id, picDesc, cb) {
  console.log("updateTextInfo");
  wx.request({
    url: urlSet.updateTextInfo,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      id: id,
      picDesc: picDesc
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

//上传文本信息接口（无图片）
function addTextInfo(strType, busId, picDesc, serial, managerId, cb) {
  console.log("addTextInfo");
  wx.request({
    url: urlSet.addTextInfo,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      type: strType,
      busId: busId,
      picDesc: picDesc,
      serial: serial,
      managerId: managerId
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
//编辑产品详情
function editHTML(id, goodsDetails, goodsDetailsMobile, cb) {
  console.log("editHTML");
  wx.request({
    url: urlSet.editHTML,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      id: id,
      goodsDetails: goodsDetails,
      goodsDetailsMobile: goodsDetailsMobile,
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

//清空产品详情图片
function clearGoodsDetails(id, cb) {
  console.log("clearGoodsDetails");
  wx.request({
    url: urlSet.clearGoodsDetails,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      id: id
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
//检测敏感词汇 
function checkWorld(world, cb) {
  console.log("checkWorld");
  wx.request({
    url: urlSet.checkWorld,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      world: world
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
      var message = res.data.message;

      var statusCode = res.data.statusCode;
      console.log(message);
      console.log("statusCode" + statusCode);
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, res)
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
//根据产品大类查询产品子类
function getProductDictSub(id, deviceId, cb) {
  console.log("getProductDictSub");
  wx.request({
    url: urlSet.getProductDictSub + id + "&deviceId=" + deviceId,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "GET",
    success: function (res) {
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
      return typeof cb == "function" && cb("获取产品小类失败！", false)
    }
  })

}
//查询字典组列表
function getDictionary(id, cb) {
  console.log("getDictionary");
  wx.request({
    url: urlSet.getDictionary + id,
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
//单一套餐照片列表跟进信息(APP) 
function getPicLists(id, typeId, cb) {
  console.log("getPicLists");
  wx.request({
    url: urlSet.getPicLists,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: {
      id: id,
      type: typeId
    },
    success: function (res) {
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
      return typeof cb == "function" && cb("获取详情图片失败！", false)
    }
  })

}

//农户采集列表的产品详细信息
function getProductListDetail(id, type, cb) {
  console.log("getProductListDetail");
  wx.request({
    url: urlSet.getProductListDetail,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      id: id,
      type: type
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
function getOpenId(code, appid, secret, cb) {
  wx.request({
    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + code,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: "get",
    complete: function (res) {
      console.log("数据获取成功")
      console.log(res)
      var openId = res.data.openid;
      var sessionKey = res.data.session_key;
      var unionId = res.data.unionid;
      wx.setStorageSync("session_key", sessionKey);
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

//新登录方法
function onNewLogin(usename, pass, cb) {

  wx.request({
    url: "http://test.e-smnh.com/app/iskyshop_seller_login.htm",
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data: util.json2Form({ userName: usename, password: pass }),
    complete: function (res) {
      var token = res.data.token;
      var userName = res.data.userName;
      var code = res.data.code;
      console.log(res);
      console.log("code" + code + "token=" + token + "userName=" + userName);
      if (code != null && "100" == code) {
        return typeof cb == "function" && cb(userName, res.data)
      } else {
        return typeof cb == "function" && cb(userName, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb('登录失败！', false)
    }
  })

}
//新登录方法
function getOrderNew(useId, token, verify, cb) {

  wx.request({
    url: "http://test.e-smnh.com/app/seller/goods_list.htm",
    header: {
      "content-type": "application/x-www-form-urlencoded;",
      "verify": verify
    },
    method: "post",
    data: util.json2Form({ user_id: useId, token: token }),
    complete: function (res) {
      var code = res.data.code;
      util.verifyCode(code);
      console.log(res);
      console.log("code" + code + "token=" + token + "userName=" + userName);
      if (code != null && "100" == code) {
        return typeof cb == "function" && cb(userName, res.data)
      } else {
        return typeof cb == "function" && cb(userName, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb('登录失败！', false)
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
function upLoadPicture(id,method,filePath,cb) {
  wx.uploadFile({
    url: urlSet.uploadPicture,
    filePath: filePath,
    name: 'imgFile',
    header: {
      "content-type": "multipart/form-data;",
      "verify": verify
    },
    formData: {
      user_id: user_id, 
      token: token,
      id: id,
      method: method
    },
    complete: function (res) {
      console.log(res);
      console.log(res.data);
      var result = JSON.parse(res.data)
      var statusCode = result.statusCode
      var message = result.message;
      console.log(message);
      console.log(statusCode);
      if (statusCode == "200") {
        return typeof cb == "function" && cb(message, result.data.url)
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


module.exports = {
  onLogin: onLogin,
  fotgetPass: fotgetPass,
  updatePassword: updatePassword,
  addPersonMsg: addPersonMsg,
  getPersonMsg: getPersonMsg,
  getOrderCountInfo: getOrderCountInfo,
  updateShareCommission: updateShareCommission,
  getSetRec: getSetRec,
  getSale: getSale,
  checkMobileByCard: checkMobileByCard,
  getFPUser: getFPUser,
  getFPManager: getFPManager,
  checkWXBoundStatus: checkWXBoundStatus,
  findBank: findBank,
  getAllBank: getAllBank,
  getAgreementMessageInfo: getAgreementMessageInfo,
  getAgreementMessageList: getAgreementMessageList,
  getStoreStatusByCard: getStoreStatusByCard,
  farmerPrototal: farmerPrototal,
  checkPersonHeadImg: checkPersonHeadImg,
  updateGoodInventory: updateGoodInventory,
  getLogisticsInfo: getLogisticsInfo,
  getPersonShopURL: getPersonShopURL,
  addGoodsDetailPicSort: addGoodsDetailPicSort,
  updateGoodsDetailPicture: updateGoodsDetailPicture,
  updateGoodsMainPicture: updateGoodsMainPicture,
  delTextInfo: delTextInfo,
  changeTextInfo: changeTextInfo,
  updateTextInfo: updateTextInfo,
  addTextInfo: addTextInfo,
  editHTML: editHTML,
  clearGoodsDetails: clearGoodsDetails,
  checkWorld: checkWorld,
  orderShippingUpdate: orderShippingUpdate,
  orderShippingSave: orderShippingSave,
  getAllExpCompany: getAllExpCompany,
  getOrder: getOrder,
  getProductDetail: getProductDetail,
  updateOnlyProduct: updateOnlyProduct,
  addOnlyProduct: addOnlyProduct,
  getProducts: getProducts,
  getProductDict: getProductDict,
  getProductDictSub: getProductDictSub,
  getDictionary: getDictionary,
  updatePersonMsg: updatePersonMsg,
  getProductListDetail: getProductListDetail,
  getPicLists: getPicLists,
  getOpenId: getOpenId,
  getGoodsInfoByCard: getGoodsInfoByCard,
  getOrderNew: getOrderNew,
  getIdCardCheck: getIdCardCheck,
  getmobileCheck: getmobileCheck,
  checkWork: checkWork,
  getBusinessCategory: getBusinessCategory,
  getStoreTypeList: getStoreTypeList,
  bandWX: bandWX,
  unBandWX: unBandWX,
  upLoadPicture: upLoadPicture,
  getBankType: getBankType,
}