// pages/goods-detail2/goods-detail2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addNumber: 1,
    numberTwo:1,
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
  // 点击增加
  addNum() {
    let addNum = this.data.addNumber;
    this.setData({
      addNumber: addNum - 0 + 1
    })
  },
  // 点击减少
  reduceNum() {
    let reduceNum = this.data.addNumber;
    let reduceNumber = reduceNum - 1;
    if (reduceNum == 1) {
      reduceNumber = 1
    }
    this.setData({
      addNumber: reduceNumber

    })
  },
  // 选择颜色
  setNumberTwo(e){
    console.log(e)
    let numberTwo=0;
  let currentNumber=  e.currentTarget.dataset.index;
    if (currentNumber==1){
      numberTwo=1;
    } else if (currentNumber == 2){
      numberTwo=2;
    }
    else if (currentNumber == 3) {
      numberTwo=3;
    };
    this.setData({
      numberTwo: numberTwo
    })
  }

})