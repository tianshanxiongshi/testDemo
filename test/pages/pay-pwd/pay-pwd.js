// pages/pay-pwd/pay-pwd.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getDynamicPwdText: '获取验证码',
    getDynamicPwdFlag: false,
    mobile: '',
    memberInviterId: '',
    memberInfo:'',
    captchaType:'',
    errMsg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _self = this;
    let type = options.type;
    if(type == 6) {
      wx.setNavigationBarTitle({
        title: '设置密码'
      })
    }else if(type == 5) {
      wx.setNavigationBarTitle({
        title: '忘记密码'
      })
    }
    this.setData({
      captchaType: type
    })
    wx.getStorage({
      key: 'memberInfo',
      success: function(res) {
        res.data.fromatmemberTel = _self.formatMobile(res.data.memberTel)
        _self.setData({
          memberInfo: res.data
        })
      },
    })
  },
  formatMobile (mobile) {
    let arr = mobile.split('');
    arr.splice(3,6,"******");
    arr = arr.join('');
    return arr;
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
  clearMsg(e) {
    this.setData({
      errMsg: ''
    })
  },
  /**
  * 获取动态验证码
  */
  getDynamicPwd: function () {
    let _self = this;
    if (!this.data.getDynamicPwdFlag) {
      this.data.getDynamicPwdFlag = true;
      wx.login({
        success: res => {
          var postData = {
            code: res.code,
            phone: _self.data.memberInfo.memberTel,
            captchaType: _self.data.captchaType
          }
          wx.request({
            url: api.sms.add,
            data: postData,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.statusCode == 200 && res.data.code == '0') {
                wx.showToast({
                  title: '已发送！',
                  icon: 'success',
                  duration: 1000
                })
                _self.downTime();
              } else {
                _self.setData({
                  errMsg: res.data.msg
                })
                _self.data.getDynamicPwdFlag = false;
              }
            }
          })
        }
      })
    } else {
      _self.setData({
        errMsg: '请勿重复提交'
      })
    }
  },
  /**
   * 倒计时
   */
  downTime() {
    var _self = this;
    var time = 60;
    var timer = setInterval(() => {
      time--;
      if (time <= 0) {
        clearInterval(timer);
        this.setData({
          getDynamicPwdText: '获取验证码',
          getDynamicPwdFlag: false
        })
        return;
      }
      this.setData({
        getDynamicPwdText: time + '秒',
      })
    }, 1000)
  },
  formSubmit(e) {
    let _self = this;
    console.log(e);
    if (e.detail.value.authCode.trim() == '') {
      _self.setData({
        errMsg: '请输入短信验证码'
      })
      return;
    }
    if (e.detail.value.pwd.trim() == '' || e.detail.value.pwd.length < 6) {
      _self.setData({
        errMsg: '请输入6位纯数字密码'
      })
      return;
    }
    if (e.detail.value.pwdAgain.trim() == '' || e.detail.value.pwdAgain != e.detail.value.pwd) {
      _self.setData({
        errMsg: '支付密码不一致，请重新输入'
      })
      return;
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.login({
      success: res => {
        let data = {
          code: res.code,
          memberId: _self.data.memberInfo.memberId,
          phone: _self.data.memberInfo.memberTel,
          captcha: e.detail.value.authCode,
          pwd: e.detail.value.pwd
        }
        wx.request({
          url: api.wallet.updatePwd,
          data: data,
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            if (res.statusCode == 200 && res.data.code == '0') {
              wx.hideLoading();
              wx.showToast({
                title: '设置成功',
                icon: 'none'
              })
              setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/index/index',
                })
              }, 500)
            } else {
              wx.hideLoading();
              _self.setData({
                errMsg: res.data.msg
              })
            }
          }
        })
      }
    })
  }
})