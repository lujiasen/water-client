import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/home')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
