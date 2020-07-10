// pages/index/index.js
const app = getApp(),o = app.requirejs('core'),u = o.urlCon();
const datas = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 环保政策数据
    // myreleaseDatas:datas.myreleaseData,
  },

  myreleaseClick:function(e){
    const sendData = e.currentTarget.dataset.items,senddatapage = encodeURIComponent(JSON.stringify(sendData));
    console.log(e,'用户携带数据');
    wx.navigateTo({
      url: '../releasecon/releasecon?senddatapage=' + senddatapage + '&isloadreadly=' + e.currentTarget.dataset.isloadreadly,
    })
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
  showPublishList:function(siveId,roleId){
    const that = this;
    if(siveId===null  || roleId === null){
      console.error("必备的参数：siveId,roleId",siveId,roleId);
        return;
    }
    roleId = parseInt(roleId);
    const parmObj={};
    // console.log(siveId,roleId,'测试数据');
    if(4===roleId ){
      parmObj.openid=siveId;
    }else{
      parmObj.userId=siveId;
    } 
    console.log(parmObj);
    wx.request({
      url: u + 'publishs/wxlist',
      data: parmObj,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      success(res) {
        console.log(res);
        that.setData({
          myreleaseDatas:res.data.data
        });
        console.log(typeof res.data.data.length,'返回长度');

        if(res.data.data.length == 0){
          // console.log('111');
          that.setData({
            isShow:true
          });
        }else{
          // console.log('222');
          that.setData({
            isShow:false
          });
        }
      }
    });
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const that = this,siveId = options.siveId,roleId = options.roleId;
    that.setData({
      siveId:siveId,
      roleId:roleId
    });
    // console.log(siveId,roleId,'123');

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
    let that = this,siveId = that.data.siveId,roleId = that.data.roleId;
    that.showPublishList(siveId,roleId);
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