import Vue from 'vue'
import Vuex from 'vuex'
import http from "@/api/http";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidos: [{ value: null, label: "시·도" }],
    guguns: [{ value: null, label: "시·군·구" }],
    dongs: [{ value: null, label: "읍·면·동" }],
    houses: [],
    allHouses: [],
  },
  getters: {
    getSidos: state => state.sidos,
    getGuguns: state => state.guguns,
    getDongs: state => state.dongs,
    getHouses: state => state.houses,
    getAllHouses: state => state.allHouses
  },
  mutations: {
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, label: sido.sidoName });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, label: gugun.gugunName });
      });
    },
    SET_DONG_LIST(state, dongs) {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dongCode, label: dong.dongName });
      });
    },
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, label: "시·도" }];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, label: "시·군·구" }];
    },
    CLEAR_DONG_LIST(state) {
      state.dongs = [{ value: null, label: "읍·면·동" }];
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
    },
    SET_ALLHOUSE_LIST(state, houses) {
      state.allHouses = houses;
    }
  },
  actions: {
    getSido({ commit }) {
      http
        .get(`/map/sido`)
        .then(({ data }) => {
          // console.log(data);
          commit("SET_SIDO_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getGugun({ commit }, sidoCode) {
      const params = { sido: sidoCode };
      http
        .get(`/map/gugun`, { params })
        .then(({ data }) => {
          console.log(commit, data);
          commit("SET_GUGUN_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDong({ commit }, gugunCode) {
      const params = { gugun: gugunCode };
      http
        .get(`/map/dong`, { params })
        .then(({ data }) => {
          console.log(commit, data);
          commit("SET_DONG_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getHouses({ commit }, dong) {
      const params = { dong: dong };
      console.log(dong);
      http
        .get(`/map/apt`, { params })
        .then(({ data }) => {
          console.log(commit, data);
          commit("SET_HOUSE_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllhouses({ commit }) {
      const params = { aptName: "" }
      http
        .get(`/map/searchByAptName`, { params })
        .then(({ data }) => {
          // console.log(commit, data);
          commit("SET_ALLHOUSE_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  modules: {
  }
})
