<template>
  <div id="map-container" ref="map">
      
  </div>
</template>

<script>
import { fillTheScreen } from '@/common/js/util.js'
import { mapState, mapMutations } from 'vuex'
const HEADER_HEIGHT = 86
var infoWindow;
var map;
var marker;
export default {
  mounted() {
    this.$nextTick(() => {
      if(this.currentPoint.id){
	    	this._initMap(this.currentPoint.id)
	    }
      this.toast()
    })
  },
  data() {
    return {
      isTimeInfoVisible: true,
      isMessageVisible: false,
      message: '',
      messageDelay: 2000
    }
  },
  computed: {
    ...mapState([
      'currentPoint'
    ]),
  },
  //监听采集点变化
	watch:{
	    currentPoint:{
	      handler(newName, oldName) {
	        this.toast()
	        if(this.currentPoint.id){
	        	this._initMap(this.currentPoint.id)
	        }else{
	        	this.clearMap()
	        	this.$toast({
            text:'未能找到相关监测点数据'
           })
	        }
	      },
	      immediate: true,
	      deep: true
	    }
	},
  methods: {
  	toast(){
        this.$toast({
            text:'采集点定位中....'
        })
    },
    //初始化数据地图,传参采集点ID
    _initMap(id){
    	var _this=this;
    	//请求获取当前水厂采集点坐标
	  	this.$http.get("/api/Map/ValueTagManager/GetTagValueFromMP",{
  			params: {
		      MonitoringPointId:id,
		    }
	  	}).then(function(data){
	  			 // 创建地图
	      _this.map = new AMap.Map(target, mapOptions)
	      // 定位到采集点并获取数据
	      _this.addMarker(_this.map,data.data)
	  	})
      // 使地图容器自适应窗口余下高度
      const target = this.$refs.map
       // 这里86是header的高度
      fillTheScreen({target, height: HEADER_HEIGHT})
      // 地图选项
      const mapOptions = {
        mapStyle: 'amap://styles/9243d6059d95b04e053596c4ab715c52',
        resizeEnable: true,
        center: [this.currentPoint.x,this.currentPoint.y],
        zoom: 16
      }
      /* eslint-disable no-undef */
    },
    //添加marker标记
    addMarker(map,info){
    	var _this=this;
    	 map.clearMap();
		    marker = new AMap.Marker({
		        map: map,
		        position: [this.currentPoint.x,this.currentPoint.y]
		    });
		    //创建窗体信息
		    infoWindow=_this.initWindow(info);
		    //自动打开
		    setTimeout(function(){
		    	infoWindow.open(map, marker.getPosition())
		    },500)
		    //鼠标点击marker弹出自定义的信息窗体
		    AMap.event.addListener(marker, 'click', function () {
		       infoWindow.open(map, marker.getPosition());
		    });
    },
    //清空地图
    clearMap(){
    	if(marker){
    		this.map.remove(marker)
    		this.map.remove(infoWindow)
    	}
    },
    //获取采集点下的变量数据
    //实例化窗体信息
    initWindow(info){
//  	console.log(info)
    	var _this=this;
    	var content;
    	if(info.state==="success"){
        content = [];
	      for(var i=0;i<info.data.list.length;i++){
	      	content.push(info.data.list[i].name+":"+info.data.list[i].value+info.data.list[i].unit);
	      }
			  content.push("<p>更新时间:"+info.data.lastTime+"</p>");
    	}else if(info.state==="error"){
    		content=["该采集点未配置变量,请配置后重试"];
    	}
			return new AMap.InfoWindow({
			    isCustom:true,  //使用自定义窗体
			    content: _this.createInfoWindow(_this.currentPoint.text, content.join("<br/>")),
			    offset: new AMap.Pixel(16, -45),
			    autoMove:true
			})
    },
    //创建自定义窗体
    createInfoWindow(title,content){
    	var _this=this;
    	  var info = document.createElement("div");
        info.className = "custom-info input-card content-window-card";
		    //可以通过下面的方式修改自定义窗体的宽高
		    //info.style.width = "400px";
		    // 定义顶部标题
		    var top = document.createElement("div");
		    var titleD = document.createElement("div");
		    var closeX = document.createElement("img");
		    top.className = "info-top";
		    titleD.innerHTML = title;
		    closeX.src = "https://webapi.amap.com/images/close2.gif";
		    closeX.onclick = _this.closeInfoWindow;
		
		    top.appendChild(titleD);
		    top.appendChild(closeX);
		    info.appendChild(top);
		
		    // 定义中部内容
		    var middle = document.createElement("div");
		    middle.className = "info-middle";
		    middle.style.backgroundColor = 'white';
		    middle.innerHTML = content;
		    info.appendChild(middle);
		
		    // 定义底部内容
		    var bottom = document.createElement("div");
		    bottom.className = "info-bottom";
		    bottom.style.position = 'relative';
		    bottom.style.top = '0px';
		    bottom.style.margin = '0 auto';
		    var sharp = document.createElement("img");
		    sharp.src = "https://webapi.amap.com/images/sharp.png";
		    bottom.appendChild(sharp);
		    info.appendChild(bottom);
		    return info;
    },
    //关闭窗体信息
    closeInfoWindow(){
       infoWindow.close()
    },
    ...mapMutations([
      
    ])
  },
  components: {
    
  }
}
</script>

<style lang="scss">
#map-container {
  .amap-controls {
    .amap-geolocation-con {
      z-index: 1!important;
    }
  }
  .amap-logo {
    z-index: 1;
  }
  .amap-copyright {
    z-index: 1
  }
   html, body, #container {
            height: 100%;
            width:100%;
        }

        .content-window-card {
            position: relative;
            box-shadow: none;
            bottom: 0;
            left: 0;
            width: auto;
            padding: 0;
        }

        .content-window-card p {
            height: 2rem;
        }

        .custom-info {
            border: solid 1px silver;
        }

        div.info-top {
            position: relative;
            background: none repeat scroll 0 0 #F9F9F9;
            border-bottom: 1px solid #CCC;
            border-radius: 5px 5px 0 0;
        }

        div.info-top div {
            display: inline-block;
            color: #333333;
            font-size: 14px;
            font-weight: bold;
            line-height: 31px;
            padding: 0 10px;
        }

        div.info-top img {
            position: absolute;
            top: 10px;
            right: 10px;
            transition-duration: 0.25s;
        }

        div.info-top img:hover {
            box-shadow: 0px 0px 5px #000;
        }

        div.info-middle {
            font-size: 12px;
            padding: 10px 6px;
            line-height: 20px;
        }

        div.info-bottom {
            height: 0px;
            width: 100%;
            clear: both;
            text-align: center;
        }

        div.info-bottom img {
            position: relative;
            z-index: 104;
        }

        span {
            margin-left: 5px;
            font-size: 11px;
        }

        .info-middle img {
            float: left;
            margin-right: 6px;
        }
}
</style>
