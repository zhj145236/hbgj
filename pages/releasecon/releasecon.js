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

   /***
   * 获取用户的发布列表信息
   * 
   *    @param 
  * siveId  用户id的值
  * roleId角色id的值 说明如下： 
  * 1、最高权限（昱升）id
  * 2、环联管家id
  * 3、企业id
  * 4、游客id
  */
 showPublishList:function(siveId,roleId,dataId){
  const that = this,dataArr = [];
  if(siveId===null  || roleId === null){
    console.error("必备的参数：siveId,roleId",siveId,roleId);
      return;
  }
  roleId = parseInt(roleId);
  const parmObj={};
  if(4===roleId ){
    parmObj.openid=siveId;
  }else{
    parmObj.userId=siveId;
  } 
  wx.request({
    url: u + 'publishs/wxlist',
    data: parmObj,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "GET",
    success(res) {
      let backInfoList = res.data.data;
      if(that.data.isOnLoad){
        for(let i in backInfoList){
          if(backInfoList[i].id === dataId){
            dataArr.push(backInfoList[i]);
            if(backInfoList[i].reply == null && backInfoList[i].replyTime == null){
              that.setData({isReply:false});
            }
            that.setData({
              isOnLoad:false,
              releaseconDatas:dataArr
            });
          }
        }
      }
      console.log(res,'返回数据');
    }
  });
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
    const that = this,siveId = options.siveid,roleId = options.roleid,dataId = options.dataId;
    that.showPublishList(siveId,roleId,dataId);
    that.readFun(dataId);
    console.log(options,'123');
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