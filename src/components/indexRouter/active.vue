<template>
<div id="active">
<router-link :to="{ name: 'searchIndex'}">
  <div class="search-box ak-flexC">
    <!-- <mu-text-field hintText="请输入活动名或发布者" fullWidth labelFloat/> -->
      <!-- <mu-auto-complete hintText="请输入活动名或发布者" labelFloat label="搜索活动" fullWidth /> -->
      <div class="the-input ak-flexC">
          <img src="./../../../static/image/search.png" alt="">
          <p>请输入活动名或发布者</p>
      </div>
  </div>
</router-link>
  <div class="banner-box">

    <div class="swiper-container ak-boxSad">
      <div class="swiper-wrapper">
        <div v-for="data in bannerData" :key="data.key" class="swiper-slide">
          <img :src="data.img" alt="">
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
  <div class="active-box">
    <mu-tabs :value="activeTab" @change="handleTabChange" style="height:2.7rem;">
      <mu-tab value="created_at" title="最新活动" />
      <mu-tab value="allpage_view" title="热门推荐" />
    </mu-tabs>
    <div v-show="activeTab === 'created_at'">
      <div class="" v-for="data in newData" :key="data.key">
        <activitiesRow :Data="data"></activitiesRow>
      </div>
    </div>

    <div v-show="activeTab === 'allpage_view'">
      <div class="" v-for="data in hotData" :key="data.key">
        <activitiesRow :Data="data"></activitiesRow>
      </div>
    </div>
  </div>

  <!--
        ↓↓↓↓↓↓ 没有数据时的显示状态 ↓↓↓↓↓↓
            在该Tab所属的内容为空时显示
  -->
  <div class="no-detail-box" v-show="activeTab === 'created_at' && newData.length == 0 || activeTab === 'allpage_view' && hotData.length == 0">
    <div class="no-detail-imgBox">
    </div>
    <p>暂无数据呢...</p>
  </div>
  <!-- ↑↑↑↑↑ 没有数据时的显示状态 ↑↑↑↑↑  -->

  <div class="" v-show="activeTab === 'created_at' && newData.length != 0 || activeTab === 'allpage_view' && hotData.length != 0">
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

  <div class="ak-nullDiv">

  </div>

  <Loading id="Loading" :TopBarFlag="TopBarFlag" :MaskFlag="MaskFlag" :LoadImgFlag="LoadImgFlag" :ErrMsg="ErrMsg" :MsgFlag="MsgFlag"></Loading>

</div>
</template>
<script>
import activitiesRow from './../commonComponents/activitiesRow.vue';
export default {
  name: "active",
  data: function data() {
    return {
      TopBarFlag: false,
      MaskFlag: false,
      LoadImgFlag: false,
      ErrMsg: '',
      MsgFlag: false,
      newData: [], //最 新 活动数据盒子
      hotData: [], //最 热 活动数据盒子
      bannerData: [], //banner数据盒子
      activeTab: 'created_at',
      loadStatus: 1,
      pageData: {},
    }
  },
  components: {
    'activitiesRow': activitiesRow,
  },
  methods: {
    /*
     * 点击加载跟多
     * @function loadMore
     * @params {   }
     *
     */
    loadMore: function loadMore() {
      let _this = this;
      let cloumnName = this.activeTab
      this.loadStatus = 2

      this.ajax(_this.port.active, {
        type: cloumnName,
        page: parseInt(_this.pageData.nowPage) + 1
      }, function(res) {
        _this.pageData = res.pageInfo;
        if (res.pageInfo.totalPage > res.pageInfo.nowPage) {
          _this.loadStatus = 1
        } else {
          _this.loadStatus = 3
        }

        if (cloumnName == 'created_at') {
          for (var i = 0; i < res.data.length; i++) {
            _this.newData.push(res.data[i])
          }
        } else {
          for (var i = 0; i < res.data.length; i++) {
            _this.hotData.push(res.data[i])
          }
        }
      }, 'top')
    },
    /*
     * 拿到banner的数据
     * @function getBanner
     * @params {   }
     *
     */
    getBanner: function getBanner() {
      var _this = this;
      this.ajax(_this.port.banner, {}, function(res) {
        _this.bannerData = res.imgs
        // console.warn(res.imgs);
        setTimeout(() => {
          var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            loop: true,
            autoplay: 3000
          });
        }, 800)
      })
    },
    /*
     * tab切换
     * @function handleTabChange
     * @params { val }  val=> tab标签上的value
     *
     */
    handleTabChange(val) {
      this.activeTab = val;
      sessionStorage.setItem('indexCloumn', val)
      this.loadStatus = 1
      this.changeCloumn(val)
    },
    /*
     * 拿到初始的栏目数据
     * @function getInitData
     * @params { }
     *
     */
    getInitData() {
      var _this = this;
      var typeNow = 'created_at';
      if (sessionStorage.getItem('indexCloumn')) {
        typeNow = sessionStorage.getItem('indexCloumn')
      }
      this.ajax(_this.port.active, {
        type: typeNow
      }, function(res) {
        _this.newData = res.data
        _this.pageData = res.pageInfo;

        if (_this.pageData.totalPage > _this.pageData.nowPage) {
          _this.loadStatus = 1
        } else {
          _this.loadStatus = 3
        }
      })
    },
    /*
     * 切换 最新活动或热门推荐
     * @function changeCloumn
     * @params {cloumnName}  cloumnName=> 栏目的名称（请求接口传的type）
     *
     */
    changeCloumn(cloumnName) {
      var _this = this;
      this.ajax(_this.port.active, {
        type: cloumnName
      }, function(res) {
        _this.pageData = res.pageInfo;

        if (_this.pageData.totalPage > _this.pageData.nowPage) {
          _this.loadStatus = 1
        } else {
          _this.loadStatus = 3
        }
        if (cloumnName == 'created_at') {
          _this.newData = res.data
        } else {
          _this.hotData = res.data;
        }
      })
    },
    initData: function initData() {
      var _this = this;
      this.getInitData();
      this.getBanner()
    },
    onScroll: function(e, position) {
      this.position = position;
    }
  },
  mounted: function mounted() {
    let _this = this;
    //do something after mounting vue instance
    this.initData()

    if (sessionStorage.getItem('indexCloumn')) {
        _this.activeTab = sessionStorage.getItem('indexCloumn');
        _this.changeCloumn(sessionStorage.getItem('indexCloumn'))
    }

  }
}
</script>
<style scoped>
/*    首页-活动-搜索模块    */

.search-box {
  padding: 0 0.75rem;
  background-color: rgba(255, 255, 255, 0.5);
  position: fixed;
  /*top: -10px;*/
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  height: 2.8rem;
}
.the-input{
    width: 100%;
    height: 90%;
    background-color: rgba(238, 238, 238, 0.9);
    border-radius: 50px;
    padding: 0 1rem;

}
.the-input img{
    width: 1.5rem;
    margin-right: 0.5rem;
}
.the-input p{
    flex: 1;
    color: #cccccc;
}















/*    首页-活动-banner    */

.banner-box {
  margin-top: 2.9rem;
  margin-bottom: 0.8rem;
  z-index: -10;
}

.swiper-wrapper {
  height: 46vw;
}

.swiper-slide {
  width: 100%;
  height: 100%;
}

.swiper-slide img {
  height: 100%;
  width: 100%;
}
</style>
