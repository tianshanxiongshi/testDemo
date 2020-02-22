// pages/choose-coupon/choose-coupon.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberId: '',
    used_coupon_title: '已使用优惠券',
    couponType: 0,//优惠券类型,0满减券，1礼品券
    // couponUseStatus: 0,//优惠券使用状态，0未使用，1已使用，2已过期
    cutCouponList: '',
    usedcutCouponList: '',
    unusedCouponReq: {
      req: {
        memberId: '',
        couponType: 0,//优惠券类型,0满减券，1礼品券
        couponUseStatus: 0,//优惠券使用状态，0未使用，1已使用，2已过期
        isCouponEndTimeOrderBy: 2,
        isCouponMaxMoneyOrderBy: 2,
        couponConditionCo:1,
        shopIds:-1
      },
      limit: 20,
      offset: 1
    },
    usedCouponReq: {
      req: {
        memberId: '',
        couponType: 0,//优惠券类型,0满减券，1礼品券
        couponUseStatus: 0,//优惠券使用状态，0未使用，1已使用，2已过期
        isCouponEndTimeOrderBy: 2,
        isCouponMaxMoneyOrderBy: 2,
        couponConditionCo: 3,
        shopIds: -1
      },
      limit: 20,
      offset: 1
    },
    isEmptyCoupon:false,
    isEmptyUsedCoupon:false,

    isCouponId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let shopId = options.shopId;
    let money = parseFloat(options.money).toFixed(2) * 100;
    this.setData({
      isCouponId: options.couponId
    })
    wx.getStorage({
      key: 'memberInfo',
      success: function (res) {
        console.log(res);
        that.data.memberId = res.data.memberId;
        that.data.unusedCouponReq.req.memberId = res.data.memberId;
        that.data.unusedCouponReq.req.shopIds = '-1#' + shopId;
        that.data.unusedCouponReq.req.couponCondition = money;
        that.data.usedCouponReq.req.memberId = res.data.memberId;
        that.data.usedCouponReq.req.shopIds = '-1#' + shopId;
        that.data.usedCouponReq.req.couponCondition = money;
        that.setData({
          memberId: that.data.memberId,
          unusedCouponReq: that.data.unusedCouponReq,
          usedCouponReq: that.data.usedCouponReq
        })
        that.getList(that.data.unusedCouponReq);
        setTimeout(function(){
          that.getList(that.data.usedCouponReq);
        },500)
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
  getList(data) {
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
          let listData = res.data.data.records;
          listData.forEach((item) => {
            let filterCouponMoney;
            if (item.couponMoney < 100) {
              filterCouponMoney = parseFloat(item.couponMoney / 100).toFixed(2)
            } else {
              filterCouponMoney = parseInt(item.couponMoney / 100)
            }
            item.filterCouponMoney = filterCouponMoney;
            if (item.couponMemberId == that.data.isCouponId) {
              item.isChecked = true;
            }else {
              item.isChecked = false;
            }
          })
          if (data.req.couponConditionCo == 1) {
            if (!res.data.data.records.length){
              that.setData({
                isEmptyCoupon: true
              })
            }
            that.setData({
              cutCouponList: res.data.data.records
            })
          }
          if (data.req.couponConditionCo == 3) {
            if (!res.data.data.records.length) {
              that.setData({
                isEmptyUsedCoupon: true
              })
            }
            that.setData({
              usedcutCouponList: res.data.data.records
            })
          }

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
  selectCoupon (e) {
    console.log(e);
    let couponId = e.currentTarget.dataset.info.couponMemberId;
    let couponMoney = e.currentTarget.dataset.info.couponMoney;
    let name = e.currentTarget.dataset.info.couponTitle;
    let isChecked = e.currentTarget.dataset.info.isChecked;
    this.data.cutCouponList.forEach(function(item) {
      if (item.couponMemberId == couponId && isChecked) {
        item.isChecked = false
      } else if (item.couponMemberId == couponId && !isChecked){
        item.isChecked = true
      }
    })
    this.setData({
      cutCouponList: this.data.cutCouponList
    })
    if (couponMoney < 100) {
      couponMoney = parseFloat(couponMoney / 100).toFixed(2)
    } else {
      couponMoney = parseInt(couponMoney / 100)
    }
    let pages = getCurrentPages();
    // let currPage = pages[pages.length - 1];   //当前页面
    let prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    if (!isChecked) {
      prevPage.setData({
        selectCouponId: couponId,
        selectCouponMoney: couponMoney,
        selectCouponName: name
      })
    }else {
      prevPage.setData({
        selectCouponId: -1,
        selectCouponMoney: 0,
        selectCouponName: ''
      })
    }
    wx.navigateBack();
  }
})