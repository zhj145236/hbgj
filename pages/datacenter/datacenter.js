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
    isShowBanner:false,
    isShowPage:false,
  },


  // 点击列表函数
  goodsClick:function(e){
    const that = this,goodname = e.currentTarget.dataset.goodname,enterpriseDatas = that.data.enterpriseData,nameArrObj = that.data.nameArrs,conList = [];
    console.log(e,'传过的数据');
    console.log(goodname,'数据名称');
    console.log(enterpriseDatas,'企业数据');
    console.log(nameArrObj,'123');


    for(let i in nameArrObj){
      const conListObj = {};
      if(nameArrObj[i] == '企业检修' &&　goodname.indexOf('检修') && e.currentTarget.dataset.index == 0){
        // console.log(i,'企业检修');
        conListObj.time = enterpriseDatas[i].uploadTime.split(' ')[0];
        conListObj.con = enterpriseDatas[i].fileOriginName.split('.')[0];
        conListObj.conurl = o.comImg(u,enterpriseDatas[i].url);
        conList.push(conListObj);
      }
      if(nameArrObj[i] == '企业台账' &&　goodname.indexOf('台账') && e.currentTarget.dataset.index == 1){
        const conListObj = {};
        // console.log(i,'企业台账');
        conListObj.time = enterpriseDatas[i].uploadTime.split(' ')[0];
        conListObj.con = enterpriseDatas[i].fileOriginName.split('.')[0];
        conListObj.conurl = o.comImg(u,enterpriseDatas[i].url);
        conList.push(conListObj);
      }
      if(nameArrObj[i] == '合同管理' &&　goodname.indexOf('合同') && e.currentTarget.dataset.index == 2){
        const conListObj = {};
        // console.log(i,'合同管理');
        conListObj.time = enterpriseDatas[i].uploadTime.split(' ')[0];
        conListObj.con = enterpriseDatas[i].fileOriginName.split('.')[0];
        conListObj.conurl = o.comImg(u,enterpriseDatas[i].url);
        conList.push(conListObj);
      }
      if(nameArrObj[i] == '环保文件' &&　goodname.indexOf('文件') && e.currentTarget.dataset.index == 3){
        const conListObj = {};
        // console.log(i,'环保文件');
        conListObj.time = enterpriseDatas[i].uploadTime.split(' ')[0];
        conListObj.con = enterpriseDatas[i].fileOriginName.split('.')[0];
        conListObj.conurl = o.comImg(u,enterpriseDatas[i].url);
        conList.push(conListObj);
      }
    }
    conList.length == 0 ? that.setData({showData:false,showIcon:'../../image/kunian.png'}) : that.setData({showData:true});
    // console.log(conList.length,'拼接数据');
    that.setData({
      conLists:conList,
      num:e.currentTarget.dataset.index,
      goodname:goodname,
    });    
  },

  // 点击查看更多
  nextData:function(e){
    const that = this;
    that.setData({
      dataUrl:e.currentTarget.dataset.url,
    });
    console.log(e,'返回数据');
    // 获取手机设备
    wx.getSystemInfo({
      success: function (res) {
        console.log(res,'手机设备');
        if(res.platform == "ios"){
          wx.showModal({
            title:'测试提示',
            content:'这个是ios系统',
            success(res){
              if(res.confirm){
                console.log('这是ios系统');
              }
            }
          })
        }
        
        if(res.platform == "android"){
          wx.showModal({
            title:'测试提示',
            content:'这个是android系统',
            success(res){
              if(res.confirm){
                console.log('这是android系统');
              }
            }
          })
        }
        // that.setData({
        //   systemInfo: res
        // });
      }
    })
    wx.navigateTo({
      url: '../contractcenter/contractcenter?url=' + e.currentTarget.dataset.url,
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
    console.log(e,'企业数据携带参数');
    wx.showToast({
      title: "该功能模块正在开发中",
      icon: 'none',
      duration: 2000
    });
    // wx.navigateTo({
    //   url: '../datalist/datalist',
    // })
  },

  /**
   * 
   * @param {*} options
   * 获取企业数据接口files/wxlistFiles
   * 参数说明：
   * isAuthorization 是否显示 "您尚未授权登录，请前往个人中心进行授权登录"
   * showTitle 是否显示 "游客模式无查看企业数据权限"
   * showPage 是否要将当前页面卸载，与showTitle配合使用
   * f 改变当前函数this指向 data
   * isComplete 判断用户是否出触发了下拉动作
   * 是：设置值为true 停止下拉动作弹回页面，否：持续下拉行为
   */
  dataFun:(f,d)=>{
    if(d == undefined){
      wx.hideLoading({
        success(res){
          wx.stopPullDownRefresh();
          f.setData({isAuthorization:true,showPage:false,showTitle:false,isShowPage:true});
          console.log('C');
          wx.showModal({
            title: '提示',
            content: '尚未授权登录，请前往个人中心页面进行授权',
            success (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../aboutus/aboutus'
                })
              } else if (res.cancel) {}
            }
          })
        }
      });
    }else{
      const roleId = parseInt(d.roleId);
      if(4 === roleId){
        wx.hideLoading({
          success: (res) => {
            f.setData({showPage:false,showTitle:true,isAuthorization:false,isShowPage:true});
            wx.stopPullDownRefresh();
          },
        });
      }else{
        const resourceIds = d.userId;
        f.setData({showPage:true,showTitle:false,isAuthorization:false});
        // console.log(resourceIds,'用户ID');
        // console.log(res.data.Cookie,'用户Cookie');
        // console.log(res.data.token,'用户token');
        /** 企业进入展示企业对应数据  */
        wx.request({
          url: u + 'files/wxlistFiles',
          data: {
            resourceId:resourceIds
          },
          header: {
            "login-token":d.token,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "GET",
          success(res) {
            console.log(res,'企业返回数据');
            const enterpriseData = res.data.data,nameArr = [];
            for(let i in enterpriseData){
              nameArr.push(enterpriseData[i].tag);
            }
            f.setData({
              enterpriseData:res.data.data,
              nameArrs:nameArr,
              isComplete:true,
              isShowBanner:true
            });
            console.log(res.data.data,'返回数据');
            if(f.data.isShowBanner){
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
      }
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this,userData = app.globalData.userData;
    wx.showLoading({
      title: '加载中',
      mask:true,
      success(res){
        that.dataFun(that,userData);
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
    const that = this,userData = app.globalData.userData;
    wx.showLoading({
      title: '加载中',
      mask:true,
      success(res){
        that.dataFun(that,userData);
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