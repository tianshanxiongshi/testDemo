// pages/goods-detail/goods-detail.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
 
  data: {
    imgUrls:[
      {
      },
      {
        url: '../../images/card_bg.png'
      },
      {
        url: '../../images/card_bg.png'
      }
    ],
    num:1,
    numberb:8,
    detaiList:[
      {
        name:"商品"
      }
      ,
      {
        name: "评价122"
      },
      {
        name: "规格"
      },
      {
        name: "详情"
      }
    ],
    currentScroll:0,
    addNumber:1,
    currentImg:1,
    getIndex:5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  scroll:function(e){
    let that=this;
  
    let numbera=0;
    let scrollTop = e.detail.scrollTop;
    if (0 <= scrollTop && scrollTop< 200) {
      numbera = 1;
    }else
      if (200 <= scrollTop && scrollTop < 400) {
        numbera = 2;
      }else
        if (400 <= scrollTop && scrollTop < 600) {
          numbera = 3;
        }else
          if (600 <= scrollTop ) {
            numbera = 4;
          };
          this.setData({
            num: numbera
          })

  },
  // 点击商品属性
  bindType(e){
  
    let currentScroll=0;
    let currentIndex = e.currentTarget.dataset.index;
   
    if (currentIndex==1){
      currentScroll=0;
    } else if (currentIndex == 2){
      currentScroll = 200;
    }
    else if (currentIndex == 3) {
      currentScroll = 400;
     }
    else if (currentIndex == 4) {
      currentScroll = 600;
     };
     this.setData({
       currentScroll: currentScroll,
       num: currentIndex
     })
  },
  // 增加数量
  addNum(){
    let addNum = this.data.addNumber;
    this.setData({
      addNumber: addNum -0 +1
    })
  },
  // 减少数量
  reduceNum(){
   let reduceNum = this.data.addNumber;
    let reduceNumber = reduceNum - 1;
    if (reduceNum==1){
      reduceNumber=1
    }
    this.setData({
      addNumber: reduceNumber 

    })
  },
  // 跳转到详情2
  goToGoodsDetailTwo(){
    wx.navigateTo({
      url: "../goods-detail2/goods-detail2",
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // ？跳转到评价
  goToEvaluate(){
    wx.navigateTo({
      url: "../evaluate-list/evaluate-list",
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 轮播事件
  eventhandle(e){

    let currentImgIndex = e.detail.current;
    let currentImg = currentImgIndex-0+1;

     this.setData({
       currentImg: currentImg
     })
  },
 
  
  getIndex(e){
    let setIndex = e.currentTarget.dataset.index;
    let goodIndex = setIndex+1;
   
    let that=this;
    if (this.data.getIndex==1){
      goodIndex=0;
      
      
    };
    this.setData({
      getIndex: goodIndex
    })
  
  }
 
})