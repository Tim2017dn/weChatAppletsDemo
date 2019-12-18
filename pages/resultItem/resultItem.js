// pages/resultItem/resultItem.js


// const hide= [true, true, true, true, true, true, true, true, true]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},

    
    hide: [true, true, true, true, true, true, true, true, true]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var index = JSON.parse(options.index);

    wx.getStorage({
      key: 'itemlist',
      success: function(res) {
        var list=res.data
        that.setData({
          item: list[index],
        })

      },
    })

    for(var i=0 ;i<9;i++){
      this.data.hide[i]=true
    }



   
  },

  uploadinfo:function(){
    var name=this.data.item.chName
    wx.navigateTo({
      url: '../infoUpload/infoUpload?itemname='+name,
    })
  },


 

  alarm:function(){
    var name = this.data.item.chName
    wx.navigateTo({
      url: '../alarm/alarm?itemname=' + name,
    })
  },




  // change1:function(e){
  //   this.setData({
  //     hide1:!this.data.hide1
  //   })
  //   console.log(this.data.hide1)
  // },

  changehide:function(event){
    let that = this
    console.log(event)
    var id = parseInt(event.currentTarget.dataset.index)
    var obj=this.data.hide

    for(var i=0;i<9;i++){
      if(i==id){
        obj[i]=!obj[i]
      }
    }

    this.setData({
      hide:obj
    })

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    for (var i = 0; i < 9; i++) {
      this.data.hide[i] = true
    }
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