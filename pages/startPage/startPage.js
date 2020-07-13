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
    console.log(app.globalData.userData,'onLoad');
    wx.getSystemInfo({
      success (res) {
        that.setData({
          mobileWidth:res.windowWidth + 'px',
          mobileHeight:res.windowHeight + 'px',
        });
      }
    });
    // o.timesFun(5,that,isDetermine);
    if(userData === undefined){
      wx.login({
        success:function(res){
          wx.request({
            url: u + 'weixin/userOpenid',
            data: {"js_code": res.code},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success:(res)=> {
              console.log(res,'888');
              const openid = res.data.openid;
              app.globalData.openId = openid;
              wx.request({
                url: u + 'users/tryLogin',
                data: {
                  "openid":res.data.openid,
                },
                header: {
                  "Content-Type": "application/json"
                },
                method: "POST",
                success(res) {
                  console.log(res,'登录数据');
                  const datas = res.data,userData = {},userObj = {};
                  // 企业用户数据
                  if(res.data.code === '401'){
                    wx.showToast({
                      title: "登录失效，请重新登录",
                      icon: 'none',
                      duration: 1500
                    });
                    setTimeout(function () {
                      wx.reLaunch({
                        url: '../login/login'
                      })
                    },1500);
                  }else{
                    if(res.data.role[0].id === 4){
                      userObj.userId = datas.user.id,
                      userObj.roleId = res.data.role[0].id,
                      datas.user.headImgUrl === null?userObj.headImgUrl = '':userObj.headImgUrl = datas.user.headImgUrl,
                      datas.user.nickname === null?userObj.nickname =  '':userObj.nickname =  datas.user.nickname,
                      userObj.token =  datas.token,
                      userObj.errMsg =  res.errMsg;
                      app.globalData.userData = userObj;
                      // 接口获取成功的时候跳转到index页面
                      console.log(app.globalData.userData,'数据AAA');
                      wx.showToast({
                        title: "欢迎使用环联管家",
                        icon: 'success',
                        duration:1500
                      });
                      setTimeout(function () {
                        wx.switchTab({
                          url: '../index/index'
                        })
                      },1500); 
                    }else{
                      userData.token = datas.token,
                      userData.userId = datas.user.id,
                      userData.roleId = datas.role[0].id,
                      userData.headImgUrl = datas.user.headImgUrl,
                      userData.nickname =  datas.user.nickname,
                      userData.errMsg =  res.errMsg;
                      app.globalData.userData = userData;
                      wx.showToast({
                        title: "欢迎使用",
                        icon: 'success',
                        duration:1500
                      });
                      setTimeout(function () {
                        wx.switchTab({
                          url: '../index/index'
                        })
                      },2000); 
                    }
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
      wx.showToast({
        title: "欢迎使用",
        icon: 'success',
        duration:1500
      });
      setTimeout(function () {
        wx.switchTab({
          url: '../index/index'
        })
      },1500); 
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
    console.log(app.globalData.userData,'onShow');

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