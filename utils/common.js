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
let CC_COMPANY_NAME ="license_c_name";//公司名称
let CC_LEGAL_NAME ="license_legal_name";//公司法人名称
let CC_LEGAL_IDCARD ="license_legal_idCard";//公司法人身份证
let CC_BUSINESS_LICENSE = "businessLicense";//公司营业执照
let CC_IDCARD_FRONT = "idCardFront";//身份证正面
let CC_IDCARD_BACK = "idCardBack";//身份证反面
let CC_ADDRESS = "areaId";//地址
let CC_ADDRESS_DETAIL = "address";//详细地址
let CC_BANKADDRESS = 'bankAddressId';
let CC_BANKCODE = 'bankCode';//开户类型
let CC_BANK_TYPE_ID = 'bank_type_id';//开户行
let CC_BANKNAME = 'accountName';
let CC_BANKACCOUNT = 'bankNumber';
let CC_REGISTER_NAME ="name";
let CC_REGISTER_MOBILE ="mobile";
let CC_REGISTER_IDCARD ="idCard";
let CC_REGISTER_SEX ="sex";
let CC_BUSINESS_CATEGORY ="gcMainId";
let CC_SEND_ADDRESSID = "sendAddressId";
//产品发布；
let CC_PRODUCT_TYPE ="gc_id";//产品类型
let CC_PRODUCT_TYPE_NAME = "goodsName";//产品类型对应的名称
let CC_PRODUCT_NAME="dsbName";//产品名称
let CC_PRODUCT_MININUMBER ="goodsPrice";//零售价
let CC_PRODUCT_SPEC="spec";        
let CC_PRODUCT_SPEC_DESCRIPTION ="packDetails";
let CC_PRODUCT_STOCK ="goodsInventory"; //库存
let CC_PRODUCT_PROFIT ="goodsExtra2" //让利金
let CC_PRODUCT_REMARK ="goodsDetails" //发货说明
let CC_PRODUCT_INV_TYPE ="inventory_type"//全局还是配置规格
let CC_PRODUCT_AREA_ID = "area_id"  //发货地址ID
let CC_PRODUCT_SPECS_INFO = "specs_info"
let CC_PRODUCT_DSB_GOOD_UNIT = "dsbGoodsUnit"
let CC_PRODUCT_PACK_DETAILS = "packDetails"
//产品修修改
let CC_PRODUCT_GOOD_ID = "goods_id"
let CC_PRODUCT_GOOD_STATUS ="goods_status"
let CC_PRODUCT_GOOD_MAIN= "goods_main"//产品主图
let CC_PRODUCT_GOOD_SEC_LIST = "goods_secondary_list"//产品主图里面的次图列表
let CC_PRODUCT_PROFIT_2 = "goodsExtra" //让利金
//微信保存信息
let CC_SESSION_KEY = "session_key"//session_key
let CC_IV_KEY = "iv";//iv秘钥
let CC_ENCRY_KEY = "encryptedData";//加密的unitonID
let CC_NICK_NAME = "nickName";//微信昵称
//上传图片状态
let CC_UPLOAD_STATUS_MAIN = "1";//商品主图
let CC_UPLOAD_STATUS_HEAD = "2";//农户头像
let CC_UPLOAD_STATUS_IDCARD = "3";//身份证第一张
let CC_UPLOAD_STATUS_IDCARD_BACK = "4";//身份证第一张
let CC_UPLOAD_STATUS_COMMITMENT = "5";//营业执照
let CC_UPLOAD_STATUS_MAIN_OTHER = "6";//商品图片，不是主图
//上传图片商品ID
let CC_PRODUCT_ID="productID";
//农户绑定状态
let CC_BAND_STATUS ="farmer_idcard_status"
//产品修改
let CC_GOOD_INFO="goodInfo";
let CC_GOODS_INVENTORY_DETAIL="goods_inventory_detail"
//弹出框返回暂存
let CC_DIALOG_CONTENT ="dialogContent";//弹出框用户输入地内容
let CC_DIALOG_VRCODE="dialogVrcode";//弹出框用户获取的验证码
//登录的用户名与密码
let CC_LOGIN_USERNAME="login_name";
let CC_LOGIN_PASS= "login_pass";




exports.CC_USERNAME = CC_USERNAME;
exports.CC_IDCARD = CC_IDCARD;
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
exports.CC_SESSION_KEY = CC_SESSION_KEY;
exports.CC_PRODUCT_TYPE_NAME = CC_PRODUCT_TYPE_NAME;
exports.CC_PRODUCT_INV_TYPE = CC_PRODUCT_INV_TYPE;
exports.CC_PRODUCT_AREA_ID = CC_PRODUCT_AREA_ID;
exports.CC_PRODUCT_SPECS_INFO = CC_PRODUCT_SPECS_INFO;
exports.CC_PRODUCT_DSB_GOOD_UNIT = CC_PRODUCT_DSB_GOOD_UNIT;
exports.CC_PRODUCT_PACK_DETAILS = CC_PRODUCT_PACK_DETAILS;
exports.CC_IV_KEY = CC_IV_KEY;
exports.CC_ENCRY_KEY = CC_ENCRY_KEY;
exports.CC_NICK_NAME = CC_NICK_NAME;
exports.CC_UPLOAD_STATUS_MAIN = CC_UPLOAD_STATUS_MAIN;
exports.CC_UPLOAD_STATUS_HEAD = CC_UPLOAD_STATUS_HEAD;
exports.CC_UPLOAD_STATUS_IDCARD = CC_UPLOAD_STATUS_IDCARD;
exports.CC_UPLOAD_STATUS_IDCARD_BACK = CC_UPLOAD_STATUS_IDCARD_BACK;
exports.CC_UPLOAD_STATUS_COMMITMENT = CC_UPLOAD_STATUS_COMMITMENT;
exports.CC_UPLOAD_STATUS_MAIN_OTHER = CC_UPLOAD_STATUS_MAIN_OTHER;
exports.CC_PRODUCT_ID = CC_PRODUCT_ID;
exports.CC_BAND_STATUS = CC_BAND_STATUS;
exports.CC_BANK_TYPE_ID = CC_BANK_TYPE_ID;
exports.CC_PRODUCT_GOOD_ID = CC_PRODUCT_GOOD_ID;
exports.CC_PRODUCT_GOOD_STATUS = CC_PRODUCT_GOOD_STATUS;
exports.CC_PRODUCT_GOOD_MAIN = CC_PRODUCT_GOOD_MAIN;
exports.CC_PRODUCT_GOOD_SEC_LIST = CC_PRODUCT_GOOD_SEC_LIST;
exports.CC_PRODUCT_PROFIT_2 = CC_PRODUCT_PROFIT_2;
exports.CC_GOOD_INFO = CC_GOOD_INFO;
exports.CC_GOODS_INVENTORY_DETAIL = CC_GOODS_INVENTORY_DETAIL;
exports.CC_DIALOG_CONTENT = CC_DIALOG_CONTENT;
exports.CC_DIALOG_VRCODE = CC_DIALOG_VRCODE;
exports.CC_LOGIN_USERNAME = CC_LOGIN_USERNAME;
exports.CC_LOGIN_PASS = CC_LOGIN_PASS;