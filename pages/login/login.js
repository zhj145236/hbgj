// pages/login/login.js
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
const datas = require('../../utils/data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isDisabled:false,
    times:10,
    startBtn:false,
    isDetermine:true
  },

  /**
   * 
   * @param {*} 
   * 获取游客登录openid
   * 
   */
  touristsFun:(i)=>{
    wx.login({
      success:(res)=>{
        // const getCode = res.code;
        const logObj = {},userObj = {};
        logObj.appid = 'wx44c4721e4704c732',
        logObj.secret = '5bf6ca316b48eb9a8887115c03be3409',
        logObj.grant_type = 'authorization_code';
        logObj.js_code = res.code;
        console.log(i,'888');
        // that.setData({dataN:res.data.openid});  
        wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: logObj,
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success:(res)=> {
              const openid = res.data.openid
              console.log(openid,'777');
              // that.setData({dataN:res.data.openid});
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
                  const token = res.data.token;
                  if(res.data.token !== undefined){
                    // 游客用户数据
                    userObj.userId = openid,
                    userObj.roleId = res.data.role[0].id,
                    userObj.headImgUrl = i.detail.userInfo.avatarUrl,
                    userObj.nickname =  i.detail.userInfo.nickName,
                    userObj.token =  token,
                    userObj.errMsg =  i.detail.errMsg;
                    app.globalData.userData = userObj;
                    wx.showToast({
                      title: "登录成功",
                      icon: 'success',
                      duration: 800
                    });
                    // 接口获取成功的时候跳转到index页面
                    setTimeout(function () {
                      wx.switchTab({
                        url: '../index/index'
                      })
                    },800); 
                  }
                },
                fail(res){
                  console.log(res,'失败');
                }
              });
            }
        }); 
      }
    })
  },
  

  getUserInfo: function (e) {
    let that = this, userInfoSucces = e.detail.errMsg,userObj = {};
    that.setData({isDisabledMembers:true});
    if (userInfoSucces == 'getUserInfo:ok'){
      that.setData({
        userInfoSet:1,
      });

      if(that.data.userInfoSet){
        const touristsInfo = e;
        that.touristsFun(touristsInfo);
      }
    }else{
      // 如果用户不授权登录也是能够跳转到index页面，但是里面的很多功能不能使用
      console.log(e,'用户没有授权');
      wx.switchTab({
        url: '../index/index'
      });
    };
  },

  /**
   * 点击确定按钮
   */
  determineClick:function(){
    const that = this,datas = that.data.datas,userId = datas.user.id,userData={};
    that.setData({isShowModal:false});
    wx.request({
      url: u + 'users/agreeLicence',
      data: {
        "userId":userId
      },
      header: {
        "login-token":datas.token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "PUT",
      success(res) {
        // console.log(res.token,'返回数据');
        console.log(datas,'登录成功返回数据');
        // 会员数据存储到全局变量中
        // 企业用户数据
        userData.token = datas.token,
        userData.userId = datas.user.id,
        userData.roleId = datas.role[0].id,
        userData.headImgUrl = datas.user.headImgUrl,
        userData.nickname =  datas.user.nickname,
        userData.errMsg =  res.errMsg;
        app.globalData.userData = userData;
        // 登录提示
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 800
        });
        setTimeout(function () {
          wx.switchTab({
            url: '../index/index'
          })
        },800); 
      }
    });
  },

  /**
   * 
   * @param {*} e
   * 点击取消按钮 
   */
  cancelClick:function(){
    const that = this;
    that.setData({isShowModal:false,times:10,isDisabledGetUser:false});
  },

  // 点击会员登录
  formSubmit: function(e){
    const that = this;
    if(e.detail.value.user == ""){
      wx.showToast({
        title: "请输入用户名",
        icon: 'none',
        duration: 1500
      });
      return;
    };
    if(e.detail.value.pswd == ""){
      wx.showToast({
        title: "请输入密码",
        icon: 'none',
        duration: 2000
      });
      return;
    };

    wx.request({
      url: u + 'sys/login/restful',
      data: {
        "username":e.detail.value.user,
        "password":e.detail.value.pswd
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success(res) {
        console.log(res,'返回数据');
        if(res.data.code == 200){
          that.setData({isDisabledGetUser:true,isDisabledMembers:true,isShowModal:true});
          const datas = res.data.data,
          agreeLicence = datas.user.agreeLicence,roleId = datas.role[0].id;
          console.log(roleId,'返回数据');
          // 如果agreeLicence == null则该用户为第一次登录
          if(agreeLicence == null && roleId !== 2){
            console.log('走了这里A');
            if(that.data.isDetermine){
              var num = 10;
              var t = setInterval(function(){
                num--;
                that.setData({
                  times:num,
                  nums:num
                });
                if(num == 0){
                  clearInterval(t);
                  that.setData({
                    isDetermine:false,
                    isDisabledMembers:"",
                    startBtn:false
                  });
                }else{
                  that.setData({startBtn:true});
                }
              },1000);
            }else{
              that.setData({
                isDisabledMembers:"",
              });
            }
            that.setData({datas:datas});
          }else{
            const userData = {};
            that.setData({isShowModal:false});
            console.log('走了这里B');
            // 否则该用户之前已经同意该处的法律申明，进行了登录操作
            // 登录提示
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 800
            });
            console.log(res,'返回数据');
            // 企业用户数据
            userData.token = datas.token,
            userData.userId = datas.user.id,
            userData.roleId = datas.role[0].id,
            userData.headImgUrl = datas.user.headImgUrl,
            userData.nickname =  datas.user.nickname,
            userData.errMsg =  res.errMsg;
            app.globalData.userData = userData;
            setTimeout(function () {
              wx.switchTab({
                url: '../index/index'
              })
            },800); 
          }
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          }); 
        }
      },
      fail(res){
        console.log(res,'调取接口失败')
      }
    });

    // wx.request({
    //   url: u + 'sys/login/restful',
    //   data: {
    //     "username":e.detail.value.user,
    //     "password":e.detail.value.pswd
    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   method: "POST",
    //   success(res) {
    //     if(res.token !== "" || res.token !== null || res.token !== undefined){
    //       that.setData({isDisabledGetUser:true});
    //       const datas = res.data.data;
    //       console.log(datas,'123');
    //       // 会员数据存储到缓存中
    //       wx.setStorage({
    //         key:"userData",
    //         data:datas
    //       });

    //       // 将用户角色（会员）保存在缓存中方便其他页面调用
    //       wx.setStorage({
    //         key:'userRole',
    //         data:datas.role[0].id
    //       });
    //       // 登录提示
    //       wx.showToast({
    //         title: "登录成功",
    //         icon: 'success',
    //         duration: 800
    //       });
    //       setTimeout(function () {
    //         wx.switchTab({
    //           url: '../index/index'
    //         })
    //       },800);          
    //     }else{
    //       wx.showToast({
    //         title: res.data.message,
    //         icon: 'none',
    //         duration: 2000
    //       });          
    //     }
    //   }
    // });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this,mobileHeight = '',mobileWidth = '';
    wx.getSystemInfo({
      success (res) {
        that.setData({
          mobileWidth:res.windowWidth + 'px',
          mobileHeight:res.windowHeight + 'px',
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