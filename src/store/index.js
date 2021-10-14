import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    measureSymbol:true,
    drawSymbol:false,
    bufferAnalyse:false,
    layerTree:false,
    viewerLoadStatus:false

  },
  mutations: {
    loadViewerSuccess(state){
      state.viewerLoadStatus = true;
    },
    activeMeasure(state){
      state.measureSymbol = !state.measureSymbol
    },
    activeDraw(state){
      state.drawSymbol = !state.drawSymbol
    },
    activeBuffer(state){
      state.bufferAnalyse = !state.bufferAnalyse
    },
    activeTree(state){
      state.layerTree = !state.layerTree
    },
  },
  actions: {
  },
  modules: {
  }
})
