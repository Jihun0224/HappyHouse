import Vue from 'vue'
import Vuex from 'vuex'
import http from "@/api/http";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    accessToken: false,
  },
  getters: {
    getAccessToken: state => state.accessToken,
    getUser: state => state.user,
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
    }
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
    }
  },
  modules: {
  }
})
