// pages/goodsInfo/goodsInfo.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    current:0,
    interval: 5000,
    duration: 1000,
    length:'',
    visible: false,
    activity: [
      {
        type: '1',
        name: '秒杀'
      },
      {
        type: '2',
        name: '满399-30'
      }
    ],
    currentCityId:'',
    scrollHeight:'',
    toView:'nav',
  },
  move (e) {
    let index = e.detail.current;
    let source = e.detail.source;
    // if (source == "touch") {
      this.setData({
        current: e.detail.current
      })
    // }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      length: this.data.imgUrls.length
    })
    wx.getStorage({
      key: 'cityInfo',
      success: (res) => {
        console.log(res);
        this.setData({
          currentCityId: res.data.dicKey
        })
        this.getgoodsList();
      }
    })
    wx.getSystemInfo({
      success: (res) => {
        console.log(res);
        let ratio = res.windowWidth / 750;
        this.setData({
          scrollHeight: res.windowHeight-100 * ratio + 'px'
        })
      },
    })
  },
  handleOpen() {
    this.setData({
      visible: true
    });
    wx.set
  },
  handleCancel() {
    this.setData({
      visible: false
    });
  },
  next () {
    this.setData({
      visible: false
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
  getgoodsList() {
    wx.request({
      url: api.goods.list,
      data: { cityId: 0 },
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: res => {
        console.log(res);
      }
    })
  },
  scroll(e) {
    console.log(e);
  }
})