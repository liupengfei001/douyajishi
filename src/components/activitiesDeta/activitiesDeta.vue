<template>
<div id="activitiesDeta">
  <mu-card style="margin-bottom:0.75rem;">
    <mu-card-media>
      <mu-grid-list>
        <mu-grid-tile :rows="1.4" :cols="2" titleBarClass="activities-banner-title">
          <!-- <img :src="tile.image"/> -->
          <img :src="Data.activity_img" />
          <!-- <mu-icon-button icon="star_border" slot="action" /> -->
        </mu-grid-tile>

      </mu-grid-list>

    </mu-card-media>
    <mu-card-text>
      <div class="active-detail-box">
        <h4 class="ak-txtDOver">{{Data.activity_name}}</h4>

        <div class="ak-flexB act-price-box">
          <span>共 {{Data.on_line}} 份</span>
          <h3 style="font-size: 18px; color: #1a911b; margin-top:-8px;"> {{Data.price}}</h3>
        </div>
      </div>
    </mu-card-text>
  </mu-card>
  <div class="act-detail-bigBox ak-boxSad">

    <div class="ak-flexB act-store-box">
      <router-link :to="{ name: 'storeDeta', params: { storeId: Data.merchant_id, sType: 'going'}}" style="felx:1" class="ak-flexB">
        <div class="act-store-ImgBox" :style="{backgroundImage: 'url(' + Data.logo + ')'} "></div>
        <div class="act-store-detaBox">
          <h2 class="ak-txtDOver">{{Data.merchant_name}}</h2>
          <p>
            {{Data.merchant_label}}
          </p>
        </div>
      </router-link>
      <div class="act-store-btnBox ak-flexC">
        <router-link :to="{ name: 'storeDeta', params: { storeId: Data.merchant_id, sType: 'going'}}" style="felx:1">
          <mu-icon-button class="ak-flex-columnC act-store-btn" style="color:#1aac1b">
            <i class="iconfont icon-liulan"></i>
            <span>查看</span>
          </mu-icon-button>
        </router-link>
        <div class="ak-black-leftBorder" style="height:50px"></div>
        <mu-icon-button class="ak-flex-columnC act-store-btn" style="color:#777" v-if="!collect_merchant" @click="collectStore(Data.merchant_id)">
          <i class="iconfont icon-taoxin"></i>
          <span>收藏</span>
        </mu-icon-button>
        <mu-icon-button class="ak-flex-columnC act-store-btn" style="color: #ff4081; width:4rem;" v-if="collect_merchant" @click="collectStore(Data.merchant_id)">
          <i class="iconfont icon-taoxin1"></i>
          <span>已收藏</span>
        </mu-icon-button>
      </div>
    </div>


    <p class="ak-black-bottomBorder"></p>
    <div class="act-deta-box">
      <div class="act-store-row">
        <i class="iconfont icon-wodehuodong" style="color: #1aad17"></i> 活动日期：
        <br>&nbsp;&nbsp;&nbsp;{{Data.start_time}} ~ {{Data.end_time}}
      </div>
      <div class="act-store-row">
        <i class="iconfont icon-xianshiqianggou" style="color: #00bede; font-size:18px;"></i> 报名截止：{{Data.apply_end_time}}
      </div>
      <div class="act-store-row">
        <i class="iconfont icon-dizhi" style="color: #f08000"></i> 活动地址：{{Data.activity_address}}
      </div>
      <div class="act-store-row" v-if=" Data.purchase_limitation">
        <i class="iconfont icon-xiangou" style="color: #f00055"></i> 每人限购：{{Data.purchase_limitation}}
      </div>
    </div>
  </div>
  <div class="ak-boxSad" style="margin-top:1rem;">
    <div class="ak-flexC" style="height:2rem;font-size:16px;">
      <span style="flex:1"></span>
      <p class="ak-black-bottomBorder" style="width:20%"></p>
      <p>&nbsp;·&nbsp; 活动详情 &nbsp;·&nbsp;</p>
      <p class="ak-black-bottomBorder" style="width:20%"></p>
      <span style="flex:1"></span>
    </div>
    <div v-html="Data.content" id="actContent">

    </div>
  </div>
  <div class="ak-nullDiv">

  </div>
  <div class="ak-nullDiv">

  </div>
  <div class="act-bottom-btnBox ak-flex">
    <div class="ak-flex-columnC  bottom-collect-btn" style="background-color:#fff; padding: 0 0.5rem;" v-if="!collect_activity" @click="collectAct(Data.id)">
      <i class="iconfont icon-taoxin" style="font-size:18px;"></i>
      <span style="font-size:12px;">收藏活动</span>
    </div>
    <div class="ak-flex-columnC bottom-collect-btn" style="background-color:#fff; color: #ff4081; padding: 0 0.5rem;" v-if="collect_activity" @click="collectAct(Data.id)">
      <i class="iconfont icon-taoxin1" style="font-size:18px;"></i>
      <span style="font-size:12px;">已收藏</span>
    </div>

    <mu-raised-button label="邀请好友" class="act-bottom-btn" @click="shareMaskFlag = true" />
    <!-- <router-link :to="{ name: 'placeOrder', params: { actId: Data.id}}"> -->
    <mu-raised-button label="立刻报名" class="act-bottom-btn" :to="{ name: 'placeOrder', params: { actId: Data.id}}" primary/>
    <!-- </router-link> -->
  </div>

  <router-link :to="{ name: 'active'}">
    <div class="backBtn ak-flexC" @click="goHome()">
      <mu-icon value="home" />
    </div>
  </router-link>
  <Loading id="Loading" :TopBarFlag="TopBarFlag" :MaskFlag="MaskFlag" :LoadImgFlag="LoadImgFlag" :ErrMsg="ErrMsg" :MsgFlag="MsgFlag"></Loading>
  <div class="shareMask" v-show="shareMaskFlag" @click="shareMaskFlag = false">
    <img src="../../assets/share.png" alt="">
  </div>
</div>
</template>
<script>
var timer;
export default {
  name: "activitiesDeta",
  data: function data() {
    return {
      TopBarFlag: false,
      MaskFlag: false,
      LoadImgFlag: false,
      ErrMsg: '',
      MsgFlag: false,
      Data: {},
      collect_activity: false,
      collect_merchant: false,
      shareMaskFlag: false
    }
  },
  methods: {
    goHome: function goHome() {
      let _this = this;
      sessionStorage.setItem('navName', 'active')
    },
    /*
     * 初始化微信配置
     * @function initWX
     * @params { }
     *
     */
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
          jsApiList: config.jsApiList
        })
        wx.error(function(res) {
          console.log(res);
        });
      })
      wx.ready(function() {
        _this.initInvite()
      });
    },
    /*
     * 初始化微信分享
     * @function initInvite
     * @params { }
     *
     */
    initInvite: function initInvite() {
      let _this = this;
      let nowUrl = 'http://www.douyajishi.com/?angkeTAG=1';
      let actId = this.$route.params.activitiesId;
      let shareUrl = nowUrl + '&shareId=' + actId
      //   alert(shareUrl);
      wx.onMenuShareAppMessage({
        title: _this.Data.activity_name, // 分享标题
        desc: _this.Data.activity_address, // 分享描述
        link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: _this.Data.logo, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function(res) {
          // 用户确认分享后执行的回调函数
          //   _this.ErrMsg = JSON.stringify(res) + 'success'
          console.warn(JSON.stringify(res) + 'success');
          _this.ErrMsg = '恭喜您分享成功~';
          _this.MsgFlag = true;
          window.clearTimeout(timer)
          timer = setTimeout(() => {
            _this.MsgFlag = false
          }, 1200)
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        },
        error: function(err) {
          //   _this.ErrMsg = JSON.stringify(err) + 'err'
          console.warn(JSON.stringify(err) + 'err');
          //   _this.ErrMsg = '恭喜您分享成功~';
          _this.MsgFlag = true;
          window.clearTimeout(timer)
          timer = setTimeout(() => {
            _this.MsgFlag = false
          }, 1200)

        }
      });

      wx.onMenuShareTimeline({
        title: _this.Data.activity_name, // 分享标题
        link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: _this.Data.logo, // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
          //   _this.ErrMsg = JSON.stringify(res) + 'success'
          console.warn(JSON.stringify(res) + 'success');
          _this.ErrMsg = '恭喜您分享成功~';
          _this.MsgFlag = true;
          window.clearTimeout(timer)
          timer = setTimeout(() => {
            _this.MsgFlag = false
          }, 1200)
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      });
      //   alert('initInvite over')
    },
    closeBottomSheet() {
      this.bottomSheet = false
    },
    /*
     * 拿到初始的栏目数据
     * @function getInitData
     * @params { }
     *
     */
    getDeta() {
      var _this = this;
      //   console.warn(sessionStorage.getItem('activitiesId'));
      this.ajax(_this.port.activitiesDeta, {
        activity_id: sessionStorage.getItem('activitiesId')
      }, function(res) {
        _this.Data = res;
        _this.collect_activity = res.collect_activity;
        _this.collect_merchant = res.collect_merchant;
        _this.initWX()
      })
    },

    /*
     * 收藏该商家
     * @function collectStore
     * @params { }
     *
     */
    collectStore: function collectStore(storeId) {
      let _this = this
      this.ajax(_this.port.coolectStore, {
        merchant_id: storeId
      }, function(res, msg) {
        _this.collect_merchant = res;
        _this.ErrMsg = msg;
        _this.MsgFlag = true;
        window.clearTimeout(timer)
        timer = setTimeout(() => {
          _this.MsgFlag = false
        }, 1200)
      })
    },

    /*
     * 收藏该活动
     * @function collectAct
     * @params { }
     *
     */
    collectAct: function collectAct(actId) {
      let _this = this
      this.ajax(_this.port.collectAct, {
        activity_id: actId
      }, function(res, msg) {
        _this.collect_activity = res;
        _this.ErrMsg = msg;
        _this.MsgFlag = true;
        window.clearTimeout(timer)
        timer = setTimeout(() => {
          _this.MsgFlag = false
        }, 1200)
      })
    },
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    //
    var activitiesId = this.$route.params.activitiesId;
    if (activitiesId) {
      sessionStorage.setItem('activitiesId', activitiesId)
    }
    this.getDeta()

  }
}
</script>
<style>
.activities-banner-title {
  display: none
}

.act-price-box {
  margin-top: 0.5rem;
}

.act-price-box span {
  color: #777;
  font-size: 14px;
}

.act-price-box h3 {
  font-size: 24px;
}

.act-detail-bigBox {
  margin-top: 1rem;
}

.act-store-box {
  padding: 1rem 0 1rem 0.75rem;
}

.act-store-ImgBox {
  width: 6rem !important;
  height: 4rem;
  background-size: cover !important;
  margin-right: 0.75rem;

}
.act-store-detaBox{
    max-width: 60%;
}
.act-store-detaBox h2 {
  font-size: 16px;
  color: #f18101;
  font-weight: 400;
  line-height: 18px;
}

.act-store-detaBox p {
  color: #777;
  margin-top: 0.5rem;
}

.act-store-btn {
  width: 4rem;
}

.act-store-btn span {
  font-size: 12px;
}

.act-store-btn i {
  font-size: 24px;
}

.act-deta-box {
  padding: 0.75rem 0;
}

.act-store-row {
  padding: 0.4rem 1rem;
}

.act-store-row i {
  font-size: 20px;
  margin-right: 0.5rem;
}

#actContent {
  margin-top: 0.5rem;
  padding: 1rem 0.75rem;
}

.act-bottom-btnBox {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: solid 1px #eee
}

.act-bottom-btn {
  flex: 1;
  height: 2.8rem;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.bottom-collect-btn {
  width: 4.1rem;
  border-right: solid 1px #eee;
}

.shareMask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
}

.shareMask img {
  width: 100%;
  height: 100%;
}

#actContent {
  width: 100%;
}

#actContent img {
  width: 100% !important;
}

* {
  -webkit-overflow-scrolling: touch
}
</style>
