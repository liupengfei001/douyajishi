<template>
<div id="myDetail">
  <mu-list>
    <mu-list-item title="我的头像">
      <mu-avatar :src="userDeta.headimgurl" slot="rightAvatar" />
    </mu-list-item>
    <div class="ak-black-bottomBorder"></div>
    <mu-list-item title="昵称">
      <span slot="right">{{userDeta.name}}</span>
    </mu-list-item>

    <div class="ak-black-bottomBorder"></div>
    <mu-list-item title="性别">
      <span slot="right">{{userDeta.sexName}}</span>
    </mu-list-item>

    <div class="ak-black-bottomBorder"></div>
    <mu-list-item title="电话">
      <span slot="right">{{userDeta.phone}}</span>
    </mu-list-item>

    <div class="ak-black-bottomBorder"></div>
  </mu-list>

  <router-link :to="{ name: 'changePhone'}">
    <div class="bottom-btn-box">
      <mu-raised-button label="修改电话" class="bottom-btn" primary/>
    </div>
  </router-link>
  <!-- <div class="backBtn" @click="$router.back(-1)"><i class="iconfont icon-fanhui3"></i></div> -->
  <Loading id="Loading" :TopBarFlag="TopBarFlag" :MaskFlag="MaskFlag" :LoadImgFlag="LoadImgFlag" :ErrMsg="ErrMsg"></Loading>
</div>
</template>
<script>
export default {
  name: "myDetail",
  data: function data() {
    return {
      TopBarFlag: false,
      MaskFlag: false,
      LoadImgFlag: false,
      ErrMsg: '',
      userDeta: {}, //用户详情的盒子
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
    this.getUserData();
  }
}
</script>
<style>
#myDetail .mu-item-right {
  width: auto;
  padding-right: 0.5rem;
}

.bottom-btn-box {
  padding: 3rem 1.75rem;
}

.bottom-btn {
  width: 100%;
  height: 2.8rem;
}
</style>
