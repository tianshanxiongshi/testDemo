// pages/deal-list/deal-list.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // memberId:'',
    postData:{
      code:'',
      memberId:'',
      changeType: 0,
      limit:20,
      offset:1
    },
    list:[],
    totalPage:0,
    isBottom:false,
    isShowType:true,
    typeName:'余额',
    isEmpty:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.showLoading({
      title: '加载中...',
      icon: 'none'
    })
    wx.getStorage({
      key: 'memberInfo',
      success: function(res) {
        that.data.postData.memberId = res.data.memberId;
        that.setData({
          postData: that.data.postData
        })
        that.getList();
      },
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
    if(this.data.postData.offset < this.data.totalPage) {
      wx.showLoading({
        title: '加载中...',
        icon: 'none'
      })
      this.data.postData.offset = this.data.postData.offset + this.data.postData.limit;
      this.getList();
    }else {
      this.setData({
        isBottom:true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showTypeList () {
    this.data.isShowType = !this.data.isShowType;
    this.setData({
      isShowType: this.data.isShowType
    })
  },
  changeType (e) {
    wx.showLoading({
      title: '加载中...',
    })
    let type = e.currentTarget.dataset.type;
    this.data.postData.changeType = type;
    this.data.postData.offset = 1;
    this.data.typeName = this.getType(type);
    this.data.list = [];
    this.setData({
      typeName: this.data.typeName,
      postData: this.data.postData,
      list: this.data.list,
      isShowType: !this.data.isShowType,
      isBottom: false,
      isEmpty:false
    })
    this.getList();
  },
  getList () {
    let _self = this;
    wx.login({
      success: res => {
        let code = res.code;
        _self.data.postData.code = res.code;
        wx.request({
          url: api.wallet.list,
          data: _self.data.postData,
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            wx.hideLoading();
            if (res.statusCode == 200 && res.data.code == '0') {
              let data = res.data.data.rows;
              let totalPage = Math.ceil(res.data.data.total / _self.data.postData.limit);
              data.forEach(function (item) {
                item.type = _self.getType(item.changeType);
                if (item.changeType == 0) {
                  item.thisValue = parseFloat(item.thisValue / 100).toFixed(2);
                  item.changeNum = parseFloat(item.changeNum / 100).toFixed(2);
                }
                if (item.changeNum > 0) {
                  item.changeNum = '+' + item.changeNum;
                }
                
                item.createTimeY = item.createTime.slice(0, 10);
                item.createTimeT = item.createTime.slice(-8);
                _self.data.list.push(item);
              })
              if(_self.data.list.length == 0) {
                _self.setData({
                  isEmpty: true
                })
              }
              this.setData({
                list: _self.data.list,
                totalPage: totalPage
              })
            }else {
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
  getType (num) {
    switch (num) {
      case '0':
        return '余额';
        break;
      case '1':
        return '积分';
        break;
      case '2':
        return '成长值';
        break;
      case '3':
        return '尊鸿币';
        break;
    }
  }
})