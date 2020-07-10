// pages/index/index.js
const app = getApp(),o = app.requirejs('core'),u = o.urlCon();
const datas = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   * page当前请求的是第几页
   * pageSize 请求的数据长度
   * hasMoreData 用于上拉的时候是不是要继续请求数据
   * contentlist 如果page为1直接赋值给contentlist否则将数据追加到contentlist后面
   */
  data: {
    // 环保政策数据
    page:0,
    pageSize:3,
    hasMoreData:true,
    contentlist:[]
  },

  policyList:function(e){
    const sendData = e.currentTarget.dataset.items,senddatapage = encodeURIComponent(JSON.stringify(sendData));
    console.log(e,'111');
    wx.navigateTo({
      url: '../policycenter/policycenter?senddatapage=' + senddatapage,
    })
  },

  /**
   * 
   * @param {*} options 
   * 分页加载数据
   */
  getInfo:function(){
    var that = this;
    if(that.data.hasMoreData){
      wx.request({
        url: u + 'newss',
        data: {
          start:that.data.page,
          length:that.data.pageSize
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET",
        success(res) {
          console.log(res,'数据');
          var contentlistTem = that.data.contentlist;
          if(res.statusCode == 200){
            wx.stopPullDownRefresh();
            wx.hideLoading();
            if(that.data.page == 0){
              contentlistTem = [];
            }
            var contentlist = res.data.data;
            if(that.data.page >= res.data.recordsFiltered){
              that.setData({
                u:u,
                contentlist:contentlistTem.concat(contentlist),
                hasMoreData: false
              });
            }else{
              that.setData({
                u:u,
                contentlist:contentlistTem.concat(contentlist),
                hasMoreData:true,
                page:that.data.page + that.data.pageSize
              });
            }
          }else{
            console.log('123');
            wx.stopPullDownRefresh();
            wx.hideLoading();
            wx.showToast({
              title: '出现异常',
              icon:'none',
              mask:true,
              duration: 2000
            })
          }
        }
      });
    }else{
      wx.stopPullDownRefresh();
      wx.hideLoading();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.showLoading({
      title: '加载中',
      success:function(res){
        that.getInfo();
      }
    })
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
    const that = this;
    that.setData({page:0});
    wx.showLoading({
      title: '加载中',
      success:function(res){
        that.getInfo();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const that = this;
    wx.showLoading({
      title: '加载中',
      success:function(res){
        if(that.data.hasMoreData){
          that.getInfo();
        }else{
          wx.hideLoading();
          wx.showToast({
            title: '没有更多数据',
          })
        };
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})