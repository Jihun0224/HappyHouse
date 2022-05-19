import { apiInstance } from "./index.js";

const api = apiInstance();

function listAnswer(articleno, success, fail) {
  api.get(`/answer/${articleno}`).then(success).catch(fail);
}

function registerAnswer(article, success, fail) {
  api.post(`/answer`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteAnswer(answerno, success, fail) {
  api.delete(`/answer/${answerno}`).then(success).catch(fail);
}

export { listAnswer, registerAnswer, deleteAnswer };