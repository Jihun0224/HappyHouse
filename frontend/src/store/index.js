import Vue from 'vue'
import Vuex from 'vuex'
import http from "@/api/http";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    accessToken: false,
    sidos: [{ value: null, label: "시·도" }],
    guguns: [{ value: null, label: "시·군·구" }],
    dongs: [{ value: null, label: "읍·면·동" }],
    houses: [],
  },
  getters: {
    getAccessToken: state => state.accessToken,
    getUser: state => state.user,
    getSidos: state => state.sidos,
    getGuguns: state => state.guguns,
    getDongs: state => state.dongs,
    getHouses: state => state.houses
  },
  mutations: {
    LOGIN(state, user) {
      state.user.push({
        userId: user.userId,
        userPwd: user.userPwd,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
      });
    },
    SET_TOKEN(state, token) {
      state.accessToken = token;
    },
    reset(state) {
      state.accessToken = false;
      state.user = null;
    },
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
  },
  actions: {
    login({ commit }, user) {
      http
        .post(`/user/login`, user)
        .then(({ data }) => {
          if (data != null) {
            commit("LOGIN", data);
            commit("SET_TOKEN", true);
          } else {
            commit("SET_TOKEN", false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    registe(user) {
      http
        .post(`/user/register`, user)
        .then(({ data }) => {
          console.log("회원가입 완료:", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout({ commit }) {
      commit("reset");
    },
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
    }
  },
  modules: {
  }
})
