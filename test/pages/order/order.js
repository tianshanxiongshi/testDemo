// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inVal:0,
    isFocus:false,
    reqObj: {
      "couponCode": "string",
      "couponId": 0,
      "goodsActivityId": 0,
      "goodsId": 0,
      "goodsNum": 0,
      "goodsSpecId": 0,
      "integralNum": 0,
      "payAll": 0,
      "payReal": 0,
      "reservationConfigureId": 0,
      "reservationConfigureListId": 0,
      "shopId": 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        inVal:10,
      });
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
    this.setData({
      inVal: 10
    });
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

  },
  getIntegral(e){
     console.log(e)
  },
  getJK(){
    let obj = this.data.reqObj
    obj.couponCode = "456";
    obj.payAll = 10;
      wx.request({
        url: '',
        data: obj
      })
  }
})