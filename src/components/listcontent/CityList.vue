<template>
	<div>
	  <div class="city-list">
	  	<div class="cur-city">当前水厂:{{ScInfo.scname}}</div>
	    <div class="other-city" ref="listWrapper" v-for="item in allCity[0].ChildNodes">
	    	<h2 class="city-flag-fixed" ref="fixedFlag">{{item.text}}</h2>
	      <ul>
	        <li style="pointer-events: auto;">
	        	<ul>
	        		<li class="city-item" v-for="it in item.ChildNodes" @click="changeSC(it.id,it.text)">{{it.text}}</li>
	        	</ul>
	        </li>
	      </ul>
	    </div>
	  </div>
	</div>
</template>
<script>
import BScroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
export default {
  props:['allCity'],
  mounted() {
    
  },
  data() {
    return {
      
    
    }
  },
  computed: {
    ...mapState([
      'ipCity',
      'isListVisible',
      'cityInput',
      'curCity',
      'ScInfo',
      'collectionpointxy'
    ]),
  },
  //监听水厂信息修改后重新获取采集点信息
  watch:{
      $route: {
      handler: function(val, oldVal){
        console.log(val);
      },
      // 深度观察监听
      deep: true
    },
    ScInfo:{
      handler(newName, oldName) {
      	if(newName){
      		var _this=this;
      	    //请求获取当前水厂采集点坐标
	  		this.$http.get("/api/Map/MonitorPonitManager/GetTreeJson",{
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
            console.log('我切换了水厂');
      	}
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapMutations([
      'updateCity',
      'updateCityInput',
      'hideList',
      'setScInfo',
      'setcollectionpointxy',
      'setcurrentPoint'
    ]),
    changeSC(id,name){
    	this.setScInfo({
    		 id:id,
    	     scname:name
    	})
    	this.hideList()
    }
  }
}
</script>

<style lang="scss">
@import '../../common/scss/mixin.scss';
.city-list {
  position: fixed;
  top: 50px;
  left: 2%;
  right: 2%;
  bottom: 0;
  box-shadow: 1px -1px 1px rgba(0, 0, 0, .2), -1px 0 1px rgba(0, 0, 0, .2);
  overflow: hidden;
  z-index:1000;
  
  .cur-city {
    position: relative;
    padding: 0 20px;
    height:30px;
    line-height:30px;
    background-color: #fff;
    z-index:1000;
    width:100%;
  }
  .city-flag-fixed {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 200;
    color: gray;
    background-color: #f7f7f7;
    z-index: 10;
  }
  .other-city {
    width: 100%;
    left: 0;
    top: 40px;
    background-color: #fff;
    overflow: hidden;
    .city-flag {
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      font-weight: 200;
      color: gray;
      background-color: #f7f7f7;
    }
    .city-item {
      position: relative;
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      @include border-1px-bottom;
      &.active {
        background-color: rgba(230, 230, 230, 0.5);
      }
    }
  }
  .info {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    background-color: #fff;
    z-index: 21;
    .text {
      position: absolute;
      top: 50%;
      width: 100%;
      transform: translateY(-50%)
    }
  }
}
</style>
