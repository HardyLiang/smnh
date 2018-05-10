// pages/page/action_sheet/text_sheet.js
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
    list: {            // 属性名
      type: Array,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: {}    // 属性初始值（可选），如果未指定则会根据类型选择一个
    }, 
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    // 弹窗显示控制
    showModalStatus: false,
    list:{},
    index:0,
    chooseList:[]
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
        showModalStatus: !this.data.showModalStatus
      })
    },
    //展示弹框
    showDialog() {
      this.setData({
        showModalStatus: !this.data.showModalStatus
      })
    },
  
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _confirmChoose(e) {
    //触发取消回调
      this.triggerEvent("confirmChoose", { chooseList: this.data.chooseList })
  },
   _listenCheckboxChange(e){
     //触发取消回调
     this.triggerEvent("listenCheckboxChange")
     console.log(e.detail.value);
     var checklist =e.detail.value;
     var choose = [];
      for(var i =0 ; i<checklist.length;i++){
        choose[i] = this.data.list[checklist[i]];
      }
      this.setData({
        chooseList: choose
      })
    }
   
  },
  showDialog:function(e){
    var status = e.currentTarget.dataset.status;
    this.showManage(status);
  },
  showManage: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停  
    animation.translateY(240).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停  
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭抽屉  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  } ,
  
})