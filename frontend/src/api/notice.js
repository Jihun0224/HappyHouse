import { apiInstance } from "./index.js";

const api = apiInstance();

async function listArticle(param, success, fail) {
  await api.get(`/notice`, { params: param }).then(success).catch(fail);
}

function registerArticle(article, success, fail) {
  api.post(`/notice`, JSON.stringify(article)).then(success).catch(fail);
}

async function getArticle(articleno, success, fail) {
  await api.get(`/notice/${articleno}`).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  api
    .put(`/notice/${article.articleno}`, JSON.stringify(article))
    .then(success)
    .catch(fail);
}

function deleteArticle(articleno, success, fail) {
  api.delete(`/notice/${articleno}`).then(success).catch(fail);
}

export { listArticle, registerArticle, getArticle, modifyArticle, deleteArticle };