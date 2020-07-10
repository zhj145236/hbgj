// pages/startPage/startPage.js
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
const datas = require('../../utils/data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isDetermine:false
  },

  /**
   * 游客登录入口
   * 2020/5/1新增----张
   */
  tourists:function(){
    wx.switchTab({
      url: '../index/index'
    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this,
    isDetermine = that.data.isDetermine,
    userData = app.globalData.userData;
    wx.getSystemInfo({
      success (res) {
        that.setData({
          mobileWidth:res.windowWidth + 'px',
          mobileHeight:res.windowHeight + 'px',
        });
      }
    });
    o.timesFun(5,that,isDetermine);
    console.log(userData);
    if(userData === undefined){
      wx.login({
        success:function(res){
          const userObj = {};
          wx.request({
            url: u + 'weixin/userOpenid',
            data: {"js_code": res.code},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success:(res)=> {
              console.log(res,'888');
              const openid = res.data.openid
              console.log(openid,'777');
              app.globalData.openId = openid;
              wx.request({
                url: u + 'users/wxAutoLogin',
                data: {
                  "openid":res.data.openid,
                },
                header: {
                  "Content-Type": "application/json"
                },
                method: "POST",
                success(res) {
                  const token = res.data.token;
                  console.log(res,'数据');
                  if(res.data.token !== undefined){
                    return;
                    // 游客用户数据
                    // userObj.userId = openid,
                    // userObj.roleId = res.data.role[0].id,
                    // userObj.headImgUrl = i.detail.userInfo.avatarUrl,
                    // userObj.nickname =  i.detail.userInfo.nickName,
                    // userObj.token =  token,
                    // userObj.errMsg =  i.detail.errMsg;
                    // app.globalData.userData = userObj;
                    wx.showToast({
                      title: "登录成功",
                      icon: 'success',
                      duration: 800
                    });
                    // 接口获取成功的时候跳转到index页面
                    setTimeout(function () {
                      wx.switchTab({
                        url: '../index/index'
                      })
                    },800); 
                  }
                },
                fail(res){
                  console.log(res,'失败');
                }
              });
            },
            fail:function(res){
              console.log(res,'失败');
            }
          }); 
        }
      })
    }else{
      console.log('还有数据进入程序中心');
    }
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