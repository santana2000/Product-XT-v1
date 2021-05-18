import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    measureSymbol:false,
    drawSymbol:false,
    bufferAnalyse:true,

  },
  mutations: {
    activeMeasure(state){
      state.measureSymbol = !state.measureSymbol
    },
    activeDraw(state){
      state.drawSymbol = !state.drawSymbol
    },
    activeBuffer(state){
      state.bufferAnalyse = !state.bufferAnalyse
    },
  },
  actions: {
  },
  modules: {
  }
})
