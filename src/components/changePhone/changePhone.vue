<template>
<div id="changePhone">
  <mu-stepper :activeStep="activeStep" orientation="vertical">
    <mu-step>
      <mu-step-label>
        输入手机号
      </mu-step-label>
      <mu-step-content>
        <p>
          请您输入您需要绑定的真实的手机号
        </p>
        <mu-text-field label="手机号" v-model="phoneIpt" labelFloat/><br/>
        <mu-raised-button v-show="getCodeFlag" label="获取验证码" @click="getTheCode" primary/>
        <span v-show="!getCodeFlag">{{countDown}}s后重新获取</span>
      </mu-step-content>
    </mu-step>
    <mu-step>
      <mu-step-label>
        输入验证码
      </mu-step-label>
      <mu-step-content>
        <p>
          请输入您获取到的验证码
        </p>
        <mu-text-field label="验证码" labelFloat v-model="codeIpt" /><br/>
        <mu-raised-button label="进行绑定" class="demo-step-button" @click="bindPhone" primary/>
        <mu-flat-button label="更换手机号" class="demo-step-button" @click="handlePrev" />
      </mu-step-content>
    </mu-step>
    <mu-step>
      <mu-step-label>
        绑定成功
      </mu-step-label>
      <mu-step-content>
        <p style="margin-bottom:1.5rem;">
          恭喜您，绑定成功~
        </p>
        <mu-raised-button label="完成" class="demo-step-button" @click="$router.back(-1)" primary/>
      </mu-step-content>
    </mu-step>
  </mu-stepper>


  <!-- <div class="backBtn" @click="$router.back(-1)"><i class="iconfont icon-fanhui3"></i></div> -->
  <Loading id="Loading" :TopBarFlag="TopBarFlag" :MaskFlag="MaskFlag" :LoadImgFlag="LoadImgFlag" :ErrMsg="ErrMsg" :MsgFlag="MsgFlag"></Loading>

</div>
</template>
<script>
var timer;
var intervalTimer;
export default {
  name: "changePhone",
  data() {
    return {
      TopBarFlag: false,
      MaskFlag: false,
      LoadImgFlag: false,
      ErrMsg: '',
      MsgFlag: false,
      activeStep: 0,
      getCodeFlag: true,
      countDown: 60,
      phoneIpt: '',
      codeIpt: '',
    }
  },
  computed: {},
  methods: {
    handleNext() {
      this.activeStep++
    },
    handlePrev() {
      this.activeStep--
    },
    reset() {
      this.activeStep = 0
    },
    getTheCode() {
      let _this = this;
      if (_this.phoneIpt == '') {
        //错误信息展示
        window.clearTimeout(timer)
        this.ErrMsg = '手机号不能为空~！‍'
        this.MsgFlag = true;
        timer = setTimeout(() => {
          _this.MsgFlag = false
        }, 1500)
      } else {
        if (!/^1(3[0-9]|4[57]|5[0-35-9]|7[013678]|8[0-9])[\d]{8}$/g.test(_this.phoneIpt)) {
          //错误信息展示
          window.clearTimeout(timer)
          this.ErrMsg = '抱歉，您的手机号貌似有点问题~！‍'
          this.MsgFlag = true;
          timer = setTimeout(() => {
            _this.MsgFlag = false
          }, 1500)
          return;
        } else {

          this.ajax(_this.port.getCode, {
            phone: _this.phoneIpt
          }, function(res, msg) {
            _this.ErrMsg = msg;
            _this.MsgFlag = true;
            window.clearTimeout(timer)
            timer = setTimeout(() => {
              _this.MsgFlag = false
            }, 1200)
            _this.activeStep = 1
            _this.getCodeFlag = false
            intervalTimer = setInterval(function() {
              if (_this.countDown > 0) {
                _this.countDown--;
              } else {
                _this.getCodeFlag = true;
                _this.countDown = 60;
                clearInterval(timer);
              }
            }, 1000);
          }, )
        }
      }
    },
    bindPhone() {
      let _this = this;
      if (_this.codeIpt == '') {
        //错误信息展示
        window.clearTimeout(timer)
        this.ErrMsg = '验证码不能为空哟~！‍'
        this.MsgFlag = true;
        timer = setTimeout(() => {
          _this.MsgFlag = false
        }, 1500)
      } else {
        this.ajax(_this.port.bindPhone, {
          phone: _this.phoneIpt,
          code: _this.codeIpt
        }, function(res, msg) {
          _this.ErrMsg = msg;
          _this.MsgFlag = true;
          window.clearTimeout(timer)
          timer = setTimeout(() => {
            _this.MsgFlag = false
          }, 1200)
          _this.activeStep = 2
        }, 'top')
      }
    },
  }
}
</script>
<style>
#changePhone {
  padding: 2rem 1.2rem 0;
}

#changePhone p {
  margin-top: 1.5rem;
  font-size: 16px;
  color: #555;
}
</style>
