<template>
<div id="myActivities">
  <mu-tabs :value="activeTab" @change="handleTabChange">
    <mu-tab value="tab1" title="已支付" />
    <mu-tab value="tab2" title="待支付" />
  </mu-tabs>
  <div v-if="activeTab === 'tab1'">
    <div class="activities-row ak-boxSad" v-for="data in downData" :key="data.key">
      <div class="ak-flexB state-row">
        <div class="">
          <i class="iconfont icon-huodong1" style="color:#009688"></i> 豆芽活动
        </div>
        <div class="state-box">
          <span style="color:#009688">正在进行</span>
        </div>
      </div>
      <p class="ak-black-bottomBorder"></p>
      <router-link tag="div" class="ak-flexB activities-detail" :to="{ name: 'activitiesDeta', params: { activitiesId: data.activity_id}}">
        <div class="activities-imgBox" :style="{backgroundImage: 'url(' + data.activity_img + ')'} "></div>
        <div class="activities-describe">
          <h2 class="ak-txtDOver">{{data.activity_name}}</h2>
          <p>订单号：{{data.order_number}}</p>
          <p>下单时间：{{data.order_time}}</p>
          <div class="activities-price-box">
            ￥{{data.sell_all}}
          </div>
        </div>
      </router-link>
      <div class="activities-btnBox  ak-flexC">
        <router-link :to="{ name: 'applyForRefund', params: { orderId: data.id}}">
          <mu-raised-button label="申请退款" class="activities-btn" />
        </router-link>
        <router-link :to="{ name: 'electronicTicket', params: { orderId: data.id}}">
          <mu-raised-button label="查看票据" class="activities-btn" primary/>
        </router-link>
      </div>

    </div>
  </div>
  <div v-if="activeTab === 'tab2'">

    <div class="activities-row ak-boxSad" v-for="data in waitData" :key="data.key">
      <div class="ak-flexB state-row">
        <div class="">
          <i class="iconfont icon-huodong1" style="color:#009688"></i> 豆芽活动
        </div>
        <div class="state-box">
          <span style="color:#ff4081">待支付</span>
        </div>
      </div>
      <p class="ak-black-bottomBorder"></p>
      <router-link tag="div" class="ak-flexB activities-detail" :to="{ name: 'activitiesDeta', params: { activitiesId: data.activity_id}}">
        <div class="activities-imgBox" :style="{backgroundImage: 'url(' + data.activity_img + ')'} "></div>
        <div class="activities-describe">
          <h2 class="ak-txtDOver">{{data.activity_name}}</h2>
          <p>订单号：{{data.order_number}}</p>
          <p>下单时间：{{data.order_time}}</p>
          <div class="activities-price-box" style="color:#009688">
            ￥{{data.sell_all}}
          </div>
        </div>
      </router-link>
      <div class="activities-btnBox  ak-flexC">
        <mu-raised-button label="删除订单" class="activities-btn" @click="delTheOrderShowDialog(data.id)" />
        <mu-raised-button label="立即支付" class="activities-btn" @click="payNow(data.id)" secondary/>
      </div>
    </div>



  </div>

  <!--
        ↓↓↓↓↓↓ 没有数据时的显示状态 ↓↓↓↓↓↓
            在该Tab所属的内容为空时显示
 -->
  <div class="no-detail-box" v-show="activeTab === 'tab2' && waitData.length == 0 || activeTab === 'tab1' && downData.length == 0">
    <div class="no-detail-imgBox">
    </div>
    <p>暂无数据呢...</p>
  </div>
  <!-- ↑↑↑↑↑ 没有数据时的显示状态 ↑↑↑↑↑  -->

  <div class="" v-show="activeTab === 'tab2' && waitData.length != 0 || activeTab === 'tab1' && downData.length != 0">
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

  <Loading id="Loading" :TopBarFlag="TopBarFlag" :MaskFlag="MaskFlag" :LoadImgFlag="LoadImgFlag" :ErrMsg="ErrMsg" :MsgFlag="MsgFlag"></Loading>

  <mu-dialog :open="dialog" title="删除订单" @close="closeDialog">
    您确定要删除我吗？？
    <img src="../../../static/image/beanSproutCry.gif" alt="" style="width:50%;margin:0 auto;display:block;">
    <mu-flat-button slot="actions" primary @click="delTheOrder" label="确定" />
    <mu-raised-button slot="actions" @click="closeDialog" primary label="取消" />
  </mu-dialog>
</div>
</template>
<script>
var timer;
export default {
  name: "myActivities",
  data: function data() {
    return {
      TopBarFlag: false,
      MaskFlag: false,
      LoadImgFlag: false,
      MsgFlag: false,
      ErrMsg: '',
      loadStatus: 1,
      pageData: {},
      activeTab: 'tab1',
      downData: [],
      waitData: [],
      tempId: '', //储存临时的ID
      dialog: false,
      //   downNoDataFlag: false,
      //   waitNoDataFlag: false,
    }
  },
  methods: {
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
    /*
     * 点击加载跟多
     * @function loadMore
     * @params {   }
     *
     */
    loadMore: function loadMore() {
      let _this = this;
      let cloumnName;
      this.loadStatus = 2
      if (this.activeTab == 'tab1') {
        cloumnName = 1;
      } else {
        cloumnName = 0;
      }
      this.ajax(_this.port.myAct, {
        type: cloumnName,
        page: parseInt(_this.pageData.nowPage) + 1
      }, function(res) {
        _this.pageData = res.pageInfo
        if (res.pageInfo.totalPage > res.pageInfo.nowPage) {
          _this.loadStatus = 1
        } else {
          _this.loadStatus = 3
        }

        if (cloumnName == 1) {
          for (var i = 0; i < res.data.length; i++) {
            _this.downData.push(res.data[i])
          }
        } else {
          for (var i = 0; i < res.data.length; i++) {
            _this.waitData.push(res.data[i])
          }
        }
      }, 'top')
    },


    handleTabChange(val) {
      this.activeTab = val;
      this.loadStatus = 1
      if (val == 'tab1') {
        this.getInitData(1);
      } else {
        this.getInitData(0);
      }
    },
    /*
     * 拿到活动的数据数据
     * @function getInitData
     * @params {theType} 1:正在进行的 2:历史活动
     *
     */
    getInitData(theType) {
      let _this = this;
      this.ajax(_this.port.myAct, {
        type: theType
      }, function(res) {
        _this.pageData = res.pageInfo;
        if (_this.pageData.totalPage > _this.pageData.nowPage) {
          _this.loadStatus = 1
        } else {
          _this.loadStatus = 3
        }

        if (theType == 1) {
          _this.downData = res.data

          //   if (res.data.length == 0) {
          //     _this.downNoDataFlag = true;
          //   } else {
          //     _this.downNoDataFlag = false;
          //   }
        } else {
          _this.waitData = res.data

          //   if (res.data.length == 0) {
          //     _this.waitNoDataFlag = true;
          //   } else {
          //     _this.waitNoDataFlag = false;
          //   }
        }
      })
    },
    /*
     * 删除订单 => 1、展示模态框，储存临时ID
     * @function delTheOrderShowDialog
     * @params {orderId} 该订单的ID
     *
     */
    delTheOrderShowDialog(orderId) {
      let _this = this;
      this.tempId = orderId;
      this.dialog = true;
    },
    /*
     * 关闭模态框
     * @function close
     * @params {}
     *
     */
    closeDialog() {
      this.dialog = false
    },
    /*
     * 删除订单 => 2、关掉模态框，发送请求，或者不发送
     * @function delTheOrder
     * @params {orderId} 该订单的ID
     *
     */
    delTheOrder() {
      let _this = this;
      this.dialog = false
      this.ajax(_this.port.delOrder, {
        id: _this.tempId
      }, function(res, msg) {
        _this.collect_merchant = res;
        _this.ErrMsg = msg;
        _this.MsgFlag = true;
        window.clearTimeout(timer)
        timer = setTimeout(() => {
          _this.MsgFlag = false
        }, 1200)
        _this.waitData = [];
        _this.ajax(_this.port.myAct, {
          type: 0
        }, function(res) {
          _this.waitData = res.data
        })

      })
    },
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    this.getInitData(1)
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
