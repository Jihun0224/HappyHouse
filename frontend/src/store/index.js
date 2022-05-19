import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import houseStore from "@/store/modules/houseStore.js";

const store = new Vuex.Store({
  modules: {
    houseStore,
  }
})
export default store;