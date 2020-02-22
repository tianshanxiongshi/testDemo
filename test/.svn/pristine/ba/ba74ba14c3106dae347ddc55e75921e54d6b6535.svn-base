// pages/recharge/recharge.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    inviterId:'',
    memberId:'',
    chooseId:'',
    rechargeNum:0,
    giveNum:0,
    totalNum:0,
    isSubmit:false,
    hasUserInfo:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.scene){
      this.setData({
        inviterId: options.scene
      })
    }
    this.getRechargeList();
    let _self = this;
    wx.getStorage({
      key: 'memberInfo',
      success: function(res) {
        _self.setData({
          memberId: res.data.memberId
        })
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
    let _self = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        _self.setData({
          hasUserInfo: res.data
        })
        _self.getInfo();
      },
      fail: function () {
      }
    })
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
  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      this.setData({
        hasUserInfo: e.detail.userInfo
      })
      wx.setStorage({
        key: 'userInfo',
        data: e.detail.userInfo
      })
      this.getInfo();
    }
  },
  getInfo() {
    let that = this;
    wx.login({
      success: res => {
        wx.showLoading({
          title: '加载中...',
        })
        that.getMInfo(res.code);
      }
    })
  },
  getMInfo(code) {
    let _self = this;
    wx.request({
      url: api.member.info,
      data: {
        '登录凭证code': code
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading();
        if (res.statusCode == 200 && res.data.code == '0') {
          wx.setStorage({
            key: 'memberInfo',
            data: res.data.data
          })
          _self.setData({
            memberId: res.data.data.memberId
          })
        } else {
          if (res.data.msg == '会员未注册') {
            wx.hideLoading();
            _self.setData({
              indexLoad: true
            })
            wx.showToast({
              title: '请先注册会员',
              icon: 'none'
            })
            setTimeout(() => {
              wx.navigateTo({
                url: '/pages/register/register?id=' + _self.data.inviterId,
              })
            }, 500)
          }
        }
      }
    })
  },
  getRechargeList () {
    let that = this;
    wx.request({
      url: api.recharge.list,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if(res.statusCode == 200 && res.data.code == '0') {
          let list = res.data.data;
          list.forEach( (item) => {
            let rechargenum, givenum;
            if (item.rechargeNum < 100){
              rechargenum = parseFloat(item.rechargeNum / 100).toFixed(2)
            }else {
              rechargenum = parseInt(item.rechargeNum / 100)
            }
            if (item.giveNum < 100) {
              givenum = parseFloat(item.giveNum / 100).toFixed(2)
            } else {
              givenum = parseInt(item.giveNum / 100)
            }
            item.rechargenum = rechargenum;
            item.givenum = givenum;
          } )
          that.setData({
            list: list
          })
        }else {
          wx.showToast({
            title: res.data.errMsgs,
            icon:'none',
            duration:1000
          })
        }
      }
    })
  },
  chooseNum (e) {
    let data = e.currentTarget.dataset;
    let totalNum;
    if (data.rechargenum * 100 < 100 || data.givenum * 100 < 100) {
      totalNum = (parseFloat(data.rechargenum) + parseFloat(data.givenum)).toFixed(2);
    }else {
      totalNum = parseInt(data.rechargenum) + parseFloat(data.givenum);
    }
    this.setData({
      chooseId: data.id,
      rechargeNum: data.rechargenum,
      giveNum: data.givenum,
      totalNum: totalNum
    })
  },
  pay () {
    let that = this;
    if (!that.data.chooseId) {
      wx.showToast({
        title: '请选择充值金额',
        icon: 'none'
      })
      return;
    }
    if (that.data.isSubmit) {
      return;
    }
    that.setData({
      isSubmit: !that.data.isSubmit
    })
    wx.showLoading({
      title:"提交中..."
    });
    wx.login({
      success: res => {
        wx.request({
          url: api.recharge.pay,
          data: {
            code: res.code,
            rechargeId: that.data.chooseId,
            memberId: that.data.memberId,
            inviterId: that.data.inviterId
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            if (res.statusCode == 200 && res.data.code == '0') {
              let data = res.data.data;
              that.wxPay(data);
            }else {
              wx.hideLoading();
              that.setData({
                isSubmit: !that.data.isSubmit
              })
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
  },
  wxPay (data) {
    let that = this;
    wx.requestPayment({
      timeStamp: data.timeStamp + '',
      nonceStr: data.nonceStr,
      package: data.package,
      signType: 'MD5',
      paySign: data.paySgin,
      complete (res) {
        wx.hideLoading();
        if (res.errMsg == 'requestPayment:fail cancel' || res.errMsg == 'requestPayment:fail') { //支付失败
          that.setData({
            isSubmit: !that.data.isSubmit
          })
          wx.navigateTo({
            url: '/pages/pay-result/pay-result?type=2',
          })
        }
        if (res.errMsg == 'requestPayment:ok' ) { // 支付成功
          that.setData({
            isSubmit: !that.data.isSubmit
          })
          wx.navigateTo({
            url: '/pages/pay-result/pay-result?type=1&id=' + that.data.memberId,
          })
        }
      }
    })
  }
})