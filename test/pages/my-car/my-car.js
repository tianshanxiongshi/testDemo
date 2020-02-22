// pages/my-car/my-car.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList:[],
    memberId:'',
    undefaultCar:'../../images/my-car-unchoose.png',
    defaultCar:'../../images/my-car-choose.png',
    isEmpty:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // wx.getStorage({
    //   key: 'memberInfo',
    //   success: function (res) {
    //     that.setData({
    //       memberId: res.data.memberId
    //     })
    //     that.getCarList();
    //   },
    // })
    let info = wx.getStorageSync('memberInfo');
    console.log(info);
    if (info) {
      that.setData({
        memberId: info.memberId
      })
      that.getCarList();
    }
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
    let that = this;
    let isnewCar = wx.getStorageSync('isAddCar');
    if (isnewCar) {
      wx.getStorage({
        key: 'memberInfo',
        success: function (res) {
          that.setData({
            memberId: res.data.memberId
          })
          that.getCarList();
          wx.removeStorageSync('isAddCar');
        },
      })
    }
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
  getCarList () {
    let that = this;
    wx.request({
      url: api.memberCar.list,
      data: { memberId: that.data.memberId },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.statusCode == 200 && res.data.code == '0') {
          if(res.data.data.length == 0){
            that.setData({
              isEmpty: true
            })
          }
          that.setData({
            carList: res.data.data
          })
        }else {
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }
      }
    })
  },
  addCar () {
    wx.removeStorage({
      key: 'addcarInfo',
      success: function (res) { },
    })
    wx.navigateTo({
      url: '/pages/add-car/add-car',
    })
  },
  editCar (e) {
    let carId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/add-car/add-car?id=' + carId,
    })
  },
  cancelCar (e) {
    let carId = e.currentTarget.dataset.id;
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除该车辆？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: api.memberCar.saveOrEdit,
            method: 'post',
            data: { memberCarId: carId, is_del: 1 },
            header: {
              'content-type': 'application/json'
            },
            success: res => {
              if (res.statusCode == 200 && res.data.code == '0') {
                wx.showToast({
                  title: '删除成功',
                })
                that.getCarList();
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }
            }
          })
        } else if (res.cancel) {

        }
      }
    })
   
  },
  setDefaultCar (e) {
    let carId = e.currentTarget.dataset.id;
    let isDefault = e.currentTarget.dataset.isdefault == 0 ? 1 : 0;
    let that = this;
    wx.request({
      url: api.memberCar.saveOrEdit,
      method: 'post',
      data: { memberCarId: carId, isDefaultCar: isDefault, memberId: that.data.memberId },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if (res.statusCode == 200 && res.data.code == '0') {
          wx.showToast({
            title: '设置成功',
          })
          that.getCarList();
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