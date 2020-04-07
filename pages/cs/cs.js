// pages/cs/cs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: "起始地",
  slist: [
   { id: 1, name: "第一类" },
   { id: 1, name: "第二类" },
   { id: 1, name: "第三类" },
   { id: 1, name: "第四类" },
   { id: 1, name: "第五类" },
  ],
  isstart: false,
  // openimg: "../images/icon.jpg",
  // offimg: "../images/icon.jpg"
  },

  opens: function (e) {
    switch (e.currentTarget.dataset.item) {
     case "1":
      if (this.data.isstart) {
       this.setData({
        isstart: false,
       });
      }
      else {
       this.setData({
        isstart: true,
       });
      }
      break;
    }
   },
   onclicks1: function (e) {
    var index = e.currentTarget.dataset.index;
    let name = this.data.slist[index].name;
    this.setData({
     isstart: false,
     isfinish: false,
     isdates: false,
     start: this.data.slist[index].name,
     finish: "目的地"
    })
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

  }
})