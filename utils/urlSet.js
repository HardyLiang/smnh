
//上线需要配置这里的信息，包括域名，APPID,密钥
// var baseUrl ="http://61.28.113.182:9595";
// var baseUrl ="https://xz-weixin.e-tecsun.com";
// var baseUrl ="http://114.67.49.72:80";
// var baseUrl ="http://test.e-smnh.com/app/iskyshop_seller_login.htm";
var baseUrl ="http://test.e-smnh.com/"

let APPID = 'wx00ebf9a68438faf5';
let SECRET = '52ad3e6d8c872b95b3142645fbfbab79';

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
var updatePersonMsg = baseUrl + "app/seller/store_information_edit.htm";
//查询字典组列表
var getDictionary = baseUrl + "/siboss/iface/comm/getDictionary?groupId=";
//根据区域编码获取区域子集列表
var getDistinctListById = baseUrl + "/siboss/iface/comm/getDistinctListById?distinctId=";
//获取产品字典表所有产品大类
var getProductDict = baseUrl + "app/seller/goods_class_mini.htm";
//根据产品大类查询产品子类
var getProductDictSub = baseUrl + "/siboss/iface/comm/getProductDictSub?id=";
//查询全部农产品
var getProducts = baseUrl + "/siboss/iface/comm/getProducts?name=";
//农户新增单一农产品登记信息
var addOnlyProduct = baseUrl + "app/seller/add_goods.htm";
//修改单一农产品信息
var updateOnlyProduct = baseUrl + "app/seller/updateGoods.htm";
//单一农产品详细信息
var getProductDetail = baseUrl + "app/seller/goods_detail_mini.htm";
//农户停止出售
var stopProduct = baseUrl + "/siboss/iface/common/ap/soldOutProduct";
//农户查询消费者订单列表
var getOrder = baseUrl + "app/seller/order_list_mini.htm";
//获取快递字典（全部）
var getAllExpCompany = baseUrl + "app/seller/express_company_list.htm";
//录入物流信息
var orderShippingSave = baseUrl + "app/seller/order_shipping_save_mini.htm";
//修改物流信息
var orderShippingUpdate = baseUrl + "app/seller/order_shipping_code_save_mini.htm";
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
var getLogisticsInfo = baseUrl + "app/seller/express_info.htm";
//修改库存
var updateGoodInventory = baseUrl + "/siboss/iface/common/ap/updateGoodInventory";
//检测农户头像认证示意图
var checkPersonHeadImg = baseUrl + "/siboss/iface/app/managerpic/checkPersonHeadImg";
//农户协议URL
var farmerPrototal = baseUrl + "/help/contract/agreement.html";
//获取农户店铺状态
var getStoreStatusByCard = baseUrl + "/siboss/iface/common/ap/getStoreStatusByCard";
//获取协议消息列表
var getAgreementMessageList = baseUrl + "app/seller/message_list.htm";
//获取协议消息详细信息
var getAgreementMessageInfo = baseUrl + "app/seller/message_list.htm";
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
// var bandWX=baseUrl+'app/seller/farmer_idcard_save.htm';
var bandWX = baseUrl + 'app/farmer_idcard_save.htm';
//微信解绑
var unBandWX = baseUrl +"app/seller/farmer_idcard_out_save.htm";
//上传图片
var uploadPicture = baseUrl + "app/seller/uploadPicture.htm";
//获取银行类型
var getBankType = baseUrl +"app/iskyshop_bank_type_list.htm";
//修改商品详情图片信息
var updataGoodsDetail = baseUrl +"app/seller/updateGoodsDetailPicture.htm";


module.exports = {
  baseUrl: baseUrl,
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
  getOrderCountInfo: getOrderCountInfo,
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
}
