<template>
  <div>
    <div>我是登录页面</div>
    <input type="button" value="登录" @click="login"/>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
     name:'Login',
     computed: {
        ...mapState([
          'isLogin'
        ]),
     },
     methods: {
      ...mapMutations([
        'setLogin'
      ]),
      login(){
        this.setLogin(true)
        localStorage.setItem("isLogin",true)
        this.$router.push({path:'/fast'})
      }
     },
     activated(){
       if(this.isLogin){
          console.log(this.isLogin)
          this.$router.push({path:'/fast',query:{key:123}})
        }
     }
     
}
</script>

<style>

</style>