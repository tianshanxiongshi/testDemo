// pages/add-car/add-car.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index:0,
    date: '请选择您的购车时间',
    chooseImg:'../../images/my-car-unchoose.png',
    useNewPlate: false,
    member_car_id:'', // 会员汽车id
    sendData:{
      member_id:'',
      car_brand_id:'', // 汽车品牌id
      car_brand_name:'', // 汽车品牌名称
      car_series_id:'',
      car_series_name:'',
      car_model_id:'',
      car_model_name:'',
      car_frame_num:'', //车架号
      member_car_license:'', //车牌号
      member_car_license_city_key:'', // 车牌省市key
      member_car_license_city_value:'', // 车牌省市值
      is_new_energy_car:1,
      car_buy_time:'',
      car_mileage:'',
      isDefaultCar:0
    },
    errMsg:'',
    series_car:'',
    isSubmit:false,
    selectCarData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'addcarInfo',
      success: function(res) {
        that.data.sendData = Object.assign(that.data.sendData, res.data);
        if (res.data.car_buy_time) {
          that.data.date = res.data.car_buy_time
        }
        if (!res.data.is_new_energy_car) {
          that.data.chooseImg = '../../images/my-car-choose.png'
        }
        that.setData({
          sendData: that.data.sendData,
          date: that.data.date,
          chooseImg: that.data.chooseImg
        })
      },
    })
    wx.getStorage({
      key: 'memberInfo',
      success: function(res) {
        that.data.sendData.member_id = res.data.memberId;
        that.setData({
          sendData: that.data.sendData
        })
      },
    })
    this.getPlate();
    this.setEndTime();
  },
  setEndTime () {
    let nowData = new Date();
    let y = nowData.getFullYear();
    let m = nowData.getMonth() + 1;
    let d = nowData.getDate();
    let time = y + '-' + m + '-' + d;
    this.setData({
      endTime: time
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
  inputCarFrameNum (e) {
    this.data.sendData.car_frame_num = e.detail.value;
    this.setData({
      sendData: this.data.sendData
    })
  },
  inputCarMileage (e) {
    this.data.sendData.car_mileage = e.detail.value;
    this.setData({
      sendData: this.data.sendData
    })
  },
  upperCase (e) {
    let reg = /^[0-9a-zA-Z]+$/;
    let value = e.detail.value;
    let res = reg.test(value);
    if (res && value.length >= 5) {
      this.data.sendData.member_car_license = value.toUpperCase();
      this.setData({
        sendData: this.data.sendData,
        errMsg:''
      })
    }else {
      this.setData({
        errMsg: '请输入正确车牌号'
      })
    }
  },
  goToChooseCar () {
    wx.setStorage({
      key: 'addcarInfo',
      data: this.data.sendData,
    })
    if (this.data.sendData.memberCarId) {
      wx.navigateTo({
        url: '/pages/choose-car/choose-car?id=' + this.data.sendData.memberCarId
      })
    }else {
      wx.navigateTo({
        url: '/pages/choose-car/choose-car',
      })
    }
  },
  bindPickerChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.sendData.member_car_license_city_key = this.data.array[e.detail.value].dicKey;
    this.data.sendData.member_car_license_city_value = this.data.array[e.detail.value].dicValue;
    this.setData({
      index: e.detail.value,
      sendData: this.data.sendData
    })
  },
  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.sendData.car_buy_time = e.detail.value;
    this.setData({
      date: e.detail.value,
      sendData: this.data.sendData
    })
  },
  useNewPlate () {
    this.data.useNewPlate = !this.data.useNewPlate;
    if (this.data.useNewPlate) {
      this.data.sendData.is_new_energy_car = 0;
      this.setData({
        chooseImg: '../../images/my-car-choose.png',
        sendData: this.data.sendData
      })
    }else {
      this.data.sendData.is_new_energy_car = 1;
      this.setData({
        chooseImg: '../../images/my-car-unchoose.png',
        sendData: this.data.sendData
      })
    }
  },
  getPlate () {
    let that = this;
    wx.request({
      url: api.dic.get,
      data: { dicCode: 'dic_car_city'},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.statusCode == 200 && res.data.code == '0') {
          let data = res.data.data;
          data.forEach( function(item) {
            if(item.dicLevel == 1) {
              that.data.array.push(item);
            }
          } )
          if (!that.data.sendData.member_car_license_city_key) {
            that.data.sendData.member_car_license_city_key = that.data.array[0].dicKey;
            that.data.sendData.member_car_license_city_value = that.data.array[0].dicValue;
          }else {
            that.data.array.forEach(function (item,index) {
              if (item.dicKey == that.data.sendData.member_car_license_city_key){
                that.data.index = index;
              }
            })
          }
          that.setData({
            array: that.data.array,
            sendData: that.data.sendData,
            index: that.data.index
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  formSubmit(e) {
    let that = this;
    let reg = /^[0-9a-zA-Z]+$/;
    console.log(this.data.selectCarData);
    that.data.sendData = Object.assign(that.data.sendData, that.data.selectCarData);
    // let subData = e.detail.value;
    // this.data.sendData = Object.assign(this.data.sendData, subData);
    if (!this.data.sendData.car_brand_id) {
      that.setData({
        errMsg:'请选择车型'
      })
      return;
    } 
    if (!reg.test(this.data.sendData.member_car_license) || this.data.sendData.member_car_license < 5 ){
      that.setData({
        errMsg: '请输入正确车牌号'
      })
      return;
    }
    if (!this.data.sendData.car_buy_time) {
      that.setData({
        errMsg: '请选购车时间'
      })
      return;
    } 
    if (!this.data.sendData.car_mileage) {
      that.setData({
        errMsg: '请输入公里数'
      })
      return;
    } 
    that.setData({
      isSubmit:true
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: api.memberCar.saveOrEdit,
      method: 'post',
      data:this.data.sendData,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        wx.hideLoading();
        that.setData({
          isSubmit: false
        })
        if (res.statusCode == 200 && res.data.code == '0') {
          that.setData({
            errMsg: ''
          })
          // wx.navigateTo({
          //   url: '/pages/my-car/my-car',
          // })
          wx.setStorage({
            key: 'isAddCar',
            data: true,
          })
          wx.navigateBack();
          wx.removeStorage({
            key: 'addcarInfo',
            success: function(res) {},
          })
        }else {
          that.setData({
            errMsg:res.data.msg
          })
        }
      }
    })
  },
})