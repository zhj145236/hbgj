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
        const logObj = {},userObj = {};
        logObj.appid = 'wx44c4721e4704c732',
        logObj.secret = '5bf6ca316b48eb9a8887115c03be3409',
        logObj.grant_type = 'authorization_code';
        logObj.js_code = res.code;

        // that.setData({dataN:res.data.openid});  
        wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: logObj,
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success:(res)=> {
                // that.setData({dataN:res.data.openid});
                wx.request({
                  url: u + 'users/wxAutoLogin',
                  data: {
                    "openid":res.data.openid
                  },
                  header: {
                    "Content-Type": "application/json"
                  },
                  method: "POST",
                  success(res) {
                    // console.log(res.data,'游客数据');
                    if(res.data.token !== undefined || res.data.token !== null || res.data.token !== ''){
                      userObj.wxUserInfo = i.detail.userInfo; // 微信返回的的用户数据
                      userObj.xtBackData = res.data; //系统返回的用户数据
                      wx.setStorage({
                        key:'userData',
                        data:userObj
                      });
                      // 将用户角色（游客）保存在缓存中方便其他页面调用
                      console.log(res,'数据');
                      wx.setStorage({
                        key:'userRole',
                        data:res.data.role[0].id
                      });
                      f.setData({
                        siveId:res.data.user.openid, // 需要传的用户id openid （必然是游客）
                        roleId:res.data.role[0].id //用户的角色id
                      });
                    }
                  }
                });
            }
        });
        // console.log(that.data.dataN);  
      }
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
    const that = this;
    // app.userInfo = null;
    wx.clearStorage({
      success:(res)=>{
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
      },
    });
  },

  // 列表点击事件
  nextInfo:function(e){
    const that = this;
    switch(e.currentTarget.dataset.index){
      case 0:
        // console.log(that.data.errMsg,'用户数据');
        if(that.data.errMsg == "getStorage:ok" || that.data.errMsg == "getUserInfo:ok"){
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
        });
        break;
      case 2:
        wx.makePhoneCall({
          phoneNumber: '13310829325'
        });
        break;
    }
  },

  // 提醒事项
  mattersClick:function(e){
    const that = this,isShow = that.data.isShow;
    /**if  isShow 为真的时候 点击提醒事项按钮 进入到提醒事项列表页，否则不进行任何跳转*/
    if(that.data.errMsg == "getStorage:ok" || that.data.errMsg == "getUserInfo:ok"){
      if(isShow){
        wx.navigateTo({
          url: '../remind/remind?siveid=' + e.currentTarget.dataset.siveid + '&roleid=' + e.currentTarget.dataset.roleid,
        });
      }else{
        wx.showToast({
          title: "暂无提醒事项",
          icon: 'none',
          duration: 800
        });
      }
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
  mesgFun:(setU,ins,f)=>{
    const siveObj = {};
    wx.getStorage({
      key: 'userRole',
      success (res) {
        const roleid = parseInt(res.data);
        console.log(roleid,'角色id');
        // return;
        if(4 == roleid){
          wx.getStorage({
            key:'userData',
            success:(res)=>{
              console.log(res,'userData');
              const openid = res.data.xtBackData.user.openid;
              siveObj.openid = openid;
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
                        isShow:true,
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
                console.log(res.data);
                f.setData({
                  userInfo: res.data.wxUserInfo,
                  hasUserInfo: true,
                  errMsg:res.errMsg,
                  siveId:res.data.xtBackData.user.openid,
                  roleId:res.data.xtBackData.role[0].id
                });
              }
            }
          });
        }else{
          wx.getStorage({
            key:'userData',
            success:(res)=>{
              console.log(res,'非游客数据');
              const userid = res.data.user.id;
              siveObj.userId = userid;
              // console.log(siveObj,' 啊啊');
              wx.getStorage({
                key:'userData',
                success:(res)=>{
                  const token = res.data.token;
                  // console.log(res,'用户角色');
                  wx.request({
                    url: u + setU,
                    data: siveObj,
                    header: {
                      "login-tokin":token,
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "GET",
                    success:(res)=>{
                      const replyNum = res.data;
                      
                      // 判断是哪个接口进来的 info为提醒事项
                      if(ins === 'info'){
                        console.log(replyNum,'厂商提醒事项');
                        if(replyNum > 0){
                          f.setData({
                            remindNum:replyNum,
                            isShow:true,
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
                  userInfos.avatarUrl = o.comImg(u,res.data.user.headImgUrl);
                  userInfos.nickName = res.data.user.nickname;
                  f.setData({
                    userInfoSet:1,
                  });
                  if (f.data.userInfoSet){
                    console.log(res.data.role[0].id);
                    f.setData({
                      userInfo: userInfos,
                      hasUserInfo: true,
                      errMsg:res.errMsg,
                      siveId:res.data.user.id,
                      roleId:res.data.role[0].id
                    });
                  }
                }
              });
            }
          });
        }
        console.log(f.data.successOnLoadInfo,f.data.successOnLoadMsg,'判断');
        if(f.data.successOnLoadInfo !== undefined || f.data.successOnLoadMsg !== undefined){
          if(f.data.successOnLoadInfo || f.data.successOnLoadMsg){
            wx.stopPullDownRefresh();
          }
        }
      },
      fail(res){
        setTimeout(function(){
          wx.getStorage({
            key:'userData',
            success:(res)=>{
              console.log(res,'重新获取');
            },
            fail(res){
              console.log(res,'获取失败');
            }
          });
        },5000);
        wx.stopPullDownRefresh();
        wx.showToast({
          title: "请点击图像授权登录",
          icon: 'none',
          duration: 2000
        });
        console.log('B');
        f.setData({
          hasUserInfo:0,
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   * msg 留言条数
   * info 消息提醒条数
   */
  onShow: function () {
    const that = this;
    console.log('是否执行');
    // 回复留言条数
    that.mesgFun('publishs/getReplyButUnreadCount','msg',that);
    // 提醒事项条数
    that.mesgFun('notices/wx_count_unread','info',that);
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
        // 回复留言条数
        that.mesgFun('publishs/getReplyButUnreadCount','msg',that);
        // 提醒事项条数
        that.mesgFun('notices/wx_count_unread','info',that);
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