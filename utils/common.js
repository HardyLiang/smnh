//此js放置全局常量

let CC_USERNAME ='userName';
let CC_IDCARD='idCard';
let CC_AUTHORIZESTATUS ='authorizeStatus';
let CC_DEVICEID ='deviceId';
let CC_AREAID ='areaId';
let CC_FARMERID='farmerId';
let CC_ACCOUNTNAME ='accountName';
let CC_BANKADDRESSNAME ='bankAddressName';
let CC_DESCRIPTION_EVALUATE ='descriptionEvaluate';
let CC_LEADER_ID ='leaderId';
let CC_MANAGER_NAME ='managerName';
let CC_MGRID ='mgrid';
let CC_MOBILE ='mobile';
let CC_PERSONTYPE ='personType';
let CC_PICPATH ='picPath';
let CC_SEND_ADDRESS_NAME ='sendAddressName';
let CC_SERVICEEVALUATE ='serviceEvaluate';
let CC_SHIP_EVALUATE ='shipEvaluate';
let CC_STORE_EVALUATE ='storeEvaluate';
let CC_STORE_URL= 'storeURL';
let CC_SEX ='sex';
let CC_USERTYPE ='userType';
let CC_FARMERINFO ='farmerinfo';
let CC_OPENID='openId';
let CC_WEIXININFO='weixininfo';
let CC_GOODINFOLIST = 'goodInfoList';
let CC_SHIPINFOLIST = 'shipInfoList';
let CC_MESSAGELIST = 'messageList';
/** 头像 */
let CC_PHOTO_TYPE_HEAD_IMG = 1;
/** 认证 */
let CC_PHOTO_TYPE_CERTIFY = 2;
/** 种植地 */
let CC_PHOTO_TYPE_LAND_TYPE = 3;
/** 产品主图 */
let CC_PHOTO_TYPE_PRODUCT_MAIN = 8;
/** 商品列表 */
let CC_PHOTO_TYPE_PRODUCT_LIST = 5;
//注册信息；
let CC_HEAD_IMG="logoUrl";//头像
let CC_SHOP_NAME ="storeName"; //店铺名称
let CC_SHOP_TYPE ="personType"; //店铺类型
let CC_COMPANY_NAME ="companyName";//公司名称
let CC_LEGAL_NAME ="legalPersonName";//公司法人名称
let CC_LEGAL_IDCARD ="legalPersonIdCard";//公司法人身份证
let CC_BUSINESS_LICENSE = "businessLicense";//公司营业执照
let CC_IDCARD_FRONT = "idCardFront";//身份证正面
let CC_IDCARD_BACK = "idCardBack";//身份证反面
let CC_ADDRESS = "areaId";//地址
let CC_ADDRESS_DETAIL = "address";//详细地址
let CC_BANKADDRESS = 'bankAddressId';
let CC_BANKCODE = 'bankCode';
let CC_BANKNAME = 'accountName';
let CC_BANKACCOUNT = 'bankNumber';
let CC_BANKTYPE = 'bankType';
let CC_REGISTER_NAME ="name";
let CC_REGISTER_MOBILE ="mobile";
let CC_REGISTER_IDCARD ="idCard";
let CC_REGISTER_SEX ="sex";
let CC_BUSINESS_CATEGORY ="gcMainId";
let CC_SEND_ADDRESSID = "sendAddressId";
//产品发布；
let CC_PRODUCT_TYPE="productType";//产品类型
let CC_PRODUCT_NAME="productName";//产品名称
let CC_PRODUCT_MININUMBER="productPrice";//零售价
let CC_PRODUCT_SPEC="spec";
let CC_PRODUCT_SPEC_DESCRIPTION="specdescription";
let CC_PRODUCT_STOCK="stock";
let CC_PRODUCT_PROFIT ="profit"
let CC_PRODUCT_REMARK="remark"
//微信保存信息
let CC_SESSION_KEY ="session_key"
//


exports.CC_USERNAME = CC_USERNAME;
exports.CC_IDCARD = CC_IDCARD;
exports.CC_FARMERID = CC_FARMERID;
exports.CC_AUTHORIZESTATUS = CC_AUTHORIZESTATUS;
exports.CC_DEVICEID = CC_DEVICEID;
exports.CC_AREAID = CC_AREAID;
exports.CC_FARMERID = CC_FARMERID;
exports.CC_ACCOUNTNAME = CC_ACCOUNTNAME;
exports.CC_ADDRESS = CC_ADDRESS;
exports.CC_BANKADDRESS = CC_BANKADDRESS;
exports.CC_BANKADDRESSNAME = CC_BANKADDRESSNAME;
exports.CC_BANKCODE = CC_BANKCODE;
exports.CC_BANKNAME = CC_BANKNAME;
exports.CC_BANKACCOUNT = CC_BANKACCOUNT;
exports.CC_DESCRIPTION_EVALUATE = CC_DESCRIPTION_EVALUATE;
exports.CC_LEADER_ID = CC_LEADER_ID;
exports.CC_MANAGER_NAME = CC_MANAGER_NAME;
exports.CC_MGRID = CC_MGRID;
exports.CC_MOBILE = CC_MOBILE;
exports.CC_PERSONTYPE = CC_PERSONTYPE;
exports.CC_PICPATH = CC_PICPATH;
exports.CC_SEND_ADDRESS_NAME = CC_SEND_ADDRESS_NAME;
exports.CC_SERVICEEVALUATE = CC_SERVICEEVALUATE;
exports.CC_SHIP_EVALUATE = CC_SHIP_EVALUATE;
exports.CC_STORE_EVALUATE = CC_STORE_EVALUATE;
exports.CC_SEX = CC_SEX;
exports.CC_USERTYPE = CC_USERTYPE;
exports.CC_FARMERINFO = CC_FARMERINFO;
exports.CC_OPENID = CC_OPENID;
exports.CC_WEIXININFO = CC_WEIXININFO;
exports.CC_GOODINFOLIST = CC_GOODINFOLIST;
exports.CC_SHIPINFOLIST = CC_SHIPINFOLIST;
exports.CC_PHOTO_TYPE_HEAD_IMG = CC_PHOTO_TYPE_HEAD_IMG;
exports.CC_PHOTO_TYPE_CERTIFY = CC_PHOTO_TYPE_CERTIFY;
exports.CC_PHOTO_TYPE_LAND_TYPE = CC_PHOTO_TYPE_LAND_TYPE;
exports.CC_PHOTO_TYPE_PRODUCT_MAIN = CC_PHOTO_TYPE_PRODUCT_MAIN;
exports.CC_PHOTO_TYPE_PRODUCT_LIST = CC_PHOTO_TYPE_PRODUCT_LIST;
exports.CC_MESSAGELIST = CC_MESSAGELIST;
exports.CC_HEAD_IMG = CC_HEAD_IMG;
exports.CC_SHOP_NAME = CC_SHOP_NAME;
exports.CC_SHOP_TYPE = CC_SHOP_TYPE;
exports.CC_COMPANY_NAME = CC_COMPANY_NAME;
exports.CC_LEGAL_NAME = CC_LEGAL_NAME;
exports.CC_LEGAL_IDCARD = CC_LEGAL_IDCARD;
exports.CC_BUSINESS_LICENSE = CC_BUSINESS_LICENSE;
exports.CC_IDCARD_FRONT = CC_IDCARD_FRONT;
exports.CC_IDCARD_BACK = CC_IDCARD_BACK;
exports.CC_ADDRESS_DETAIL = CC_ADDRESS_DETAIL;
exports.CC_REGISTER_NAME = CC_REGISTER_NAME;
exports.CC_REGISTER_MOBILE = CC_REGISTER_MOBILE;
exports.CC_REGISTER_IDCARD = CC_REGISTER_IDCARD;
exports.CC_REGISTER_SEX = CC_REGISTER_SEX;
exports.CC_PRODUCT_TYPE = CC_PRODUCT_TYPE;
exports.CC_PRODUCT_NAME = CC_PRODUCT_NAME;
exports.CC_PRODUCT_MININUMBER = CC_PRODUCT_MININUMBER;
exports.CC_PRODUCT_SPEC = CC_PRODUCT_SPEC;
exports.CC_PRODUCT_SPEC_DESCRIPTION = CC_PRODUCT_SPEC_DESCRIPTION;
exports.CC_PRODUCT_STOCK = CC_PRODUCT_STOCK;
exports.CC_PRODUCT_PROFIT = CC_PRODUCT_PROFIT;
exports.CC_PRODUCT_REMARK = CC_PRODUCT_REMARK;
exports.CC_BUSINESS_CATEGORY = CC_BUSINESS_CATEGORY;
exports.CC_STORE_URL = CC_STORE_URL;
exports.CC_SEND_ADDRESSID = CC_SEND_ADDRESSID;
exports.CC_BANKTYPE = CC_BANKTYPE;
exports.CC_SESSION_KEY = CC_SESSION_KEY;


