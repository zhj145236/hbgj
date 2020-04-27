// pages/remindcenter/remindcenter.js
const app = getApp(),o = app.requirejs('core'),u = o.urlCon();
const datas = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    releaseconDatas:datas.releaseconData,
    isOnLoad:true,
    isReply:true,
  },

/**
 * 
 * @param {*} options 
 * 获取用户留言已读接口
 * 接口publishs/makePublishRead
 * 需要传入对应数据的id
 * d 对应数据的id
 * f 改变this指向data
 */
readFun:(d)=>{
  const readObj = {};
  d = parseInt(d);
  readObj.publishId = d;
  wx.request({
    url: u + 'publishs/makePublishRead',
    data: readObj,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "GET",
    success(res) {
      console.log(res,'已读返回数据');
    }
  });
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this,isloadreadly = options.isloadreadly,senddatapage = JSON.parse(decodeURIComponent(options.senddatapage)),dataId = senddatapage.id;
    if(senddatapage.reply == null && senddatapage.replyTime == null){
      that.setData({isReply:false});
    }else{
      that.setData({
        isReply:true,
        publishContent:senddatapage.publishContent,
        createTime:senddatapage.createTime,
        reply:senddatapage.reply,
        replyTime:senddatapage.replyTime
      });
    }
    if(isloadreadly === "null"){
      that.readFun(dataId);
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