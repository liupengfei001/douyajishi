<template>
<div id="center">
  <div class="user-overview">
    <div id="centerUserBg" class="user-overview-bg ak-boxSad"></div>
    <div class="user-deta ak-flex-columnC">
      <div class="user-imgBox" :style="{backgroundImage: 'url(' + userDeta.headimgurl + ')'} "></div>
      <h3>{{userDeta.name}}</h3>
    </div>
  </div>
  <mu-list>

    <div class="ak-black-bottomBorder"></div>
    <mu-list-item title="我的资料" to="/myDetail">
      <!-- <mu-avatar src="../../static/image/logo.png" slot="leftAvatar" /> -->
      <i class="iconfont icon-wodeziliao1 center-icon" slot="leftAvatar" style="margin: auto;font-size:24px"></i>
      <mu-icon value="chevron_right" slot="right" />
    </mu-list-item>

    <div class="ak-black-bottomBorder"></div>
    <mu-list-item title="我的收藏" to="/myCollect">
      <i class="iconfont icon-shoucang3 center-icon" slot="leftAvatar" style="margin: auto;font-size:24px"></i>
      <mu-icon value="chevron_right" slot="right" />
    </mu-list-item>

    <div class="ak-black-bottomBorder"></div>
    <mu-list-item title="我的活动" to="/myActivities">
      <i class="iconfont icon-wodehuodong center-icon" slot="leftAvatar" style="margin: auto;font-size:24px"></i>
      <mu-icon value="chevron_right" slot="right" />
    </mu-list-item>

    <div class="ak-black-bottomBorder"></div>
    <mu-list-item title="我的退款" to="/myRefund">
    <!-- <mu-list-item title="我的退款" to="/checkIn"> -->
      <i class="iconfont icon-wodetuikuan center-icon" slot="leftAvatar" style="margin: auto;font-size:26px"></i>
      <mu-icon value="chevron_right" slot="right" />
    </mu-list-item>
    <div class="ak-black-bottomBorder"></div>

  </mu-list>
</div>
</template>
<script>
export default {
  name: "center",
  data: function data() {
    return {
        userDeta: {},
    }
  },
  methods: {

    /*
     * 获取我的详情
     * @function getUserData
     * @params {}
     *
     */
    getUserData(theType) {
      var _this = this;
      this.ajax(_this.port.userDeta, {}, function(res) {
        _this.userDeta = res;
        if (res.sex == 1) {
          _this.userDeta.sexName = '大帅哥'
        } else if (res.sex == 2) {
          _this.userDeta.sexName = '萌妹子'
        } else {
          _this.userDeta.sexName = '未能成功获取'
        }
      })
    },
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    this.getUserData()
  }
}
</script>
<style scoped>
.center-icon {
  margin: auto;
  color: #57ae57;
}

#centerUserBg{
    background-image: url(../../../static/image/beanSproutBG5.jpg) !important;
}
</style>
