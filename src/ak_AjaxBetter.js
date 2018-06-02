export default {
  install: function(Vue) {
    Vue.prototype.port = {
      'active': 'activity/newes-index', // 首页栏目列表 type：created_at（最新）、allpage_view（热门）
      'banner': 'banner/index', //首页banner
      'doSearch': 'activity/search', //搜索关键词 search：活动名活商家名
      'activitiesDeta': 'activity/details', //活动详情 activity_id
      'collectAct': 'activity/collect-activity', //收藏活动 activity_id
      'coolectStore': 'activity/collect-merchant', //收藏商家 merchant_id
      'join': 'activity/join-activity', //参加活动 activity_id
      'myAct': 'activity/my-activity', //我的活动 type: 1已支付   0待支付
      'troveAct': 'user/my-activity', //收藏的活动
      'troveStore': 'user/my-merchant', //收藏的商家
      'storeDeta': 'merchant/merchant-dateil', //商家小站详情 merchant_id
      'storeAct': 'merchant/merchant-activity', //该商家的活动 merchant_id type（1正在进行的活动    0; 历史活动）
      'getCode': 'user/send-sms', //发送验证码
      'bindPhone': 'user/check-code', //绑定手机号
      'userDeta': 'user/get-user', // 用户的资料
      'refundData': 'refund-order/refund', //我的退款列表
      'delOrder': 'order/del', //删除订单接口 id： 订单的ID
      'placeOrder': 'order/order', //用户下单 activity_id 和 ticket[{id,num}]
      'theRefundData': 'order/order-refund', // 申请退款的详情
      'sendRefund': 'order/refund', //提交退款申请
      'eleTicketData': 'order/eticket', //电子票详情
      'refundOrderData': 'refund-order/refund-detail', //退款订单的详情
      'orderPay': 'order/pay', //微信支付，请求配置文件
      'checkIn': 'order/check-ticket', //验票 phone  code[]
      'wechatInit': 'wechat/wechat-config'
    };
    Vue.prototype.hostUrl = 'http://api.douyajishi.com/'; //定义请求公共头
    // Vue.prototype.hostUrl = 'http://192.168.2.117:8081/'; //定义请求公共头

    /*
     * ajax封装函数
     * @author: Constantine => 13161672102@163.coom
     * @function ajax
     * @params {
     *         url: '',     (String)  Default: none
     *                      Describe: Requested address
     *
     *         data: {},    (Object)  Default: none
     *                      Describe: Parameter of request
     *
     *         methodType: '', (String) 'GET' or 'POST'     Default: 'POST'
     *                     Describe: Type of request
     *
     *         callback: function(){}, (function) callBackFunction
     *                      Describe: Successful callback after success
     *
     *         loadingType: '', (String)  'mask' or 'top' or 'loading'  Default:'mask'
     *                      Describe: Style in request
     *                               'mask': The Loading with a mask layer
     *                               'top': Only the top-level progress bar
     *                               'loading': The Loading without a mask layer
     *
     *         showLoadFlag: '', （Boolean） true or false     Default: true
     *                      Describe:Whether to tell the user is loading.
     *         }
     * @remark:
     *      1、必须参数： url, data, callback
     *
     */
    Vue.prototype.ajax = function(url, data, callback, loadingType, showLoadFlag, methodType) {
      let _this = this;
      //Initialization parameter
      let tempMethodType = 'POST'

      let topBarFlag = true;
      let maskFlag = true;
      let loadImgFlag = true;
      let tempShowLoadFlag = true


      if (methodType) {
        tempMethodType = methodType;
      }
      if (showLoadFlag != '') {
        tempShowLoadFlag = showLoadFlag;
      }

      if (!tempShowLoadFlag) {
        if (loadingType == 'top') {
          topBarFlag = true;
          maskFlag = false;
          loadImgFlag = false;
        } else if (loadingType == 'loading') {
          topBarFlag = false;
          maskFlag = false;
          loadImgFlag = true;
        } else {
          topBarFlag = false;
          maskFlag = true;
          loadImgFlag = true;
        }
      } else {
        topBarFlag = false;
        maskFlag = false;
        loadImgFlag = false;
      }


      // show the loading
      this.TopBarFlag = topBarFlag;
      this.MaskFlag = maskFlag;
      this.LoadImgFlag = loadImgFlag;
      //do Ajax
      $.ajax({
        type: 'POST',
        url: _this.hostUrl + url,
        data: data,
        timeout: 15000,
        dataType: 'json',
        xhrFields: {
          withCredentials: true
        },
        success: function(data) {
          setTimeout(() => {
            _this.TopBarFlag = false;
            _this.MaskFlag = false;
            _this.LoadImgFlag = false;
          }, 800)
          if (data.code == 1) {
            console.log('-------' + url + '-------');
            console.dir(data);
            console.log('------- end ' + url + ' end -------');
            callback(data.data, data.message)
          } else if (data.code == 0) {
              _this.MsgFlag = true;
            _this.ErrMsg = data.message;

            setTimeout(() => {
              _this.MsgFlag = false;
            }, 2000)
            console.error(JSON.stringify(data));
            //alert err message
        }else if (data.code == '-101') {
            // let nowUrl = window.location.href;
            let nowUrl = 'http://www.douyajishi.com/#/'
            window.location.href = data.data.url + '?nowUrl=' + nowUrl
        }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log(textStatus)
          if (textStatus == 'timeout') {
            //alert('网络超时');
          } else if (textStatus == 'error') {
            //alert('网络错误');
          } else if (textStatus == 'parsererror') {
            //alert('数据异常');
          }

          _this.TopBarFlag = false;
          _this.MaskFlag = false;
          _this.LoadImgFlag = false;
        }
      });
    };
  }
}
