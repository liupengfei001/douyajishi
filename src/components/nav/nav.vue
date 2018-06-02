<template>
<div id="nav">
  <mu-paper id="nav" style="height:3.2rem;">
    <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
      <mu-bottom-nav-item to="/main/active" value="active" title="豆芽活动" icon="nature" >
      </mu-bottom-nav-item>
      <mu-bottom-nav-item to="/main/center" value="center" title="我的豆芽" icon="home" />
    </mu-bottom-nav>
  </mu-paper>
</div>
</template>
<script>
export default {
  name: "nav",
  data() {
    return {
      msg: ' ',
      bottomNav: 'active',
    }
  },
  methods: {
    handleChange(val) {
    sessionStorage.setItem('navName' , val)
    this.bottomNav = val;
    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    var bottomNavNow = sessionStorage.getItem('navName')
      if(bottomNavNow){
          this.bottomNav = bottomNavNow;
      }
  }
}
</script>
<style>
#nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000000
}
.mu-bottom-item-text{
    margin-top: -8px;
}
</style>
