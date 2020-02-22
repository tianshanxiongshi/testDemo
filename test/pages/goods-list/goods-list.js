// pages/goods-list/goods-liset.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carInfo:'',
    setText:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    wx.getStorage({
      key: 'carInfo',
      success(res) {
        console.log(res.data)
        that.setData({
          carInfo:res.data
        })

        
      },
      fail(){
        console.log('11111111111')
      }
    }),
    console.log('hhhhhhhh')
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
  goMyCar:function(){
    wx.navigateTo({
      url: '../my-car/my-car',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  setText(){
    let that=this;
    this.setData({
      setText: !that.data.setText
    });
    console.log(this.data.setText);
  }
})