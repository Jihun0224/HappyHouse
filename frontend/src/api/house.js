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
function houseList(params, success, fail) {
    api.get(`/map/apt`, { params: params }).then(success).catch(fail);
}
export { sidoList, gugunList, dongList, allHouseList, houseList };