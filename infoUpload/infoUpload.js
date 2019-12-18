// pages/infoUpload/infoUpload.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemname:"",
    wd: "",
    jd: "",
    state: ["生产", "状态2", "状态3"],
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    index: 0,
   
    serviceurl: '',

    item:{
      chName: "1", batchNumber: "1", companyName: "1", chemStatus: "生产", remark: "1",location: "32.06639 118.77013"
    }
  },

  onLoad: function (options) {
   
    
    var tmp=options.itemname
    let that =this
    that.setData({
      itemname:tmp
    })

    var url = app.serviceurl;


    that.setData({ serviceurl: url })
    console.log(that.data.serviceurl)

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          wd: latitude,
          jd: longitude
        })
        console.log(latitude)
      },
      fail:function(e){
        console.log(e)
      }
      
    })

    // console.log("完成定位" + that.data.jd)

    
  },


  formSubmit: function (e) {



    var that = this;
  // console.log("执行到了formsubmit")

    var formData = e.detail.value;
    // console.log(formData)
    //serialNumber: "3333", bussinessName: "4444", state: "生产", location: "32.06639 118.77013", remark: "55555555"
    that.setData({
      item:{
        chName: this.data.itemname,
        batchNumber: formData.serialNumber,
        companyName: formData.bussinessName, 
        chemStatus: formData.state, 
        remark: formData.remark, 
        location: formData.location
      }
    })

    that.modalTap()
   
  },
  formReset: function () {
    console.log('form发生了reset事件');
    this.modalTap2();
  },


  //弹出确认框
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  confirm_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '正在提交'
    }); 
    var that = this
    var service = that.data.serviceurl
    var tmpdata = JSON.stringify(that.data.item)
    console.log("tmpdata" + tmpdata)

    wx.request({
      method: 'POST',
      url: service + '/upload/addOneByObj',
      data: tmpdata,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
       
        if (res.data == true) {
          that.uploadSuccess()
        } else {
          that.uploadFailure()
        }
      }
    })

   

  },
  cancel_one: function (e) {
    // console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '取消成功'
    });

  },

//上传成功
  uploadSuccess: function () {
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '上传成功'
    });
  },

uploadFailure:function(){
  this.setData({
    modalHidden: true,
    toast1Hidden: false,
    notice_str: '上传失败，请稍后重传'
  });
},

  //弹出提示框
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  

  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    


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