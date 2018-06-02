<template>
<div id="checkIn">
  <div class="checkIn-wran">
    注意：本验票功能仅限于商家验票，顾客擅自验票后，此票将作废~!
  </div>
  <p class="ak-black-bottomBorder"></p>
  <div class="ak-flexC checkIn-code-row">
    <!-- <mu-text-field hintText="请输入顾客手机号" type="number" icon="phone" fullWidth/> -->
    <mu-text-field label="顾客手机号" hintText="请输入顾客手机号" v-model="userPhone" labelFloat fullWidth/>
  </div>
  <div class="checkIn-code-row ak-flexB" v-for="(data, index) in codeArr" :key="data.key">
    <mu-text-field hintText="请输入电子票验证码" v-model="data.userIpt" type="text" fullWidth/>
    <mu-icon-button class="ak-boxSad minus-btn" v-show="codeArr.length >= 2" @click="minusTheCodeArr(index)">
      -
    </mu-icon-button>
  </div>
  <mu-raised-button label="提交验票" class="checkIn-submitBtn" @click="submitTheCheckIn()" primary/>
  <mu-icon-button class="checkIn-paper ak-boxSad" primary @click="addTheTicket()">
    +
  </mu-icon-button>
  <mu-dialog :open="dialog" title="请核对以下数据" @close="close">
    <p>客户手机：{{userPhone}}</p>
    <p>
      电子票：
      <span v-for="data in codeArr" :key="data.key">{{data.userIpt}}、</span>
    </p>
    <mu-flat-button slot="actions" @click="close" primary label="取消" />
    <mu-flat-button slot="actions" primary @click="toSubmit()" label="确定" />
  </mu-dialog>
  <Loading id="Loading" :TopBarFlag="TopBarFlag" :MaskFlag="MaskFlag" :LoadImgFlag="LoadImgFlag" :ErrMsg="ErrMsg" :MsgFlag="MsgFlag"></Loading>
</div>
</template>
<script>
var timer;
export default {
  name: "checkIn",
  data: function data() {
    return {
      TopBarFlag: false,
      MaskFlag: false,
      LoadImgFlag: false,
      ErrMsg: '',
      MsgFlag: false,
      codeArr: [{
        userIpt: '',
      }],
      userPhone: '',
      submitCodeArr: [],
      dialog: false,
    }
  },
  methods: {
    addTheTicket: function addTheTicket() {
      let tempObj = {
        userIpt: ''
      };
      this.codeArr.push(tempObj);
    },
    minusTheCodeArr: function minusTheCodeArr(theIndex) {
      console.log(theIndex);
      this.codeArr.splice(theIndex, 1)
    },
    submitTheCheckIn: function submitTheCheckIn() {
      let tempArr = [];
      let codeData = this.codeArr;
      let _this = this;

      if(_this.userPhone == ''){
        window.clearTimeout(timer)
        this.ErrMsg = '请输入顾客手机号‍'
        this.MsgFlag = true;
        timer = setTimeout(() => {
          _this.MsgFlag = false
      }, 2500)
        return
      }


      if (!/^1(3[0-9]|4[57]|5[0-35-9]|7[013678]|8[0-9])[\d]{8}$/g.test(_this.userPhone)) {
        //错误信息展示
          window.clearTimeout(timer)
          this.ErrMsg = '您输入的顾客手机号格式不正确‍'
          this.MsgFlag = true;
          timer = setTimeout(() => {
            _this.MsgFlag = false
        }, 2500)
        return;
      }
      if(_this.codeArr.length == 1 && _this.codeArr[0].userIpt == ''){
          window.clearTimeout(timer);
          this.ErrMsg = '请输入至少一张电子票验证码';
          this.MsgFlag = true;
          timer = setTimeout(() => {
              _this.MsgFlag = false;
          }, 2500)
          return
      }


      for (var i = 0; i < codeData.length; i++) {
        if (codeData[i].userIpt != '') {
          tempArr.push(codeData[i].userIpt);
        }
      }
      this.submitCodeArr = tempArr
      console.log(tempArr);

      for (var j = 0; j < codeData.length; j++) {
        if (codeData[j].userIpt == '') {
          this.codeArr.splice(j, 1)
        }
      }
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
    toSubmit() {
      let _this = this;
      this.dialog = false
      this.ajax(_this.port.checkIn, {
        phone: _this.userPhone,
        code: _this.submitCodeArr
    }, function(res, msg) {
        alert(msg)
          window.clearTimeout(timer);
          this.ErrMsg = msg;
          this.MsgFlag = true;
          timer = setTimeout(() => {
              _this.MsgFlag = false;
          }, 2500)
      })
    }
  }
}
</script>
<style>
#checkIn {
  padding-bottom: 4.5rem;
}

.mu-text-field-input {
  border: none !important;
}

.checkIn-phone-row {
  padding-right: 1.5rem;
  background-color: #fff;
  height: 4rem;
  padding-top: 1rem;
}

.checkIn-code-row {
  padding: 0 3rem;
  background-color: #fff;
  height: 4rem;
  padding-top: 1rem;
}

.checkIn-paper {
  height: 3.3rem;
  width: 3.3rem;
  position: fixed;
  bottom: 0.5em;
  right: 0.6rem;
  text-align: center;
  background-color: #fff;
  background-color: rgb(246, 135, 4);
  color: #fff;
}

.minus-btn {
  width: 2.5rem;
  height: 2.5rem;
  margin-top: -1.3rem;
  margin-right: -2rem;
  line-height: 0.5rem;
}

.checkIn-submitBtn {
  width: 73%;
  height: 2.5rem;
  position: fixed;
  bottom: 0.9rem;
  left: 1rem;
}

.checkIn-wran {
  background-color: #fdfef0;
  color: red;
  padding: 0.5rem;
  margin-bottom: 1.2rem;
}
</style>
