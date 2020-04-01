// pages/login/login.js
const app = getApp(), o = app.requirejs('core');
const datas = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  // 点击游客进行跳转
  tourists:function(e){
    wx.switchTab({
      url: '../index/index'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this,mobileHeight = '',mobileWidth = '';
    wx.getSystemInfo({
      success (res) {
        that.setData({
          mobileWidth:res.windowWidth + 'px',
          mobileHeight:res.windowHeight + 'px',
        });
      }
    });

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      // app.userInfoReadyCallback = res => {
      //   this.setData({
      //     userInfo: res.userInfo,
      //     hasUserInfo: true
      //   })
      // }
    // } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      // wx.getUserInfo({
      //   success: res => {
      //     app.globalData.userInfo = res.userInfo;
      //     this.setData({
      //       userInfo: res.userInfo,
      //       hasUserInfo: true,
      //     })
      //   }
      // });
    // };
  // },
  // getUserInfo: function (e) {
    // let that = this, userInfoSucces = e.detail.errMsg,nickName = e.detail.userInfo.nickName;
    // 获取用户信息code
    // app.globalData.userInfo = e.detail.userInfo;
    // 查看用户是否授权成功
    // if (userInfoSucces == 'getUserInfo:ok'){
    //   that.setData({
    //     userInfoSet:1
    //   });
    //   if (that.data.userInfoSet){
    //     wx.login({
    //       success(res) {
    //         if (res.code) {
    //           let code = res.code;
    //           o.post('', { "code": code }, function (a) {
    //             wx.request({
    //               url: '',
    //               data: { "nickname": nickName},
    //               header: {
    //                 "AuthCode": a.data.auth_code,
    //                 "Content-Type": "application/json"
    //               },
    //               method: "POST",
    //               success(a) {
    //                 console.log(a, 'AAA');
    //               }
    //             });
    //             that.setData({
    //               userInfo: e.detail.userInfo,
    //               hasUserInfo: true,
    //               authCode: a.data.auth_code,
    //               role:a.data.role
    //             });
    //             console.log(that.data.role,'用户角色');
    //             // 将获取的authCode存储在缓存中
    //             wx.setStorage({ key: "authCode", data: that.data.authCode }); // 存储code
    //             wx.setStorage({ key: "role", data: that.data.role }); // 存储role，用户身份信息  
    //           });
    //         }
    //       }
    //     });
    //   }
    // }else{
    //   that.setData({
    //     userInfoSet:0
    //   });
    // };
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