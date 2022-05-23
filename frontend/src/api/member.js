import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function collectMemberInfo(userid) {
  console.log("collectMemberInfo 호출됨" + userid);
  await api.get(`/user/${userid}`);
}
async function modifyMemberInfo(user) {
  await api.put(`/user`, JSON.stringify(user));
}
async function unregisterMember(userid, success, fail) {
  await api.delete(`/user/${userid}`).then(success).catch(fail);
}

async function signUpMember(user, success, fail) {
  await api.post(`/user`, JSON.stringify(user)).then(success).catch(fail);
}
async function setMyhomeInfo(user) {
  await api.put(`/user/setmyhome`, JSON.stringify(user));
}
// function logout(success, fail)

export {
  login,
  findById,
  modifyMemberInfo,
  unregisterMember,
  signUpMember,
  collectMemberInfo,
  setMyhomeInfo,
};
