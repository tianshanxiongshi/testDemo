// pages/my-order/my-order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataEmpty:false,
    stayInstallArr:[11,2,3]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  uninstall () {

  },
  finished () {

  },
  cancleOrder (e) {
    this.Modal = this.selectComponent("#modal");
    this.Modal.openModal();
    console.log(e.currentTarget.dataset.item);
  },
  cancleModal () {
    this.Modal.hideModal();
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