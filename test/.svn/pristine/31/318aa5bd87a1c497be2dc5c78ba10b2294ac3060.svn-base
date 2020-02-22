// pages/evaluate-list/evaluate-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaluateNum:1,  
    getIndex: 5,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let list = this.getList();
    if(list && list.length > 0){
      for (let i = 0; i < list.length; i++) {
        list[i].teDisplay1="block";
        list[i].teDisplay2 = "none";
      }
    }

    this.setData({
      list: list
    });
  },
  //请求接口得到的数据
  getList(){
    let list = [
      {
        id: "1111",
        name: "11111"
      }, {
        id: "22222",
        name: "22222"
      }, {
        id: "33333",
        name: "33333"
      }, {
        id: "44444",
        name: "44444"
      }, {
        id: "55555",
        name: "55555"
      }, {
        id: "66666",
        name: "66666"
      }

    ]
    return list;

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
  setEvaluate(e){
    console.log(e);
    let setEvaluate=0;
    setEvaluate = e.currentTarget.dataset.idx;
    this.setData({
      evaluateNum:setEvaluate
    })
  },
  getIndex(e) {
    let setIndex = e.currentTarget.dataset.index;
    let goodIndex = setIndex + 1;

    let that = this;
    if (this.data.getIndex == 1) {
      goodIndex = 0;


    };
    this.setData({
      getIndex: goodIndex
    })

  },
  openAll(e){
    let index = e.currentTarget.dataset.index;
    let list = this.data.list;
    if (list[index].teDisplay1 == "block"){
      list[index].teDisplay1 = "none";
      list[index].teDisplay2 = "block";
    }else{
      list[index].teDisplay1 = "block";
      list[index].teDisplay2 = "none";
    }
    this.setData({
      list: list  
    });
  }
})