Component({
  properties: {
     //这里定义了dialogHidden属性，属性值可以在组件使用时指定.写法为dialog-hidden  
    viewHidden:{
      type: Boolean,
      value: true
    },
    titleMsg: {
      type: String,
      value: ' ',
    },
    confirmMsg: {
      type: String,
      value: ' ',
    },
    cancleMsg: {
      type: String,
      value: ' ',
    },
    contentMsg: {
      type: String,
      value: ' ',
    }
    
  },
  data: {
    // 这里是一些组件内部数据  
  },
  methods: {
    // 取消  
    cancel: function () {
      this.setData({
        hiddenmodalput: true
      });
    },
    // 确定  
    confirm: function () {
      this.setData({
        hiddenmodalput: false
      })
    }
  }
})