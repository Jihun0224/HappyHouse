import jwt_decode from "jwt-decode";
import {
  login,
  findById,
  modifyMemberInfo,
  unregisterMember,
  signUpMember,
} from "@/api/member.js";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,

    isSignupError: false,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },

    SET_IS_SIGNUP_ERROR: (state, isSignupError) => {
      state.isSignupError = isSignupError;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        (response) => {
          if (response.data.message === "success") {
            let token = response.data["access-token"];
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            sessionStorage.setItem("access-token", token);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
          }
        },
        () => {},
      );
    },
    getUserInfo({ commit }, token) {
      let decode_token = jwt_decode(token);
      findById(
        decode_token.userid,
        (response) => {
          if (response.data.message === "success") {
            commit("SET_USER_INFO", response.data.userInfo);
          } else {
            console.log("유저 정보 없음!!");
          }
        },
        (error) => {
          console.log(error);
        },
      );
    },
    modifyMember({ commit }, user) {
      modifyMemberInfo(user);
      commit("SET_MEMBER_INFO", user);
    },
    deleteMember({ commit }, userid) {
      unregisterMember(
        userid,
        (response) => {
          console.log(response.data);
          if (response.data === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_MEMBER_INFO", null);
          } else {
            console.log("response data fail");
          }
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async registerMember({ commit }, user) {
      //   signUpMember(member);
      //   commit("SET_IS_LOGIN", false);
      //   commit("SET_IS_LOGIN_ERROR", false);
      //   commit("SET_MEMBER_INFO", null);
      await signUpMember(
        user,
        () => {
          alert("Store Sign Up Member Success!!");
          commit("SET_IS_LOGIN", false);
          commit("SET_IS_LOGIN_ERROR", false);
          commit("SET_IS_SIGNUP_ERROR", false);
          commit("SET_MEMBER_INFO", null);
        },
        () => {
          //   alert("Store Sign Up Member Fail!!");
          commit("SET_IS_SIGNUP_ERROR", true);
        },
      );
    },
  },
};

export default memberStore;
