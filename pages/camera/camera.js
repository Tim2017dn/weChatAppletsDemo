// pages/camera/camera.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ctx: wx.createCameraContext(),
     canIUse: wx.canIUse('button.open-type.getUserInfo')
  },



  takePhoto() {
   // const ctx = wx.createCameraContext()
   
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },


  




  getUserInfo: function (e) {
    console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail.userInfo)
   
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getSetting({
    //   success(res){
    //     console.log(res.authSetting)
    //   }
    // })


   if(this.data.canIUse){
     app.userInfoReadyCallback = res => {
       console.log(res)
     }
   }


    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.camera']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // this.globalData.camera = res.camera
             // console.log(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },

  globalData: {
    camera: null
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