<template>
<div id="app">
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  },
  methods: {
    initWX: function initWX() {
      let _this = this;
      this.ajax(_this.port.wechatInit, {}, function(res, msg) {
        let config = res.config
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: config.appId, // 必填，公众号的唯一标识
          timestamp: config.timestamp, // 必填，生成签名的时间戳
          nonceStr: config.nonceStr, // 必填，生成签名的随机串
          signature: config.signature, // 必填，签名，见附录1
          jsApiList: config.jsApiList,
          //   [
          //     "chooseWXPay",
          //     "menuItem:share:appMessage",
          //     "menuItem:share:timeline",
          //     "menuItem:share:qq",
          //     "menuItem:share:weiboApp",
          //     "menuItem:favorite"
          //   ]
        })
        wx.error(function(res) {
          console.log(res);
        });
      })
    }
  },
  mounted() {
    let _this = this;
    this.initWX()

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
    let nowUrl = window.location.href;
    let shareId = GetQueryString("shareId")
    // alert(nowUrl)
    // alert(shareId)

    if (nowUrl.indexOf('angkeTAG=1') != '-1') {
      sessionStorage.setItem('shareActIn', true)
      sessionStorage.setItem('shareActId', shareId)
      window.location.href = 'http://www.douyajishi.com/#/'
    }
    if (nowUrl.indexOf('angkeTAG=2') != '-1') {
      sessionStorage.setItem('shareStoreIn', true)
      sessionStorage.setItem('shareStoreId', shareId)
      window.location.href = 'http://www.douyajishi.com/#/'
    }
  }
}
</script>

<style>
#app {
  height: auto;
}
</style>
