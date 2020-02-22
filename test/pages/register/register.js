// pages/register/register.js.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getDynamicPwdText: '获取验证码',
    getDynamicPwdFlag: false,
    mobile:'',
    memberInviterId:'',
    errMsg:'',
    hasUserInfo:'',
    memberInviterShopId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    let that = this;
    let memberInviterId = decodeURIComponent(options.id);
    if (memberInviterId && memberInviterId != 'undefined') {
      this.setData({
        memberInviterId: memberInviterId
      })
    }
    let shopId = decodeURIComponent(options.shop_id);
    if (shopId && shopId != 'undefined') {
      this.setData({
        memberInviterShopId: shopId
      })
      // console.log(this.data.memberInviterShopId);
    }
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        that.setData({
          hasUserInfo: res.data
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
  /**
  * 双向绑定输入的手机号
  */
  bindKeyInputMobile (e) {
    this.setData({
      mobile: e.detail.value,
      errMsg: ''
    })
  },
  clearMsg (e) {
    this.setData({
      errMsg: ''
    })
  },
  authInfo () {
    let regex = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
    if (this.data.mobile.trim() == '') {
      this.setData({
        errMsg: '手机号不能为空'
      })
      return true;
    }
    if (!(regex.test(this.data.mobile))) {
      this.setData({
        errMsg: '请输入正确的手机号'
      })
      return true;
    }
  },
  /**
  * 获取动态验证码
  */
  getDynamicPwd: function () {
    let _self = this;
    if (!this.data.getDynamicPwdFlag) {
      let flag = this.authInfo();
      if(flag) return;
      this.data.getDynamicPwdFlag = true;
      wx.login({
        success: res => {
          var postData = {
            code: res.code,
            phone: _self.data.mobile,
            captchaType: '1'
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
      wx.showToast({
        title: '请勿重复提交',
        icon: 'none',
        duration: 1000
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
  formSubmit (e) {
    let _self = this;
    // let flag = this.authInfo();
    // if (flag) return;
    // if (e.detail.value.authCode.trim() == '') {
    //   this.setData({
    //     errMsg: '请输入短信验证码'
    //   })
    //   return;
    // }
    wx.showLoading({
      title: '加载中...',
    })
    wx.login({
      success: res => {
        let data = {
          code: res.code,
          memberTel: e.detail.value.mobile,
          captcha: e.detail.value.authCode,
          memberInviterId: _self.data.memberInviterId,
          memberName: _self.data.hasUserInfo.nickName,
          memberPhoto: _self.data.hasUserInfo.avatarUrl,
          memberInviterShopId: _self.data.memberInviterShopId
        }
        console.log(data);
        wx.request({
          url: api.member.add,
          data: data,
          method: 'post',
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            if (res.statusCode == 200 && res.data.code == '0') {
              wx.hideLoading();
              wx.showToast({
                title: '注册成功',
                icon:'none'
              })
              if (_self.data.memberInviterId) {
                setTimeout(() => {
                  wx.reLaunch({
                    url: '/pages/recharge/recharge?scene=' + _self.data.memberInviterId,
                  })
                }, 500)
              }else {
                setTimeout(() => {
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
                }, 500)
              }
            }else {
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