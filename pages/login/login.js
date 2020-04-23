// pages/login/login.js
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
const datas = require('../../utils/data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isDisabled:false
  },

  // 点击游客进行跳转
  // tourists:function(e){
  //   // wx.switchTab({
  //   //   url: '../index/index'
  //   // });
  // },

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
                  }
                });
            }
        });
        // console.log(that.data.dataN);  
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
      // wx.login({
      //   success(res){
      //     const getCode = res.code;
      //     console.log(getCode,'用户临时登录');
      //     wx.request({
      //       url: 'https://api.weixin.qq.com/sns/jscode2session',
      //       data: {
      //         appid:"wx44c4721e4704c732",
      //         secret:'5bf6ca316b48eb9a8887115c03be3409',
      //         js_code:getCode,
      //         grant_type:"authorization_code"
      //       },
      //       header: {
      //         "Content-Type": "application/json"
      //       },
      //       method: "GET",
      //       success(res) {
      //         console.log(res);
      //       }
      //     });
      //   }
      // })
    };
  },

  // 点击会员登录
  formSubmit: function(e){
    console.log('123');
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
        console.log('999');
        if(res.token !== "" || res.token !== null || res.token !== undefined){
          that.setData({isDisabledGetUser:true});
          const datas = res.data.data,userId = datas.user.id,agreeLicence = datas.user.agreeLicence;
          console.log(datas,'返回数据');
          if(agreeLicence == null){
            // 如果agreeLicence == null则该用户为第一次登录
            wx.showModal({
              title: '法律申明',
              content: '1.我们收集的信息\r\n\r\n在你使用微信服务的过程中，微信会按照如下方式收集你在使用服务时主动提供或因为使用服务而产生的信息，用以向你提供服务、优化我们的服务以及保障你的帐号安全：\r\n\r\n1.1 当你注册微信服务时，我们会收集你的昵称、头像、手机号码，收集这些信息是为了帮助你完成微信注册，保护你微信帐号的安全。手机号码属于敏感信息，收集此类信息是为了满足相关法律法规的网络实名制要求。若你不提供这类信息，你可能无法正常使用我们的服务。你还可以根据自身需求选择填写性别、地区等信息。此外，你可以选择向我们提供你的声纹特征值信息，该信息属于敏感信息，拒绝提供该信息仅会使你无法使用声纹锁功能，但不影响你正常使用微信的其他功能。\r\n\r\n1.2 当你使用微信服务时，为保障你正常使用我们的服务，我们会收集你的设备型号、操作系统、唯一设备标识符、登陆IP地址、微信软件版本号、接入网络的方式和类型、设备加速器（如重力感应设备）、操作日志等日志信息，这类信息是为提供服务必须收集的基础信息。\r\n\r\n1.3 当你使用微信朋友圈功能时，你上传的朋友圈照片、评论、点赞等信息会存储在我们的服务器中，因为存储是实现这一功能所必需的。我们会以加密的方式存储，你也可以随时删除这些信息。\r\n\r\n1.4 当你使用微信公众帐号、微信小程序等功能时，未经你的许可，微信不会向微信公众帐号运营者、小程序开发者公开、透露你的个人信息。\r\n\r\n1.5 当你使用微信附近的人、摇一摇以及面对面建群等功能时，我们会在获得你的同意后，记录你的地理位置信息，目的是为了向你提供该服务。该信息属于敏感信息，拒绝提供该信息仅会使你无法使用上述功能，但不影响你正常使用微信的其他功能。此外，你也可以随时关闭相关功能并在该功能内清除你的地理位置信息。\r\n\r\n1.6 当你使用微信运动功能时，我们需要收集你的步数信息，与你的好友进行比较。该信息属于敏感信息，拒绝提供这些信息仅会使你无法使用微信运动功能，但不影响你正常使用微信的其他功能。\r\n\r\n1.7 当你使用通讯录功能时，我们会对你的通讯录信息进行不可逆加密，并仅收集加密后的信息。上述信息属于敏感信息，拒绝提供该信息仅会使你无法使用上述功能，但不影响你正常使用微信的其他功能。\r\n\r\n1.8 微信支付功能由财付通公司向你提供服务。当你开通微信支付功能时，财付通会收集你的姓名、银行卡类型及卡号、有效期及银行预留手机号。当你使用微信支付时，财付通公司还会收集你的相关支付记录以便于你查询。上述信息属于敏感信息，拒绝提供该信息仅会使你无法使用微信支付功能，但不影响你正常使用微信的其他功能。\r\n\r\n1.9 微信服务中的第三方服务由外部第三方主体提供，微信无法获得你在使用该类第三方服务时产生的信息。但是，如果你已明示同意该第三方获得你的地理位置信息，该第三方将通过微信获得终端地理位置信息接口，此时微信和第三方均会获得你的地理位置信息。该信息属于敏感信息，拒绝提供该信息仅会使你无法使用上述第三方服务，但不影响你正常使用微信的功能。\r\n\r\n请你注意，目前微信不会主动从第三方获取你的个人信息。如未来为业务发展需要从第三方间接获取你个人信息，我们会在获取前向你明示你个人信息的来源、类型及使用范围，如微信开展业务需进行的个人信息处理活动超出你原本向第三方提供个人信息时的授权同意范围，我们将在处理你的该等个人信息前，征得你的明示同意；此外，我们也将会严格遵守相关法律法规的规定，并要求第三方保障其提供的信息的合法性。\r\n\r\n2.信息的存储\r\n\r\n2.1 信息存储的地点\r\n\r\n我们会按照法律法规规定，将境内收集的用户个人信息存储于中国境内。\r\n\r\n2.2 信息存储的期限\r\n\r\n一般而言，我们仅为实现目的所必需的时间保留你的个人信息，例如：\r\n\r\n手机号码：若你需要使用微信服务，我们需要一直保存你的手机号码，以保证你正常使用该服务，当你注销微信帐户后，我们将删除相应的信息；\r\n\r\n朋友圈信息：当你发送了朋友圈，我们需要保存你的朋友圈信息，以保证你正常使用朋友圈功能，当你删除你的朋友圈信息后，我们将删除相应的信息。\r\n\r\n当我们的产品或服务发生停止运营的情形时，我们将以推送通知、公告等形式通知您，并在合理的期限内删除您的个人信息或进行匿名化处理。\r\n\r\n3.信息安全\r\n\r\n我们努力为用户的信息安全提供保障，以防止信息的丢失、不当使用、未经授权访问或披露。\r\n\r\n我们将在合理的安全水平内使用各种安全保护措施以保障信息的安全。例如，我们会使用加密技术（例如，SSL）、匿名化处理等手段来保护你的个人信息。\r\n\r\n我们建立专门的管理制度、流程和组织以保障信息的安全。例如，我们严格限制访问信息的人员范围，要求他们遵守保密义务，并进行审计。\r\n\r\n若发生个人信息泄露等安全事件，我们会启动应急预案，阻止安全事件扩大，并以推送通知、公告等形式告知你。\r\n\r\n目前，微信在信息安全方面已达到ISO27001、国际信息安全管理体系等国际权威认证标准的要求，并已获得了相应的认证。',
              success (res) {
                if (res.confirm) {
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
                      console.log(res,'返回数据');
                      // 会员数据存储到缓存中
                      wx.setStorage({
                        key:"userData",
                        data:datas
                      });

                      // 将用户角色（会员）保存在缓存中方便其他页面调用
                      wx.setStorage({
                        key:'userRole',
                        data:datas.role[0].id
                      });
                      // 登录提示
                      wx.showToast({
                        title: "登录成功",
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
                }
              }
            });
          }else{
            // 否则该用户之前已经同意该处的法律申明，进行了登录操作
            // 会员数据存储到缓存中
            wx.setStorage({
              key:"userData",
              data:datas
            });

            // 将用户角色（会员）保存在缓存中方便其他页面调用
            wx.setStorage({
              key:'userRole',
              data:datas.role[0].id
            });
            // 登录提示
            wx.showToast({
              title: "登录成功",
              icon: 'success',
              duration: 800
            });
            setTimeout(function () {
              wx.switchTab({
                url: '../index/index'
              })
            },800); 
          }
          
        }
      },
      fail(res){
        console.log(res,'没有成功');
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
    wx.showToast({
      title: "页面初次渲染完成",
      icon: 'none',
      duration: 2000
    });
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
    wx.showToast({
      title: "页面隐藏",
      icon: 'none',
      duration: 2000
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.showToast({
      title: "页面是否被卸载",
      icon: 'none',
      duration: 2000
    });
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