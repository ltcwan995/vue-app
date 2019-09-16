// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import axios from 'axios'
import 'vue-awesome/icons'
import 'tab-slider/dist/index.css'
import {Loading,Toast,Confirm} from 'vue-dialog-simple'
import router from '@/router/index.js'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Confirm)
/* eslint-disable no-new */
router.beforeEach((to, from, next)=>{
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const type = to.meta.type
  // 判断该路由是否需要登录权限
  if (type === 'login') {
    if (localStorage.getItem("isLogin")==="true") {
      next()
    } else {
      console.log("请先登录")
      next('/login')
    }
  } else {
    next()  // 确保一定要有next()被调用
  }
}),
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
