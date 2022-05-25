import Vue from "vue";
import router from "@/router";

import {
  listArticle,
  registerArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
} from "@/api/board.js";

const boardStore = {
  namespaced: true,
  state: {
    boardList: [],
    board: null,
    searchBoardList: [],
  },
  getters: {},
  mutations: {
    REGISTER_BOARD(state, board) {
      state.boardList.push(board);
    },
    SET_BOARD_LIST(state, boardList) {
      state.boardList = boardList;
    },
    SET_SEARCH_BOARD_LIST(state, boardList) {
      state.searchBoardList = boardList;
    },
    SET_DETAIL_BOARD(state, board) {
      state.board = board;
    },
    DELETE_BOARD(state, articleno) {
      for (let i = 0; i < state.boardList.length; i++) {
        if (state.boardList[i].articleno === articleno) {
          state.boardList.splice(i, 1);
          break;
        }
      }
    },
    MODIFY_BOARD(state, board) {
      for (let i = 0; i < state.boardList.length; i++) {
        if (state.boardList[i].articleno === board.articleno) {
          Vue.set(state.boardList, i, board);
          state.board = board;
          break;
        }
      }
    },
  },
  actions: {
    registerBoard({ commit }, board) {
      registerArticle(
        board,
        (response) => {
          if (response.data === "success") {
            commit("REGISTER_BOARD", board);
            alert("등록 완료");
            router.push("/board");
          } else {
            alert("등록 처리시 문제가 발생했습니다.");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getBoardList({ commit }, keyword) {
      // console.log(keyword);
      listArticle(
        keyword,
        (response) => {
          if (keyword.key === null && keyword.word === null) {
            // console.log("list - 검색X");
            commit("SET_BOARD_LIST", response.data);
          } else {
            // console.log("list - 검색O");
            commit("SET_SEARCH_BOARD_LIST", response.data);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDetailBoard: async function ({ commit }, articleno) {
      await getArticle(
        articleno,
        (response) => {
          commit("SET_DETAIL_BOARD", response.data);
          // console.log("완료");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    deleteBoard({ commit }, articleno) {
      deleteArticle(
        articleno,
        (response) => {
          if (response.data === "success") {
            commit("DELETE_BOARD", articleno);
            alert("삭제 완료");
            router.push("/board");
          } else {
            alert("삭제 처리시 문제가 발생했습니다.");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    modifyBoard({ commit }, board) {
      modifyArticle(
        board,
        (response) => {
          if (response.data === "success") {
            commit("MODIFY_BOARD", board);
            alert("수정 완료");
            router.push("/board");
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

export default boardStore;
