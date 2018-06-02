<template>
<div id="refundDeta">
  <div class="content-box ak-boxSad">
    <h3 class="refund-title">
        退款信息
    </h3>
    <p class="ak-black-bottomBorder"></p>
    <div class="ak-flexB refund-row">
      <span>退款订单</span>
      <p class="ak-txtDOver">{{refundData.activity_name}}</p>
    </div>
    <div class="ak-flexB refund-row">
      <span>订&nbsp;单&nbsp;号</span>
      <p class="ak-txtDOver">{{refundData.order_number}} </p>
    </div>
    <div class="ak-flexB refund-row">
      <span>申请时间</span>
      <p class="ak-txtDOver">{{refundData.created_at}}</p>
    </div>
    <div class="ak-flexB refund-row">
      <span>退款金额</span>
      <p class="ak-txtDOver">￥{{refundData.sell_all}}</p>
    </div>
  </div>

  <div class="ak-boxSad content-box">
    <h3 class="refund-title">
      退款流程
    </h3>
    <p class="ak-black-bottomBorder"></p>
    <div class="timeline-Box">
      <mu-timeline>
        <div class="" v-for="data in historyMsgData" :key="data.key">

          <mu-timeline-item>
            <div slot="time" class="ak-flexB">
              <span>申请已提交</span>
              <span>{{data.created_at}}</span>
            </div>
            <span slot="des">您的退款申请已提交请耐心等待工作人员审核</span>
          </mu-timeline-item>

          <mu-timeline-item>
            <div slot="time" class="ak-flexB">
              <span>申请审核中</span>
              <span>{{data.created_at}}</span>
            </div>
            <span slot="des">您的退款申请正在由工作人员审核，审核需要2-3个工作日！</span>
          </mu-timeline-item>

          <mu-timeline-item v-if="data.flag == 3">
            <div slot="time" class="ak-flexB">
              <span>退款成功</span>
              <span>{{data.updated_at}}</span>
            </div>
            <span slot="des">您的退款已由工作人员转入您的银行账户，转账需要2-3个工作日！</span>
          </mu-timeline-item>

          <mu-timeline-item v-if="data.flag == 4">
            <div slot="time" class="ak-flexB">
              <span>退款失败</span>
              <span>{{data.updated_at}}</span>
            </div>
            <span slot="des">失败原因：{{data.no_reason}}</span>
          </mu-timeline-item>

        </div>
      </mu-timeline>
    </div>
  </div>
  <Loading id="Loading" :TopBarFlag="TopBarFlag" :MaskFlag="MaskFlag" :LoadImgFlag="LoadImgFlag" :ErrMsg="ErrMsg" :MsgFlag="MsgFlag"></Loading>
</div>
</template>
<script>
export default {
  name: "refundDeta",
  data: function data() {
    return {
      TopBarFlag: false,
      MaskFlag: false,
      LoadImgFlag: false,
      MsgFlag: false,
      ErrMsg: '',
      refundData: {},
      historyMsgData: [],
    }
  },
  methods: {

    /*
     * 获取到该退款订单的详情
     * @function getDeta
     * @params { }
     *
     */
    getDeta() {
      let _this = this;
      //   console.warn(sessionStorage.getItem('activitiesId'));
      this.ajax(_this.port.refundOrderData, {
        order_id: _this.$route.params.orderId
      }, function(res) {
        _this.refundData = res;
        _this.historyMsgData = res.flow;
      })
    },
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    this.getDeta();
  }
}
</script>
<style>
.content-box {
  padding: 0.9rem 0.75rem;
  margin-bottom: 1.4rem;
}

.refund-title {
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 18px;
}

.refund-row {
  padding: 1rem 0.75rem;
}

.refund-row span {
  width: 6rem;
}

.refund-row p {
  flex: 1;
  padding-left: 2rem;
  text-align: right;
  color: #777;
}

.timeline-Box {
  padding: 1.9rem 0 0.8rem;
}

.mu-timeline-item-time {
  width: 90%;
}

.mu-timeline-item-des {
  width: 90%;
}
</style>
