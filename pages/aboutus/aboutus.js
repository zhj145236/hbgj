// pages/aboutus/aboutus.js
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
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

  // 获取用户信息
  getUserInfo: function (e) {
    let that = this, userInfoSucces = e.detail.errMsg;
    if (userInfoSucces == 'getUserInfo:ok'){
      wx.setStorage({
        key:'userData',
        data:e.detail.userInfo
      });
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

  exitClick:function(e){
    const that = this;
    wx.clearStorage({
      success:(res)=>{
        wx.showToast({
          title: "已退出登录",
          icon: 'success',
          mask:true,
          duration: 1500
        });
        setTimeout(function(){
          wx.reLaunch({
            url: '../login/login'
          })
        },1500);
      },
    });
  },

  // 列表点击事件
  nextInfo:function(e){
    const that = this;
    switch(e.currentTarget.dataset.index){
      case 0:
        if(that.data.errMsg != "getUserInfo:ok"){
          wx.showToast({
            title: "请点击图像授权登录",
            icon: 'none',
            duration: 800
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
    wx.getStorage({
      key: 'userData',
      success (res) {
        that.setData({
          userInfoSet:1,
        });
        if (that.data.userInfoSet){
          that.setData({
            userInfo: res.data,
            hasUserInfo: true,
            errMsg:res.errMsg
          });
        }
        console.log(res,'游客数据');
      },
    });

    wx.getStorage({
      key: 'datas',
      success (res) {
        // console.log(res.data.user,'会员数据');
        // console.log(res.errMsg,'errMsg');
        let userInfos = {};
        userInfos.avatarUrl = o.comImg(u,res.data.user.headImgUrl);
        userInfos.nickName = res.data.user.nickname;
        // console.log(userInfos,'创建数组');
        that.setData({
          userInfoSet:1,
        });
        if (that.data.userInfoSet){
          that.setData({
            userInfo: userInfos,
            hasUserInfo: true,
            errMsg:res.errMsg
          });
        }
      },
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
    wx.request({
      url: u + 'notices/wx_count_unread',
      data: {
        openid:"grOOLt4K9gD42oPCPbxjLbbcxJI9"
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      success(res) {
        console.log(res,'未读消息数量返回数据');
      }
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