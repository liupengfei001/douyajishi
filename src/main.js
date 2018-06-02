// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MuseUi from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'
import router from './router'
import akAjaxBetter from './ak_AjaxBetter.js'
import loadingModel from './components/loadingModel/index.js'
// require('./../static/lib/theme-my.less');
// import './../static/lib/theme-my.less'
Vue.use(MuseUi)
Vue.use(loadingModel)
Vue.use(akAjaxBetter)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
