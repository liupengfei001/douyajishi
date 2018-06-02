<template>
<div id="placeOrder">
  <mu-card style="margin-bottom:0.75rem;">
    <mu-card-media>
      <mu-grid-list>
        <mu-grid-tile :rows="1.4" :cols="2" titleBarClass="activities-banner-title">
          <!-- <img :src="tile.image"/> -->
          <img :src="Data.activity_img" />
          <!-- <mu-icon-button icon="star_border" slot="action" /> -->
        </mu-grid-tile>

      </mu-grid-list>

    </mu-card-media>
    <mu-card-text>
      <div class="active-detail-box">
        <h4 class="ak-txtDOver">{{Data.activity_name}}</h4>
      </div>
    </mu-card-text>
  </mu-card>
  <div class="place-order-box ak-boxSad">
    <h2>票种类型</h2>
    <div class="" v-for="ticketData in ticketArr" :key="ticketData.key">
      <div class="place-order-ticketRow ak-flexB">
        <div class="">
          <h4>{{ticketData.title}}</h4>
          <p>￥{{ticketData.price}}</p>
        </div>
        <div class="ak-flexC place-order-numberBox">
          <mu-icon-button @click="changeNum( -1, ticketData.id)">
            <i class="iconfont icon-jianhao"></i>
          </mu-icon-button>
          <input type="number" name="" value="" v-model="ticketData.num" @input="watchUserIpt(ticketData.num, ticketData.id)">
          <mu-icon-button @click="changeNum( 1, ticketData.id)">
            <i class="iconfont icon-jiahao2"></i>
          </mu-icon-button>
        </div>
      </div>
      <p class="ak-black-bottomBorder"></p>
    </div>
  </div>

  <div class="bottom-btn-box" @click="placeOrder">
    <mu-raised-button label="前往付款" class="bottom-btn" primary/>
  </div>
  <mu-dialog :open="dialog" title="提示">
    <p>您来晚了哦~</p>
    <p>该活动报名已截止或已下线</p>
    <mu-flat-button label="确定" slot="actions" primary @click="dialog = false;$router.back(-1)" />
  </mu-dialog>

  <!-- <div class="backBtn" @click="$router.back(-1)"><i class="iconfont icon-fanhui3"></i></div> -->
  <Loading id="Loading" :TopBarFlag="TopBarFlag" :MaskFlag="MaskFlag" :LoadImgFlag="LoadImgFlag" :ErrMsg="ErrMsg" :MsgFlag="MsgFlag"></Loading>

  <mu-dialog :open="dialog2" title="请绑定手机号">
    您还没绑定手机号导致您无法下单，请您先绑定手机号
    <mu-flat-button slot="actions" @click="dialog2 = false" label="取消" />

    <!-- <mu-raised-button label="前往绑定" class="demo-raised-button" primary/> -->
    <!-- <router-link :to="{ name: 'changePhone'}"> -->
    <mu-flat-button slot="actions" primary to="/changePhone" @click="dialog2 = false" label="前往绑定" />
    <!-- </router-link> -->

  </mu-dialog>
  <div class="ak-nullDiv">

  </div>
  <div class="ak-nullDiv">

  </div>
</div>
</template>
<script>
export default {
  name: "placeOrder",
  data: function data() {
    return {
      TopBarFlag: false,
      MaskFlag: false,
      LoadImgFlag: false,
      ErrMsg: '',
      MsgFlag: false,
      Data: {},
      ticketArr: [],
      dialog: false,
      dialog2: false,
    }
  },
  methods: {
    /*
     * 监听表中的数：（不可为空，不可为负数，不可为小数）
     * @function watchUserIpt
     * @params {val, theId } val：当前的值, theId： 当前票号的ID
     *
     */
    watchUserIpt(val, theId) {
      let _this = this
      for (var i = 0; i < _this.ticketArr.length; i++) {
        if (_this.ticketArr[i].id == theId) {
          let tempNum = parseInt(_this.ticketArr[i].num)
          if (val == '') {
            tempNum = 0
          }
          _this.ticketArr[i].num = tempNum
        }
      }
      console.warn(val);
    },
    /*
     * 拿到初始的栏目数据
     * @function getInitData
     * @params { }
     *
     */
    getDeta() {
      var _this = this;
      //   console.warn(sessionStorage.getItem('activitiesId'));
      this.ajax(_this.port.join, {
        activity_id: sessionStorage.getItem('activitiesId')
      }, function(res, msg) {
        _this.Data = res;
        _this.ticketArr = res.ticket;
        console.log(msg);
        if (msg == '该活动报名截止或已下线') {
          _this.dialog = true;
        }
      }, 'top')
    },
    /*
     * 更改下单的数量
     * @function changeNum
     * @params { }
     *
     */
    changeNum(theType, theId) {
      let _this = this;
      let timer;
      for (var i = 0; i < _this.ticketArr.length; i++) {
        if (_this.ticketArr[i].id == theId) {
          let tempNum = parseInt(_this.ticketArr[i].num)
          theType = parseInt(theType)
          if ((tempNum + theType) < 0) {
            window.clearTimeout(timer)
            this.ErrMsg = '宝贝儿不能再少了呀~ 🤷‍'
            this.MsgFlag = true;
            timer = setTimeout(() => {
              _this.MsgFlag = false
            }, 1500)
            return
          } else {
            _this.ticketArr[i].num += theType
          }

        }
      }
    },

    /*
     * 确认下单/前往付款
     * @function placeOrder
     * @params {}
     *
     */
    placeOrder: function placeOrder() {
      let _this = this;
      let tempArr = this.ticketArr;
      let electTickets = [];
      for (var i = 0; i < tempArr.length; i++) {
        if (tempArr[i].num != 0) {
          let tempObj = {
            id: tempArr[i].id,
            num: tempArr[i].num
          }
          electTickets.push(tempObj)
        }
      }
      console.log(electTickets);
      this.ajax(_this.port.placeOrder, {
        activity_id: sessionStorage.getItem('activitiesId'),
        ticket: electTickets
      }, function(res, msg) {
        if (msg == '请绑定手机号') {
          _this.dialog2 = true
          return
        }
        var payData = res.jsApiConfig
        wx.chooseWXPay({
          timestamp: payData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: payData.nonceStr, // 支付签名随机串，不长于 32 位
          package: payData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: payData.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: payData.paySign, // 支付签名
          success: function(res) {
            if (res.errMsg == 'chooseWXPay:ok') {
              _this.ErrMsg = '恭喜您支付成功啦~';
              _this.MsgFlag = true;
              window.clearTimeout(timer)
              timer = setTimeout(() => {
                _this.MsgFlag = false
                _this.$router.back(-1);
              }, 1200)
            } else {
              _this.ErrMsg = '抱歉，支付失败';
              _this.MsgFlag = true;
              window.clearTimeout(timer)
              timer = setTimeout(() => {
                _this.MsgFlag = false
              }, 1200)
            }
            // 支付成功后的回调函数
          }
        });
        // alert(msg)
        // window.clearTimeout(timer)
        // this.ErrMsg = '恭喜您，下单成功‍'
        // this.MsgFlag = true;
        // timer = setTimeout(() => {
        //   _this.MsgFlag = false
        // }, 1500)

      })
    },

    /*
     * 发起微信支付请求
     * @function payNow
     * @params {   }
     *
     */
    payNow: function payNow(theOrderId) {
      let _this = this;
      this.ajax(_this.port.orderPay, {
        order_id: theOrderId
      }, function(res, msg) {
        var payData = res.jsApiConfig
        wx.chooseWXPay({
          timestamp: payData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: payData.nonceStr, // 支付签名随机串，不长于 32 位
          package: payData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: payData.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: payData.paySign, // 支付签名
          success: function(res) {
            if (res.errMsg == 'chooseWXPay:ok') {
              _this.ErrMsg = '恭喜您支付成功啦~';
              _this.MsgFlag = true;
              window.clearTimeout(timer)
              timer = setTimeout(() => {
                _this.MsgFlag = false
              }, 1200)
            } else {
              _this.ErrMsg = '抱歉，支付失败';
              _this.MsgFlag = true;
              window.clearTimeout(timer)
              timer = setTimeout(() => {
                _this.MsgFlag = false
              }, 1200)
            }
            console.log('请求支付成功');
            console.log(res);
            // 支付成功后的回调函数
          }
        });
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
.activities-banner-title {
  display: none
}

.place-order-box {
  padding: 0.5rem 0.75rem 0;
  margin-top: 0.9rem;
}

.place-order-ticketRow {
  padding: 0.75rem 0;
}

.place-order-ticketRow p {
  color: #ff4081;
}

.place-order-ticketRow p s {
  color: #777;
  margin-left: 0.5rem;
  font-size: 12px;
}

.place-order-box h2 {
  font-size: 18px;
  height: 2.5rem;
  line-height: 2.5rem;
}

.place-order-numberBox input {
  border: none;
  border-bottom: solid 1px #009688;
  width: 3rem;
  text-align: center;
  padding: 0 0.1rem;
}

.place-order-numberBox .icon-jiahao2 {
  font-size: 24px;
  color: #ff4081;
}

.place-order-numberBox .icon-jianhao {
  font-size: 18px;
  color: #ccc;
}

.bottom-btn-box {
  padding: 0 1.75rem;
  position: fixed;
  left: 0;
  bottom: 1rem;
  width: 100%;
}

.bottom-btn {
  width: 100%;
  height: 2.8rem;
}
</style>
