import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import houseStore from "@/store/modules/houseStore.js";
import boardStore from "@/store/modules/boardStore.js";
import answerStore from "@/store/modules/answerStore.js";

const store = new Vuex.Store({
  modules: {
    houseStore,
    boardStore,
    answerStore,
  }
})
export default store;