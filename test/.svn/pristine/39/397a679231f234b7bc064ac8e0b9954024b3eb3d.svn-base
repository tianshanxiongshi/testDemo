// pages/payment/payment.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPwd:false,
    inputIndex:0,
    input_1_value:'',
    // payMoney:'',
    payPwd: '',
    formatM:'',
    arr:'',
    payCode:'',
    totalIntegral:0,
    canUseIntegral:0,
    canDiscountMoney:0,
    useIntegral:'',
    discountMoney:0,
    isIntetral:false,
    isCanUseInteral:false,
    memberId:'',
    shopName:'',
    ischooseImg: '../../images/unchoose.png',
    endMoney:0,
    isSubmit:false,
    length:0,
    timer:null,
    errMsg:'',
    errMsg_1:'',
    errMsg_2:'',
    isEnterIntetral:false,
    tempIntegral:'',
    totalMoney:'',

    shopId:'',
    selectCouponId:'',
    selectCouponMoney:'',
    selectCouponName:'',
    defaultCouponId:'',
    defaultInputMoney:'',

    couponNum:-1,
    unusedCouponReq: {
      req: {
        memberId: '',
        couponType: 0,//优惠券类型,0满减券，1礼品券
        couponUseStatus: 0,//优惠券使用状态，0未使用，1已使用，2已过期
        isCouponEndTimeOrderBy: 2,
        isCouponMaxMoneyOrderBy: 2,
        couponConditionCo: 1,
        shopIds: -1
      },
      limit: 20,
      offset: 1
    },
    getCouponTimer:null
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.data.unusedCouponReq.req.memberId = options.id;
    this.setData({
      payCode: options.payCode,
      totalIntegral: options.integral,
      memberId: options.id,
      totalMoney:options.money,
      unusedCouponReq: this.data.unusedCouponReq
    })
    this.getShopInfo();
  },
  showIntegralBox () {
    this.setData({
      isEnterIntetral:true
    })
  },
  closeIntegral () {
    this.setData({
      isEnterIntetral: false
    })
  },
  enterIntegral (e) {
    this.data.tempIntegral = e.detail.value;
  },
  confirmIntegral () {
    let errmsg = '', tempIntegral = parseInt(this.data.tempIntegral);
    if (this.data.tempIntegral == '' || tempIntegral == 0) {
      errmsg = '请输入非0积分'
    }
    else if (tempIntegral % 10 != 0) {
      errmsg = '请输入10的整数倍'
    }
    else if (tempIntegral > this.data.canUseIntegral) {
      errmsg = '本次最高使用积分' + this.data.canUseIntegral
    } else {
      this.data.discountMoney = parseFloat(tempIntegral / 10).toFixed(2);
      if (this.data.isIntetral){
        this.data.endMoney = parseFloat(this.data.formatM - this.data.discountMoney).toFixed(2);
      }
      this.setData({
        isEnterIntetral: false,
        useIntegral: tempIntegral,
        discountMoney: this.data.discountMoney,
        endMoney: this.data.endMoney,
        tempIntegral: tempIntegral
      })
      if (parseFloat(this.data.endMoney) > parseFloat(this.data.totalMoney)) {
        this.setData({
          errMsg_1: '账户余额不足'
        })
      } else {
        this.setData({
          errMsg_1: ''
        })
      }
    }
    this.setData({
      errMsg_2: errmsg
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
    if (this.data.selectCouponId && this.data.selectCouponId != this.data.defaultCouponId) {
      let money = this.data.defaultInputMoney - this.data.selectCouponMoney;
      let data = {
        detail:{
          value: money,
          isSelectCoupon:true
        }
      }
      this.inputMoney(data);
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
  checkIntegral () {
    this.data.isIntetral = !this.data.isIntetral;
    if (this.data.isIntetral) {
      if (this.data.discountMoney != 0 || this.data.discountMoney != '0.00'){
        this.data.endMoney = parseFloat(this.data.formatM - this.data.discountMoney).toFixed(2);
      }else {
        this.data.endMoney = parseFloat(this.data.formatM - this.data.canDiscountMoney).toFixed(2);
      }
      this.setData({
        ischooseImg: '../../images/choose.png',
      })
    }else {
      this.data.endMoney = this.data.formatM;
      this.setData({
        ischooseImg: '../../images/unchoose.png',
      })
    }
    if (parseFloat(this.data.endMoney) > parseFloat(this.data.totalMoney)) {
      this.setData({
        errMsg_1: '账户余额不足'
      })
    }else {
      this.setData({
        errMsg_1: ''
      })
    }
    this.setData({
      isIntetral: this.data.isIntetral,
      endMoney: this.data.endMoney
    })
    
  },
  integralExplain() {
    this.Modal = this.selectComponent("#modal");
    this.Modal.openModal();
  },
  getShopInfo () {
    let _self = this;
    wx.request({
      url: api.pay.selectShopByPayCode,
      data: { payCode: _self.data.payCode },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.statusCode == 200 && res.data.code == '0') {
          let shopId = res.data.data.shopId;
          _self.data.unusedCouponReq.req.shopIds = '-1#' + shopId;
          _self.setData({
            shopName: res.data.data.shopName,
            unusedCouponReq: _self.data.unusedCouponReq,
            shopId: shopId
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
  inputMoney(e) {
    let formatM;
    if (e.detail.value != '') {
      formatM = parseFloat(e.detail.value).toFixed(2);
    }else {
      formatM = 0;
    }
    if (!e.detail.isSelectCoupon) {
      this.setData({
        defaultInputMoney: formatM,
        selectCouponId: '',
        selectCouponMoney: '',
        selectCouponName: '',
        defaultCouponId: '',
      })
    }else {
      if (this.data.isIntetral) {
        this.checkIntegral();
        this.setData({
          useIntegral: '',
          discountMoney: 0,
          tempIntegral:''
        })
      }
    }
    if (formatM >= 100) {
      this.setData({
        isCanUseInteral:true
      })
      if (this.data.isIntetral) {
        if (this.data.discountMoney != '' || this.data.discountMoney != 0) {
          this.data.endMoney = parseFloat(formatM - this.data.discountMoney).toFixed(2);
        }else {
          this.data.endMoney = parseFloat(formatM - this.data.canDiscountMoney).toFixed(2);
        }
        this.setData({
          endMoney: this.data.endMoney
        })
      }else {
        this.setData({
          endMoney: formatM
        })
      }
    }else {
      if (this.data.isIntetral) {
        this.data.isIntetral = false
      }
      this.setData({
        isCanUseInteral: false,
        isIntetral: this.data.isIntetral,
        ischooseImg: '../../images/unchoose.png',
        endMoney: formatM,
        useIntegral: '',
        discountMoney: 0
      })
    }
    let halfMoney = parseFloat(formatM / 2).toFixed(2);
    if (halfMoney * 10 > this.data.totalIntegral) {
      this.data.canUseIntegral = Math.floor(this.data.totalIntegral / 10) * 10;
      this.data.canDiscountMoney = parseFloat(this.data.canUseIntegral / 10).toFixed(2);
      this.setData({
        canUseIntegral: this.data.canUseIntegral,
        canDiscountMoney: this.data.canDiscountMoney
      })
    }else {
      this.data.canUseIntegral = Math.floor(halfMoney) * 10;
      this.data.canDiscountMoney = parseFloat(this.data.canUseIntegral / 10).toFixed(2);
      this.setData({
        canUseIntegral: this.data.canUseIntegral,
        canDiscountMoney: this.data.canDiscountMoney
      })
    }
    let length = ('' + this.data.canUseIntegral).length;
    this.setData({
      // payMoney: e.detail.value,
      formatM: formatM,
      length: length,
      errMsg_1:''
    })
    if (!e.detail.isSelectCoupon) {
      clearTimeout(this.data.getCouponTimer);
      this.data.getCouponTimer = setTimeout(() => {
        let money = parseFloat(e.detail.value).toFixed(2) * 100;
        this.data.unusedCouponReq.req.couponCondition = money;
        this.setData({
          unusedCouponReq: this.data.unusedCouponReq
        })
        console.log(money);
        if (!money){
          this.setData({
            couponNum:-1
          })
        }else {
          this.getCouponList(this.data.unusedCouponReq);
        }
      },1000)
    }
  },
  print_integral (e) {
    clearTimeout(this.data.timer);
    this.data.timer = setTimeout( () => {
      console.log(typeof e.detail.value);
      if (e.detail.value != '' ) {
        this.data.useIntegral = parseInt(e.detail.value) * 10;
      }else {
        this.data.useIntegral = 0
      }
      if (this.data.useIntegral > this.data.canUseIntegral) {
        this.data.useIntegral = this.data.canUseIntegral
        this.data.discountMoney = this.data.canDiscountMoney
      }else {
        this.data.discountMoney = parseFloat(this.data.useIntegral / 10).toFixed(2);
      }
      if (this.data.isIntetral){
        if (this.data.discountMoney != 0 || this.data.discountMoney != '0.00') {
          this.data.endMoney = parseFloat(this.data.formatM - this.data.discountMoney).toFixed(2);
        } else {
          this.data.endMoney = parseFloat(this.data.formatM - this.data.canDiscountMoney).toFixed(2);
        }
      }else {
        this.data.endMoney = this.data.formatM;
      }
      this.setData({
        useIntegral: this.data.useIntegral,
        discountMoney: this.data.discountMoney,
        endMoney: this.data.endMoney
      })
    }, 500)
  },
  enterpwd(e) {
    let arr = ['', '', '', '', '', '', ''];
    let pwd = e.detail.value;
    let length = pwd.length;
    for (var i = 0; i < length; i++) {
      arr[i] = '●'
    }
    this.setData({
      arr: arr,
      payPwd: pwd,
      errMsg:''
    })
  },
  dopay() {
    if (!this.data.defaultInputMoney) {
      this.setData({
        errMsg_1:'请输入付款金额'
      })
      return;
    }
    if (parseFloat(this.data.endMoney) > parseFloat(this.data.totalMoney)) {
      this.setData({
        errMsg_1: '账户余额不足'
      })
      return;
    }
    this.setData({
      showPwd: true
    })
  },
  closePay() {
    this.setData({
      showPwd: false,
      arr: ''
    })
  },
  forgetPwd() {
    wx.navigateTo({
      url: '/pages/pay-pwd/pay-pwd?type=5',
    })
  },
  confirmPay() {
    let _self = this;
    if (this.data.payPwd == '' || this.data.payPwd.length < 6) {
      _self.setData({
        errMsg:'请输入支付密码'
      })
      return;
    }
    _self.setData({
      isSubmit: true
    })
    wx.showLoading({
      title: '支付中...'
    })
    wx.login({
      success: res => {
        let postData = {
          code:res.code,
          memberId: _self.data.memberId,
          payCode: _self.data.payCode,
          pwd: _self.data.payPwd,
          couponMemberId: _self.data.selectCouponId
        }
        if (_self.data.selectCouponId == -1) {
          postData.couponMemberId = 0;
        }
        postData.money = parseInt(_self.data.endMoney * 100);
        postData.moneyAll = parseInt(_self.data.defaultInputMoney * 100);
        postData.couponMoney = parseInt(_self.data.selectCouponMoney * 100);
        if (_self.data.isIntetral && _self.data.isCanUseInteral) {
          if (_self.data.useIntegral != '' || _self.data.useIntegral != 0) {
            postData.Integral = _self.data.useIntegral
          }else {
            postData.Integral = _self.data.canUseIntegral
          }
        }else {
          postData.Integral = 0
        }
        wx.request({
          url: api.pay.member,
          data: postData,
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            wx.hideLoading();
            _self.setData({
              isSubmit: false
            })
            if (res.statusCode == 200 && res.data.code == '0') {
              wx.showToast({
                title: '支付成功',
                icon:'none'
              })
              setTimeout( () => {
                wx.reLaunch({
                  url: '/pages/index/index',
                })
              },500 )
            } else {
              _self.setData({
                errMsg: res.data.msg
              })
            }
          }
        })
      }
    })
  },

  // 优惠券
  selectCoupon () {
    this.setData({
      defaultCouponId: this.data.selectCouponId
    })
    if (this.data.defaultInputMoney) {
      wx.navigateTo({
        url: '/pages/choose-coupon/choose-coupon?shopId=' + this.data.shopId + '&money=' + this.data.defaultInputMoney + '&couponId=' + this.data.selectCouponId,
      })
    }else {
      this.setData({
        errMsg_1: '请输入付款金额'
      })
    }
  },
  // 获取可用优惠券数量
  getCouponList(data) {
    let that = this;
    wx.request({
      url: api.wallet.coupon.list + "?limit=" + data.limit + "&offset=" + data.offset,
      method: 'post',
      data: data.req,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res);
        if (res.statusCode == 200 && res.data.code == '0') {
          that.setData({
            couponNum: res.data.data.total
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
  }
})