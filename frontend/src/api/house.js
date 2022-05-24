import { apiInstance } from "@/api/index";

const api = apiInstance();
function sidoList(success, fail) {
  api.get(`/map/sido`).then(success).catch(fail);
}
function gugunList(params, success, fail) {
  api.get(`/map/gugun`, { params: params }).then(success).catch(fail);
}
function dongList(params, success, fail) {
  api.get(`/map/dong`, { params: params }).then(success).catch(fail);
}
function allHouseList(params, success, fail) {
  api.get(`/map/searchByAptName`, { params: params }).then(success).catch(fail);
}

async function houseList(params, success, fail) {
  await api.get(`/map/apt`, { params: params }).then(success).catch(fail);
}
function bookmarkList(params, success, fail) {
  api.get(`/bookmark/list`, { params: params }).then(success).catch(fail);
}
async function dealYearList(params, success, fail) {
  await api.get(`/map/dealYear`, { params: params }).then(success).catch(fail);
}
function searchDealList(params, success, fail) {
  api.get(`map/deal`, { params: params }).then(success).catch(fail);
}
export {
  sidoList,
  gugunList,
  dongList,
  allHouseList,
  houseList,
  dealYearList,
  searchDealList,
  bookmarkList,
};
