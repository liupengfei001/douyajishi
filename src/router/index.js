import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main.vue'
import active from '@/components/indexRouter/active.vue'
import center from '@/components/indexRouter/center.vue'
import myDetail from '@/components/myDetail/myDetail.vue'
import myCollect from '@/components/myCollect/myCollect.vue'
import myActivities from '@/components/myActivities/myActivities.vue'
import storeDeta from '@/components/storeDeta/storeDeta.vue'
import activitiesDeta from '@/components/activitiesDeta/activitiesDeta.vue'
import electronicTicket from '@/components/electronicTicket/electronicTicket.vue'
import searchIndex from '@/components/searchIndex/searchIndex.vue'
import placeOrder from '@/components/placeOrder/placeOrder.vue'
import changePhone from '@/components/changePhone/changePhone.vue'
import applyForRefund from '@/components/applyForRefund/applyForRefund.vue'
import myRefund from '@/components/myRefund/myRefund.vue'
import refundDeta from '@/components/refundDeta/refundDeta.vue'
import checkIn from '@/components/checkIn/checkIn.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/main',
      name: 'main',
      component: main,
      redirect: '/main/active',
      children: [{
          path: '/main/active',
          component: active
        },
        {
          path: '/main/center',
          component: center
        },
      ]
    },
    {
      path: '/myDetail',
      name: 'myDetail',
      component: myDetail
    },
    {
      path: '/myCollect',
      name: 'myCollect',
      component: myCollect
    },
    {
      path: '/myActivities',
      name: 'myActivities',
      component: myActivities
    },
    {
      path: '/storeDeta',
      name: 'storeDeta',
      component: storeDeta
    },
    {
      path: '/activitiesDeta',
      name: 'activitiesDeta',
      component: activitiesDeta
    },
    {
      path: '/electronicTicket',
      name: 'electronicTicket',
      component: electronicTicket
    },
    {
      path: '/searchIndex',
      name: 'searchIndex',
      component: searchIndex
    },
    {
      path: '/placeOrder',
      name: 'placeOrder',
      component: placeOrder
    },
    {
      path: '/changePhone',
      name: 'changePhone',
      component: changePhone
    },
    {
      path: '/applyForRefund',
      name: 'applyForRefund',
      component: applyForRefund
    },
    {
      path: '/myRefund',
      name: 'myRefund',
      component: myRefund
    },
    {
      path: '/refundDeta',
      name: 'refundDeta',
      component: refundDeta
    },
    {
      path: '/checkIn',
      name: 'checkIn',
      component: checkIn
    },
    {path:'*', redirect:'/main/active'}  //重定向（进来的默认跳转位置）
  ]
})
