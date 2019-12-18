// pages/search/search.js
const app = getApp()
var searchBar
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:"",
    search: {
      focus: false,
      history: [],
      serviceurl:'',
    },
    serviceurl:"",
    
    itemlist:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  onSearch:function(e){
   
    var detail=e.detail
    var type=detail.type
    var text=detail.value

    if(type=="中文名"){
      this.searchByCHName(text)
    }else{
      //按CAS搜索
      this.searchByCAS(text)
    }

    this._saveHistory(text)



  },
 

  searchByCHName: function (text) {
    

    var service=this.data.serviceurl

    wx.request({
      method: 'GET',
      url: service + '/chemicals/getByCHName/'+text,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        
       
        if(res.data.length!=0){
          var data = JSON.stringify(res.data)
          var tmp = data.split("},{")
          for (var i = 0; i < tmp.length; ++i) {
            if (tmp[i][0] == "[") {
              tmp[i] = tmp[i].substring(1)
              tmp[i] = tmp[i] + "}"
            } else {
              if (tmp[i][tmp[i].length - 1] == "]") {
                tmp[i] = tmp[i].substring(0, tmp[i].length - 1)
                tmp[i] = "{" + tmp[i]
              } else {
                tmp[i] = "{" + tmp[i] + "}"
              }
            }
            tmp[i] = JSON.parse(tmp[i])
          }

          wx.setStorage({
            key: 'itemlist',
            data: tmp,
          })
        }else{
          //没有查到所搜索的内容
          wx.setStorage({
            key: 'itemlist',
            data: [],
          })
          
        }
        console.log("setlist success")
        wx.navigateTo({
          url: '../result/result',
        })


      }
    })


   

  },

  searchByCAS:function(text){
    var service = this.data.serviceurl

    wx.request({
      method: 'GET',
      url: service + '/chemicals/getByCAS/' + text,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)


        if (res.data.length != 0) {
          var data = JSON.stringify(res.data)
          var tmp = data.split("},{")
          for (var i = 0; i < tmp.length; ++i) {
            if (tmp[i][0] == "[") {
              tmp[i] = tmp[i].substring(1)
              tmp[i] = tmp[i] + "}"
            } else {
              if (tmp[i][tmp[i].length - 1] == "]") {
                tmp[i] = tmp[i].substring(0, tmp[i].length - 1)
                tmp[i] = "{" + tmp[i]
              } else {
                tmp[i] = "{" + tmp[i] + "}"
              }
            }
            tmp[i] = JSON.parse(tmp[i])
          }

          wx.setStorage({
            key: 'itemlist',
            data: tmp,
          })
        } else {
          //没有查到所搜索的内容
          wx.setStorage({
            key: 'itemlist',
            data: [],
          })

        }
        console.log("setlist success")
        wx.navigateTo({
          url: '../result/result',
        })


      }
    })   

  },

  //保存历史记录
  _saveHistory: function (value) {
    let history = this.data.search.history.filter(v => v !== value)
    history.unshift(value)
    if (history.length > 10) {
      history = history.slice(0, 6)
    }
    this.setData({ 'search.history': history })
    wx.setStorage({
      key: 'history',
      data: history
    })
  },


  clearHistory:function(){
    // this.setData({
    //   'search.history':[]
    // })
    wx.showModal({
      title: '清除搜索记录',
      content: '确定清除所有搜索历史？这项操作将无法撤销',
      success: res => {
        if (res.confirm) {
          wx.removeStorage({ key: 'history' })
          this.setData({ 'search.history': [] })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
    var url=app.serviceurl;


    this.setData({serviceurl:url })
    console.log(this.data.serviceurl)

    searchBar = this.selectComponent('#searchBar')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})