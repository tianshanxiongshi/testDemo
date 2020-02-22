// pages/generalize/generalize.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['请选择','美国', '中国', '巴西', '日本'],
    index:0,
    date:'',
    endTime:'',
    startTime:'',
    avatar:'',
    nickName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setTime();
    let that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res);
        that.setData({
          // hasUserInfo: res.data,
          avatar: res.data.avatarUrl,
          nickName: res.data.nickName
        })
      },
      fail: function (res) {
        console.log(res);
        that.setData({
          hasUserInfo: ''
        })
      }
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
  bindPickerChange (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  formSubmit (e) {
    console.log(e);
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
  setTime() {
    let nowData = new Date();
    let y = nowData.getFullYear();
    let m = nowData.getMonth() + 1;
    let d = nowData.getDate();
    let endTime = (y - 18) + '-' + m + '-' + d;
    let startTime = (y - 88) + '-' + m + '-' + d;
    this.setData({
      endTime,
      startTime,
      date: endTime
    })
  },
  selectImg () {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(res);
        that.setData({
          avatar: res.tempFilePaths
        })
      }
    })
  }
})