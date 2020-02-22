//impower.js
const api = require('../../utils/api.js');
Page({
  data: {
    searchData:{
      dicCode:'dic_car',
      dicPkey:'',
      dicKey:'',
      dicLevel:'1'
    },
    brand_list:[],
    series_list:[],
    model_list:[],
    chooseBrand:'',
    chooseSeries:'',
    chooseMolde:'',
    showRight:false
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getDic(this.data.searchData,'brand');
  },
  getDic (data,type) {
    let that = this;
    wx.request({
      url: api.dic.get,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading();
        if (res.statusCode == 200 && res.data.code == '0') {
          if(type == 'brand') {
            that.setData({
              brand_list: res.data.data
            })
          } else if (type == 'series') {
            that.setData({
              series_list:res.data.data
            })
          }else {
            that.setData({
              model_list: res.data.data
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
  choose_series (e) {
    let acceptData = e.currentTarget.dataset;
    this.data.searchData.dicPkey = acceptData.pkey;
    this.data.searchData.dicLevel = acceptData.level;
    this.getDic(this.data.searchData, 'series');
    this.setData({
      chooseBrand: acceptData.item
    })
  },
  choose_model (e) {
    let acceptData = e.currentTarget.dataset;
    this.data.searchData.dicPkey = acceptData.pkey;
    this.data.searchData.dicLevel = acceptData.level;
    this.getDic(this.data.searchData, 'model');
    this.setData({
      chooseSeries: acceptData.item
    })
    this.toggleRight();
  },
  select_car (e) {
    let acceptData = e.currentTarget.dataset;
    this.setData({
      chooseMolde: acceptData.item
    })
    let selectData = {
      car_brand_id: this.data.chooseBrand.dicKey, // 汽车品牌id
      car_brand_name: this.data.chooseBrand.dicValue, // 汽车品牌名称
      car_series_id: this.data.chooseSeries.dicKey, 
      car_series_name: this.data.chooseSeries.dicValue,
      car_model_id: this.data.chooseMolde.dicKey, 
      car_model_name: this.data.chooseMolde.dicValue,
    }
    let series_car = selectData.car_brand_name + ' ' + selectData.car_series_name + ' ' + selectData.car_model_name
    let pages = getCurrentPages();
    // let currPage = pages[pages.length - 1];   //当前页面
    let prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      selectCarData: selectData,
      series_car: series_car
    })
    wx.navigateBack();
  },
  toggleRight() {
    this.setData({
      showRight: !this.data.showRight
    });
  }
})
