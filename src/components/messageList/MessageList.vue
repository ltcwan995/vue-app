<template>
<!-- 中间内容 -->
<div class="main">
  <!--标的进度-->
  <div class="con-circle">
    <aside class="sec_ce">
      <p class="sec_ce_id">处理水量</p>
      <img src="images/zhuti.png" alt="">
      <p class="sec_ce_pc ng-binding">200<span class="sec_ce_b">万吨</span></p>
    </aside>
  </div>
  <!--标的详细-->
  <!--信息列表-->
  <div class="c-detail">
    <div class="c-tabsmsg">
    	<div class="c-tabstit-wrap">
        <div class="c-tabstit"> <span class="c-xmxqtit on" data-index="0" @click="loadDetail">水厂简介</span></div>
      </div>
      <div class="project-status" v-html="Scontent" style="color: #000000!important;">
	     {{Scontent}}
	  </div>
      <div class="c-tabstit-wrap">
        <div class="c-tabstit"> <span class="c-xmxqtit on" data-index="0">数据监控</span></div>
      </div>
      <div class="project-status">
      	<div class="project-left-time ui-fs-12 text-center" v-if="Scinfodata">更新时间:{{Scinfodata.lastTime}}</div>
	    <div class="project-base-info">
	      <div class="col-xs-4 ui-border-right">
	        <p class="text-nowrap">正常</p>
	        <p class="ui-fs-12 text-nowrap">2</p>
	      </div>
	      <div class="col-xs-4 ui-border-right">
	        <p class="text-nowrap">离线</p>
	        <p class="ui-fs-12">0</p>
	      </div>
	      <div class="col-xs-4">
	        <p class="text-nowrap">告警</p>
	        <p class="ui-fs-12">0</p>
	      </div>
	    </div>
	  </div>
	  <div class="tips" v-show="!IshowInfo">当前未来配置采集点</div>
      <div class="c-tabs-cnt c-hkjhinfo" v-show="IshowInfo">
        <table width="100%">
          <tbody>
            <tr>
              <th>行号</th>
              <th>Tag</th>
              <th>名称</th>
              <th>监测值</th>
              <th>状态</th>
            </tr>
            <!-- <tr v-if="Scinfodata" v-for="(item,index) in Scinfodata.list">
              <td>{{index+1}}</td>
              <td>{{item.tag}}</td>
              <td>{{item.name}}</td>
              <td>{{item.value}}{{item.unit}}</td>
              <td><em :class="{whuan:item.status===0,gg:item.status===1,gd:item.status===2,lz:item.status===3}">{{item.status|status}}</em></td>
            </tr> -->
          </tbody>
        </table>
        <div class="clear"></div>
      </div>
    </div>
    <div class="c-tabsmsg">
      <div class="c-tabstit-wrap">
        <div class="c-tabstit"> <span class="c-xmxqtit on" data-index="0">运行告警</span></div>
      </div>
      <div class="tips" v-show="!IshowInfo">当前未来配置采集点</div>
      <div class="project-status">
      	 <div class="project-left-time ui-fs-12 text-center" v-if="Scinfodata">更新时间:{{Scinfodata.lastTime}}</div>
	    <div class="project-base-info" v-show="IshowInfo">
	      <div class="col-xs-4 ui-border-right">
	        <p class="text-nowrap">正常</p>
	        <p class="ui-fs-12 text-nowrap">{{statusInfo.zc}}</p>
	      </div>
	      <div class="col-xs-4 ui-border-right">
	        <p class="text-nowrap">过低</p>
	        <p class="ui-fs-12">{{statusInfo.gd}}</p>
	      </div>
	      <div class="col-xs-4">
	        <p class="text-nowrap">过高</p>
	        <p class="ui-fs-12">{{statusInfo.gg}}</p>
	      </div>
	      <div class="col-xs-4">
	        <p class="text-nowrap">零值</p>
	        <p class="ui-fs-12">{{statusInfo.lz}}</p>
	      </div>
	    </div>
	  </div>
    </div>
  </div>
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      Scinfodata:'',
      IshowInfo:true,
      Scontent:''
    }
  },
  filters:{
　　status:function(myInput){
　　　　if(myInput===0){
	      return "正常"
       }else if(myInput===1){
       	  return "过高"
       }
       else if(myInput===2){
       	  return "过低"
       }else if(myInput===3){
       	  return "零值"
       }
　　}
　},
  computed: {
    ...mapState([
      'ScInfo'
    ]),
    ScAlldata:function(){
        return this.Scinfodata
    },
    //判断运行个数
    statusInfo:function(){
    	let zc=0;
    	let gd=0;
    	let lz=0;
    	let gg=0;
    	if(this.Scinfodata){
    		this.Scinfodata.list.forEach(function(item,index){
    		console.log(item)
    		if(item.status===0){
               	  zc++; 		  
	       }else if(item.status===1){	
	       	      gg++;
	        }
	        else if(item.status===2){
	        	  gd++;
	        }else if(item.status===3){
	        	lz++;
	        }
    	})
    	}
    	return{
    		  zc,
    	    gd,
    	    lz,
    	    gg
    	}
    }
    
  },
  //监听水厂信息修改后重新获取采集点信息
  watch:{
    ScInfo:{
    	handler(newVal,old) {
            console.log(this.ScInfo.id)
            var _this=this;
      	    //请求获取当前水厂采集点坐标
	  		this.$http.get("api/Map/ValueTagManager/GetListJsonFromOrganize_Lite",{
	  			params: {
			      organizeId:_this.ScInfo.id,
			    }
	  		}).then(function(data){
	  			  if(data.data.state==="success"){
	  			  	_this.Scinfodata=data.data.data
	  			  	_this.IshowInfo=true
	  			  }else if(data.data.state==="error"){
	  			  	_this.Scinfodata=''
	  			  	_this.IshowInfo=false
	  			  }
	  	    })
	  		//获取水厂简介
	  		this.$http.get("api/SCmanage/scHome/GetPlanContent",{
	  			params: {
			      organizeId:_this.ScInfo.id,
			    }
	  		}).then(function(data){
	  			if(data.data.state==="success"){
	  			  	_this.Scontent=data.data.data
	  			}
	  	    })
        },
        deep: true
    }
  },
  mounted() {
	  // this.loaddata(this.ScInfo.id)
	  // this.loadScContent(this.ScInfo.id)
  },
  methods: {
    //加载数据
    loaddata:function(scid){
    	   var _this=this;
      	    //请求获取当前水厂采集点坐标
	  		this.$http.get("api/Map/ValueTagManager/GetListJsonFromOrganize_Lite",{
	  			params: {
			      organizeId:scid,
			    }
	  		}).then(function(data){
	  			  if(data.data.state==="success"){
	  			  	_this.Scinfodata=data.data.data
	  			  	_this.IshowInfo=true
	  			  }else if(data.data.state==="error"){
	  			  	_this.Scinfodata=""
	  			  	_this.IshowInfo=false
	  			  }
	  	    })
    },
    //加载水厂简介
    loadScContent:function(scid){
    	var _this=this;
    	this.$http.get("api/SCmanage/scHome/GetPlanContent",{
	  			params: {
			      organizeId:scid
			    }
  		}).then(function(data){
  			if(data.data.state==="success"){
  			  	_this.Scontent=data.data.data
  			}
  	    })
		},
		//加载趋势曲线
		loadDetail:function(){
			this.$router.push({path:'/detail',query:{key:123}})
		}
  },
  components: {
    
  }
}
</script>

<style scoped>
	.col-xs-4{
		text-align: center;
	}
	.para{
		color: #000000!important;
	}
	/* 项目详情 */
.tips{
	text-align: center;
	padding: 10px 10px;
}
.con-circle{ width:100%; background:#0caffe;display:block; overflow:hidden;}
.sec_ce{display:-webkit-box;display:-moz-box;display:-o-box;display:box;-webkit-box-pack:center;-moz-box-pack:center;-o-box-pack:center;box-pack:center;height:163px;position:relative;}
.sec_ce_id{position:absolute;left:0;top:0;width:100%;text-align:center;padding-top:25px;color:#fff}
.sec_ce_p{position:absolute;left:0;top:0;width:100%;text-align:center;padding-top:70px;color:#fff}
.sec_ce_pc{position:absolute;left:0;top:49px;width:100%;text-align:center;color:#fff;font-size:50px}
.sec_ce_b{font-size:30px}
.sec_ce_pt{position:absolute;left:0;top:0;width:100%;text-align:center;padding-top:135px}
.sec_ce_pt span{color:#fff;font-size:14px}
.sec_ce img{width:200px}

.col-xs-4 { width:20%; float:left;}
.ui-fc-blue { color:#0caffe;}
.project-status{background:#fff; color: #666; padding:5% 5%;}
.project-status .ui-fs-18{font-size:18px}
.project-status .project-base-info{padding:15px 0;overflow:hidden}
.project-status .project-base-info .col-xs-4{padding:0 0 0 10px}
.project-status .project-base-info .ui-border-right{border-right:1px solid #eee}
.project-status .project-left-time{padding:10px 0;border-top:1px solid #d7d7d7;border-bottom:1px solid #d7d7d7;color:#666;text-align: left;}
.ui-fs-12 { font-size:18px;}
.text-center{ text-align:center}

.c-detailinfo{float:left; padding:0 5%; border-bottom:1px solid #eee; background-color:#fff; width:90%;}
.c-detailinfo dl{float:left; font-size:14px; width:100%; border-bottom:1px dashed #eee; padding:14px 0;}
.c-detailinfo dl.none{border-bottom:none;}
.c-detailinfo dt{ float:left; width:25%; color:#848484;}
.c-detailinfo dd{float:left; width:75%;color:#4A4A4A;}

.c-detail { display: block; margin-top: 1px;height: 600px;}
.c-tabsmsg{ float:left; margin-top:10px;background-color:#fff;border-top:1px solid #eee; border-bottom:1px solid #eee; margin-bottom:25px; width:100%;}
.c-tabsmsg .c-tabstit-wrap{height: 31px;}
.c-tabsmsg .c-tabstit{ height:29px; line-height:29px;  border-radius:2px; font-size:14px;background-color: #fff;}
.c-tabsmsg .c-tabstit.fixed{position:fixed; top:0px; width: 90%; padding:10px 0 12px; border-radius:0; z-index:5;}
.c-tabsmsg .c-tabstit span{display:block; float:left; width:24.5%; text-align:center; color:#0caffe;}
.c-tabsmsg .c-tabstit .c-xmxqtit{border:1px solid #0caffe; border-right:none; border-top-left-radius:2px; border-bottom-left-radius:2px; }
.c-tabsmsg .c-tabstit .c-bzcstit{ border:1px solid #0caffe;}
.c-tabsmsg .c-tabstit .c-hkjhtit{ border:1px solid #0caffe;border-left:none;}
.c-tabsmsg .c-tabstit .c-tzjltit{border:1px solid #0caffe; border-left:none; border-top-right-radius:2px; border-bottom-right-radius:2px;}
.c-tabsmsg .c-tabstit span.on{ background-color:#0caffe; color:#fff;}

@-webkit-keyframes myfirst { 0%   { top:0px;} 25%  { top:0px;} 50%  { top:5px;} 75%  { top:0px;} 100% {top:0px;}}

.c-xmxqinfo{ float:left; width:100%; }
.c-xmxqinfo h2{ height:42px; line-height:42px; color:#0caffe; font-size:14px;}
.c-xmxqinfo h3{ font-size:14px; margin-left:-6px; margin-bottom:5px;color:#4A4A4A;}
/* .c-xmxqinfo .c-xmxqcon{float:left; width:100%; font-size:12px; padding-bottom:10px; margin-bottom:10px; border-bottom:1px dashed #eee;} */
.c-xmxqinfo .c-xmxqcon{float:left; width:100%; font-size:12px; padding-bottom:10px; margin-bottom:10px; border-bottom:1px dashed #d1d1d1;} /* 20150506 */
.c-xmxqinfo .c-xmxqconno{ float:none;border-bottom:none;}
.c-xmxqinfo .c-xmxqcon dl{ float:left; width:100%; margin-bottom:5px;}
.c-xmxqinfo .c-xmxqcon dt{ float:left; width:23%;color:#848484;}
.c-xmxqinfo .c-xmxqcon dd{ float:left; width:77%;color:#4A4A4A;}
.c-xmxqinfo .c-xmxqcon ul li{ float:left; width:100%;color:#848484; margin-bottom:5px;}
.c-xmxqinfo .c-xmxqcon ul li b{ font-weight:normal;color:#4A4A4A;}
.c-xmxqinfo .c-xmxqcon .c-xmxqleft{ float:left; text-align:left; width: 50%; }
.c-xmxqinfo .c-xmxqcon .c-xmxqright{ float:right; text-align:left; width: 50%;}
.c-xmxqinfo .c-xmxqcon .assess{ float:left; width:100%; margin-top:5px;padding-bottom:10px; margin-bottom:10px; border-bottom:1px dashed #eee;}
.c-xmxqinfo .c-xmxqcon .assess .img{ float:left; margin-right:13px; }
.c-xmxqinfo .c-xmxqcon .assess .img img{width:59px; height:33px;}
.c-xmxqinfo .c-xmxqcon .assess .imgname{ float:left; height:33px; line-height:33px; color:#4A4A4A;}
.c-xmxqinfo .showimg h3{ margin-top:10px;}
.c-xmxqinfo .img-container img{width: 100%;margin-bottom: 10px;}
.yqts{ float:left; width:100%; text-indent:1em; background:#FEFFCE; color:#4A4A4A; font-size:12pxpx; height:29px; line-height:29px;  border-bottom:1px solid #eee; margin-top:-25px; margin-bottom:60px;}
.yqts i{ color:#848484}

#big-img{width: 100%;}

.c-con{ padding:15px 0px; display:block; overflow:hidden; border-bottom:1px dashed #d1d1d1; border-top:1px dashed #d1d1d1;}
.c-con h2{ line-height:20px; font-size:14px; color:#4c4c4c; font-weight:bold;}
.tab1 td{ line-height:30px; color:#4c4c4c; font-size:12px;}
.c-con p{ color:#4c4c4c; line-height:40px; font-size:12px;}
.wwzs{ width:100%; display:block; overflow:hidden;}
.wwzs_con{ width:41%; height:200px; border:1px solid #7f7f7f; padding:2%;}
.wwzs_con h3{ font-size:16px; color:#4c4c4c; line-height:90px; font-weight:normal;} .wwzs_con h3 em{ color:#0caffe; font-size:26px; font-weight:normal;}


.c-bzcsinfo{ float:left; width:100%;margin-bottom:10px; }
.c-bzcsinfo h2{ height:42px; line-height:42px; color:#0caffe; font-size:14px;}
.c-bzcsinfo .c-bzcsinfo{float:left; font-size:10px;line-height:180%; padding-bottom:10px; margin-bottom:10px; border-bottom:1px dashed #eee;}
.c-bzcsinfo .c-bzcsinfonone{padding-bottom:0; margin-bottom:0; border-bottom:none;}

.c-hkjhinfo{float:left; width:100%;text-align: center;}
.c-hkjhinfo table{border-collapse: collapse;border-spacing: 0; font-size:12px; color:#AAAAAA;}
.c-hkjhinfo tbody {display: table-row-group;}
.c-hkjhinfo tbody tr{display: table-row;}
.c-hkjhinfo tbody th{height:50px; line-height:50px; font-weight:normal; background-color:#F7F7F7;border-bottom:1px solid #DBDBDB;color: #666666;}
.c-hkjhinfo tbody td{height:65px; line-height:65px; border-bottom:1px dashed #eee;color: #000000;}
.c-hkjhinfo tbody .last td{ border-bottom:none;color: #000000;}
.c-hkjhinfo .addmore{color:#0caffe; font-size:12px; text-align:center; margin:15px 0;} 
.c-hkjhinfo .yhuan{ background:#0caffe; display: inline-block; border-radius: 2px; font-size: 12px; text-align: center; font-style: normal; width: 30px; height: 16px; line-height: 16px; color: #fff; margin-left:6px; }
.c-hkjhinfo .whuan{ background:green;display: inline-block; border-radius: 2px; font-size: 12px; text-align: center; font-style: normal; width: 30px; height: 16px; line-height: 16px; color: #fff;  margin-left:6px; }
.c-hkjhinfo .gg{ background:red;display: inline-block; border-radius: 2px; font-size: 12px; text-align: center; font-style: normal; width: 30px; height: 16px; line-height: 16px; color: #fff;  margin-left:6px; }
.c-hkjhinfo .gd{ background:orange;display: inline-block; border-radius: 2px; font-size: 12px; text-align: center; font-style: normal; width: 30px; height: 16px; line-height: 16px; color: #fff;  margin-left:6px; }
.c-hkjhinfo .lz{ background:indianred;display: inline-block; border-radius: 2px; font-size: 12px; text-align: center; font-style: normal; width: 30px; height: 16px; line-height: 16px; color: #fff;  margin-left:6px; }


.c-tzjlinfo{float:left; width:100%; margin-top:15px;margin-bottom:5px;  }
.c-tzjlinfo table{border-collapse: collapse;border-spacing: 0; font-size:12px; color:#AAAAAA;}
.c-tzjlinfo tbody {display: table-row-group;}
.c-tzjlinfo tbody tr{display: table-row;}
.c-tzjlinfo tbody th{height:50px; line-height:50px; font-weight:normal; background-color:#F7F7F7;border-bottom:1px solid #DBDBDB;}
.c-tzjlinfo tbody td{height:49px; line-height:20px; border-bottom:1px dashed #eee;}
.c-tzjlinfo tbody td a{ color:#f1483c; padding-left:5px;}
.c-tzjlinfo tbody .last td{ border-bottom:none;}
.c-tzjlinfo .addmore{color:#0caffe; font-size:12px; text-align:center; margin:15px 0;} 
.user-auto-icon { display: inline-block; width: 17px; height: 17px; text-align: center; line-height: 17px; background: #0caffe; border-radius: 2px; color: #fff; margin: 15px 0 0 5px; }  
</style>