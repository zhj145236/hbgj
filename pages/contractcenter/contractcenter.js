// pages/contractcenter/contractcenter.js
const app = getApp(),o = app.requirejs('core');
const datas = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // imgSrc:'../../fail/',
  },
  clickImg:function(){
    const that = this,imgUrl = that.data.imgSrc;
    wx.previewImage({
      urls: [imgUrl], //需要预览的图片http链接列表，注意是数组
      current: '', // 当前显示图片的http链接，默认是第一个
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    console.log(options.url,'url数据');
    // 获取手机设备
    wx.getSystemInfo({
      success: function (res) {
        console.log(res,'手机设备');
        if(res.platform == "ios"){
          that.setData({url:options.url});
          return;
          wx.showModal({
            title:'测试提示',
            content:'这个是ios系统',
            success(res){
              if(res.confirm){
                console.log('这是ios系统');
              }
            }
          })
        }
        if(res.platform == "android"){
          wx.downloadFile({
            url: options.url,
            success: function (res) {
              console.log(res);
              var Path = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
              wx.openDocument({
                filePath: Path,
                success: function (res) {
                  console.log(res,'打开成功');
                }
              });
            },
            fail: function (res) {
              console.log(res,'打开失败');
            }
          })
          return;
          wx.showModal({
            title:'测试提示',
            content:'这个是android系统',
            success(res){
              if(res.confirm){
                console.log('这是android系统');
              }
            }
          })
        }
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
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight - 50,
          winWidth: res.windowWidth,
        });
      },
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