<template>
<div id="electronicTicket">
  <div class="ak-boxSad ele-ticket-detailBox">

    <div class="ele-ticket-detailRow ak-flexB">
      <h3>
          活动名称
      </h3>
      <p class="ak-txtDOver">
        {{orderData.activity_name}}
      </p>
    </div>

    <div class="ele-ticket-detailRow ak-flexB">
      <h3>
          商家名称
      </h3>
      <p class="ak-txtDOver">
        {{orderData.merchant_name}}
      </p>
    </div>

    <div class="ele-ticket-detailRow ak-flexB">
      <h3>
          活动地点
      </h3>
      <p class="ak-txtDOver">
        {{orderData.activity_address}}
      </p>
    </div>

    <div class="ele-ticket-detailRow ak-flexB">
      <h3>
          活动时间
      </h3>
      <p class="ak-txtDOver">
        {{orderData.start_time}} ~ {{orderData.end_time}}
      </p>
    </div>
  </div>


  <div class="ele-ticket-ticketDeta-box ak-boxSad" v-for="data in tickets" :key="data.key">

      <div class="ele-ticket-ticketTit-row ak-flexB">
        <h3>
            {{data.title}}
        </h3>
        <!-- <b>已验票</b> -->
        <span class="ak-txtOver">
          ￥{{data.prize}}
        </span>
      </div>
      <p class="ak-black-bottomBorder"></p>
      <div class="ele-ticket-ticketDeta-row ak-flexB">
        <h3>
            下单手机
        </h3>
        <span class="ak-txtOver">
          {{data.phone}}
        </span>
      </div>
      <div class="ele-ticket-ticketDeta-row ak-flexB">
        <h3>
            下单时间
        </h3>
        <span class="ak-txtOver">
          {{data.created_at}}
        </span>
      </div>
      <div class="ele-ticket-ticketDeta-row ak-flexB">
        <h3>
            电子票号
        </h3>
        <span class="ak-txtOver">
          {{data.code}}
        </span>
      </div>
  </div>
  <div class="warn-box">
      注：请妥善保管好您的电子票号，不要轻易告诉他人
  </div>

  <mu-raised-button label="确定" class="ele-ticket-sure-btn"  @click="$router.back(-1)" primary/>
</div>
</template>
<script>
export default {
  name: "electronicTicket",
  data: function data() {
    return {
        orderData: {},
        tickets: [],
    }
},
methods: {

    /*
     * 拿到该电子票的详情
     * @function getInitData
     * @params {}
     *
     */
    getInitData() {
      let _this = this;
      this.ajax(_this.port.eleTicketData, {
        order_id: _this.$route.params.orderId,
      }, function(res) {
          _this.orderData = res;
          _this.tickets = res.ticket;
      })
    },
},
mounted: function mounted() {
  //do something after mounting vue instance
  this.getInitData()
}
}
</script>
<style scoped>
.ele-ticket-detailBox {
  margin-top: 1.2rem;
}

.ele-ticket-detailRow {
  padding: 0.5rem;
}

.ele-ticket-detailRow h3 {
  width: 6.5rem;
}

.ele-ticket-detailRow p {
  color: #777;
  width: 20rem;
}
.ele-ticket-ticketDeta-box{
    margin-top: 0.9rem;
}
.ele-ticket-ticketTit-row{
    height: 3rem;
    padding: 0 0.9rem;
}
.ele-ticket-ticketTit-row span{
    color: red
}
.ele-ticket-ticketDeta-row {
    padding: 0.75rem 1.5rem;
}
.warn-box{
    margin-top: 1rem;
    color: red;
    background-color: #fffee9;
    padding: 0.75rem 0.7rem;
    text-align: center;
}
.ele-ticket-sure-btn{
    width: 80%;
    margin-top: 1.2rem;
    margin-left: 10%;
    height: 3rem;
    font-size: 18px;
    margin-bottom: 2rem;
}
</style>
