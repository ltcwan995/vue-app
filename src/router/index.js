import Vue from 'vue'
import Router from 'vue-router'
import vContent from '@@/content/Content'
import Sharing from '@@/sharing/Sharing'
import Passenger from '@@/sharing/Passenger'
import Driver from '@@/sharing/Driver'
import MessageList from '@@/messageList/MessageList'
import Chartdetail from '@@/chartdetail/Chartdetail'
import Login from '@@/login/Login'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'router-active',
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/sharing',
      name: 'sharing',
      redirect: '/sharing/passenger',
      component: Sharing,
      children: [
        {
          path: 'passenger',
          name: 'passenger',
          component: Passenger
        },
        {
          path: 'driver',
          name: 'driver',
          component: Driver
        }
      ]
    },
    {
      path: '/fast',
      name: 'content',
      component:vContent,
      meta: {
        title: '首页',
        type: 'login'  // 是否需要判断是否登录,这里是需要判断
      }

    },
    {
      path: '/message',
      name: 'messageList',
      component:MessageList,
      meta: {
        title: '首页',
        type: 'login'  // 是否需要判断是否登录,这里是需要判断
      }
    },
    {
      path: '/detail',
      name: 'Chartdetail',
      component:Chartdetail,
      meta: {
        title: '首页',
        type: 'login'  // 是否需要判断是否登录,这里是需要判断
      }
    },
    {
      path: '/login',
      name: 'Login',
      component:Login,
      meta: {
        title:'测试006',
        type:''  // 是否需要判断是否登录,这里是需要判断
      }

    }
  ]
})
