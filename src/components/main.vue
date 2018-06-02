<template>
<div id="app">
  <router-view></router-view>
  <nav-view></nav-view>
</div>
</template>


<script>
import nav from '@/components/nav/nav.vue' //依赖注入
export default {
  name: 'mian',
  data() {
    return {}
  },
  components: {
    'nav-view': nav
},
mounted: function mounted() {
    let _this = this;
  //do something after mounting vue instance

  if (sessionStorage.getItem('shareActIn') == 'true') {
    sessionStorage.setItem('shareActIn', false)
    _this.$router.push({
      path: 'activitiesDeta',
      name: 'activitiesDeta',
      params: {
        activitiesId: sessionStorage.getItem('shareActId'),
      }
    })
  }
  if (sessionStorage.getItem('shareStoreIn') == 'true') {
    sessionStorage.setItem('shareStoreIn', false)
    _this.$router.push({
      path: 'storeDeta',
      name: 'storeDeta',
      params: {
        storeId: sessionStorage.getItem('shareStoreId'),
      }
    })
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000000
}

.ak-top-loading-box {
  height: 4px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 110000;
}
</style>
