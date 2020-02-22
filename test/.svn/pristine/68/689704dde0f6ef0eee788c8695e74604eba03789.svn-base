// pages/pay-result/pay-result.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    id:'',
    memberMoney:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      type: options.type,
    })
    if (options.type == '1') {
      this.setData({
        memberID: options.id
      })
      this.getMwallet();
    }
  },
  getMwallet() {
    let _self = this;
    wx.login({
      success: res => {
        wx.request({
          url: api.wallet.info,
          data: {
            code: res.code,
            memberId: this.data.memberID
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            wx.hideLoading();
            if (res.statusCode == 200 && res.data.code == '0') {
              let data = res.data.data;
              if (data.thismemberMoney) {
                _self.data.memberMoney = parseFloat(data.thismemberMoney / 100).toFixed(2);
              } else {
                _self.data.memberMoney = 0;
              }
              _self.setData({
                memberMoney: _self.data.memberMoney,
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }
          }
        })
      }
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

  },
  goIndex () {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  goOrder () {
    wx.navigateTo({
      url: '/pages/deal-list/deal-list',
    })
  }
})