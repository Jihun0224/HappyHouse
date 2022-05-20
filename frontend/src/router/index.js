import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import BoardView from "@/views/BoardView.vue";
import NoticeView from "@/views/NoticeView.vue";
import HouseView from "@/views/HouseView.vue";
import BoardRegisterView from "@/components/Board/BoardRegister.vue";
import BoardListView from "@/components/Board/BoardList.vue";
import BoardModifyView from "@/components/Board/BoardModify.vue";
import BoardDeleteView from "@/components/Board/BoardDelete.vue";
import BoardDetailView from "@/components/Board/BoardDetail.vue";

import store from "@/store/index.js";

Vue.use(VueRouter);
// https://router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  // console.log(store);
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const getUserInfo = store._actions["memberStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    next({ name: "signIn" });
    // router.push({ name: "signIn" });
  } else {
    // console.log("로그인 했다.");
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/board",
    name: "board",
    component: BoardView,
    redirect: "/board/list",
    children: [
      {
        path: "write",
        name: "boardRegister",
        component: BoardRegisterView,
      },
      {
        path: "list",
        name: "boardList",
        component: BoardListView,
      },
      {
        path: "detail/:articleno",
        name: "boardDetail",
        component: BoardDetailView,
      },
      {
        path: "modify/:articleno",
        name: "boardModify",
        component: BoardModifyView,
      },
      {
        path: "delete/:articleno",
        name: "boardDelete",
        component: BoardDeleteView,
      },
    ],
  },
  {
    path: "/notice",
    name: "notice",
    component: NoticeView,
  },
  {
    path: "/house",
    name: "house",
    component: HouseView,
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/MemberView.vue"),
    children: [
      {
        path: "signin",
        name: "signIn",
        component: () => import("@/components/user/MemberLogin.vue"),
      },
      {
        path: "signup",
        name: "signUp",
        component: () => import("@/components/user/MemberRegister.vue"),
      },
      {
        path: "mypage",
        name: "mypage",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/user/MemberMyPage.vue"),
      },
      {
        path: "update",
        name: "update",
        component: () => import("@/components/user/MemberUpdate.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
