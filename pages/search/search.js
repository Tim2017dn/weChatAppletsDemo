// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:"",
    search: {
      focus: false,
      history: []
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onSearch:function(e){
    var var1 = e.detail.value

    this.setData({
      text: var1
    })


  },
  btnsearch:function(e){
    // console.log(e.detail.value)

    console.log(e)
    var var1=e.detail.value
    
   this.setData({
     text:var1
   })
    // console.log(this.data.text)
     wx.navigateTo({
      url: '../result/result?text='+var1 ,
    })

    this._saveHistory(var1)
  },

  btnfind: function (e) {
    console.log("ssss")
    wx.request({
      url: "http://192.168.31.70:8080/getOneByCHName/",
      data: {
        chName: '汞'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },


  //保存历史记录
  _saveHistory: function (value) {
    let history = this.data.search.history.filter(v => v !== value)
    history.unshift(value)
    if (history.length > 6) {
      history = history.slice(0, 6)
    }
    this.setData({ 'search.history': history })
    wx.setStorage({
      key: 'history',
      data: history
    })
  },


  clearHistory:function(){
    this.setData({
      'search.history':[]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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