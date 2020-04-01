// pages/index/index.js
const app = getApp(),o = app.requirejs('core');
const datas = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isScrolly:1,//允许页面滚动
    ishidden:'none',
    isBol: 0,
    imgUrls: [
      '../../image/banerone.jpg',
      '../../image/banertwo.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 1000,

    // 下方图标信息4个
    iconDatas:datas.iconData,
    // 环保政策数据
    policyDatas:datas.policyData,
    kf:'../../image/kf.png',
  },

  // 点击客服按钮快速联系平台
  kfClick:function(){
    wx.makePhoneCall({
      phoneNumber: '13310829325'
    });
  },
  

  // 点击四个图标
  iconClick:function(e){
    console.log(e.currentTarget.dataset.index,'123');
    switch(e.currentTarget.dataset.index){
      case 0:
        wx.navigateTo({
          url: '../policy/policy',
        });
        break;
      case 1:
        wx.switchTab({
          url: '../datacenter/datacenter'
        })
        break;
      case 2:
        wx.switchTab({
          url: '../releasecenter/releasecenter'
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../introduction/introduction',
        });
        break;
    }
  },

  // 点击环保政策更多
  morePolicy:function(e){
    wx.navigateTo({
      url: '../policy/policy',
    })
  },

  policyList:function(e){
    wx.navigateTo({
      url: '../policycenter/policycenter',
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
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight,
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
    // const that = this;
    // 3秒模拟数据加载
    setTimeout(function () {
      // 不加这个方法真机下拉会一直处于刷新状态，无法复位
      wx.stopPullDownRefresh()
    }, 2000);
    // that.setData({
    //   currentTab: 0 //当前页的一些初始数据，视业务需求而定
    // })
    // this.onLoad(); //重新加载onLoad()
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