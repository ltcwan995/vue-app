<template>
  <div class="content-wrapper">
    <v-map
      ref="map"
      @geoComplete="onGeoComplete"/>
    <map-input
      ref="mapInput"
      :isGeo="isGeo"
      @geoBtnClick="getLocation"/>
  </div>
</template>

<script>
import vMap from '@@/map/Map'
import MapInput from '@@/mapinput/MapInput'
export default {
  name: 'vContent',
  data() {
    return {
      isGeo:true
    }
  },
  //监听水厂信息修改后重新获取采集点信息
// watch:{
//  $route(to,from){
//    console.log(from.path);//从哪来
//    console.log(to.path);//到哪去
//    console.log(this)
//  }
// },
//mounted() {
//  
//},
  methods: {
    getLocation() {
      this.isGeo = true
      this.$refs.map.geolocation.getCurrentPosition()
    },
    onGeoComplete() {
      this.isGeo = false
    }
  },
  components: {
    vMap,
    MapInput
  }
}
</script>

<style>
</style>
