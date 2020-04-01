var EARTH_RADIUS = 6378137.0, PI = Math.PI;
module.exports = {

  getRad: function (d) {
    return d * PI / 180.0;
  },

  // 计算两地距离单位km
  getFlatternDistance: function (lat1, lng1, lat2, lng2) {
    let t = this;
    var f = t.getRad((lat1 + lat2) / 2);
    var g = t.getRad((lat1 - lat2) / 2);
    var l = t.getRad((lng1 - lng2) / 2);
    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);
    var s, c, w, r, d, h1, h2;
    var a = EARTH_RADIUS;
    var fl = 1 / 298.257;
    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;
    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;
    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * a;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;
    return (Number.parseInt(d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg))) / 1000).toFixed(2);
  },

  json: function (t, n, o, i, a, c) {
    var r = getApp(),
      s = r.getCache("userinfo"),
      u = r.getCache("usermid"),
      f = r.getCache("authkey");
    n = n || {},
      n.comefrom = "wxapp",
      s && (n.openid = "sns_wa_" + s.openid, "cacheset" != t && r.getSet()),
      u && (n.mid = u.mid, n.merchid = u.merchid);

    var d = this;

    i && d.loading(),
      n && (n.authkey = f || "");
    var p = a ? this.getUrl(t) : this.getUrl(t, n),

      l = {
        url: p + "&timestamp=" + +new Date,
        method: a ? "POST" : "GET",
        header: {
          "Content-type": a ? "application/x-www-form-urlencoded" : "application/json",
          Cookie: "PHPSESSID=" + s.openid
        }
      };

    c || delete l.header.Cookie,
      a && (l.data = e.param(n)),
      o && (l.success = function (t) {
        i && d.hideLoading(),
          "request:ok" == t.errMsg && "function" == typeof o && (r.setCache("authkey", t.data.authkey || ""), o(t.data))
      }),
      wx.request(l)
  },

  post: function (t, e, n, o, i) {
    this.json(t, e, n, o, true, i)
  },


  get: function (t, e, n, o, i) {
    this.json(t, e, n, o, false, i)
  },

  alert: function (e, n) {
    "object" === (void 0 === e ? "undefined" : t(e)) && (e = JSON.stringify(e)),
      wx.showModal({
        title: "提示",
        content: e,
        showCancel: false,
        success: function (t) {
          t.confirm && "function" == typeof confirm && n()
        }
      })
  },

  loading: function (t) {
    void 0 !== t && "" != t || (t = "加载中"),
      wx.showToast({
        title: t,
        icon: "loading",
        duration: 5e6
      })
  },


  hideLoading: function () {
    wx.hideToast()
  },

  confirm: function (e, n, o) {
    "object" === (void 0 === e ? "undefined" : t(e)) && (e = JSON.stringify(e)),
      wx.showModal({
        title: "提示",
        content: e,
        showCancel: true,
        success: function (t) {
          t.confirm ? "function" == typeof n && n() : "function" == typeof o && o()
        }
      })
  },
}