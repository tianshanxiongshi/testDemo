// pages/coupon/coupon.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberId:'',
    used_coupon_title:'已使用优惠券',
    couponType: 0,//优惠券类型,0满减券，1礼品券
    // couponUseStatus: 0,//优惠券使用状态，0未使用，1已使用，2已过期
    cutCouponList:[],
    usedcutCouponList:[],
    giftCouponList:[],
    usedgiftCouponList:[],
    unusedCouponReq:{
      req:{
        memberId: '',
        couponType: 0,//优惠券类型,0满减券，1礼品券
        couponUseStatus: 0,//优惠券使用状态，0未使用，1已使用，2已过期
        isCouponEndTimeOrderBy:2,
        isCouponMaxMoneyOrderBy:2
      },
      limit: 10,
      offset: 1
    },
    usedCouponReq: {
      req:{
        memberId: '',
        couponType: 0,//优惠券类型,0满减券，1礼品券
        couponUseStatus: 1//优惠券使用状态，0未使用，1已使用，2已过期
      },
      limit: 10,
      offset: 1
    },
    unusedgiftReq: {
      req: {
        memberId: '',
        couponType: 1,//优惠券类型,0满减券，1礼品券
        couponUseStatus: 0,//优惠券使用状态，0未使用，1已使用，2已过期
        isCouponEndTimeOrderBy: 2,
        isCouponMaxMoneyOrderBy: 2
      },
      limit: 10,
      offset: 1
    },
    usedgiftReq: {
      req: {
        memberId: '',
        couponType: 1,//优惠券类型,0满减券，1礼品券
        couponUseStatus: 1//优惠券使用状态，0未使用，1已使用，2已过期
      },
      limit: 10,
      offset: 1
    },
    loadMore1:false,
    loadMore2:false,
    loadMore3:false,
    loadMore4:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'memberInfo',
      success: function(res) {
        console.log(res);
        that.data.memberId = res.data.memberId;
        that.data.unusedCouponReq.req.memberId = res.data.memberId;
        that.data.usedCouponReq.req.memberId = res.data.memberId;
        that.data.unusedgiftReq.req.memberId = res.data.memberId;
        that.data.usedgiftReq.req.memberId = res.data.memberId;
        that.setData({
          memberId: that.data.memberId,
          unusedCouponReq: that.data.unusedCouponReq,
          usedCouponReq: that.data.usedCouponReq,
          unusedgiftReq: that.data.unusedgiftReq,
          usedgiftReq: that.data.usedgiftReq
        })
        that.getList(that.data.unusedCouponReq);
        setTimeout(function(){
          that.getList(that.data.usedCouponReq);
          that.getList(that.data.unusedgiftReq);
          that.getList(that.data.usedgiftReq);
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
  getList (data) {
    let that = this;
    wx.request({
      url: api.wallet.coupon.list + "?limit=" + data.limit + "&offset=" + data.offset,
      method:'post',
      data:data.req,
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
          })
          if (data.req.couponType == 0 && data.req.couponUseStatus == 0){
            if (listData.length < 10 && listData.length >= 0) {
              that.setData({
                loadMore1:false
              })
            }else {
              that.setData({
                loadMore1: true
              })
            }
            that.data.cutCouponList = that.data.cutCouponList.concat(listData)
            that.setData({
              cutCouponList: that.data.cutCouponList
            })
          }
          if (data.req.couponType == 0 && data.req.couponUseStatus == 1) {
            if (listData.length < 10 && listData.length >= 0) {
              that.setData({
                loadMore2: false
              })
            } else {
              that.setData({
                loadMore2: true
              })
            }
            that.data.usedcutCouponList = that.data.usedcutCouponList.concat(listData)
            that.setData({
              usedcutCouponList: that.data.usedcutCouponList
            })
          }
          if (data.req.couponType == 1 && data.req.couponUseStatus == 0) {
            if (listData.length < 10 && listData.length >= 0) {
              that.setData({
                loadMore3: false
              })
            } else {
              that.setData({
                loadMore3: true
              })
            }
            that.data.giftCouponList = that.data.giftCouponList.concat(listData)
            that.setData({
              giftCouponList: that.data.giftCouponList
            })
          }
          if (data.req.couponType == 1 && data.req.couponUseStatus == 1) {
            if (listData.length < 10 && listData.length >= 0) {
              that.setData({
                loadMore4: false
              })
            } else {
              that.setData({
                loadMore4: true
              })
            }
            that.data.usedgiftCouponList = that.data.usedgiftCouponList.concat(listData)
            that.setData({
              usedgiftCouponList: that.data.usedgiftCouponList
            })
          }
          
        }else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },
  tabNav (e) {
    // console.log(e);
    let status = e.currentTarget.dataset.status;
    let title = status == 0 ? '已使用优惠券' : '已使用礼品券';
    this.setData({
      couponType: status,
      used_coupon_title: title
    })
  },
  getMore (e) {
    console.log(e);
    let type = e.currentTarget.dataset.type;
    if(type == '1') {
      if (this.data.couponType == 0){
        // 满减 未使用
        this.data.unusedCouponReq.offset += 10;
        this.setData({
          unusedCouponReq: this.data.unusedCouponReq
        })
        this.getList(this.data.unusedCouponReq);
      }else {
        // 满减 已使用
        this.data.usedCouponReq.offset += 10;
        this.setData({
          usedCouponReq: this.data.usedCouponReq
        })
        this.getList(this.data.usedCouponReq);
      }
    }else {
      if (this.data.couponType == 0) {
        // 礼品 已使用 
        this.data.unusedgiftReq.offset += 10;
        this.setData({
          unusedgiftReq: this.data.unusedgiftReq
        })
        this.getList(this.data.unusedgiftReq);
      } else {
        // 礼品 已使用 usedgiftReq
        this.data.usedgiftReq.offset += 10;
        this.setData({
          usedgiftReq: this.data.usedgiftReq
        })
        this.getList(this.data.usedgiftReq);
      }
    }
  }
})