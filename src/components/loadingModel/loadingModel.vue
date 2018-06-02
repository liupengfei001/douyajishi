<template>
<div id="loadingModel">
  <!-- 遮罩层 -->
  <div class="ak-mask" v-show="MaskFlag"></div>

  <!-- 头部loading条 -->
  <div class="ak-topBar" v-show="TopBarFlag">
    <mu-linear-progress />
  </div>

  <!-- 转圈加载模块 -->
  <div class="ak-loading" v-show="LoadImgFlag">
    <!-- <mu-circular-progress :size="60" :strokeWidth="5" /> -->
    <img style="width:60%;" src="../../../static/image/beanSproutLodaing.gif" alt="">
    </br>
    <h4 class="ak-loading-msg">努力加载中...</h4>
  </div>
  <div class="ak-errMoudel" v-show="MsgFlag">
    {{ErrMsg}}
  </div>

</div>
</template>
<script>
export default {
  name: "loadingModel",
  props: ['TopBarFlag', 'MaskFlag', 'LoadImgFlag', 'ErrMsg', 'MsgFlag'],
  data: function data() {
    return {
      showErrMsgFlag: true,
    }
  },
  methods: {},
  mounted: function mounted() {
    //do something after mounting vue instance
    var _this = this;
  }
}
</script>
<style>
.ak-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(207, 207, 207, 0.1);
}

.ak-topBar {
  height: 4px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 110000;
}

.ak-loading {
  text-align: center;
  position: fixed;
  top: 40%;
  left: 35%;
  width: 30%;
  font-size: 14px;
  color: #666;
  font-weight: 600;
  z-index: 999;
}

.ak-loading-msg {
  background-color: rgba(27, 28, 28, 0.45);
  padding: 0.2rem 0.75rem;
  border-radius: 0.3rem;
  color: #fff;
}

.ak-errMoudel {
  position: fixed;
  width: 70%;
  bottom: 20%;
  left: 15%;
  background-color: rgba(16, 19, 12, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 20px;
  padding: 0.5rem 0;
}
</style>
