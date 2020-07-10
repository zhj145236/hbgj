// pages/pdfdownload/pdfdownload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 一键复制地址
   */
  copyClick:function(){
    const that = this,url = that.data.downurl;
    console.log(url);
    wx.setClipboardData({
      data: url,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })        
      }
     });
  },

  /**
   * 
   * @param {*} options
   * 一键预览 
   */
  previewClick:function(e){
    const that = this;
    wx.navigateTo({
      url: '../contractcenter/contractcenter?url=' + that.data.url,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const that = this,format = options.url.split('.');
    console.log(format);
    that.setData({
      con:options.con,
      url:options.url,
      time:options.time,
      downurl:options.downurl
    });
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