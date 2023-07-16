import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/pages/HomeView.vue'
import Jenisview from '../views/pages/JenisView.vue'
import PaketView from '../views/pages/PaketView.vue'
import ClientView from '../views/pages/ClientView.vue'
import PegawaiView from '../views/pages/PegawaiView.vue'
import OrderView from '../views/pages/OrderView.vue'

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
    },
    {
      path: "/client",
      name: "client",
      component: ClientView
    },
    {
      path: "/pegawai",
      name: "pegawai",
      component: PegawaiView
    },
    {
      path: "/order",
      name: "order",
      component: OrderView
    }
  ]
})

export default router
