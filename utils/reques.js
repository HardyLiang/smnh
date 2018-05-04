//此JS用于放置请求function
var md5 = require('../utils/md5.js')
var urlSet = require('../utils/urlSet.js')
var util = require('../utils/util.js')
//登录方法
function onLogin(usename, pass, cb) {
  var passwork = md5.hexMD5(pass);
  console.log(passwork);
  wx.request({
    url: urlSet.login,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: { certNum: usename, password: passwork, type: "1" },
    complete: function (res) {
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
      return typeof cb == "function" && cb('登录失败！', false)
    }
  })

}

//忘记密码,获取忘记密码验证码
function fotgetPass(idCard, mobile, cb) {
  console.log("fotgetPass");
  wx.request({
    url: urlSet.forgotPass,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: { certNum: idCard, phone: mobile, type: "1" },
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
function updatePassword(idCard, newPass, moblie, strCode, cb) {
  var md5pass = md5.hexMD5(newPass);
  console.log("updatePassword");
  wx.request({
    url: urlSet.updatePassword,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: { certNum: idCard, password: md5pass, phone: moblie, code: strCode, type: "1" },
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
function addPersonMsg(name, idCard, mobile, sex, areaId,
  sendAddressId, address, age, deviceId, personType,
  cb) {
  console.log("addPersonMsg");
  wx.request({
    url: urlSet.addPersonMsg,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      name: name,
      idCard: idCard,
      mobile: mobile,
      sex: sex,
      areaId: areaId,
      sendAddressId: sendAddressId,
      address: address,
      age: age,
      deviceId: deviceId,
      personType: personType
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

//获取农户信息
function getPersonMsg(farmerId, cb) {
  console.log("getPersonMsg");
  wx.request({
    url: urlSet.getPersonMsg,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: { id: farmerId },
    complete: function (res) {
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
      console.log(message);
      return typeof cb == "function" && cb(res.data)

    },
    fail: function () {
      return typeof cb == "function" && cb(false)
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
      return typeof cb == "function" && cb("修改让利金失败！",false)
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
    url: urlSet.checkMobileByCard,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: {
      idCard: idCard
    }
    ,
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
      "Content-Type": "application/json;charset=UTF-8"
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
function getAgreementMessageList(cb) {
  console.log("getAgreementMessageList");
  wx.request({
    url: urlSet.getAgreementMessageList,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "get",
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
      return typeof cb == "function" && cb("修改库存失败！",false)
    }
  })

}
//获取订单物流信息
function getLogisticsInfo(oid, cb) {
  console.log("getLogisticsInfo");
  wx.request({
    url: urlSet.getLogisticsInfo,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      oid: oid
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
//获取农户店铺URL
function getPersonShopURL(card, cb) {
  console.log("getPersonShopURL");
  wx.request({
    url: urlSet.getPersonShopURL,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      card: card
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
function orderShippingUpdate(id, card, shipCode, expressCompanyId, cb) {
  console.log("orderShippingUpdate");
  wx.request({
    url: urlSet.orderShippingUpdate,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      id: id,
      card: card,
      shipCode: shipCode,
      expressCompanyId, expressCompanyId
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
//录入物流信息
function orderShippingSave(id, card, shipCode, expressCompanyId, cb) {
  console.log("orderShippingSave");
  wx.request({
    url: urlSet.orderShippingSave,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      id: id,
      card: card,
      shipCode: shipCode,
      expressCompanyId, expressCompanyId
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
//获取快递字典（全部）
function getAllExpCompany(cb) {
  console.log("getAllExpCompany");
  wx.request({
    url: urlSet.getAllExpCompany + idCard,
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
//农户查询消费者订单列表
function getOrder(personId, status, pageSize, pageIndex, cb) {
  console.log("getOrder");
  wx.request({
    url: urlSet.getOrder,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      personId: personId,
      status: status,
      pageSize: pageSize,
      pageIndex, pageIndex
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

//农户停止出售
function stopProduct(id, cb) {
  console.log("stopProduct");
  wx.request({
    url: urlSet.stopProduct,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data:{
      id: id
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
      return typeof cb == "function" && cb("下架失败！",false)
    }
  })

}

//单一农产品详细信息
function getProductDetail(type, packageId, cb) {
  console.log("getProductDetail");
  wx.request({
    url: urlSet.getProductDetail,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      type: type,
      packageId: packageId
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

//修改单一农产品信息
function updateOnlyProduct(id, deviceId, productId,
  personId, landTypeId, preoutput, minNumber, minPrice, publishDistinctid,
  preoutputUnit, spec, serveCharge, productDescription, productDetailName, cb) {
  console.log("updateOnlyProduct");
  wx.request({
    url: urlSet.updateOnlyProduct,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      id: id,
      deviceId: deviceId,
      productId: productId,
      personId: personId,
      landTypeId: landTypeId,
      preoutput: preoutput,
      minNumber: minNumber,
      minPrice: minPrice,
      publishDistinctid: publishDistinctid,
      preoutputUnit: preoutputUnit,
      spec: spec,
      serveCharge: serveCharge,
      productDescription: productDescription,
      productDetailName: productDetailName
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

//农户新增单一农产品登记信息
function addOnlyProduct(deviceId, productId,
  personId, landTypeId, preoutput, minNumber, minPrice, publishDistinctid,
  preoutputUnit, spec, serveCharge, productDescription, productDetailName, cb) {
  console.log("addOnlyProduct");
  wx.request({
    url: urlSet.addOnlyProduct,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      deviceId: deviceId,
      productId: productId,
      personId: personId,
      landTypeId: landTypeId,
      preoutput: preoutput,
      minNumber: minNumber,
      minPrice: minPrice,
      publishDistinctid: publishDistinctid,
      preoutputUnit: preoutputUnit,
      spec: spec,
      serveCharge: serveCharge,
      productDescription: productDescription,
      productDetailName: productDetailName
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


//查询全部农产品
function getProducts(cb) {
  console.log("getProducts");
  wx.request({
    url: urlSet.getProducts,
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

//获取产品字典表所有产品大类
function getProductDict(cb) {
  console.log("getProductDict");
  wx.request({
    url: urlSet.getProductDict,
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
//根据产品大类查询产品子类
function getProductDictSub(id, deviceId, cb) {
  console.log("getProductDictSub");
  wx.request({
    url: urlSet.getProductDictSub + id + "deviceId=" + deviceId,
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
function updatePersonMsg(id, name,
  idCard, mobile, sex, personType, sendAddressId, address,
  bankNumber, bankCode, accountName, bankAddress, priorpub, cb) {
  console.log("updatePersonMsg");
  wx.request({
    url: urlSet.updatePersonMsg,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data: util.json2Form({
      id: id,
      name: name,
      idCard: idCard,
      mobile: mobile,
      sex: sex,
      personType: personType,
      sendAddressId: sendAddressId,
      address: address,
      bankNumber: bankNumber,
      bankCode: bankCode,
      accountName: accountName,
      bankAddress: bankAddress,
      priorpub: priorpub,
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
//单一套餐照片列表跟进信息(APP) 
function getPicLists(id, type, cb) {
  console.log("getPicLists");
  wx.request({
    url: urlSet.getPicLists,
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
      var openId = res.data.openid;
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
function getGoodsInfoByCard(card, cb) {
  wx.request({
    url: urlSet.getGoodsInfoByCard + card,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: "get",
    complete: function (res) {
      var message = res.data.message;
      var statusCode = res.data.statusCode;
      console.log(message);
      console.log("statusCode" + statusCode);
      if (statusCode != null && "200" == statusCode) {
        return typeof cb == "function" && cb(message, res.data.data)
      } else {
        return typeof cb == "function" && cb(message, false)
      }

    },
    fail: function () {
      return typeof cb == "function" && cb('获取产品列表失败！', false)
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
  stopProduct: stopProduct,
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
  getGoodsInfoByCard:getGoodsInfoByCard,

}