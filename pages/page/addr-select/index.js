import zIndexMarge from "../dialog-modal/z-index-marge";

// var cityList = require('./cityList')
// cityList = cityList.sort(function (a, b) {
// 	return a.id > b.id ? -1 : 1
// })

function getAreaList(id, cb){
  wx.request({
    url: "http://61.28.113.182:9595/siboss/iface/comm/getDistinctListById?distinctId=" + id,
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "get",
    success: function (res) {
      var message = res.data.message;
      console.log(message);
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
};
function getCurrentItemList(index,pid, defaultSelect,cb) {
	let list = []
	let selectid, selectitem;
  getAreaList(pid,function(res){
    var resultList =res.result;
    console.log(resultList)
    for (let i = resultList.length - 1; i >= 0; i--) {
      let item = resultList[i]
      if (item.distinct_id == pid) {
        selectid=item.distinct_id;
        selectitem=item;
      }
        if (defaultSelect&&defaultSelect[index]==item.name){
            selectid = item.distinct_id;
            selectitem=item;
      }
      list.push(item)
    }
    var thisData = {
      list,
      selectid,
      selectitem
    }
    console.log(thisData)
    return typeof cb == "function" && cb(thisData)
  })
 
}


Component({
	properties: {
		show: {
			type: Boolean,
			value: false,
			observer(newVal) {
				if (newVal) {
					this.setData({
            zIndex: zIndexMarge()
					})
				}
			}
		},
		zIndex: {
			type: Number,
      value: zIndexMarge()
		},
		addrSelect: {
			type: Array,
			value: [],
			observer() {
				this._setInitSelectInit = true
				this._setInitSelect()
			}
		},
		currentTab: {
			type: Number,
			value: 0
		},
		autoClose: {
			type: Boolean,
			value: true
		},
    addressLeven:{
      type:Number,
      value:0
    }
	},
	data: {
		addrList: [],
		_addrSelect: []
	},
	ready() {
		if (!this._setInitSelectInit) {
			this._setInitSelect()
		}
	},
	methods: {
		_touchmove(e) {
			this.triggerEvent('touchmove', e)
		},
		_setInitSelect() {
      console.log("开始初始化")
			var addrSelect = this.data.addrSelect
			var addrList = []
			var tempResult, selectid
			var hasFixGh = true
      var that =this;
			// addrSelect = addrSelect.filter((item) => {
      //   if (item.distinct_id || (item.name && hasFixGh)) {
			// 		return true
			// 	}
			// 	hasFixGh = false
			// 	return false
			// }).map((item) => {
			// 	item.name = (item.name + '').replace(/^\s+|\s+$/g, '')
			// 	return item
			// })
     
      console.log(addrSelect)

			let _addrSelect = []
				selectid = tempResult ? tempResult.selectid : 0
        console.log("selectid" + selectid)
        getCurrentItemList(0,selectid, addrSelect,function(res){
          tempResult = res;
          console.log(tempResult)
          if (tempResult.list && tempResult.list.length) {
            addrList[0] = tempResult.list
          }
          if (tempResult.selectid) {
            if (tempResult.selectitem) {
              addrSelect[0] = tempResult.selectitem.name
            }
            _addrSelect.push(addrSelect[0])
          }
          that.setData({
            addrList,
            _addrSelect,
            currentTab: addrList.length - 1
          })
          //检测是否已经有地址需要跳转到相应地址
          if (addrSelect.length>0){ //这里不可以用for循环，因为是异步，等待callBack执行下一步
                that.setClickItem(0, addrSelect[0],function(index){
                  if(index==1){
                    that.setClickItem(1,addrSelect[1],function(index){
                      if(index==2){
                        that.setClickItem(2, addrSelect[2], function (index) {
                          if(index==3){
                            that.setClickItem(3, addrSelect[3], function (index) {
                              //跳转到四级就停止向下跳转了
                            })
                          }
                        })
                      }
                    })
                  }
                })
          }  
        })
		
		},
		open() {
			this.setData({
				show: true
			})
			this.triggerEvent('open')
			return this
		},
		show() {
			this.open()
			return this
		},
		close() {
			this.setData({
				show: false
			})
			this.triggerEvent('close')
			return this
		},
		setAddrSelect(addrSelect) {
			if (({}).toString.call(addrSelect) !== '[object Array]') {
				return this
			}
			this.setData({
				addrSelect
			})
			return this
		},
		callback(callback, clear = false) {
			this._callback = callback || function () {
			}
			this._callbackClear = !!clear
			return this
		},
		autoClose(autoClose = true) {
			this.setData({
				autoClose
			})
			return this
		},
		tapTabBar(e) {
			var dataset = e.currentTarget.dataset
			this.setData({
				currentTab: dataset.currentTab
			})
		},
		swiperChange(e) {
			this.setData({
				currentTab: e.detail.current
			})
		},
    /**
     * 这里是用户点击地址跳转下一页
     */
		clickSelectArea(e) {
      console.log("点击了其中一项")
      console.log(e)
			var dataset = e.currentTarget.dataset
			var currentTab = dataset.currentTab
			var nextTab = currentTab + 1
			var _addrSelect = this.data._addrSelect
			var addrList = this.data.addrList
      var that=this;
			//已选择地址
			_addrSelect[currentTab] = {
				name: dataset.itemName,
				id: dataset.itemId
			}
     
      if (this.data.addressLeven != 0 && this.data.addressLeven == nextTab){
        that.triggerEvent('select', that.data._addrSelect)
        this.close();
        this.setData({
          _addrSelect: _addrSelect
        })
        return;
      }
      console.log("addrSelect" + "addressLeven=" + this.data.addressLeven)
      _addrSelect.splice(currentTab + 1)
      var nextItemList;
      getCurrentItemList(nextTab,dataset.itemId,"",function(res){
         nextItemList=res;
         if (nextItemList.list.length) {
           addrList[nextTab] = nextItemList.list
         }
         addrList.splice(nextTab + 1)
         let temp_currentTab = currentTab >= addrList.length - 1 ? currentTab : currentTab + 1
         that.setData({
           _addrSelect,
           addrList
         }, () => {
           if (currentTab >= addrList.length - 1) {
             that.triggerEvent('select', that.data._addrSelect)
             if (that.data.autoClose) that.close()
             that._callback && that._callback(that.data._addrSelect, that)
             if (that._callbackClear) {
               that._callback = null
             }
           }
           that.setData({
             currentTab: temp_currentTab
           })

         })
       })
		},
    /**
     * 这里是已有地址获取
     */
    setClickItem(currentTab,selectItem ,cb){
      var _addrSelect = this.data._addrSelect
      var addrList = this.data.addrList
      var that = this;
      var nextTab =currentTab+1;
      var selectId=0;
      var thisList=addrList[currentTab];
      for (var i = 0; i < thisList.length;i++){
        if (thisList[i].name == selectItem){
          selectId = thisList[i].distinct_id;
          break;
        }
      }  
      //已选择地址
      _addrSelect[currentTab] = {
        name: selectItem,
        id: selectId
      }
      //定义最大到4级
      if (nextTab<4){
        _addrSelect.splice(nextTab)
      }
      var nextItemList;
      //获取新的列表
      getCurrentItemList(nextTab, selectId, this.data.addrSelect, function (res) {
        nextItemList = res;
        if (nextItemList.list.length) {
          addrList[nextTab] = nextItemList.list
        }
        addrList.splice(nextTab + 1)
        let temp_currentTab = currentTab >= addrList.length - 1 ? currentTab : currentTab + 1
        that.setData({
          _addrSelect,
          addrList
        }, () => {
          if (currentTab >= addrList.length - 1) {
            that.triggerEvent('select', that.data._addrSelect)
            if (that.data.autoClose) that.close()
            that._callback && that._callback(that.data._addrSelect, that)
            if (that._callbackClear) {
              that._callback = null
            }
          }
          that.setData({
            currentTab: temp_currentTab
          })
         
        })
        return typeof cb == "function" && cb(nextTab)
      })
    }
	},
  
})
