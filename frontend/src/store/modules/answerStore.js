import { listAnswer, registerAnswer, deleteAnswer } from "@/api/answer.js";

const answerStore = {
  namespaced: true,
  state: {
    answerList: [],
  },
  getters: {},
  mutations: {
    REGISTER_ANSWER(state, answer) {
      state.answerList.push(answer);
    },
    SET_ANSWER_LIST(state, answerList) {
      state.answerList = answerList;
    },
    DELETE_ANSWER(state, answerno) {
      for (let i = 0; i < state.answerList.length; i++) {
        if (state.answerList[i].answerno === answerno) {
          state.answerList.splice(i, 1);
          break;
        }
      }
    },
  },
  actions: {
    registerAnswer({ commit }, answer) {
      registerAnswer(
        answer,
        (response) => {
          if (response.data === "success") {
            commit("REGISTER_ANSWER", answer);
            alert("등록 완료");
          } else {
            alert("등록 처리시 문제가 발생했습니다.");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getAnswerList: async function ({ commit }, articleno) {
      console.log("getAnswerList: " + articleno);
      await listAnswer(
        articleno,
        (response) => {
          console.log(response);
          commit("SET_ANSWER_LIST", response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    deleteAnswer({ commit }, answerno) {
      deleteAnswer(
        answerno,
        (response) => {
          if (response.data === "success") {
            commit("DELETE_ANSWER", answerno);
            alert("삭제 완료");
          } else {
            alert("삭제 처리시 문제가 발생했습니다.");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default answerStore;
