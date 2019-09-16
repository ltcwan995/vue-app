import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
var loginFlg=false;
if(localStorage.getItem("isLogin")==="true"){
  loginFlg=true;
}else{
  loginFlg=false;
}

export default new Vuex.Store({
  state: {
    ipCity: '暂无城市信息',
    curCity: '获取城市中',
    ScInfo:{
    	 id:"",
    	 scname:""
    },
    address: {
      name: '正在获取你的地点',
      lngLat: {}
    },
    isLogin:loginFlg,
    allScInfo:[],
    collectionpoint:[],
    collectionpointxy:[],
    currentPoint:"正在定位中...",
    nearPois: [],
    searchPois: [],
    suggestedPois: [],
    isSearchingInfoVisible: false,
    isSearchingErrorInfoVisible: false,
    isListVisible: false,
    placeholder: '',
    listType: 1,
    listSubType: 0,
    cityInput: '',
    locationInput: '',
    isUserVisible: false,
    currentUser: '',
    logInStep: 0
  },
  mutations: {
    setLogin(state,login){
      state.isLogin=login
    },
    setIpCity(state, city) {
      state.ipCity = city
    },
    setScInfo(state,ScInfo){
    	 state.ScInfo.id=ScInfo.id
    	 state.ScInfo.scname=ScInfo.scname
    },
    setAllScInfo(state,allScInfo){
    	 state.allScInfo=allScInfo
    },
    setcollectionpoint(state,collectionpoint){
    	 state.collectionpoint=collectionpoint
    },
    setcollectionpointxy(state,collectionpointxy){
    	  state.collectionpointxy=collectionpointxy
    },
    setcurrentPoint(state,currentPoint){
    	 state.currentPoint=currentPoint
    },
    updateCity(state, newCity) {
      state.curCity = newCity
    },
    changeAddress(state, payload) {
      state.address = payload
    },
    changeNearPois(state, newPois) {
      state.nearPois = newPois
    },
    changeSearchPois(state, newPois) {
      state.searchPois = newPois
    },
    changeSuggestedPois(state, newPois) {
      state.suggestedPois = newPois
    },
    showSearchingInfo(state) {
      state.isSearchingInfoVisible = true
    },
    hideSearchingInfo(state) {
      state.isSearchingInfoVisible = false
    },
    showSearchingErrorInfo(state) {
      state.isSearchingErrorInfoVisible = true
    },
    hideSearchingErrorInfo(state) {
      state.isSearchingErrorInfoVisible = false
    },
    showList(state) {
      state.isListVisible = true
    },
    hideList(state) {
      state.isListVisible = false
    },
    toggleList(state, payload) {
      state.listType = payload.listType
      state.placeholder = payload.placeholder
      state.listSubType = payload.listSubType
    },
    updateCityInput(state, newVal) {
      state.cityInput = newVal
    },
    locationInputChanged(state, newVal) {
      state.locationInput = newVal
    },
    showUser(state) {
      state.isUserVisible = true
    },
    hideUser(state) {
      state.isUserVisible = false
    },
    changeUser(state, newUser) {
      state.currentUser = newUser
    },
    changeLogInStepTo(state, step) {
      state.logInStep = step
    }
  }
})
