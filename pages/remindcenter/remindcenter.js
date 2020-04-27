// pages/remindcenter/remindcenter.js
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
const datas = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:true
  },

  /**
   * 
   * @param
   * 当页面加载时获取已读信息接口
   *  /notices/wxHasRead
   * r => role 用户角色id 值为 4 表示用户为游客 否则 为企业或其它权限管理者
   * s => siveid 需要发送给接口的 用户id值 1、openid 2、userId
   */
  readFun:(r,s,d)=>{
    console.log('走了');
    const readObj = {},userData = app.globalData.userData;
    r = parseInt(r);
    d = parseInt(d);
    console.log(userData,'数据');
    if(4 === r){
      readObj.openid = s;
      readObj.noticeId = d;
      wx.request({
        url: u + 'notices/wxHasRead',
        data: readObj,
        header: {
          "Content-Type":"application/x-www-form-urlencoded"
        },
        method: "GET",
        success:(res)=> {
        }
      });
    }else{
        readObj.userId = s;
        readObj.noticeId = d;
        wx.request({
          url: u + 'notices/wxHasRead',
          data: readObj,
          header: {
            'login-token':userData.token,
            "Content-Type":"application/x-www-form-urlencoded"
          },
          method: "GET",
          success:(res)=> {
          }
        });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'123');
    const that = this,roleid = options.roleid,siveid = options.siveid,senddatapage = JSON.parse(decodeURIComponent(options.senddatapage)),isloadreadtx = options.isloadreadtx,dataid = senddatapage.id;
    that.setData({nodes:senddatapage.content});
    if(isloadreadtx === 'null'){
      that.readFun(roleid,siveid,dataid);
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
    let that = this;
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