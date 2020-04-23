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
   * 请求提醒事项列表接口
   * roleid 值为 4 则表示用户为游客
   * roleid 值不为 4 则表示用户为非游客
   * siveid用户id
   * 如果为游客siveid为openid
   * 如果为企业或其它角色则siveid则为userid 
   */
  mattersFun:(roleid,siveid,f,dataid)=>{
    const listObj = {};
    roleid = parseInt(roleid);
    dataid = parseInt(dataid);
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
        const remindInfo = res.data.data;
        console.log(remindInfo,'222');
        if(f.data.isShow){
          for(let i in remindInfo){
            if(dataid === parseInt(remindInfo[i].id)){
              console.log(remindInfo[i].id,'111');
              f.setData({
                nodes:remindInfo[i].content,
                isShow:false
              });
            }
          }
        }
      }
    });
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
    const readObj = {};
    r = parseInt(r);
    d = parseInt(d);
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
      wx.getStorage({
        key: 'userData',
        success(res){
          readObj.userId = s;
          readObj.noticeId = d;
          wx.request({
            url: u + 'notices/wxHasRead',
            data: readObj,
            header: {
              'login-token':res.data.token,
              "Content-Type":"application/x-www-form-urlencoded"
            },
            method: "GET",
            success:(res)=> {
            }
          });
        }
      }); 
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this,roleid = options.roleid,siveid = options.siveid,dataid = options.id;
    console.log(options.roleid,'角色id');
    console.log(options.siveid,'用户id值');
    that.mattersFun(roleid,siveid,that,dataid);
    that.readFun(roleid,siveid,dataid);
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