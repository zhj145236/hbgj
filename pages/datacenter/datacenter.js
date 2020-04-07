// pages/datacenter/datacenter.js
const app = getApp(),o = app.requirejs('core'),u = o.urlCon();
const datas = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    policyDatas:datas.policyData,
    dataLists:datas.dataList,
    hidNode:true,
    isScrolly:1,
    winHeight:400,
    setInter:'',
  },
  // 点击列表函数
  goodsClick:function(e){
    const that = this;
    that.setData({
      num:e.currentTarget.dataset.index,
    });    
  },

  // 点击查看更多
  nextData:function(e){
    wx.navigateTo({
      url: '../contractcenter/contractcenter',
    })
  },

  // 点击收起
  packUp:function(){
    const that = this;
    that.setData({
      num:null,
    });
    console.log(that.data.num);
  },

  // 查看数据详情
  lodingMore:function(e){
    wx.navigateTo({
      url: '../datalist/datalist',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getStorage({
      key: 'datas',
      success (res) {
        const resourceIds = res.data.user.id;
        console.log(res,'用户数据');
        console.log(resourceIds,'用户ID');
       // alert("1111");
        console.info( "aaaaa->",res.data);

        wx.request({
          url: u + 'files/wxlistFiles',
          data: {
            resourceId:resourceIds
          },
          header: {
            "login-token":res.data.token.token,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "GET",
          success(res) {
            console.log(res,'返回数据');
          }
        });
      }
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