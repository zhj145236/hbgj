// pages/bannerDetails/bannerDetails.js
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
const datas = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowPage:false,
    
  },

  /**
   * 
   * @param {*} options
   * 获取全部banner数组
   * banners/wxlist 
   * d 需要传入的id值
   * f 改变this指向 data
   */
  bannerFun:function (d,f){
    const isForShow = true;
    console.log(f,'1010');
    d = parseInt(d);
    wx.request({
      url: u + 'banners/wxlist',
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      success(res) {
        const backArr = res.data.data;
        console.log(backArr,'返回数据');
        if(isForShow){
          for(let i in backArr){
            if(backArr[i].id === d){
              // console.log(backArr[i],'对应id打印出的数据');
              f.setData({
                nodes:backArr[i].content,
                isForShow:false,
              });
            }
          }
        }
        // console.log(f.data.isForShow,'是否循环');
        f.setData({
          isShowBanner:true,
          
        });
        if(f.data.isShowBanner){
          f.setData({
            isShowPage:true
          });
          wx.hideLoading({
            success(res){
              console.log(f,'123');
            },
          })
        }
      }
    });
    wx.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this,id = options.id;
    that.setData({
      id:id
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
    const that = this,id = that.data.id;
    wx.showLoading({
      title: '加载中',
      mask:true,
      success(res){
        console.log(res,'成功');
        that.bannerFun(id,that);
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
    const that = this,id = that.data.id;
    wx.showLoading({
      title: '加载中',
      mask:true,
      success(res){
        that.bannerFun(id,that);
      }
    });
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