// pages/current-city/current-city.js
const api = require('../../utils/api.js');
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
let qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_city:'',
    cityList:[],
    locationSuccess:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      current_city:options.city,
      locationSuccess:options.type
    })
    this.getShopList();
    this.getlocation();
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
  getShopList () {
    let _self = this;
    wx.request({
      url: api.dic.get,
      data: { dicCode: 'city', dicLevel: '2'},
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.statusCode == 200 && res.data.code == '0') {
          console.log(res);
          _self.setData({
            cityList: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },
  getlocation() {
    qqmapsdk = new QQMapWX({
      key: 'ZX6BZ-65OH3-C4G3L-3VH5T-BU3JO-32FME'
    });
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res);
            console.log(res.result.ad_info.city);
            that.setData({
              current_city: res.result.ad_info.city,
              locationSuccess:'1'
            })
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            // console.log(res);
          }
        });

      },
      fail: function (res) {
        console.log(res);
        wx.authorize({ scope: "scope.userLocation" });
      }
    })
  },
  chooseCity (e) {
    console.log(e);
    let data = e.target.dataset.item;
    wx.setStorage({
      key: 'cityInfo',
      data: data,
    })
    wx.navigateBack();
  }
})