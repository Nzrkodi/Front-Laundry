import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/pages/HomeView.vue'
import Jenisview from '../views/pages/JenisView.vue'
import PaketView from '../views/pages/PaketView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/jenis",
      name: "jenis",
      component: Jenisview
    },
    {
      path: "/paket",
      name: "paket",
      component: PaketView
    }
  ]
})

export default router
