import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BoardView from '@/views/BoardView.vue'
import NoticeView from '@/views/NoticeView.vue'
import HouseView from '@/views/HouseView.vue'
import BoardRegisterView from '@/components/Board/BoardRegister.vue'
import BoardListView from '@/components/Board/BoardList.vue'
import BoardModifyView from '@/components/Board/BoardModify.vue'
import BoardDeleteView from '@/components/Board/BoardDelete.vue'
import BoardDetailView from '@/components/Board/BoardDetail.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/board',
    name: 'board',
    component: BoardView,
    redirect: '/board/list',
    children: [
      {
        path: 'write',
        name: 'boardRegister',
        component: BoardRegisterView
      },
      {
        path: 'list',
        name: 'boardList',
        component: BoardListView
      },
      {
        path: 'detail/:articleno',
        name: 'boardDetail',
        component: BoardDetailView
      },
      {
        path: 'modify/:articleno',
        name: 'boardModify',
        component: BoardModifyView
      },
      {
        path: 'delete/:articleno',
        name: 'boardDelete',
        component: BoardDeleteView
      },
    ]
  },
  {
    path: '/notice',
    name: 'notice',
    component: NoticeView,
  },
  {
    path: '/house',
    name: 'house',
    component: HouseView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
