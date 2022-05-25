import Vue from "vue";
import router from "@/router";

import {
  listArticle,
  registerArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
} from "@/api/notice.js";

const noticeStore = {
  namespaced: true,
  state: {
    noticeList: [],
    notice: null,
    searchNoticeList: [],
  },
  getters: {},
  mutations: {
    REGISTER_NOTICE(state, notice) {
      state.noticeList.push(notice);
    },
    SET_NOTICE_LIST(state, noticeList) {
      state.noticeList = noticeList;
    },
    SET_SEARCH_NOTICE_LIST(state, noticeList) {
      state.searchNoticeList = noticeList;
    },
    SET_DETAIL_NOTICE(state, notice) {
      state.notice = notice;
    },
    DELETE_NOTICE(state, articleno) {
      for (let i = 0; i < state.noticeList.length; i++) {
        if (state.noticeList[i].articleno === articleno) {
          state.noticeList.splice(i, 1);
          break;
        }
      }
    },
    MODIFY_NOTICE(state, notice) {
      for (let i = 0; i < state.noticeList.length; i++) {
        if (state.noticeList[i].articleno === notice.articleno) {
          Vue.set(state.noticeList, i, notice);
          state.notice = notice;
          break;
        }
      }
    },
  },
  actions: {
    registerNotice({ commit }, notice) {
      registerArticle(
        notice,
        (response) => {
          if (response.data === "success") {
            commit("REGISTER_NOTICE", notice);
            alert("등록 완료");
            router.push("/notice");
          } else {
            alert("등록 처리시 문제가 발생했습니다.");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getNoticeList: async function ({ commit }, keyword) {
      // console.log(keyword);
      await listArticle(
        keyword,
        (response) => {
          if (keyword.key === null && keyword.word === null) {
            // console.log("list - 검색X");
            commit("SET_NOTICE_LIST", response.data);
          } else {
            // console.log("list - 검색O");
            commit("SET_SEARCH_NOTICE_LIST", response.data);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDetailNotice: async function ({ commit }, articleno) {
      await getArticle(
        articleno,
        (response) => {
          commit("SET_DETAIL_NOTICE", response.data);
          console.log("완료");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    deleteNotice({ commit }, articleno) {
      deleteArticle(
        articleno,
        (response) => {
          if (response.data === "success") {
            commit("DELETE_NOTICE", articleno);
            alert("삭제 완료");
            router.push("/notice");
          } else {
            alert("삭제 처리시 문제가 발생했습니다.");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    modifyNotice({ commit }, notice) {
      modifyArticle(
        notice,
        (response) => {
          if (response.data === "success") {
            commit("MODIFY_NOTICE", notice);
            alert("수정 완료");
            router.push("/notice");
          } else {
            alert("수정 처리시 문제가 발생했습니다.");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default noticeStore;
