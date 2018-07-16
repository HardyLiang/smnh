Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    // 弹窗标题
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 弹窗取消按钮文字
    cancelText: {
      type: String,
      value: '取消'
    },
    // 弹窗确认按钮文字
    confirmText: {
      type: String,
      value: '确定'
    },
    mobile: {
      type: String,
      value: ""
    },
    idCard: {
      type: String,
      value: ""
    }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    // 弹窗显示控制
    isShow: false,
    vercode: "",
    inputcode: "",
    second: 60,
    selected: false,
    selected1: true,
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /*
     * 公有方法
     */

    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow,
        inputcode: "",
        selected: false,
        selected1: true,
        second: 60,
      })
    },
    //展示弹框
    showDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _cancelEvent() {
      //触发取消回调
      this.triggerEvent("cancelEvent")
    },
    _confirmEvent() {
      //触发成功回调
      this.triggerEvent("confirmEvent");
    },
    bindInput: function (e) {
      var inputContent = e.detail.value;
      console.log("dialog value =======" + inputContent);
      wx.setStorageSync("dialogContent", inputContent);

      this.setData({
        inputcode: inputContent
      })
    },
    /**
   * 获取验证码
   */
    getphone: function () {
      console.log("getPhone")
      var that = this;
      //联网获取数据
      getApp().func.fotgetPass(that.data.idCard, that.data.mobile, function (message, res) {
        console.log(res)
        if (!res) {
          wx.showToast({
            title: message,
            icon: 'none'
          })
          return;
        }
        //设置按钮是否可点
        that.setData({
          selected: true,
          selected1: false,
        });
        countdown(that);
        var verCode = res.data;
        console.log(verCode);
        that.setData({
          vercode: verCode
        })
        wx.setStorageSync("dialogVrcode", verCode)
      })
    },
  }
})
/**
 * 公用方法 获取验证码倒计时
 */
function countdown(that) {
  var second = that.data.second;
  if (second == 0) {
    // console.log("Time Out...");
    that.setData({
      selected: false,
      selected1: true,
      second: 60,
    });
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }
    , 1000)
}
