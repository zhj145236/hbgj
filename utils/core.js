var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = require("jquery");

module.exports = {
    toQueryPair: function(t, e) {
        return void 0 === e ? t : t + "=" + encodeURIComponent(null === e ? "" : String(e));
    },
    getUrl: function(n) {
        //n = n.replace(/\//gi, ".");
        var a = getApp().getConfig().api + n;
        return a;
    },
  json: function (t, a, n, o, i) {
        var r = getApp();
        var d = this;
      
        var l = {
            url: this.getUrl(t),
            method: a ? "POST" : "GET",
            header: {
              "Content-type": "application/json"
            }
        };
        a && (l.data = n), o && (l.success = function(s) {
          if (i && d.hideLoading(), "request:ok" == s.errMsg && "function" == typeof o){
            o(s.data);
          }
        }), l.fail = function(t) {
          i && d.hideLoading(), d.alert(t.errMsg);
        }, wx.request(l);
        // console.log('request', l)
    },
    post: function (t,n,e,i) {
        this.json(t,!0,n,e,i);
    },
    get: function(t,n,e,i) {
        this.json(t,!1,n,e,i);
    },
    getDistanceByLnglat: function(t, e, n, o) {
        function i(t) {
            return t * Math.PI / 180;
        }
        var a = i(e), s = i(o), r = a - s, c = i(t) - i(n), u = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(r / 2), 2) + Math.cos(a) * Math.cos(s) * Math.pow(Math.sin(c / 2), 2)));
        return u *= 6378137, u = Math.round(1e4 * u) / 1e7;
    },
    alert: function(e, n) {
        "object" === (void 0 === e ? "undefined" : t(e)) && (e = JSON.stringify(e)), wx.showModal({
            title: "提示",
            content: e,
            showCancel: !1,
            success: function(t) {
                t.confirm && "function" == typeof confirm && n();
            }
        });
    },
    confirm: function(e, n, o) {
        "object" === (void 0 === e ? "undefined" : t(e)) && (e = JSON.stringify(e)), wx.showModal({
            title: "提示",
            content: e,
            showCancel: !0,
            success: function(t) {
                t.confirm ? "function" == typeof n && n() : "function" == typeof o && o();
            }
        });
    },
    loading: function(t) {
        void 0 !== t && "" != t || (t = "加载中"), wx.showToast({
            title: t,
            icon: "loading",
            duration: 5e6
        });
    },
    hideLoading: function() {
        wx.hideToast();
    },
    toast: function(t, e) {
        e || (e = "success"), wx.showToast({
            title: t,
            icon: e,
            duration: 1e3
        });
    },
    success: function(t) {
        wx.showToast({
            title: t,
            icon: "success",
            duration: 1e3
        });
    },
    upload: function(t) {
        var e = this;
        wx.chooseImage({
            success: function(n) {
                e.loading("正在上传...");
                var o = e.getUrl("util/uploader/upload", {
                    file: "file"
                }), i = n.tempFilePaths;
                wx.uploadFile({
                    url: o,
                    filePath: i[0],
                    name: "file",
                    success: function(n) {
                        e.hideLoading();
                        var o = JSON.parse(n.data);
                        if (0 != o.error) e.alert("上传失败"); else if ("function" == typeof t) {
                            var i = o.files[0];
                            t(i);
                        }
                    }
                });
            }
        });
    },
    pdata: function(t) {
        return t.currentTarget.dataset;
    },
    data: function(t) {
        return t.target.dataset;
    },
    phone: function(t) {
        var e = this.pdata(t).phone;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    pay: function(e, n, o) {
        return "object" == (void 0 === e ? "undefined" : t(e)) && ("function" == typeof n && (e.success = n, 
        "function" == typeof o && (e.fail = o), void wx.requestPayment(e)));
    },
    cartcount: function(t) {
        this.get("member/cart/count", {}, function(e) {
            t.setData({
                cartcount: e.cartcount
            });
        });
    },
    onShareAppMessage: function(t, e) {
        var n = getApp(), o = n.getCache("sysset"), i = o.share || {}, a = n.getCache("userinfo_id"), s = o.shopname || "", r = o.description || "";
        return i.title && (s = i.title), e && (s = e), i.desc && (r = i.desc), t = t || "/pages/index/index", 
        t = -1 != t.indexOf("?") ? t + "&" : t + "?", {
            title: s,
            desc: r,
            path: t + "mid=" + a
        };
    },
    str2Obj: function(t) {
        if ("string" != typeof t) return t;
        if (t.indexOf("&") < 0 && t.indexOf("=") < 0) return {};
        var n = t.split("&"), o = {};
        return e.each(n, function(t, e) {
            if (e.indexOf("=") > -1) {
                var n = e.split("=");
                o[n[0]] = n[1];
            }
        }), o;
    },
    /**
     * 倒计时封装
     * n 倒计时的时间
     * f 修改this指向
     * i 是否停止倒计时
     */
    timesFun:function(n,f,i){
        var num = n;
        f.setData({times:num});
        var t = setInterval(function(){
        if(num === 0){
            clearInterval(t);
        }else{
            num--;
            f.setData({
                times:num,
                [i]:true,
            });
        }
        },1000);
    },
    urlCon:function(){
        // 线上ip
        // return 'https://www.hlguanjia.com/';
        // return 'http://47.115.57.64/';
        
        // 测试ip
        // return "http://192.168.31.76:8080/";

        //开发人员IP
        return "http://192.168.31.174:8080/"
    },

    // 下载接口配置
    down:(u,n)=>{
        return u + "files" + n;
    },
    // 原图查看
    imgLook:(u,n)=>{
        return u + "files/prev" + n + '?isBigPic=1';
    },
    // 压缩图片预览，查看pdf
    comImg:(u,n)=>{
        return u + 'files/prev' + n;
    },
};