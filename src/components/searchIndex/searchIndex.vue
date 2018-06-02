<template>
<div id="searchIndex">

  <div class="" style="padding:0 0.9rem;">
    <mu-auto-complete hintText="请输入活动名或发布者" labelFloat label="搜索活动" fullWidth @input="doSearch()" v-model="searchWord" :dataSource="dataSource" />
  </div>
  <div class="" v-for="data in Data" :key="data.key">

    <activitiesRow :Data="data"></activitiesRow>
  </div>

    <!--
          ↓↓↓↓↓↓ 没有数据时的显示状态 ↓↓↓↓↓↓
              在该Tab所属的内容为空时显示
    -->
    <div class="no-detail-box" v-show="Data.length == 0">
      <div class="no-detail-imgBox">
      </div>
      <p>暂无数据呢...</p>
    </div>
    <!-- ↑↑↑↑↑ 没有数据时的显示状态 ↑↑↑↑↑  -->

  <!-- <div class="backBtn" @click="$router.back(-1)"><i class="iconfont icon-fanhui3"></i></div> -->
  <Loading id="Loading" :TopBarFlag="TopBarFlag" :MaskFlag="MaskFlag" :LoadImgFlag="LoadImgFlag" :ErrMsg="ErrMsg" :MsgFlag="MsgFlag"></Loading>
</div>
</template>
<script>
import activitiesRow from './../commonComponents/activitiesRow.vue';
export default {
  name: "searchIndex",
  data: function data() {
    return {
      TopBarFlag: false,
      MaskFlag: false,
      LoadImgFlag: false,
      ErrMsg: '',
      MsgFlag: false,
      searchWord: '',
      dataSource: [],
      Data: [],
    }
  },
  components: {
    'activitiesRow': activitiesRow,
  },
  methods: {

    /*
     * 搜索活动
     * @function doSearch
     * @params {   }
     *
     */
    doSearch: function doSearch() {
      var _this = this;
      console.warn(this.searchWord);
      this.ajax(_this.port.doSearch, {
        search: _this.searchWord,
      }, function(res) {
        _this.Data = res;
        var tempArr = [];
        for (var i = 0; i < res.length; i++) {
          tempArr.push(res[i].activity_name)
          tempArr.push(res[i].merchant_name)
        }
        _this.dataSource = tempArr
        console.log(_this.dataSource);
      }, 'top')
    },


  }
}
</script>
<style>
</style>
