import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/pages/HomeView.vue'
import Jenisview from '../views/pages/JenisView.vue'
import PaketView from '../views/pages/PaketView.vue'
import ClientView from '../views/pages/ClientView.vue'
import PegawaiView from '../views/pages/PegawaiView.vue'
import OrderView from '../views/pages/OrderView.vue'
import DetailOrderView from '../views/pages/DetailOrder.vue'
import TransaksiView from '../views/pages/TransaksiView.vue'
import AkunView from '../views/pages/AkunView.vue'
import LoginView from '../views/pages/LoginView.vue'
import Other from '../utils/Other'

const envGuard = (to, from, next) => {
  let appEnv = import.meta.env.VITE_APP_ENV;
  if (Other.envTransform(appEnv) != "local") {
    let token = localStorage.getItem("token");
    if (!token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
};

const scopeGuard = (to, from, next) => {
  let scope = Other.getDecryptScope();
  if (scope == "see-list") {
    next("/");
  } else if (scope == "crud-list") {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: [envGuard]
    },
    {
      path: "/jenis",
      name: "jenis",
      component: Jenisview,
      beforeEnter: [envGuard, scopeGuard]
    },
    {
      path: "/paket",
      name: "paket",
      component: PaketView,
      beforeEnter: [envGuard, scopeGuard]
    },
    {
      path: "/client",
      name: "client",
      component: ClientView,
      beforeEnter: [envGuard]
    },
    {
      path: "/pegawai",
      name: "pegawai",
      component: PegawaiView,
      beforeEnter: [envGuard, scopeGuard]
    },
    {
      path: "/order",
      name: "order",
      component: OrderView,
      beforeEnter: [envGuard]
    },
    {
      path: "/detail_order/:order_id",
      name: "detailOrder",
      component: DetailOrderView,
      beforeEnter: [envGuard]
    },
    {
      path: "/transaksi",
      name: "transaksi",
      component: TransaksiView,
      beforeEnter: [envGuard]
    },
    {
      path: "/akun",
      name: "akun",
      component: AkunView,
      beforeEnter: [envGuard, scopeGuard]
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    }
  ]
})

export default router
