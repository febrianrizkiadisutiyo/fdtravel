import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import KelolaMobil from "@/views/KelolaMobil.vue";
import KelolaSupir from "@/views/KelolaSupir.vue";
import KelolaJadwal from "@/views/KelolaJadwal.vue";
import DataMobil from "@/views/DataMobil.vue";
import DataSupir from "@/views/DataSupir.vue";
import DataJadwal from "@/views/DataJadwal.vue";
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/kelolamobil',
    name: 'kelolamobil',
    component: KelolaMobil
  },
  {
    path: '/kelolasupir',
    name: 'kelolasupir',
    component: KelolaSupir
  },
  {
    path: '/kelolajadwal',
    name: 'kelolajadwal',
    component: KelolaJadwal
  },
  {
    path: '/datamobil',
    name: 'datamobil',
    component: DataMobil
  },
  {
    path: '/datasupir',
    name: 'datasupir',
    component: DataSupir
  },
  {
    path: '/datajadwal',
    name: 'datajadwal',
    component: DataJadwal
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
