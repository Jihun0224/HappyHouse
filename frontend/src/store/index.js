import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import houseStore from "@/store/modules/houseStore.js";
import boardStore from "@/store/modules/boardStore.js";
import answerStore from "@/store/modules/answerStore.js";
import memberStore from "@/store/modules/memberStore.js";

const store = new Vuex.Store({
  modules: {
    houseStore,
    boardStore,
    answerStore,
    memberStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});

export default store;
