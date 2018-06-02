<template>
<div id="applyForRefund">
  <div class="content-box ak-boxSad">
    <h3 class="refund-title">
              订单信息
          </h3>
    <p class="ak-black-bottomBorder"></p>
    <div class="ak-flexB refund-row">
      <span>活动名称</span>
      <p class="ak-txtDOver">{{refundData.activity_name}}</p>
    </div>
    <div class="ak-flexB refund-row">
      <span>订&nbsp;单&nbsp;号</span>
      <p class="ak-txtDOver">{{refundData.order_number}} </p>
    </div>
    <div class="ak-flexB refund-row">
      <span>下单时间</span>
      <p class="ak-txtDOver">{{refundData.order_time}}</p>
    </div>
    <div class="ak-flexB refund-row">
      <span>金&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额</span>
      <p class="ak-txtDOver">￥{{refundData.sell_all}}</p>
    </div>
  </div>
  <div class="content-box ak-boxSad">
    <h3 class="refund-title">退款申请</h3>
    <p class="ak-black-bottomBorder"></p>
    <!-- <div class="ak-flexB refund-IptRow" style="margin-top:0.4rem;">
      <span>退款金额：</span>
      <div class="refund-Ipt">
        <mu-text-field label="请输入退款金额" v-model="IptPrice" labelFloat/>
      </div>
    </div> -->
    <div class="ak-flexB refund-IptRow">
      <span>银行账号：</span>
      <div class="refund-Ipt">
        <mu-text-field label="请输入退款转入银行的账号" v-model="IptBankNumber" labelFloat/>
      </div>
    </div>
    <div class="ak-flexB refund-IptRow">
      <span>开户银行：</span>
      <div class="refund-Ipt">
        <mu-text-field label="请输入退款转入的开户行名称" v-model="IptBankAddress" labelFloat/>
      </div>
    </div>
    <div class="ak-flexB refund-IptRow">
      <span>开户人：</span>
      <div class="refund-Ipt">
        <mu-text-field label="请输入开户人姓名" v-model="IptAccountHolder" labelFloat/>
      </div>
    </div>
    <div class="ak-flexB refund-IptRow">
      <span>退款原因：</span>
      <mu-text-field hintText="请输入退款原因" v-model="IptRefundReason" multiLine :rows="3" :rowsMax="6" />
    </div>
    <div class="ak-nullDiv">

    </div>
  </div>
  <div class="bottom-btn-box">
    <mu-raised-button label="提交申请" class="bottom-btn" @click="submitThis()" primary/>
  </div>

  <!-- <div class="backBtn" @click="$router.back(-1)"><i class="iconfont icon-fanhui3"></i></div> -->
  <Loading id="Loading" :TopBarFlag="TopBarFlag" :MaskFlag="MaskFlag" :LoadImgFlag="LoadImgFlag" :ErrMsg="ErrMsg" :MsgFlag="MsgFlag"></Loading>

</div>
</template>
<script>
var timer
export default {
  name: "applyForRefund",
  data: function data() {
    return {
      TopBarFlag: false,
      MaskFlag: false,
      LoadImgFlag: false,
      MsgFlag: false,
      ErrMsg: '',
      refundData: {},
    //   IptPrice: '',
      IptBankNumber: '',
      IptBankAddress: '',
      IptAccountHolder: '',
      IptRefundReason: '',
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
      this.ajax(_this.port.theRefundData, {
        order_id: _this.$route.params.orderId
      }, function(res) {
        _this.refundData = res
      })
    },
    /*
     * 点击提交申请
     * @function submitThis
     * @params { }
     *
     */
    submitThis() {
      let _this = this;
      //   判断为空的话返回
      if (this.IptBankNumber == '' || this.IptBankAddress == '' || this.IptAccountHolder == '' || this.IptRefundReason == '') {
        _this.ErrMsg = '表单内容不能为空，请您认真审核~！';
        _this.MsgFlag = true;
        window.clearTimeout(timer)
        timer = setTimeout(() => {
          _this.MsgFlag = false
        }, 2000)
        return
      }
      this.ajax(_this.port.sendRefund, {
        order_id: _this.$route.params.orderId,
        // money: _this.IptPrice,
        bank_card: _this.IptBankNumber,
        opening_bank: _this.IptBankAddress,
        opening_man: _this.IptAccountHolder,
        pass_reason: _this.IptRefundReason,
      }, function(res, msg) {
          _this.ErrMsg = msg;
          _this.MsgFlag = true;
          window.clearTimeout(timer)
          timer = setTimeout(() => {
            _this.MsgFlag = false
            _this.$router.back(-1)
          }, 2000)
      })
    },
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    this.getDeta();
  }
}
</script>
<style scoped>
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

.refund-IptRow {
  padding: 0 0.75rem;
}

.refund-IptRow span {
  margin-top: 1.3rem;
}

.refund-Ipt {
  height: 4.5rem;
}

.mu-text-field {
  width: 230px
}

.bottom-btn-box {
  padding: 0 1.75rem;
}

.bottom-btn {
  width: 100%;
  height: 2.8rem;
}
</style>
