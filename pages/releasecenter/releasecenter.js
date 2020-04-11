// pages/releasecenter/releasecenter.js
const app = getApp(),o = app.requirejs('core'),u = o.urlCon();
const datas = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData:"",
    sex:'',
  },
  formSubmit:(e)=>{
    const that = this;
    // console.log(this.data.userData,'用户数据');
    console.log(e,'数据');
    console.log(e.detail.value.sex,'性别');
    if(e.detail.value.contact == ""){
      wx.showToast({
        title: "请输入姓名",
        icon: 'none',
        duration: 1500
      }); 
      return;
    }
    if(e.detail.value.call == ""){
      wx.showToast({
        title: "请输入电话",
        icon: 'none',
        duration: 1500
      }); 
      return;
    }
    if(e.detail.value.describe == ""){
      wx.showToast({
        title: "请输入发布内容",
        icon: 'none',
        duration: 1500
      });
      return;
    }
    wx.getStorage({
      key: 'userData',
      success (res) {
        // console.log(res.data.avatarUrl,'用户图像');
        // console.log(res.data.nickName,'用户昵称');
        // console.log(e.detail.value.describe,'发布内容');
        // console.log(e.detail.value.sex,'性别');
        // console.log(e.detail.value.call,'电话');
        wx.request({
          url: u + 'publishs',
          data: {
            "headPic": res.data.avatarUrl, // 用户图像
            "nickName": res.data.nickName, // 用户昵称
            "openid": "grOOLt4K9gD42oPCPbxjLbbcxJI9",  //必填openid
            "publishContent": e.detail.value.describe, // 发布内容
            "sex": e.detail.value.sex,  // 性别
            "tel":e.detail.value.call // 电话
          },
          header: {
            "Content-Type": "application/json"
          },
          method: "POST",
          success(res) {
            console.log(res,'返回数据');
          }
        });
      },
      fail:function(res){
        wx.showModal({
          title: '提示',
          content: '请前往个人中心授权登录',
          success (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../aboutus/aboutus'
              })
            }
          }
        }) 
      }
    });
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
    const that = this;
    // 获取微信用户登录的数据
    // wx.getStorage({
    //   key: 'userData',
    //   success (res) {
    //     that.setData({
    //       userData:res.data,
    //     });
    //   },
    //   fail:function(res){
    //     wx.showToast({
    //       title: "发布前请前先授权登录",
    //       icon: 'none',
    //       duration: 2000
    //     });  
    //   }
    // })

    wx.getStorage({
      key: 'datas',
      success (res) {
        // console.log(res,'企业用户的数据');
        // that.setData({
        //   userData:res.data,
        // });
      },
      fail:function(res){
        // wx.showToast({
        //   title: "发布前请前先授权登录",
        //   icon: 'none',
        //   duration: 2000
        // });  
      }
    })
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