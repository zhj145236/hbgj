// pages/aboutus/aboutus.js
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
const datas = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bjImg:'../../image/banerthree.png',
    userInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    meCenters:datas.meCenter,
    latitude:"22.842377", // 纬度
    longitude:"113.71856", // 经度
    name:"东莞市环联管家生态环境科技有限公司",
    address:"广东省-东莞市-沙河路-66号",
    showVendor:true
  },

  // 企业简介
  introClick:function(e){
    wx.navigateTo({
      url: '../introduction/introduction',
    })
  },

  /**
   * 
   * @param {*} 
   * 获取游客登录openid
   * 进入页面后点击图标登录
   * i 微信接口返回的用户信息
   * f 改变this指向，指向data
   */
  touristsFun:(i,f)=>{
    wx.login({
      success:(res)=>{
        // const getCode = res.code;
        const userObj = {};
        console.log(i,'888');
        wx.request({
            url: u + 'weixin/userOpenid',
            data: {"js_code": res.code},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success:(res)=> {
              console.log(res,'成功');
              wx.request({
                url: u + 'users/wxAutoLogin',
                data: {
                  "avatarUrl":i.detail.userInfo.avatarUrl,
                  "nickName":i.detail.userInfo.nickName,
                  "openid":res.data.openid,
                  "city":i.detail.userInfo.city,
                  "country":i.detail.userInfo.country,
                  "gender":i.detail.userInfo.gender,
                  "language":i.detail.userInfo.language,
                  "province":i.detail.userInfo.province,
                },
                header: {
                  "Content-Type": "application/json"
                },
                method: "POST",
                success(res) {
                  console.log(res,'数据');
                  if(res.data.token !== undefined || res.data.token !== null || res.data.token !== ''){
                    const token = res.data.token;
                    console.log(res,'游客数据');
                    // 游客用户数据
                    userObj.userId = res.data.user.openid,
                    userObj.roleId = res.data.role[0].id,
                    userObj.headImgUrl = i.detail.userInfo.avatarUrl,
                    userObj.nickname =  i.detail.userInfo.nickName,
                    userObj.token =  token,
                    userObj.errMsg =  i.detail.errMsg;
                    app.globalData.userData = userObj;
                    f.setData({
                      siveId:res.data.user.openid, // 需要传的用户id openid （必然是游客）
                      roleId:res.data.role[0].id //用户的角色id
                    });
                    // 回复留言条数
                    f.mesgFun('publishs/getReplyButUnreadCount','msg',f,userObj);
                    // 提醒事项条数
                    f.mesgFun('notices/wx_count_unread','info',f,userObj);
                  }
                }
              });
            },
            fail:function(res){
              console.log(res,'失败');
            }
        });
        // console.log(that.data.dataN);  
      }
    })
  },

  /**
   * 2020/5/2新增 --- 张
   * 当点击厂商登录的时候要跳转到首页
   */
  vendorClick:function(){
    wx.reLaunch({
      url: '../login/login'
    })
  },

  /**
   * userInfoSet 是否显示用户退出登录按钮
   * userInfo 授权后返回的微信用户的信息
   * hasUserInfo 是否显示尚未授权登录按钮 注意：
   */

  // 获取用户信息
  getUserInfo: function (e) {
    let that = this, userInfoSucces = e.detail.errMsg;
    if (userInfoSucces == 'getUserInfo:ok'){
      that.setData({
        userInfoSet:1,
        showVendor:true // 2020/5/2新增 --- 张 showVendor是否显示厂商登录按钮
      });
      if(that.data.userInfoSet){
        const touristsInfo = e;
        that.touristsFun(touristsInfo,that);
        that.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true,
          errMsg:userInfoSucces
        });
      }
    }else{
      that.setData({
        userInfoSet:0
      });
    };
  },

  // 退出登录
  exitClick:function(e){
    // app.globalData.userData =  null;
    // app.globalData.userData = null;
    const d = app.globalData.userData,token = d.token;
    console.log(token,'数据');
    wx.request({
      url: u + 'sys/logout',
      data: {},
      header: {
        "login-token":token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      success:(res)=>{
        console.log(res,'退出成功');
        app.globalData.userData = null;
        wx.showToast({
          title: "已退出登录",
          icon: 'success',
          mask:true,
          duration: 1500
        });
        setTimeout(function(){
          wx.reLaunch({
            url: '../login/login'
          })
        },1500);
      }
    });
    return;
  },

  // 列表点击事件
  nextInfo:function(e){
    const that = this;
    switch(e.currentTarget.dataset.index){
      case 0:
        console.log(e.currentTarget.dataset.isloadreadly,'携带数据');
        if(that.data.errMsg !== undefined){
          wx.navigateTo({
            url: '../myrelease/myrelease?siveId=' + that.data.siveId + '&roleId=' + that.data.roleId,
          });
        }else{
          wx.showToast({
            title: "请点击图像授权登录",
            icon: 'none',
            duration: 800
          });
        }
        break;
      case 1:
        wx.getLocation({
          type:'gcj02',
          altitude:true,
          success: function(res) {
            // console.log(res,'这是地图的经纬度');
            // console.log(Number(that.data.latitude),'设置经度');
            wx.openLocation({
              latitude: Number(that.data.latitude), //纬度
              longitude: Number(that.data.longitude), // 经度
              name: that.data.name,
              address: that.data.address,
              scale: 10
            })
          },
          fail:function(res){
            wx.navigateTo({
              url: '../map/map?lat=' + Number(that.data.latitude) + '&lon=' + Number(that.data.longitude) + '&name=' + that.data.name + '&address=' + that.data.address,
            });
          }
        });
        break;
      case 2:
        wx.makePhoneCall({
          phoneNumber: '13412565066'
        });
        break;
    }
  },

  // 提醒事项
  mattersClick:function(e){
    const that = this,isShow = that.data.isShow;
    /**if  isShow 为真的时候 点击提醒事项按钮 进入到提醒事项列表页，否则不进行任何跳转*/
    if(that.data.errMsg !== undefined){
      wx.navigateTo({
        url: '../remind/remind?siveid=' + e.currentTarget.dataset.siveid + '&roleid=' + e.currentTarget.dataset.roleid,
      });
    }else{
      wx.showToast({
        title: "请点击图像授权登录",
        icon: 'none',
        duration: 800
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 2020/5/2新增 --- 张
    const that = this,userData = app.globalData.userData;
    if(userData !== undefined){
      const roleId = parseInt(userData.roleId);
      if(roleId === 2 || roleId === 3){
        that.setData({showVendor:false});
      }      
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * @param
   * 返回用户未读的留言数量
   * 接口
   * A、publishs/getReplyButUnreadCount（用户未读的留言数量）
   * B、notices/wx_count_unread（页面加载时返回的消息提醒数量）
   * f 改变this指向data
   * setU 需要传入的url
   * ins 需要指明是获取哪个接口
   * info 消息提示接口类型
   * msg 留言接口类型
   */
  mesgFun:(setU,ins,f,d)=>{
    wx.showLoading({
      title: '加载中',
      mask:true,
      success(res){
        if(d !== undefined){
          // console.log(d,'用户信息');
          const siveObj = {},roleId = parseInt(d.roleId);
          if(4 === roleId){
            siveObj.openid = d.userId;
            wx.request({
              url: u + setU,
              data: siveObj,
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "GET",
              success:(res)=>{
                const replyNum = res.data;
                // console.log(replyNum,'返回现在回复的个数');
                // 判断是哪个接口进来的 info为提醒事项
                if(ins === 'info'){
                  console.log(replyNum,'提醒事项数量');
                  if(replyNum > 0){
                    f.setData({
                      remindNum:replyNum,
                      isShow:true
                    });
                  }else{
                    f.setData({
                      isShow:false
                    });
                  }
                }else{
                  // 这里是msg留言的数据
                  console.log(replyNum,'留言条数');
                  if(replyNum > 0){
                    const textInfo = '您有' + replyNum + '条回复';
                    f.setData({
                      textInfo:textInfo,
                      isListShow:true
                    });
                  }else{
                    f.setData({
                      isListShow:false
                    });
                  }
                }
                f.setData({successOnLoadInfo:true});
                wx.hideLoading();
              }
            });
      
            f.setData({
              userInfoSet:1,
            });
            if (f.data.userInfoSet){
              const userInfos = {};
              userInfos.avatarUrl = d.headImgUrl,
              userInfos.nickName = d.nickname;
              f.setData({
                userInfo: userInfos,
                hasUserInfo: true,
                errMsg:d.errMsg,
                siveId:d.userId,
                roleId:d.roleId
              });
            }
          }else{
            siveObj.userId = d.userId;
            // console.log(res,'用户角色');
            wx.request({
              url: u + setU,
              data: siveObj,
              header: {
                "login-tokin":d.token,
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "GET",
              success:(res)=>{
                console.log(res,'返回数据');
                const replyNum = res.data;
                // 判断是哪个接口进来的 info为提醒事项
                if(ins === 'info'){
                  console.log(replyNum,'厂商提醒事项');
                  if(replyNum > 0){
                    f.setData({
                      remindNum:replyNum,
                      isShow:true
                    });
                  }else{
                    f.setData({
                      isShow:false
                    });
                  }
                }else{
                  // msg为留言条数
                  console.log(replyNum,'留言条数');
                  if(replyNum > 0){
                    const textInfo = '您有' + replyNum + '条回复';
                    f.setData({
                      textInfo:textInfo,
                      isListShow:true
                    });
                  }else{
                    f.setData({
                      isListShow:false
                    });
                  }
                }
                f.setData({successOnLoadMsg:true});
                wx.hideLoading();
              }
            });
      
            let userInfos = {};
            if(d.headImgUrl !== null){
              userInfos.avatarUrl = o.comImg(u,d.headImgUrl);
            }else{
              userInfos.avatarUrl = '../../image/imgfail.png'
            }
            userInfos.nickName = d.nickname;
            console.log(d.headImgUrl,'用户图像');
            f.setData({
              userInfoSet:1,
            });
            if (f.data.userInfoSet){
              // console.log(res.data.role[0].id);
              f.setData({
                userInfo: userInfos,
                hasUserInfo: true,
                errMsg:d.errMsg,
                siveId:d.userId,
                roleId:d.roleId
              });
            }
          }
          console.log(f.data.successOnLoadInfo,f.data.successOnLoadMsg,'判断');
          if(f.data.successOnLoadInfo !== undefined || f.data.successOnLoadMsg !== undefined){
            if(f.data.successOnLoadInfo || f.data.successOnLoadMsg){
              wx.stopPullDownRefresh();
              wx.hideLoading();
            }
          }else{
            wx.stopPullDownRefresh();
            wx.hideLoading();
          }
        }else{
          wx.stopPullDownRefresh();
          wx.hideLoading();
          wx.showToast({
            title: "请点击图像授权登录",
            icon: 'none',
            duration: 2000
          });
          f.setData({
            hasUserInfo:0,
          });
        }
      }
    });
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   * msg 留言条数
   * info 消息提醒条数
   */
  onShow: function () {
    const that = this,userData = app.globalData.userData;
    console.log(userData,"onShow");
    if(userData !== undefined){
      // 回复留言条数
      that.mesgFun('publishs/getReplyButUnreadCount','msg',that,userData);
      // 提醒事项条数
      that.mesgFun('notices/wx_count_unread','info',that,userData);
    }
    
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
    const that = this,userData = app.globalData.userData;
    wx.showLoading({
      title: '加载中',
      mask:true,
      success(res){
        // 回复留言条数
        that.mesgFun('publishs/getReplyButUnreadCount','msg',that,userData);
        // 提醒事项条数
        that.mesgFun('notices/wx_count_unread','info',that,userData);
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