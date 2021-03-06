                      // pages/index/index.js
const api = require('../../utils/api.js');
const app = getApp();
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
let qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberId:'',
    modalTitle:'',
    showModalType:'',
    hasUserInfo: 'has',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isPwd:false,
    integral:0,
    memberValue:0,
    memberMoney:0,
    memberLevel:'',
    nextMemberLevel:'',
    nextValue:'',
    width:0,
    rate:'',
    indexLoad:false,
    isScan:false,
    activeList:[],
    defaultCarInfo:'',
    shop_id:'', // 门店id
    memberInviterId:'', // 推荐人id
    unusedCouponReq: {
      req: {
        memberId: '',
        couponType: 0,//优惠券类型,0满减券，1礼品券
        couponUseStatus: 0,//优惠券使用状态，0未使用，1已使用，2已过期
        isCouponEndTimeOrderBy: 2,
        isCouponMaxMoneyOrderBy: 2
      },
      limit: 10,
      offset: 1
    },
    couponNum:0,
    giftNum:0,
    currentCity:'定位中...',
    currentCityId:'',
    locationSuccess:0,
    configList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.requestPayment(
      {
        'timeStamp': '',
        'nonceStr': '',
        'package': '',
        'signType': 'MD5',
        'paySign': '',
        'success': function (res) { console.log(res) },
        'fail': function (res) { console.log(res) },
        'complete': function (res) { console.log(res) }
      },
      )
    // console.log(options);
    if(options.scene){
      let scene = decodeURIComponent(options.scene);
      if(scene.indexOf('#') != -1) {
        let arr = scene.split('#');
        this.data.shop_id = arr[0].split('=')[1];
        this.data.memberInviterId = arr[1].split('=')[1];
      }else {
        this.data.shop_id = scene.split('=')[1];
      }
    }
    let that = this;
    let rate = parseFloat(646 / 10000).toFixed(2);
    this.setData({
      rate: rate
    })
    this.getActiveList();
    this.getconfig();
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
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        //console.log(res.data);
        that.setData({
          hasUserInfo: res.data
        })
        if (!that.data.isScan && that.data.hasUserInfo) {
          that.getInfo();
        } else {
          that.data.isScan = false;
        }
      },
      fail: function (res) {
        console.log(res);
        that.setData({
          hasUserInfo:''
        })
      }
    })
    wx.getStorage({
      key: 'cityInfo',
      success: (res) => {
        console.log(res);
        this.setData({
          currentCity: res.data.dicValue,
          currentCityId:res.data.dicKey
        })
        this.getgoodsList();
      },
      fail: error => {
        console.log(error)
        this.getlocation();
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
    this.getInfo();
    this.getActiveList();
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1000)
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
  bindGetUserInfo (e) {
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
  getInfo () {
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
  getMemberLevel (num) {
    switch (num) {
      case 0: 
        return '普卡';
        break;
      case 1:
        return '银卡';
        break;
      case 2:
        return '金卡';
        break;
      case 3:
        return '钻石卡';
        break;
      default:
        return '钻石卡';
        break;
    }
  },
  getMInfo ( code ) {
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
        if (res.statusCode == 200 && res.data.code == '0') {
          wx.setStorage({
            key: 'memberInfo',
            data: res.data.data
          })
          let nowLevel = parseInt(res.data.data.memberLevel);
          if (nowLevel < 4) {
            let nextLevel = _self.getMemberLevel(nowLevel + 1);
            _self.setData({
              memberLevel: nowLevel,
              nextMemberLevel: nextLevel
            })
          }else {
            _self.setData({
              memberLevel: '4',
              nextMemberLevel: '钻石卡'
            })
          }
          _self.data.unusedCouponReq.req.memberId = res.data.data.memberId;
          _self.setData({
            memberId: res.data.data.memberId,
            unusedCouponReq: _self.data.unusedCouponReq,
          })
          _self.getMwallet(res.data.data.memberId);
          _self.getCarInfo(res.data.data.memberId);
          _self.getCouponList(_self.data.unusedCouponReq, 0);
          _self.getCouponList(_self.data.unusedCouponReq, 1);
        }else {
          if (res.data.msg == '会员未注册'){
            wx.hideLoading();
            _self.setData({
              indexLoad:true
            })
            wx.showToast({
              title: '请先注册会员',
              icon:'none'
            })
            setTimeout( () => {
              if(_self.data.shop_id){
                wx.navigateTo({
                  url: '/pages/register/register?shop_id=' + _self.data.shop_id + '&id=' + _self.data.memberInviterId,
                })
              }else {
                wx.navigateTo({
                  url: '/pages/register/register',
                })
              }
            },500 )
          }
        }
      }
    })
  },
  getMwallet (id) {
    let _self = this;
    wx.login({
      success: res => {
        wx.request({
          url: api.wallet.info,
          data: {
            code: res.code,
            memberId: id
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            wx.hideLoading();
            _self.setData({
              indexLoad: true
            })
            if (res.statusCode == 200 && res.data.code == '0') {
              let data = res.data.data;
              let nextValue = 0;
              let width = 0;
              if (data.thisMemberValueRec){
                if (data.thisMemberValueRec < 1000){
                  width = (_self.data.rate * data.thisMemberValueRec) + parseInt(646 / 10);
                }else if (data.thisMemberValueRec > 1000 && data.thisMemberValueRec < 2999) {
                  width = parseInt(646 / 3) + (_self.data.rate * (data.thisMemberValueRec -1000)) + parseInt(646 / 12);
                } else if (data.thisMemberValueRec > 3000 && data.thisMemberValueRec < 9999) {
                  width = parseInt(646 / 3) * 2 + (_self.data.rate * (data.thisMemberValueRec - 3000));
                }else {
                  width = 646;
                }
              }else {
                width = 0;
              }
              if (_self.data.memberLevel == 0) {
                nextValue = 1000 - data.thisMemberValueRec;
              } else if (_self.data.memberLevel == 1) {
                nextValue = 3000 - data.thisMemberValueRec;
              } else if (_self.data.memberLevel == 2) {
                nextValue = 10000 - data.thisMemberValueRec;
              } else {
                nextValue = 0;
              }
              if (data.thismemberMoney){
                _self.data.memberMoney = parseFloat(data.thismemberMoney / 100).toFixed(2);
              }else {
                _self.data.memberMoney = 0;
              }
              _self.setData({
                isPwd: data.isPwd,
                integral: data.thisMemberIntegral || 0,
                memberValue: data.thisMemberValueRec || 0,
                memberMoney: _self.data.memberMoney,
                nextValue: nextValue,
                width: width
              })
            }else {
              wx.showToast({
                title: res.data.msg,
                icon:'none'
              })
            }
          }
        })
      }
    })
  },
  integralExplain() {
    this.Modal = this.selectComponent("#modal");
    this.Modal.openModal();
    this.setData({
      "modalTitle": "积分说明",
      "showModalType": 1
    })
  },
  getCarInfo (id) { // 获取车辆信息
    let that = this;
    wx.request({
      url: api.memberCar.list,
      data: {
        'memberId': id,
        isDefaultCar: 0
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.statusCode == 200 && res.data.code == '0') {
          wx.setStorage({
            key: "carInfo",
            data:res.data.data[0]
          })
          if(res.data.data.length > 0) {
            that.setData({
              defaultCarInfo: res.data.data[0]
            })
          }
          
          
        }else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
      
    })
      
  },
  growthExplain() {
    this.Modal = this.selectComponent("#modal");
    this.Modal.openModal();
    this.setData({
      "modalTitle": "成长值说明",
      "showModalType": 2
    })
  },
  goToRecharge () {
    wx.navigateTo({
      url: '/pages/recharge/recharge',
    })
  },
  goToDealList () {
    wx.navigateTo({
      url: '/pages/deal-list/deal-list?id=' + this.data.memberId,
    })
  },
  goToMyCar () {
    wx.navigateTo({
      url: '/pages/my-car/my-car',
    })
  },  
  waitting () {
    wx.showToast({
      title: '敬请期待...',
      icon:'none'
    })
  },
  toPay () {
    let _self = this;
    if (!this.data.isPwd) {
      wx.showToast({
        title: '请设置支付密码',
        icon: 'none'
      })
      setTimeout( () => {
        wx.navigateTo({
          url: '/pages/pay-pwd/pay-pwd?type=6',
        })
      },500 )
    }else {
      wx.scanCode({
        onlyFromCamera: true,
        success(res) {
          if (res.result.slice(0,3) == '001') {
            wx.navigateTo({
              url: '/pages/payment/payment?payCode=' + res.result + '&integral=' + _self.data.integral + '&id=' + _self.data.memberId + '&money=' + _self.data.memberMoney,
            })
          }else {
            _self.data.isScan = true;
            wx.showToast({
              title: '信息无法识别，请重新确认',
              icon: 'none',
            })
          }
        }
      })
    }
    // wx.navigateTo({
    //   url: '/pages/payment/payment?payCode=00120112365125411&integral=' + _self.data.integral + '&id=' + _self.data.memberId + '&money=' + _self.data.memberMoney,
    // })
  },
  goToPersonalInfo () {
    wx.navigateTo({
      url: '/pages/personal-info/personal-info?id=' + this.data.memberId,
    })
  },
  goToOutside(e) {
    let src = e.currentTarget.dataset.src;
    // if(src.indexOf('?') != -1) {
    //   let arr = src.split('?');
    //   // wx.navigateTo({
    //   //   url: '/pages/skip-page/skip-page?src=' + arr[0] +  '&param=urls!154512040184220181218112419.jpg#url2!154512040184220181218112419.jpg',
    //   // })
    //   wx.navigateTo({
    //     url: '/pages/skip-page/skip-page?src=' + arr[0] + '&param=' + arr[1],
    //   })
    // }else {
    //   wx.navigateTo({
    //     url: '/pages/skip-page/skip-page?src=' + src,
    //   })
    // }
    wx.navigateTo({
      url: '/pages/skip-page/skip-page',
    })
    wx.setStorage({
      key: 'tipsrc',
      data: src,
    })
  },
  // 活动列表
  getActiveList () {
    let _self = this;
    wx.request({
      url: api.shop.activityList,
      method:'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.statusCode == 200 && res.data.code == '0') {
          _self.setData({
            activeList:res.data.data
          })
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
  goToCouponList () {
    wx.navigateTo({
      url: '/pages/coupon/coupon',
    })
  },
  // 获取可用优惠券数量
  getCouponList(data, couponType) {
    let that = this;
    data.req.couponType = couponType
    wx.request({
      url: api.wallet.coupon.list + "?limit=" + data.limit + "&offset=" + data.offset,
      method: 'post',
      data: data.req,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        // console.log(res);
        if (res.statusCode == 200 && res.data.code == '0') {
          if (couponType == 0) {
            that.data.couponNum =  res.data.data.total
          }else {
            that.data.giftNum =  res.data.data.total
          }
          that.setData({
            couponNum: that.data.couponNum,
            giftNum: that.data.giftNum
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
  goTocurrentCity () {
    wx.navigateTo({
      url: `/pages/current-city/current-city?city=${this.data.currentCity}&type=${this.data.locationSuccess}`,
    })
  },
  goTogeneralize() {
    wx.navigateTo({
      url: '/pages/generalize/generalize',
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
            // console.log(res);
            // console.log(res.result.ad_info.city);
            that.setData({
              currentCity: res.result.ad_info.city,
              locationSuccess: 1
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
  getgoodsList() {
    wx.request({
      url: api.goods.list,
      data: { cityId: this.data.currentCityId },
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: res => {
        console.log(res+'11111');
      }
    })
  },
  getconfig() {
    wx.request({
      url: api.menu.config,
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        // console.log(res); configList
        if (res.statusCode == 200 && res.data.code == '0') {
          let response = res.data.data;
          response.forEach(item => {
            if ((item.menuLineSort == 1 || item.menuLineSort == 2 || item.menuLineSort == 3) && item.menuSort == 1) {
              this.data.configList.push(item);
            }
          })
          this.data.configList.forEach(item => {
            let subarr = [];
            response.forEach(subitem => {
              if (item.menuLineSort == subitem.menuLineSort && item.menuSort != subitem.menuSort) {
                subarr.push(subitem);
              }
            })
            item.child = subarr;
          })
          this.setData({
            configList: this.data.configList
          })
          console.log(this.data.configList+'00000');
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
  getConfigInfo (e) {
    console.log(e);
    let baseUrl='';
    let urlA ='../goods-list/goods-list';
    let urlB = '../goods-maintain/goods-maintain';
    let urlC = '../goods-boutique/goods-boutique';
    // console.log(e.currentTarget.dataset.item);
    if (e.currentTarget.dataset.item.menuConfigId==111){
      baseUrl = urlC;
    };
    if (e.currentTarget.dataset.item.menuConfigId == 106) {
      baseUrl = urlB;
    };
    if (e.currentTarget.dataset.item.menuConfigId == 101) {
      baseUrl = urlA;
    };
    let carInfo = this.data.defaultCarInfo;
    wx.navigateTo({
      url: baseUrl,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindInformation:function(){
     wx.navigateTo({
       url: '/pages/generalize/generalize',
     })
  },
  // 跳转到订单
  goToOrder(){
    wx.navigateTo({
      url: '../order/order',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})