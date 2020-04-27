// pages/index/index.js
const app = getApp(),o = app.requirejs('core'),u = o.urlCon();
const datas = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isScrolly:1,//允许页面滚动
    ishidden:'none',
    isBol: 0,
    imgUrls: [
      '../../image/banerone.jpg',
      '../../image/banertwom.png',
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 1000,

    // 下方图标信息4个
    iconDatas:datas.iconData,
    // 环保政策数据
    // policyDatas:datas.policyData,
    kf:'../../image/kf.png',
    hasOnShow:false,
    isShowBanner:false,
    isShowNews:false,
    isShowPage:false,
  },

  // 点击客服按钮快速联系平台
  kfClick:function(){
    wx.makePhoneCall({
      phoneNumber: '18566130190'
    });
  },
  

  // 点击四个图标
  iconClick:function(e){
    const that = this;
    console.log(e.currentTarget.dataset.index,'123');
    switch(e.currentTarget.dataset.index){
      case 0:
        wx.navigateTo({
          url: '../policy/policy',
        });
        break;
      case 1:
        wx.switchTab({
          url: '../datacenter/datacenter'
        })
        break;
      case 2:
        wx.switchTab({
          url: '../releasecenter/releasecenter'
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../introduction/introduction',
        });
        break;
    }
    
  },

  // 点击环保政策更多
  morePolicy:function(e){
    wx.navigateTo({
      url: '../policy/policy',
    })
  },

  policyList:function(e){
    const that = this,sendData = e.currentTarget.dataset.items,senddatapage = encodeURIComponent(JSON.stringify(sendData));
    
    that.setData({
      num:e.currentTarget.dataset.index
    });
    wx.navigateTo({
      url: '../policycenter/policycenter?senddatapage=' + senddatapage,
    })
  },

  /**
   * @param(*)
   * 获取政策新闻前五个列表
   * newss
   * f 修改this指向 data
   * isComplete 判断用户是否出触发了下拉动作
   * 是：设置值为true 停止下拉动作弹回页面，否：持续下拉行为
   */

  newDataFun:(f)=>{
    wx.request({
      url: u + 'newss',
      data: {
        start:0,
        length:5
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      success(res) {
        console.log(res,'123');
        const policyArr = [],policyDatas = res.data.data;
        // policyObj.title = 
        for(let i in policyDatas){
          const policyObj = {};
          policyObj.title = policyDatas[i].title,
          policyObj.createTime = policyDatas[i].createTime.split(" ")[0],
          policyObj.newsid = policyDatas[i].id,
          policyObj.author = policyDatas[i].author,
          policyObj.content = policyDatas[i].content,
          policyObj.bannerImg = u + policyDatas[i].bannerImg;
          policyArr.push(policyObj);
        }
        console.log(policyArr);
        f.setData({
          policyArr:policyArr,
          isComplete:true,
          isShowNews:true
        });
        if(f.data.isShowNews){
          wx.hideLoading({
            success(res){
              f.setData({
                isShowPage:true
              });              
            }
          });
        }
      }
    });
    if(f.data.isComplete){
      wx.stopPullDownRefresh();
    }
  },

  /**
   * 案例详情
   */
  caseInfo:(e)=>{
    console.log(e,'案例');
    wx.navigateTo({
      url: '../bannerDetails/bannerDetails?id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 
   * @param {*} options
   * banner图加载
   *  banners/wxlist
   * 
   */
  bannerFun:function (f){
    console.log(f,'1010');
    wx.request({
      url: u + 'banners/wxlist',
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      success(res) {
        const bannerArr = [],backArr = res.data.data;
        for(let i in backArr){
          const bannerObj = {};
          bannerObj.id = backArr[i].id;
          bannerObj.mainImg = u + backArr[i].mainImg;
          bannerArr.push(bannerObj);
        }
        console.log(res,'返回数据');
        f.setData({
          bannerArr:bannerArr,
          isShowBanner:true
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    
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
    that.setData({num:null});
    wx.showLoading({
      title: '加载中',
      mask:true,
      success(res){
        that.newDataFun(that);
        that.bannerFun(that);
      }
    });
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
    wx.showLoading({
      title: '加载中',
      mask:true,
      success(res){
        that.newDataFun(that);
        that.bannerFun(that);
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