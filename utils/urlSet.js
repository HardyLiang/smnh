
//上线需要配置这里的信息，包括域名，APPID,密钥

// var baseUrl ="https://test.e-smnh.com/"//测试
var baseUrl ="https://www.e-smnh.com/"//正式
let APPID = 'wxcd7f66c7373a72cc';
let SECRET = '9d32364e7ffa9c11b3a97c5792c3d6ef';

//登陆
var login = baseUrl +"app/iskyshop_seller_login.htm";
//忘记密码获取验证码
var forgotPass = baseUrl +"app/iskyshop_seller_code.htm";
//修改密码
var updatePassword = baseUrl +"app/iskyshop_seller_password.htm";
//录入农户信息（注册）
var addPersonMsg = baseUrl +"app/iskyshop_seller_add.htm";
//农户的详细信息(TSB/APP)
var getPersonMsg = baseUrl + "app/seller/store_information.htm"
//完善农户信息
var updatePersonMsg = baseUrl + "app/seller/store_information_edit.htm";
//获取产品字典表所有产品大类
var getProductDict = baseUrl + "app/seller/goods_class_mini.htm";
//农户新增单一农产品登记信息
var addOnlyProduct = baseUrl + "app/seller/add_goods.htm";
//修改单一农产品信息
var updateOnlyProduct = baseUrl + "app/seller/updateGoods.htm";
//单一农产品详细信息
var getProductDetail = baseUrl + "app/seller/goods_detail_mini.htm";
//农户查询消费者订单列表
var getOrder = baseUrl + "app/seller/order_list_mini.htm";
//获取快递字典（全部）
var getAllExpCompany = baseUrl + "app/seller/express_company_list.htm";
//录入物流信息
var orderShippingSave = baseUrl + "app/seller/order_shipping_save_mini.htm";
//修改物流信息
var orderShippingUpdate = baseUrl + "app/seller/order_shipping_code_save_mini.htm";
//获取订单物流信息
var getLogisticsInfo = baseUrl + "app/seller/express_info.htm";
//农户协议URL
var farmerPrototal = baseUrl + "mini_agreement.htm";
//获取协议消息列表
var getAgreementMessageList = baseUrl + "app/seller/message_list.htm";
//获取协议消息详细信息
var getAgreementMessageInfo = baseUrl + "app/seller/message_list.htm";
//通过身份证获取手机号
var checkMobileByCard = baseUrl + "app/iskyshop_seller_mobile.htm";
//获取农户收入信息
var getSale = baseUrl + "/siboss/iface/common/ap/getSale";
//获取农户结算记录
var getSetRec = baseUrl + "/siboss/iface/common/ap/getSetRec";
//农户农产品列表信息
var getGoodsInfoByCard = baseUrl +"app/seller/goods_list_mini.htm";
//获取地址
var getAddress = baseUrl +"app/iskyshop_area_list.htm";
//检测身份证是否注册
var checkIdcard = baseUrl +"app/iskyshop_seller_idCard_check.htm";
//检测手机号是否注册
var checkMobile = baseUrl +"app/iskyshop_seller_mobile_check.htm";
//检测敏感词
var checkWork = baseUrl +"app/iskyshop_message_check.htm";
//获取经营类目
var businessCategory = baseUrl + "app/iskyshop_seller_gc_main.htm";
//获取店铺类型分类
var getStoreTypeList = baseUrl + "app/iskyshop_store_type_list.htm";
//微信绑定
var bandWX=baseUrl+'app/seller/farmer_idcard_save.htm';
// var bandWX = baseUrl + 'app/farmer_idcard_save.htm';
//微信解绑
var unBandWX = baseUrl +"app/seller/farmer_idcard_out_save.htm";
//上传图片
var uploadPicture = baseUrl + "app/seller/uploadPicture.htm";
//获取银行类型
var getBankType = baseUrl +"app/iskyshop_bank_type_list.htm";
//修改商品详情图片信息
var updataGoodsDetail = baseUrl +"app/seller/updateGoodsDetailPicture.htm";
//删除主图
var removeGoodsPicture = baseUrl +"app/seller/removeGoodsPicture.htm";
//验证码
var getVerifyCode = baseUrl + "app/iskyshop_verify_code.htm";
//获取openId
var getOpenId=baseUrl+"app/iskyshop_seller_openid.htm"
//修改密码
var modifyPass = baseUrl + "app/seller/password_check.htm"



module.exports = {
  baseUrl: baseUrl,
  login: login,
  forgotPass: forgotPass,
  updatePassword: updatePassword,
  addPersonMsg: addPersonMsg,
  getPersonMsg: getPersonMsg,
  updatePersonMsg: updatePersonMsg,
  getProductDict: getProductDict,
  addOnlyProduct: addOnlyProduct,
  updateOnlyProduct: updateOnlyProduct,
  getProductDetail: getProductDetail,
  getOrder: getOrder,
  orderShippingSave: orderShippingSave,
  orderShippingUpdate: orderShippingUpdate,
  getLogisticsInfo: getLogisticsInfo,
  farmerPrototal: farmerPrototal,
  getAgreementMessageList: getAgreementMessageList,
  getAgreementMessageInfo: getAgreementMessageInfo,
  checkMobileByCard: checkMobileByCard,
  getSale: getSale,
  getSetRec: getSetRec,
  APPID: APPID,
  SECRET: SECRET,
  getGoodsInfoByCard: getGoodsInfoByCard,
  getAllExpCompany: getAllExpCompany,
  getAddress:getAddress,
  checkIdcard: checkIdcard,
  checkMobile:checkMobile,
  checkWork: checkWork,
  businessCategory:businessCategory,
  getStoreTypeList: getStoreTypeList,
  bandWX: bandWX,
  unBandWX: unBandWX,
  uploadPicture: uploadPicture,
  getBankType: getBankType,
  updataGoodsDetail: updataGoodsDetail,
  removeGoodsPicture: removeGoodsPicture,
  getVerifyCode: getVerifyCode,
  getOpenId: getOpenId,
  modifyPass: modifyPass
}
