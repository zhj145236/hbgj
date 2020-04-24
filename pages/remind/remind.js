// pages/index/index.js
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
const datas = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 环保政策数据
  },

  remindList:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../remindcenter/remindcenter?roleid=' + e.currentTarget.dataset.roleid + '&siveid=' + e.currentTarget.dataset.siveid + '&id=' + e.currentTarget.dataset.dataid,
    })
  },

  /**
   * 
   * @param 
   * 请求提醒事项列表接口
   * roleid 值为 4 则表示用户为游客
   * roleid 值不为 4 则表示用户为非游客
   * siveid用户id
   * 如果为游客siveid为openid
   * 如果为企业或其它角色则siveid则为userid 
   */
  mattersFun:(roleid,siveid,f)=>{
    const listObj = {};
    roleid = parseInt(roleid);
    if(roleid != undefined || siveid != undefined){
      if(4 === roleid){
        listObj.openid = siveid
        console.log('走了游客');
      }else{
        listObj.userId = siveid;
        console.log('走了用户');
      }
    }
    wx.request({
      url: u + 'notices/wx_notice',
      data: listObj,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      success:(res)=> {
        console.log(res,'提醒事项返回数据');
        const remindD = res.data.data;
        console.log(remindD.length,'88');
        if(remindD.length !== 0){
          f.setData({
            isShow:true,
            remindDatas:res.data.data,
            roleid:roleid,
            siveid:siveid
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this,roleid = options.roleid,siveid = options.siveid;
    console.log(options.roleid,'角色id');
    console.log(options.siveid,'用户id值');
    that.mattersFun(roleid,siveid,that);
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