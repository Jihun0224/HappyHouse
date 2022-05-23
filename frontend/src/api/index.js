import axios from "axios";
import { API_BASE_URL } from "@/config";

// axios 객체 생성
function apiInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

// 이 친구는 쓸 지 모르겠음 -> DB로 할지 API 쓸지 정해야 될 듯합니다
// function houseInstance() {
//   const instance = axios.create({
//     baseURL: APT_DEAL_URL,
//     headers: {
//       "Content-type": "application/json",
//     },
//   });
//   return instance;
// }
export { apiInstance };
