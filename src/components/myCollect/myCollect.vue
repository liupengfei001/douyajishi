<template>
<div id="myCollect">
  <mu-tabs :value="activeTab" @change="handleTabChange">
    <mu-tab value="act" title="收藏活动" />
    <mu-tab value="store" title="收藏店家" />
  </mu-tabs>
  <div v-if="activeTab === 'act'">
    <div class="" v-for="data in actData" :key="data.key">
      <!--  ↓↓↓↓↓↓ 商家列表 ↓↓↓↓↓↓  -->
      <activitiesRow :Data="data"></activitiesRow>
      <!-- ↑↑↑↑↑ 商家列表 ↑↑↑↑↑  -->
    </div>
  </div>
  <div v-if="activeTab === 'store'">
    <div class="shop-list-row ak-boxSad ak-flexB" v-for="data in storeData" :key="data.key">
      <div class="shop-img-box" :style="{backgroundImage: 'url(' + data.logo + ')'}"></div>
      <div class="shop-deta-box">
        <h2 class="ak-txtDOver">{{data.name}}</h2>
        <div class="shop-tag-box">
          <span class="active-chip">{{data.merchant_label}}</span>
        </div>
        <div class="shop-active-btnBox ak-flex">
          <router-link :to="{ name: 'storeDeta', params: { sType: 'going', storeId: data.id}}" class="shop-active-btnSunBox">

            <mu-raised-button label="进行中" class="shop-active-btn" primary/>
            <b class="show-btn-tag ak-txtOver">{{data.in_activity}}</b>

          </router-link>
          <router-link :to="{ name: 'storeDeta', params: { sType: 'history', storeId: data.id}}" class="shop-active-btnSunBox">
            <mu-raised-button label="历史活动" class="shop-active-btn" />
            <b class="show-btn-tag ak-txtOver">{{data.history_activity}}</b>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <!--
        ↓↓↓↓↓↓ 没有数据时的显示状态 ↓↓↓↓↓↓
            在该Tab所属的内容为空时显示
 -->
  <div class="no-detail-box" v-show="activeTab === 'act' && actData.length == 0 || activeTab === 'store' && storeData.length == 0">
    <div class="no-detail-imgBox">
    </div>
    <p>暂无数据呢...</p>
  </div>
  <!-- ↑↑↑↑↑ 没有数据时的显示状态 ↑↑↑↑↑  -->
  <!--
      ↓↓↓↓↓↓ 点击加载跟多模块，在该TAB没有数据时需要控制他不展示 ↓↓↓↓↓↓
            通过loadStatus来控制显示状态 最外面的盒子控制是否展示
-->
  <div class="" v-show="activeTab === 'act' && actData.length != 0 || activeTab === 'store' && storeData.length != 0">
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
  <!-- ↑↑↑↑↑ 点击加载更多模块 ↑↑↑↑↑  -->

  <!--  ↓↓↓↓↓↓ 返回按钮 ↓↓↓↓↓↓  -->
  <!-- <div class="backBtn" @click="$router.back(-1)">
    <i class="iconfont icon-fanhui3"></i>
  </div> -->
  <!-- ↑↑↑↑↑ 返回按钮 ↑↑↑↑↑  -->

  <Loading id="Loading" :TopBarFlag="TopBarFlag" :MaskFlag="MaskFlag" :LoadImgFlag="LoadImgFlag" :ErrMsg="ErrMsg" :MsgFlag="MsgFlag"></Loading>
</div>
</template>
<script>
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
      activeTab: 'act',
      actData: [],
      storeData: [],
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

      if (this.activeTab == 'act') {
        this.ajax(_this.port.troveAct, {
          page: parseInt(_this.pageData.nowPage) + 1
        }, function(res) {
          for (var i = 0; i < res.data.length; i++) {
            _this.actData.push(res.data[i])
          }
          _this.pageData = res.pageInfo
          if (res.pageInfo.totalPage > res.pageInfo.nowPage) {
            _this.loadStatus = 1
          } else {
            _this.loadStatus = 3
          }

        }, 'top')

      } else {
        this.ajax(_this.port.troveStore, {
          page: parseInt(_this.pageData.nowPage) + 1
        }, function(res) {
          for (var i = 0; i < res.data.length; i++) {
            _this.storeData.push(res.data[i])
          }
          _this.pageData = res.pageInfo
          if (res.pageInfo.totalPage > res.pageInfo.nowPage) {
            _this.loadStatus = 1
          } else {
            _this.loadStatus = 3
          }
        }, 'top')
      }
    },

    handleTabChange(val) {
      this.activeTab = val
      this.loadStatus = 1
      if (val == 'act') {
        this.getActData()
      } else {
        this.getStoreData()
      }
    },
    /*
     * 获取我收藏的活动
     * @function getActData
     * @params { }
     *
     */
    getActData() {
      let _this = this;
      this.ajax(_this.port.troveAct, {}, function(res) {
        _this.actData = res.data;
        _this.pageData = res.pageInfo;
      })
    },
    /*
     * 获取我收藏的商家
     * @function getStoreData
     * @params { }
     *
     */
    getStoreData() {
      let _this = this;
      this.ajax(_this.port.troveStore, {}, function(res) {
        _this.storeData = res.data;
        _this.pageData = res.pageInfo;
      })
    },
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    this.getActData()
  }
}
</script>
<style scoped>
/*      商家列表模块 */

.shop-list-row {
  padding: 1rem 0.75rem;
  margin-bottom: 0.3rem;
}

.shop-img-box {
  height: 6rem;
  width: 7.8rem;
  background-size: cover;
  overflow: hidden;
}

.shop-deta-box {
  flex: 1;
  text-align: left;
  padding-left: 0.75rem;
}

.shop-deta-box h2 {
  font-size: 16px;
  font-weight: 600
}

.shop-tag-box {
  margin-top: 0.4rem;
}

.shop-active-btnBox {
  margin-top: 0.4rem;
}

.shop-active-btnSunBox {
  position: relative;
  margin-right: 0.75rem;
}

.show-btn-tag {
  display: block;
  min-width: 1rem;
  max-width: 1.5rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  background-color: #ff4081;
  position: absolute;
  right: -5px;
  top: -5px;
}

.shop-active-btn {
  height: 1.6rem;
}
</style>
