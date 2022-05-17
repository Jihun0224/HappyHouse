import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BoardView from '@/views/BoardView.vue'
import NoticeView from '@/views/NoticeView.vue'
import SearchView from '@/views/SearchView.vue'
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
  },
  {
    path: '/notice',
    name: 'notice',
    component: NoticeView,
  },
  {
    path: '/search',
    name: 'seach',
    component: SearchView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
