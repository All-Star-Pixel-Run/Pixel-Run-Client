import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginMenu from '../views/LoginMenu.vue'
import RoomSelection from '../views/RoomSelection.vue'
import WaitingRoom from '../views/WaitingRoom.vue'
import Play from '../views/Play.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/play',
    name: 'Play',
    component: Play
  },
  {
    path: '/loading',
    name: 'Loading',
    component: WaitingRoom
  },
  {
    path: '/roomSelection',
    name: 'RoomSelection',
    component: RoomSelection
  },
  {
    path: '/start',
    name: 'start',
    component: LoginMenu
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
