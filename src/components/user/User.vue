<template>
<transition :name="transitionName" @before-enter="beforeEnter">
  <div class="user-wrapper" v-show="isVisible">
    <div class="mask" @click="maskClick"></div>
    <div class="user-content">
      <div class="user-header">
        <div class="user-avatar" ref="avatar">
          <img src="../../assets/id.jpg" alt="" width="60">
        </div>
        <div class="user-info" ref="info">
          <span class="user-name">{{currentUser}}</span>
          <div class="user-type">超级无敌大会员</div>
        </div>
      </div>
      <div class="user-options">
        <div class="options-mask"  ref="optionsMask" v-show="this.touch.y1"></div>
        <div class="options-item journey">
          <span class="icon">
            <Icon name="car"></Icon>
          </span>
          <span class="text">行程</span>
        </div>
        <div class="options-item wallet">
          <span class="icon">
            <Icon name="credit-card"></Icon>
          </span>
          <span class="text">钱包</span>
        </div>
        <div class="options-item service">
          <span class="icon">
            <Icon name="headphones"></Icon>
          </span>
          <span class="text">客服</span>
        </div>
        <div class="options-item settings" @click="logOut">
          <span class="icon">
            <Icon name="gear"></Icon>
          </span>
          <span class="text">设置（退出登录）</span>
        </div>
      </div>
      <div class="other-content" 
        ref="otherContent"
        @touchstart="onOtherContentTouchStart" 
        @touchend="onOtherContentTouchEnd"
        @touchmove="moveOtherContent">
        <span class="icon" @click="toggleContent">
          <Icon name="angle-up" :class="{'fa-flip-vertical': !atBottom}" class="icon-self"></Icon>
        </span>
        <div class="content-wrapper">
          <div class="content">
            <div class="content-icon">
              <span class="icon">
                <Icon name="eercast"></Icon>
              </span>
            </div>
            <span class="text">推荐有奖</span>
          </div>
          <div class="content">
            <div class="content-icon">
              <span class="icon">
                <Icon name="eercast"></Icon>
              </span>
            </div>
            <span class="text">车主招募</span>
          </div>
          <div class="content">
            <div class="content-icon">
              <span class="icon">
                <Icon name="eercast"></Icon>
              </span>
            </div>
            <span class="text">积分商城</span>
          </div>
          <div class="content">
            <div class="content-icon">
              <span class="icon">
                <Icon name="eercast"></Icon>
              </span>
            </div>
            <span class="text">感谢您</span>
          </div>
          <div class="content">
            <div class="content-icon">
              <span class="icon">
                <Icon name="eercast"></Icon>
              </span>
            </div>
            <span class="text">如此用心的</span>
          </div>
          <div class="content">
            <div class="content-icon">
              <span class="icon">
                <Icon name="eercast"></Icon>
              </span>
            </div>
            <span class="text">看的我项目</span>
          </div>
          <div class="content">
            <div class="content-icon">
              <span class="icon">
                <Icon name="eercast"></Icon>
              </span>
            </div>
            <span class="text">如果喜欢</span>
          </div>
          <div class="content">
            <div class="content-icon">
              <span class="icon">
                <Icon name="eercast"></Icon>
              </span>
            </div>
            <span class="text">可以star</span>
          </div>
          <div class="content">
            <div class="content-icon">
              <span class="icon">
                <Icon name="eercast"></Icon>
              </span>
            </div>
            <span class="text">可以PR</span>
          </div>
          <div class="content">
            <div class="content-icon">
              <span class="icon">
                <Icon name="eercast"></Icon>
              </span>
            </div>
            <span class="text">如果你是hr</span>
          </div>
          <div class="content">
            <div class="content-icon">
              <span class="icon">
                <Icon name="eercast"></Icon>
              </span>
            </div>
            <span class="text">也可以联系我</span>
          </div>
          <div class="content">
            <div class="content-icon">
              <span class="icon">
                <Icon name="eercast"></Icon>
              </span>
            </div>
            <span class="text">我正在</span>
          </div>
          <div class="content">
            <div class="content-icon">
              <span class="icon">
                <Icon name="eercast"></Icon>
              </span>
            </div>
            <span class="text">找工作</span>
          </div>
          <div class="content">
            <div class="content-icon">
              <span class="icon">
                <Icon name="eercast"></Icon>
              </span>
            </div>
            <span class="text">^_^</span>
          </div>
          <div class="content" @click="showResume">
            <div class="content-icon">
              <span class="icon">
                <Icon name="hand-pointer-o"></Icon>
              </span>
            </div>
            <span class="text">我的简历</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import { mapState, mapMutations } from 'vuex'
import {
  storage,
  translate
} from '@/common/js/util.js'
// const STEP_LOGOUT = -1
export default {
  data() {
    return {
      touch: {},
      totalDiff: 0,
      currentDistance: 0,
      deviceHeight: 0,
      atBottom: false,
      transitionName: 'slide'
    }
  },
  created() {
    this.deviceHeight = window.innerHeight
    this.maxMoveDistance = this.deviceHeight - 117 - 76 + 18
  },
  computed: {
    isVisible() {
      return this.$store.state.isUserVisible
    },
    currentUser() {
      return this.$store.state.currentUser
    }
  },
  methods: {
    ...mapMutations([
        'setLogin'
      ]),
    toggleContent() {
      this.atBottom ? this.contentMoveToTop() : this.contentMoveToBottom()
    },
    beforeEnter() {
      this.atBottom ? '' : this.contentMoveToBottom()
    },
    logOut() {
      storage.delCookie('isLogged')
      this.$store.commit('changeLogInStepTo', 1)
      this.transitionName = ''
      this.$store.commit('hideUser')
      this.setLogin(false)
      localStorage.setItem("isLogin",false)
      this.$router.push({path:'/login',query:{key:123}})
    },
    contentMoveToTop() {
      this.currentDistance = this.totalDiff = -this.maxMoveDistance
      this.$refs.otherContent.style.transition = `transform .2s linear`
      this.$refs.otherContent.style.transform = `translate3d(0px,${-this.maxMoveDistance}px,0px)`
      setTimeout(() => {
        this.atBottom = false
      }, 200)
    },
    contentMoveToBottom() {
      this.currentDistance = this.totalDiff = 0
      this.$refs.otherContent.style.transition = `transform .2s linear`
      this.$refs.otherContent.style.transform = `translate3d(0px, 0px, 0px)`
      setTimeout(() => {
        this.atBottom = true
      }, 200)
    },
    onOtherContentTouchStart(ev) {
      let touch = ev.changedTouches[0]
      this.touch.y1 = touch.pageY
    },
    onOtherContentTouchEnd(ev) {
      let touch = ev.changedTouches[0]
      this.touch.y2 = touch.pageY
      // 当次滑动的距离
      let newDiff = this.touch.y2 - this.touch.y1
      // 总滑动距离
      this.totalDiff = newDiff + this.currentDistance
      // 超过一定距离松手则展示，否则隐藏。
      if (-this.totalDiff >= this.deviceHeight / 3) {
        this.contentMoveToTop()
      } else {
        this.contentMoveToBottom()
      }
    },
    moveOtherContent(ev) {
      let touch = ev.changedTouches[0]
      this.touch.y2 = touch.pageY
      let newDiff = this.touch.y2 - this.touch.y1
      this.totalDiff = newDiff + this.currentDistance
      if (-this.totalDiff > this.maxMoveDistance) {
        this.totalDiff = -this.maxMoveDistance
      } else if (this.totalDiff > 0) {
        this.totalDiff = 0
      }
      let el = this.$refs.otherContent
      translate(el, 0, this.totalDiff)
    },
    showResume() {
      window.open('https://github.com/myl0204/resume')
    },
    maskClick() {
      this.$store.commit('hideUser')
    }
  },
  watch: {
    // 注销用户后，user界面能直接消失
    transitionName() {
      setTimeout(() => {
        this.transitionName = 'slide'
      }, 20)
    },
    totalDiff() {
      // 头像缩放倍数
      let ratio = 1 + this.totalDiff / (2 * this.maxMoveDistance)
      // 文字透明度
      let opacity = 1 + 2 * this.totalDiff / this.maxMoveDistance
      // 遮罩透明度
      let maskOpacity = -this.totalDiff / this.maxMoveDistance

      this.$refs.avatar.style.transform = `scale(${ratio})`
      this.$refs.info.style.opacity = opacity
      this.$refs.info.style.transform = `scale(${ratio})`
      this.$refs.optionsMask.style.background = `rgba(255, 255, 255, ${maskOpacity})`
    }
  },
  components: {
    Icon
  }
}
</script>

<style lang="scss">
.user-wrapper {
  position: fixed;
  left: 0;
  right: 35%;
  top: 0;
  bottom: 0;
  background-color: #fff;
  box-shadow: 2px 0 2px rgba(0, 0, 0, .2);
  z-index: 30;
  transform: translateZ(0px);
  &.slide-enter-active, &.slide-leave-active {
      transition: all .3s linear
    }
    &.slide-enter, &.slide-leave-to {
      // right: 100%
      transform: translateX(-100%)
    }
  .user-content {
    
    .user-header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 33.33vh;
      .user-avatar {
        width: 60px;
        height: 60px;
        transform-origin: center -60px;
        transition: transform .2s linear;
        border-radius: 50%;
        overflow: hidden;
      }
      .user-info {
        text-align: center;
        .user-name {
          display: inline-block;
          margin: 10px 0;
          font-size: 14px;
        }
        .user-type {
          font-size: 10px;
        }
      }
    }
    .user-options {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 33.33vh;
      margin-bottom: (33.33vh / 2) + (100vh / 6);
      .options-mask {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        z-index: -1;
      }
      .options-item {
        font-size: 0;
        padding-left: 30px;
        & span {
          display: inline-block;
        }
        &~.options-item {
          margin-top: 30px;
        }
        &.highlight {
          background-color: rgba(230, 230, 230, 0.5)
        }
        .icon {
          margin-right: 8px;
          vertical-align: top;
        }
        .text {
          font-size: 16px;
        }
      }
    }
    .other-content {
      margin-top: -117px;
      // transition: transform 0 linear;
      background-color: #fff;
      overflow: hidden;
      .icon {
        display: block;
        width: 16px;
        text-align: center;
        margin: 0 auto;
        .icon-self {
          transition: transform .2s linear
        }
      }
      .content-wrapper {
        display: flex;
        flex-wrap: wrap;
        .content {
          flex: 0 1 (65vw / 3);
          text-align: center;
          font-size: 12px;
          margin-top: 30px;
          .content-icon {
            @extend .icon
          }
          .text {
            display: inline-block;
            margin-top: 10px;
          }
        }
      }
    }
  }

  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    // left: 0;
    // right: 0;
    left: 100%;
    width: 200%;
    flex: 0 1 0;
    background-color: rgba(0, 0, 0, .4);
  }
}
</style>

