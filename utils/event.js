let kLoginSuccessEventName = 'kLoginSuccessEventName'    //登录成功的通知
let KDeliverGoodSuccessEventName ="KDeliverGoodSuccessEventName";//发货成功的通知
let KChooseGoodItemSuccessEventName ="KChooseGoodItemSuccessEventName";//用户成功选择子类产品返回
let KLogisiticsModifySuccessEventName = "KLogisiticsModifySuccessEventName";//修改物流成功
let KGetUserInfoSuccess ="KGetUserInfoSuccess";//获取小程序授权信息成功
let KProductPublishSuccess = "KProductPublishSuccess";//用于发布产品成功

let kProductRecommendPurchaseSuccessEvent = 'kProductRecommendPurchaseSuccessEvent' //购买推介成功的通知

var events = {};

function on(name, self, callback) {
    console.log(events)
    var tuple = [self, callback];
    var callbacks = events[name];
    if (Array.isArray(callbacks)) {
        callbacks=[];
        callbacks.push(tuple);
    }
    else {
        events[name] = [tuple];
    }
  
}

function remove(name, self) {
    var callbacks = events[name];
    if (Array.isArray(callbacks)) {
        events[name] = callbacks.filter((tuple) => {
            return tuple[0] != self;
        })
    }

}

function emit(name, data) {
    var callbacks = events[name];
    if (Array.isArray(callbacks)) {
        callbacks.map((tuple) => {
            var self = tuple[0];
            var callback = tuple[1];
            callback.call(self, data);
        })
    }
}

exports.kLoginSuccessEventName = kLoginSuccessEventName;
exports.KDeliverGoodSuccessEventName = KDeliverGoodSuccessEventName;
exports.KChooseGoodItemSuccessEventName = KChooseGoodItemSuccessEventName;
exports.KLogisiticsModifySuccessEventName = KLogisiticsModifySuccessEventName;
exports.on = on;
exports.remove = remove;
exports.emit = emit;
exports.KGetUserInfoSuccess = KGetUserInfoSuccess;
exports.KProductPublishSuccess = KProductPublishSuccess;