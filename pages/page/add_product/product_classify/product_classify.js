var app = getApp()
Page({
  data: {
    hidden: false,
    curNav: 1,
    curIndex: 0,
    navList: [
      {
        id: 1,
        name: '产品类型1'
      },
      {
        id: 2,
        name: '产品类型2'
      },
      {
        id: 3,
        name: '产品类型3'
      },
      {
        id: 4,
        name: '产品类型4'
      },
      {
        id: 5,
        name: '产品类型4'
      },
      {
        id: 6,
        name: '产品类型4'
      },
      {
        id: 7,
        name: '产品类型4'
      },
      {
        id: 8,
        name: '产品类型4'
      },
      {
        id: 9,
        name: '产品类型4'
      },
      {
        id: 10,
        name: '产品类型4'
      },
      {
        id: 11,
        name: '产品类型4'
      },
      {
        id: 12,
        name: '产品类型4'
      }
      
    ],
    dishesList: [
      [
        {
          name: "玉米",
         
        },
        {
          name: "大豆",
         
        },
        {
          name: "花生",
         
        }
      ],
      [
        {
          name: "西瓜",
        
        },
        {
          name: "黄瓜",
          
        }
      ],
      [
        {
          name: "苦瓜",
      
        },
        {
          name: "芒果",
        }
      ],
      [
        {
          name: "大话苦瓜",

        },
        {
          name: "米酒芒果",
        }
      ],
    ],
    dishes: []
  },
  loadingChange() {
    setTimeout(() => {
      this.setData({
        hidden: true
      })
    }, 1000)
  },
  selectNav(event) {
    var id = event.target.dataset.id,
      index = parseInt(event.target.dataset.index);
    self = this;
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  onLoad() {
    this.loadingChange()
  }
})