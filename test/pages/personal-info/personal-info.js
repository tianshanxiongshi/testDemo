// pages/personal-info/personal-info.js
const wxbarcode = require("../../utils/index.js");
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pages:'pages/recharge/recharge',
    img:'',
    postData:{
      memberId:'',
      limit:10,
      offset:1
    },
    list:[],
    total:'',
    totalPage:'',
    isBottom:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.data.postData.memberId = options.id;
    this.setData({
      postData: this.data.postData
    })
    this.getEWM();
    this.getList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wxbarcode.qrcode('barcode', 'sfsdfsdfs', 450, 450);
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
    if (this.data.postData.offset < this.data.totalPage) {
      wx.showLoading({
        title: '加载中...',
        icon: 'none'
      })
      this.data.postData.offset = this.data.postData.offset + this.data.postData.limit;
      this.getList();
    } else {
      this.setData({
        isBottom: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getEWM () {
    let that = this;
    wx.request({
      url: api.member.getWXACodeUnlimit,
      data: { page: this.data.pages, scene: this.data.postData.memberId, isHyaline:true},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        
        if (res.statusCode == 200 && res.data.code == '0') {
          that.setData({
            img:'data:image/png;base64,' + res.data.data
          })
          if(that.data.list) {
            wx.hideLoading();
          }
        }else {
          wx.hideLoading();
          wx.showToast({
            title: res.data.errMsgs,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },
  getList () {
    let that = this;
    wx.request({
      url: api.member.invitationRechargeOrder,
      data:this.data.postData,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.statusCode == 200 && res.data.code == '0') {
          let totalPage = Math.ceil(res.data.data.total / that.data.postData.limit);
          let rows = res.data.data.rows;
          rows.forEach( item => {
            let newrechargeNum;
            if (item.rechargeNum < 100) {
              newrechargeNum = parseFloat(item.rechargeNum / 100).toFixed(2)
            } else {
              newrechargeNum = parseInt(item.rechargeNum / 100)
            }
            item.newrechargeNum = newrechargeNum;
            that.data.list.push(item);
          } )
          that.setData({
            list: that.data.list,
            total:res.data.data.total,
            totalPage: totalPage
          })
          if(that.data.img) {
            wx.hideLoading();
          }
        } else {
          wx.hideLoading();
          wx.showToast({
            title: res.data.errMsgs,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  }
})