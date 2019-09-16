<template>
  <div>
    <v-header v-if="isLogin"/>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <List v-if="isLogin"/>
    <User v-if="isLogin"/>
  </div>
</template>
<script>
import Header from '@@/header/Header'
import LogIn from '@@/userlogin/LogIn'
import User from '@@/user/User'
import List from '@@/list/List'
import { storage } from '@/common/js/util.js'
import { mapState, mapMutations } from 'vuex'
// router.push({name: 'content', params: {catType: 'fast'}})
export default {
  name: 'app',
  components: {
    'v-header': Header,
    List,
    User,
    LogIn
  },
  data(){
    return {
      
    }
  },
  created() {
    const cookie = storage.getCookie()
    let user = cookie.uid
    if (user) {
      this.$store.commit('changeUser', user)
    }
  },
  beforeMount() {
    let a = document.getElementById('box-wrapper')
    document.body.removeChild(a)
  },
  computed: {
    ...mapState([
      'ScInfo',
      'allScInfo',
      'collectionpointxy',
      'isLogin'
    ])
  },
  methods: {
    getLocation() {
      this.$refs.map.getLocation()
    },
    ...mapMutations([
      'setAllScInfo',
      'setScInfo',
      'setcollectionpoint',
      'setcollectionpointxy',
      'setcurrentPoint'
    ])
  },
  mounted(){
    var _this=this;
    // setTimeout(function(){
    //   router.push({name: 'content', params: {catType: 'fast'}})
    //     _this.isLogin=true
    // },3000);
  	this.$http.get("/api/SystemManage/Organize/GetTreeJson").then(function(data){
	  		//获取所有水厂信息
	  		_this.setAllScInfo(data.data)
	  		//默认设置水厂信息
	  		_this.setScInfo({
	    		   id:_this.allScInfo[0].ChildNodes[0].ChildNodes[0].id,
	    	     scname:_this.allScInfo[0].ChildNodes[0].ChildNodes[0].text
	      })
	  		//请求获取当前水厂的采集点信息
	  		_this.$http.get("/api/Map/MonitorPonitManager/GetTreeJson",{
	  			params: {
			      organizeId:_this.ScInfo.id
			    }
	  		}).then(function(data){
	  			 _this.setcollectionpoint(data.data)
	  		})
	  		//请求获取当前水厂采集点坐标
	  		_this.$http.get("/api/Map/MonitorPonitManager/GetTreeJson",{
	  			params: {
			      organizeId:_this.ScInfo.id,
			      returnType:1
			    }
	  		}).then(function(data){
	  			  _this.setcollectionpointxy(data.data)
	  			  if(_this.collectionpointxy.length>0){
	  			  	_this.setcurrentPoint(_this.collectionpointxy[0])
	  			  }else{
	  			  	_this.setcurrentPoint("暂没找到相关监测点")
	  			  }  
	  		})
    })
  }
  
}
</script>

<style lang="scss">
@import './common/scss/base.scss';
</style>
