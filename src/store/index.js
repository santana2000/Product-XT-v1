import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    measureSymbol:true,
    drawSymbol:false,

  },
  mutations: {
    activeMeasure(state){
      state.measureSymbol = !state.measureSymbol
    },
    activeDraw(state){
      state.drawSymbol = !state.drawSymbol

    }
  },
  actions: {
  },
  modules: {
  }
})
