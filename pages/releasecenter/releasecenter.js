// pages/releasecenter/releasecenter.js
const app = getApp(),o = app.requirejs('core'),u = o.urlCon();
const datas = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData:"",
    sex:'',
    isDisabled:false,
    user_contact:'',
    user_number:'',
    user_textarea:''
  },

  /**
   * 
   * @param {*} e 
   * 获取提交接口publishs
   */
  formFun:(dataObj={},f)=>{
    console.log(dataObj,'123');
    f.setData({isDisabled:true});
    wx.request({
      url: u + 'publishs',
      data: dataObj,
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      success(res) {
        console.log(res,'返回数据');
        if(res.data.id !== null || res.data.id !== " "){
          wx.showToast({
            title: "您的留言已提交",
            icon: 'success',
            duration: 2000
          });
          setTimeout(function(){
            f.setData({
              user_contact:'',
              user_number:'',
              user_textarea:'',
              isDisabled:false
            });
          },2000);
        }
      },
      fail(res){
        f.setData({isDisabled:false});
      }
    });
  },
  /**
   * 
   * @param {*} e
   * 输入框失去焦点的时候触发 
   */
  bindblurFun:function(d,f,s){
    console.log(d,'数据中心');
    f.setData({
      [s]:d.detail.value.replace(/\s+/g, '')
    });
  },

  /**
   * 
   * @param {*} e 
   * 用户输入姓名做空格清除处理
   */
  bindblurCon:function(e) {
    const that = this,dataE = e;
    console.log(dataE,'数据');
    that.bindblurFun(dataE,that,"user_contact");
  },

  /**
   * @param {*} e 
   * 用户输入手机号做空格清除处理
   */
  bindblurNum:function(e) {
    const that = this,dataE = e;
    that.bindblurFun(dataE,that,"user_number");
  },

  /**
   * @param {*} e 
   * 用户输入文本框做空格清除处理
   */
  bindblurText:function(e) {
    const that = this,dataE = e;
    that.bindblurFun(dataE,that,"user_textarea");
  },

  formSubmit:function(e){
    const that = this,pattern = /^[\u4e00-\u9fa5]{2,4}$/,myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/,zjyz = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,validationHz = /^[\u4e00-\u9fa5]{0,}$/;
    const name = e.detail.value.contact,
    call = e.detail.value.call,
    describe = e.detail.value.describe;
    // 获取用户角色
    wx.getStorage({
      key: 'userRole',
      success :(res)=> {
        // 验证姓名是否为空
        if(name == ""){
          wx.showToast({
            title: "请输入姓名",
            icon: 'none',
            duration: 1500
          }); 
          return;
        }else if(!pattern.test(name)){
          wx.showToast({
            title: "请输入正确的姓名",
            icon: 'none',
            duration: 1500
          }); 
          return;
        }

        // 验证电话是否为空
        if(call == ""){
          wx.showToast({
            title: "请输入电话",
            icon: 'none',
            duration: 1500
          }); 
          return;
        }else if(!myreg.test(call)){
          wx.showToast({
            title: "请输入正确的电话号码",
            icon: 'none',
            duration: 1500
          }); 
          return;
        }

        // 验证发布内容是否为空
        if(describe == ""){
          wx.showToast({
            title: "请输入发布内容",
            icon: 'none',
            duration: 1500
          });
          return;
        }else if(describe.length < 10){
          wx.showToast({
            title: "发布内容不得小于10个汉字",
            icon: 'none',
            duration: 1500
          });
        }else{
          for (let i = 0; i <= 10; i++) {
            if(!validationHz.test(describe[i])){
              wx.showToast({
                title: "前10个字符必须为汉字",
                icon: 'none',
                duration: 1500
              });
            }
          }
        }
        
        /**
         * 当用户角色id为4则为游客授权登录，需要传入openid
         */
        if(res.data == 4){
          /**游客授权登录 */
          wx.getStorage({
            key: 'userData',
            success:(res)=> {
              const dataObj = {};
              dataObj.headPic = res.data.wxUserInfo.avatarUrl,
              dataObj.nickName = res.data.wxUserInfo.nickName,
              dataObj.openid = res.data.xtBackData.user.openid,
              dataObj.realName = e.detail.value.contact,
              dataObj.publishContent = e.detail.value.describe,
              dataObj.sex = e.detail.value.sex,
              dataObj.tel = e.detail.value.call;
              // that.formFun(dataObj,that);
            }
          });
        }else{
          /**企业授权登录 */
          wx.getStorage({
            key: 'userData',
            success (res) {
              const dataObj = {};
              console.log(res.data.user.id,'企业数据');
              dataObj.userId = res.data.user.id,
              dataObj.realName = e.detail.value.contact,
              dataObj.publishContent = e.detail.value.describe,
              dataObj.sex = e.detail.value.sex,
              dataObj.tel = e.detail.value.call;
              // that.formFun(dataObj,that);
            }
          });
        }
      },
      fail(res){
        wx.showModal({
          title: '提示',
          content: '尚未授权登录，请前往个人中心页面进行授权',
          success (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../aboutus/aboutus'
              });
            }
          }
        })
      }
    });
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    /**
     * 这种情景模式为：游客在login页的时候没有授权登录
     * 游客来到发布页面的时候判断用户是否登录
     * 尚未登录做出登录提示
     */
    wx.getStorage({
      key: 'userRole',
      success(res){
        that.setData({
          roleId:res.data
        });
      },
      fail(res){
        wx.showModal({
          title: '提示',
          content: '尚未授权登录，请前往个人中心页面进行授权',
          success (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../aboutus/aboutus'
              });
            }
          }
        })
      },
    });
    that.setData({
      isDisabled:false
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
   * 监听用户下拉时是否有回复数据
   * 接口：publishs/getReplyButUnreadCount
   * r 用户的角色id
   * s 用户的id值 用户为游客则传入 openid值 否则传入 userid值
   * f 改变this指向 data
   * setU 传入的接口
   */
  msgFun:(r,s,f,setU)=>{
    const siveObj = {};
    r = parseInt(r);
    if(4 === r){
      siveObj.openid = s;
    }else{
      siveObj.userId = s;
    }
    wx.request({
      url: u + setU,
      data: siveObj,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      success:(res)=>{
        const replyNum = res.data;
          // 这里是msg留言的数据
          console.log(replyNum,'留言条数');
          if(replyNum > 0){
            const textInfo = '您的留言中有' + replyNum + '条得到回复，请于【个人中心->我的发布】中查看';
            wx.showModal({
              title: '提示',
              content: textInfo,
              success (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../aboutus/aboutus'
                  });
                }
              }
            })
            f.setData({
              isComplete:true,
              isShowBanner:true
            });
          }else{
            f.setData({
              isComplete:true,
              isShowBanner:true
            });
          }
          if(f.data.isShowBanner){
            wx.hideLoading({
              success(res){
                f.setData({
                  isShowPage:true
                });
                wx.stopPullDownRefresh();
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const that = this,roleid = that.data.roleId,roleidNum = parseInt(roleid);
    console.log(roleidNum);
    wx.showLoading({
      title: '加载中',
      mask:true,
      success(res){
        if(!roleidNum){
          wx.stopPullDownRefresh();
          wx.showModal({
            title: '友情提示',
            content: '您尚未授权登录，请前往个人中心页面进行授权',
            success (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../aboutus/aboutus'
                });
              }
            }
          })
        }else{
          if(4 === roleidNum){
            wx.getStorage({
              key: 'userData',
              success(res){
                console.log(res.data.xtBackData.user.openid,'游客数据');
                const siveId = res.data.xtBackData.user.openid;
                that.msgFun(roleidNum,siveId,that,"publishs/getReplyButUnreadCount");
              }
            });
          }else{
            wx.getStorage({
              key: 'userData',
              success(res){
                console.log(res.data.user.id,'游客数据');
                const siveId = res.data.user.id;
                that.msgFun(roleidNum,siveId,that,"publishs/getReplyButUnreadCount");
              }
            });
          }
        }
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