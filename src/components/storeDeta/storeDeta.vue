<template>
<div id="storeDeta">

  <div class="user-overview ak-boxSad">
    <div class="user-overview-bg ak-boxSad" :style="{backgroundImage: 'url(' + storeData.logo + ')'}"></div>
    <div class="user-deta ak-flex-columnC">
      <div class="user-imgBox" :style="{backgroundImage: 'url(' + storeData.logo + ')'}"></div>
      <h3 class="store-name-box">{{storeData.name}}</h3>
    </div>
    <div class="shop-header-bottom ak-flexB">

      <mu-flat-button label="收藏本店" class="shop-header-btn" primary v-show="!collect_merchant" @click="collectStore">
        <i class="iconfont icon-taoxin "></i>
      </mu-flat-button>
      <mu-flat-button label="已收藏" class="shop-header-btn" primary v-show="collect_merchant" @click="collectStore">
        <i class="iconfont icon-taoxin1 " style="color: #ff4081"></i>
      </mu-flat-button>
      <div class="ak-white-leftBorder " style="height:2.5rem; ">

      </div>
      <mu-flat-button label="分享本店 " class="shop-header-btn " @click="shareMaskFlag = true" primary>
        <i class="iconfont icon-fenxiang"></i>
      </mu-flat-button>
    </div>
  </div>

  <div class="activities-bigBox">



    <mu-tabs :value="activeTab" @change="handleTabChange" style="height:2.3rem;">
      <mu-tab value="tab1" title="正在进行" />
      <mu-tab value="tab2" title="历史活动" />
    </mu-tabs>
    <div v-if="activeTab === 'tab1'">
      <div class="" v-for="data in goingData" :key="data.key">
        <activitiesRow :Data="data"></activitiesRow>
      </div>
    </div>
    <div v-if="activeTab === 'tab2'">
      <div class="" v-for="data in hisData" :key="data.key">
        <activitiesRow :Data="data"></activitiesRow>
      </div>
    </div>



  </div>

  <!--
          ↓↓↓↓↓↓ 没有数据时的显示状态 ↓↓↓↓↓↓
              在该Tab所属的内容为空时显示
    -->
  <div class="no-detail-box" v-show="activeTab === 'tab1' && goingData.length == 0 || activeTab === 'tab2' && hisData.length == 0">
    <div class="no-detail-imgBox">
    </div>
    <p>暂无数据呢...</p>
  </div>
  <!-- ↑↑↑↑↑ 没有数据时的显示状态 ↑↑↑↑↑  -->

  <div class="" v-show="activeTab === 'tab1' && goingData.length != 0 || activeTab === 'tab2' && hisData.length != 0">
    <div class="bottom-load-more-Box" v-show="loadStatus == 1" @click="loadMore">
      点击加载跟多
      <img style="width:3rem;" src="../../../static/image/beanSproutFly.gif" alt="">
    </div>
    <div class="bottom-load-more-Box" v-show="loadStatus == 2">
      奋力加载中
      <img style="width:3rem;" src="../../../static/image/beanSproutLodaing.gif" alt="">
    </div>
    <div class="bottom-load-more-Box" v-show="loadStatus == 3">
      我是有底线的！
      <img style="width:3rem;" src="../../../static/image/beanSproutHuLa.gif" alt="">
    </div>
  </div>


  <router-link :to="{ name: 'active'}">
    <div class="backBtn ak-flexC" @click="goHome()">
      <mu-icon value="home" />
    </div>
  </router-link>

  <!-- <div class="backBtn" @click="$router.back(-1)"><i class="iconfont icon-fanhui3"></i></div> -->
  <Loading id="Loading" :TopBarFlag="TopBarFlag" :MaskFlag="MaskFlag" :LoadImgFlag="LoadImgFlag" :ErrMsg="ErrMsg" :MsgFlag="MsgFlag"></Loading>
  <div class="shareMask" v-show="shareMaskFlag" @click="shareMaskFlag = false">
    <img src="../../assets/share.png" alt="">
  </div>
</div>
</template>
<script>
var timer
import activitiesRow from './../commonComponents/activitiesRow.vue';
export default {
  name: "myCollect",
  data: function data() {
    return {
      TopBarFlag: false,
      MaskFlag: false,
      LoadImgFlag: false,
      MsgFlag: false,
      ErrMsg: '',
      loadStatus: 1,
      pageData: {},
      activeTab: 'tab1',
      goingData: [],
      hisData: [],
      storeData: {},
      collect_merchant: false,
      shareMaskFlag: false
    }
  },
  components: {
    'activitiesRow': activitiesRow,
  },
  methods: {
      goHome: function goHome(){
          let _this = this;
        sessionStorage.setItem('navName' , 'active')
      },
    /*
     * 初始化微信配置
     * @function initWX
     * @params { }
     *
     */
    initWX: function initWX() {
      let _this = this;

      _this.getInitData(1)
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
      let nowUrl = 'http://www.douyajishi.com/?angkeTAG=2';
      let storeId = sessionStorage.getItem('storeId');
      let shareUrl = nowUrl + '&shareId=' + storeId
      //   alert(shareUrl);
      wx.onMenuShareAppMessage({
        title: _this.storeData.name, // 分享标题
        desc: _this.storeData.name, // 分享描述
        link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: _this.storeData.logo, // 分享图标
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
        title: _this.storeData.name, // 分享标题
        link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: _this.storeData.logo, // 分享图标
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
    /*
     * 点击加载跟多
     * @function loadMore
     * @params {   }
     *
     */
    loadMore: function loadMore() {
      let _this = this;

      let cloumnName;
      this.loadStatus = 2
      if (this.activeTab == 'tab1') {
        cloumnName = 1;
      } else {
        cloumnName = 2;
      }
      this.ajax(_this.port.storeAct, {
        type: cloumnName,
        merchant_id: sessionStorage.getItem('storeId'),
        page: parseInt(_this.pageData.nowPage) + 1
      }, function(res) {
        _this.pageData = res.pageInfo
        if (res.pageInfo.totalPage > res.pageInfo.nowPage) {
          _this.loadStatus = 1
        } else {
          _this.loadStatus = 3
        }

        if (cloumnName == 1) {
          for (var i = 0; i < res.data.length; i++) {
            _this.goingData.push(res.data[i])
          }
        } else {
          for (var i = 0; i < res.data.length; i++) {
            _this.hisData.push(res.data[i])
          }
        }
      }, 'top')

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
        merchant_id: sessionStorage.getItem('storeId')
      }, function(res, msg) {
        _this.collect_merchant = res;
        _this.ErrMsg = msg;
        _this.MsgFlag = true;
        window.clearTimeout(timer)
        timer = setTimeout(() => {
          _this.MsgFlag = false
        }, 1200)
      }, 'top')
    },
    handleTabChange(val) {
      this.activeTab = val
      if (val == 'tab1') {
        this.getInitData(1)
      } else {
        this.getInitData(2)
      }
    },
    /*
     * 拿到该商家的活动
     * @function getInitData
     * @params {theType}
     *
     */
    getInitData(theType) {
      var _this = this;
      this.ajax(_this.port.storeAct, {
        type: theType,
        merchant_id: sessionStorage.getItem('storeId')
      }, function(res) {
        _this.loadStatus = 1
        _this.pageData = res.pageInfo;

        if (res.pageInfo.totalPage > res.pageInfo.nowPage) {
          _this.loadStatus = 1
        } else {
          _this.loadStatus = 3
        }

        if (theType == 1) {
          _this.goingData = res.data
        } else {
          _this.hisData = res.data
        }
      })
    },
    getStoreData() {

      let _this = this;
      this.ajax(_this.port.storeDeta, {
        merchant_id: sessionStorage.getItem('storeId')
      }, function(res) {
        _this.storeData = res
        _this.collect_merchant = res.collect_merchant;
        this.initWX()
      })

      let tempType = 1
      if (this.$route.params.sType) {
        if (this.$route.params.sType == 'going') {
          tempType = 1
        } else if (this.$route.params.sType == 'history') {
          tempType = 2
        }
      }
      //   alert(tempType)
      this.getInitData(tempType)
    }
  },
  mounted: function mounted() {
    let _this = this;
    var storeId = this.$route.params.storeId;
    sessionStorage.setItem('storeId', storeId)
    //do something after mounting vue instance
    this.getStoreData()
    console.warn(this.$route.params.sType);
    if (this.$route.params.sType) {
      if (this.$route.params.sType == 'going') {
        _this.activeTab = 'tab1'
      } else if (this.$route.params.sType == 'history') {
        _this.activeTab = 'tab2'
      }
    }

  }
}
</script>
<style scoped>
.user-overview {
  height: 12rem;
}

.store-name-box {
  background-color: rgba(27, 28, 28, 0.45);
  padding: 0.2rem 0.75rem;
  border-radius: 0.3rem;
}

.shop-header-bottom {
  background-color: rgba(27, 28, 28, 0.6);
  height: 2.5rem;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}

.shop-header-btn {
  color: #fff;
  flex: 1;
}








/*.shop-header-btn::after{
    width: 2px;
    height: 100%;
    background-color: #fff;
}*/

.shop-header-btn i {
  font-size: 22px;
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
</style>
