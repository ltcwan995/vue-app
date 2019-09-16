<template>
  <div class="location-list" ref="listWrapper">
    <ul>
      <li 
        class="location-item"
        v-for="(poi, index) in suggestedPois" 
        :key="poi.id" 
        ref="list"
        @click="TosetPoint(poi)"
      >
        {{poi.text}}
      </li>
    </ul>
    <p class="nodata" v-show="!suggestedPois.length>0">暂无采集点信息!</p>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import BScroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
export default {
  mounted() {
    
  },
  computed: {
    suggestedPois() {
      return this.$store.state.collectionpointxy
    },
    ...mapState([
      'ScInfo',
    ])
  },
  methods: {
    ...mapMutations([
      'setcurrentPoint',
      'hideList'
    ]),
    TosetPoint(poi){
    	 this.setcurrentPoint(poi)
    	 this.$store.commit("hideList")
    }
  },
  components: {
    Icon
  }
}
</script>

<style lang="scss">
@import '../../common/scss/mixin.scss';
.nodata{
	text-align: center;
	padding-top:100px;
}
.location-list {
  position: fixed;
  top: 50px;
  left: 2%;
  right: 2%;
  bottom: 0;
  background-color: #fff;
  box-shadow: 1px -1px 1px rgba(0, 0, 0, .2), -1px 0 1px rgba(0, 0, 0, .2);
  overflow: hidden;
  .location-item {
    position: relative;
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    @include border-1px-bottom;
    &.active {
      background-color: rgba(230, 230, 230, 0.5);
    }
  }
  .info-error {
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
  .info {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    z-index: 10;
    .row {
      padding: 20px;
      height: 60px;
      line-height: 60px;
      @include border-1px-bottom;
      .icon {
        // animation: rotate_circle 1s infinite;
      }
    }
  }
}
// @keyframes rotate_circle {
//   from {
//     transform: rotate(0deg)
//   }

//   to {
//     transform: rotate(360deg)
//   }
// }
</style>
