// pages/aboutus/aboutus.js
const app = getApp(), o = app.requirejs('core');
const datas = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bjImg:'../../image/banerthree.jpg',
    userInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    meCenters:datas.meCenter,
    latitude:"22.842377", // 纬度
    longitude:"113.71856", // 经度
    name:"东莞市环联管家生态环境科技有限公司",
    address:"广东省-东莞市-沙河路-66号",
  },

  // 企业简介
  introClick:function(e){
    wx.navigateTo({
      url: '../introduction/introduction',
    })
  },

  getUserInfo: function (e) {
    let that = this, userInfoSucces = e.detail.errMsg;
    if (userInfoSucces == 'getUserInfo:ok'){
      that.setData({
        userInfoSet:1,
      });
      if (that.data.userInfoSet){
        that.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true,
          errMsg:userInfoSucces
        });
      }
    }else{
      that.setData({
        userInfoSet:0
      });
    };
  },

  // 列表点击事件
  nextInfo:function(e){
    const that = this;
    switch(e.currentTarget.dataset.index){
      case 0:
        if(that.data.errMsg != "getUserInfo:ok"){
          wx.showModal({
            title: '提示',
            content: '请授权登录',
            success (res) {}
          });        
        }else{
          wx.navigateTo({
            url: '../myrelease/myrelease',
          });
        }
        break;
      case 1:
        wx.getLocation({
          type:'gcj02',
          altitude:true,
          success: function(res) {
            // console.log(res,'这是地图的经纬度');
            // console.log(Number(that.data.latitude),'设置经度');
            wx.openLocation({
              latitude: Number(that.data.latitude), //纬度
              longitude: Number(that.data.longitude), // 经度
              name: that.data.name,
              address: that.data.address,
              scale: 10
            })
          },
        });
        break;
      case 2:
        wx.makePhoneCall({
          phoneNumber: '13310829325'
        });
        break;
    }
  },

  // 提醒事项
  mattersClick:function(e){
    wx.navigateTo({
      url: '../remind/remind',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this; 
    wx.stopPullDownRefresh(); // 页面刷新完成后停止下拉刷新
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