<template>
<div id="myRefund"  v-cloak>

  <div v-if="refundData.length != 0" class="activities-row ak-boxSad" v-for="data in refundData" :key="data.key">
    <div class="ak-flexB state-row">
      <div class="">
        退款订单
      </div>
      <div class="state-box">
        状态：<span v-if="data.status == 2" style="color:#777">正在审核</span>
        <span v-if="data.status == 3" style="color:#009688">审核通过</span>
        <span v-if="data.status == 4" style="color:#ff4081">拒绝退款</span>
      </div>
    </div>
    <p class="ak-black-bottomBorder"></p>
    <router-link tag="div" class="ak-flexB activities-detail" :to="{ name: 'activitiesDeta', params: { activitiesId: data.activity_id}}">
      <div class="activities-imgBox" :style="{backgroundImage: 'url(' + data.activity_img + ')'} "></div>
      <div class="activities-describe">
        <h2 class="ak-txtDOver">{{data.activity_name}}</h2>
        <p>订单号：{{data.order_number}}</p>
        <p>申请时间：{{data.created_at}}</p>
        <div class="activities-price-box" style="color:#009688">
          ￥{{data.money}}
        </div>
      </div>
    </router-link>
    <div class="activities-btnBox  ak-flexC">
      <router-link :to="{ name: 'refundDeta', params: { orderId: data.id}}">
          <mu-raised-button label="查看详情" class="activities-btn" primary/>
      </router-link>
    </div>
  </div>
  <div class="no-detail-box" v-if="refundData.length == 0">
      <div class="no-detail-imgBox">
      </div>
      <p>暂无数据呢...</p>
  </div>

  <Loading id="Loading" :TopBarFlag="TopBarFlag" :MaskFlag="MaskFlag" :LoadImgFlag="LoadImgFlag" :ErrMsg="ErrMsg" :MsgFlag="MsgFlag"></Loading>
    <!-- <div class="backBtn" @click="$router.back(-1)">
      <i class="iconfont icon-fanhui3"></i>
    </div> -->
</div>
</template>
<script>
export default {
  name: "myRefund",
  data: function data() {
    return {
      TopBarFlag: false,
      MaskFlag: false,
      LoadImgFlag: false,
      MsgFlag: false,
      ErrMsg: '',
      refundData: [],
    }
  },
  methods: {

    /*
     * 拿到初始的栏目数据
     * @function getInitData
     * @params { }
     *
     */
    getInitData() {
      let _this = this;
      this.ajax(_this.port.refundData, {
      }, function(res) {
        _this.refundData = res.data
      })
    },
},
mounted: function mounted() {
  //do something after mounting vue instance
  this.getInitData()
}
}
</script>
<style>

.activities-row {
  margin: 0.6rem 0;
  padding: 0 0.75rem;
}

.state-row {
  height: 2.5rem;
}

.activities-detail {
  height: 7.5rem;
}

.activities-detail h2 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0.6rem;
}

.activities-detail p {
  font-size: 12px;
  color: #777;
  margin-top: 0.4rem;
}

.activities-imgBox {
  height: 6rem;
  width: 7.8rem;
  background-size: cover;
  overflow: hidden;
  margin-right: 0.75rem;
}

.activities-describe {
  position: relative;
  flex: 1;
  padding-right: 1.5rem;
}

.activities-price-box {
  width: 4rem;
  text-align: center;
  font-size: 18px;
  color: #ff4081;
  position: absolute;
  right: 0;
  top: 2.5rem;
}

.activities-btnBox {
  height: 2.6rem;
  padding-bottom: 0.5rem;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
  -moz-box-pack: flex-end;
  -webkit--moz-box-pack: flex-end;
  box-pack: flex-end;
}

.activities-btn {
  margin-left: 1rem;
  height: 1.8rem;
}
</style>
