
//上线需要配置这里的信息，包括域名，APPID,密钥
var baseUrl ="http://61.28.113.182:9595";
// var baseUrl ="https://xz-weixin.e-tecsun.com";
let APPID = 'wx15901d82315115d8';
let SECRET = '1cfb2641811da6b383054c9febccb036';


//登陆
var login = baseUrl +"/siboss/iface/app/login";
//忘记密码获取验证码
var forgotPass = baseUrl +"/siboss/iface/app/forgetPassword";
//修改密码
var updatePassword = baseUrl +"/siboss/iface/app/updatePassword";
//录入农户信息（注册）
var addPersonMsg = baseUrl +"/siboss/iface/app/appReg/addPersonMsg";
//农户的详细信息(TSB/APP)
var getPersonMsg = baseUrl +"/siboss/iface/app/manager/getPersonMsg";
//获取订单数量
var getOrderCountInfo = baseUrl +"/siboss/iface/common/ap/getOrderCountInfo?card=";
//单一/套餐照片列表跟进信息(APP) 
var getPicLists = baseUrl +"/siboss/iface/app/manager/getPicLists";
//农户采集列表的产品详细信息(
var getProductListDetail = baseUrl +"/siboss/iface/app/manager/getProductListDetail";
//上传单张图片  
var uploadPic = baseUrl + "/siboss/iface/app/managerpic/uploadPic";
//上传多张图片和文字描述
var uploadNPic = baseUrl + "/siboss/iface/app/managerpic/uploadNPic";
//完善农户信息
var updatePersonMsg = baseUrl + "/siboss/iface/common/ap/updatePersonMsg";
//查询字典组列表
var getDictionary = baseUrl + "/siboss/iface/comm/getDictionary?groupId=";
//根据区域编码获取区域子集列表
var getDistinctListById = baseUrl + "/siboss/iface/comm/getDistinctListById?distinctId=";
//获取产品字典表所有产品大类
var getProductDict = baseUrl + "/siboss/iface/comm/getProductDict";
//根据产品大类查询产品子类
var getProductDictSub = baseUrl + "/siboss/iface/comm/getProductDictSub?id=";
//查询全部农产品
var getProducts = baseUrl + "/siboss/iface/comm/getProducts?name=";
//农户新增单一农产品登记信息
var addOnlyProduct = baseUrl + "/siboss/iface/app/appReg/addOnlyProduct";
//修改单一农产品信息
var updateOnlyProduct = baseUrl + "/siboss/iface/app/appReg/updateOnlyProduct";
//单一农产品详细信息
var getProductDetail = baseUrl + "/siboss/iface/app/appReg/getProductDetail";
//农户停止出售
var stopProduct = baseUrl + "/siboss/iface/common/ap/stopProduct";
//农户查询消费者订单列表
var getOrder = baseUrl + "/siboss/iface/common/ap/getOrder";
//获取快递字典（根据农户身份证）
var getAllExpressCompany = baseUrl + "/siboss/iface/common/ap/getAllExpressCompany?idCard=";
//获取快递字典（全部）
var getAllExpCompany = baseUrl + "/siboss/iface/common/ap/getAllExpCompany";
//录入物流信息
var orderShippingSave = baseUrl + "/siboss/iface/common/ap/orderShippingSave";
//修改物流信息
var orderShippingUpdate = baseUrl + "/siboss/iface/common/ap/orderShippingUpdate";
//检测敏感词汇
var checkWorld = baseUrl + "/siboss/iface/common/ap/checkWorld";
//清空产品详情图片
var clearGoodsDetails = baseUrl + "/siboss/iface/common/ap/clearGoodsDetails";
//编辑产品详情
var editHTML = baseUrl + "/siboss/iface/app/managerpic/editHTML";
//上传文本信息接口（无图片）
var addTextInfo = baseUrl + "/siboss/iface/app/managerpic/addTextInfo";
//修改文本信息接口（无图片）
var updateTextInfo = baseUrl + "/siboss/iface/app/managerpic/updateTextInfo";
//文本信息交换顺序接口（无图片）
var changeTextInfo = baseUrl + "/siboss/iface/app/managerpic/changeTextInfo";
//删除文本信息接口（无图片）
var delTextInfo = baseUrl + "/siboss/iface/app/managerpic/delTextInfo";
//修改产品主图
var updateGoodsMainPicture = baseUrl + "/siboss/iface/app/managerpic/updateGoodsMainPicture";
//修改产品详情图片
var updateGoodsDetailPicture = baseUrl + "/siboss/iface/app/managerpic/updateGoodsDetailPicture";
//新增产品详情图片或文本时排序
var addGoodsDetailPicSort = baseUrl + "/siboss/iface/app/managerpic/addGoodsDetailPicSort";
//获取农户店铺URL
var getPersonShopURL = baseUrl + "/siboss/iface/common/ap/getPersonShopURL";
//获取订单物流信息
var getLogisticsInfo = baseUrl + "/siboss/iface/common/ap/getLogisticsInfo";
//修改库存
var updateGoodInventory = baseUrl + "/siboss/iface/common/ap/updateGoodInventory";
//检测农户头像认证示意图
var checkPersonHeadImg = baseUrl + "/siboss/iface/app/managerpic/checkPersonHeadImg";
//农户协议URL
var farmerPrototal = baseUrl + "/help/contract/agreement.html";
//获取农户店铺状态
var getStoreStatusByCard = baseUrl + "/siboss/iface/common/ap/getStoreStatusByCard";
//获取协议消息列表
var getAgreementMessageList = baseUrl + "/siboss/iface/common/ap/getAgreementMessageList";
//获取协议消息详细信息
var getAgreementMessageInfo = baseUrl + "/siboss/iface/common/ap/getAgreementMessageInfo";
//查询所有银行总行
var getAllBank = baseUrl + "/siboss/iface/comm/getAllBank";
//根据银行卡号获取银行信息
var findBank = baseUrl + "/siboss/iface/comm/findBank";
//根据身份证号检测农户openId
var checkWXBoundStatus = baseUrl + "/siboss/iface/common/ap/checkWXBoundStatus?";
//获取扶贫单位信息
var getFPManager = baseUrl + "/siboss/iface/common/ap/getFPManager?";
//获取扶贫干部信息
var getFPUser = baseUrl + "/siboss/iface/common/ap/getFPUser?";
//通过身份证获取手机号
var checkMobileByCard = baseUrl + "/siboss/iface/common/ap/checkMobileByCard";
//获取农户收入信息
var getSale = baseUrl + "/siboss/iface/common/ap/getSale";
//获取农户结算记录
var getSetRec = baseUrl + "/siboss/iface/common/ap/getSetRec";
//更改产品让利金
var updateShareCommission = baseUrl + "/siboss/iface/common/ap/updateShareCommission";

module.exports = {
  login: login,
  forgotPass: forgotPass,
  updatePassword: updatePassword,
  addPersonMsg: addPersonMsg,
  getPersonMsg: getPersonMsg,
  getOrderCountInfo: getOrderCountInfo,
  getPicLists: getPicLists,
  getProductListDetail: getProductListDetail,
  uploadPic: uploadPic,
  uploadNPic: uploadNPic,
  updatePersonMsg: updatePersonMsg,
  getDictionary: getDictionary,
  getDistinctListById: getDistinctListById,
  getProductDict: getProductDict,
  getProductDictSub: getProductDictSub,
  getProducts: getProducts,
  addOnlyProduct: addOnlyProduct,
  updateOnlyProduct: updateOnlyProduct,
  getProductDetail: getProductDetail,
  stopProduct: stopProduct,
  getOrder: getOrder,
  getAllExpressCompany: getAllExpressCompany,
  orderShippingSave: orderShippingSave,
  orderShippingUpdate: orderShippingUpdate,
  clearGoodsDetails: clearGoodsDetails,
  editHTML: editHTML,
  updateTextInfo: updateTextInfo,
  changeTextInfo: changeTextInfo,
  updateGoodsMainPicture: updateGoodsMainPicture,
  updateGoodsDetailPicture: updateGoodsDetailPicture,
  addGoodsDetailPicSort: addGoodsDetailPicSort,
  getPersonShopURL: getPersonShopURL,
  getLogisticsInfo: getLogisticsInfo,
  updateGoodInventory: updateGoodInventory,
  checkPersonHeadImg: checkPersonHeadImg,
  farmerPrototal: farmerPrototal,
  getStoreStatusByCard: getStoreStatusByCard,
  getAgreementMessageList: getAgreementMessageList,
  getAgreementMessageInfo: getAgreementMessageInfo,
  getAllBank: getAllBank,
  findBank: findBank,
  checkWXBoundStatus: checkWXBoundStatus,
  getFPManager: getFPManager,
  getFPUser: getFPUser,
  checkMobileByCard: checkMobileByCard,
  getSale: getSale,
  getSetRec: getSetRec,
  updateShareCommission: updateShareCommission,
  getOrderCountInfo: getOrderCountInfo,
  APPID: APPID,
  SECRET: SECRET,
}
