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
  },

  inArray:(array1,array2)=>{
      return array2.filter(function(value){return (array1.join('-').indexOf(value))!=-1});
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
    wx.navigateTo({
      url: '../datalist/datalist',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getStorage({
      key: 'datas',
      success (res) {
        const resourceIds = res.data.user.id;
        // console.log(res,'用户数据');
        // console.log(resourceIds,'用户ID');
        // console.log(res.data.Cookie,'用户Cookie');
        // console.log(res.data.token,'用户token');
       // alert("1111");
        console.info( "aaaaa->",res.data);

        wx.request({
          url: u + 'files/wxlistFiles',
          data: {
            resourceId:resourceIds
          },
          header: {
            "Cookie":res.data.Cookie,
            "login-token":res.data.token,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "GET",
          success(res) {
            const enterpriseData = res.data.data,nameArr = [];
            for(let i in enterpriseData){
              nameArr.push(enterpriseData[i].tag);
            }
            that.setData({
              enterpriseData:res.data.data,
              nameArrs:nameArr
            });

            // console.log(res.data.data,'返回数据');
          }
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
    // const that = this;
    // 3秒模拟数据加载
    setTimeout(function () {
      // 不加这个方法真机下拉会一直处于刷新状态，无法复位
      wx.stopPullDownRefresh()
    }, 2000);
    // that.setData({
    //   currentTab: 0 //当前页的一些初始数据，视业务需求而定
    // })
    // this.onLoad(); //重新加载onLoad()
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