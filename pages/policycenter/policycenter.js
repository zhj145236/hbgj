
const app = getApp(),o = app.requirejs('core'),u = o.urlCon();
const datas = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentCenters: datas.contentCenter,
    isShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,newsid = options.id,newsArr = [];
    console.log(newsid,'数据类型');

    wx.request({
      url: u + 'newss',
      data: {
        start:0,
        length:5
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      success(res) {
        const newsData = res.data.data;
        console.log(newsData);
        if(that.data.isShow){
          for(let i in newsData){
            if(newsid == newsData[i].id){
              console.log(newsData[i].content);
              newsArr.push(newsData[i]);
              that.setData({
                nodes:newsData[i].content,
                isShow:false
              });
            }
          }
          console.log(that.data.isShow);
        }
        // console.log(newsArr,'数据');
        that.setData({
          newsArr:newsArr
        });
      }
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
    this.setData({
      pageHeight: wx.getSystemInfoSync().windowHeight,
    });
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