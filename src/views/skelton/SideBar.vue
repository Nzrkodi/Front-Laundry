<template>
  <div id="sidebar" class="active">
    <div class="sidebar-wrapper active">
      <div class="sidebar-header">
        <img src="../../assets/images/logoku.png" style="transform: scale(1.6);" class="ms-4" alt="no logo" srcset="">
      </div>
      <div class="sidebar-menu">
        <ul class="menu">
          <li class="sidebar-title">Home</li>
          <li class="sidebar-item" :class="currentRoute == 'home' ? 'active' : ''">
            <router-link :to="{ name: 'home' }" class="sidebar-link">
              <font-awesome-icon :icon="['fas', 'house']" />
              <span>Dashboard</span>
            </router-link>

          </li>
          <li class="sidebar-title">Data</li>
          <li class="sidebar-item" :class="currentRoute == 'order' ? 'active' : ''">
            <router-link :to="{ name: 'order' }" class="sidebar-link">
              <font-awesome-icon :icon="['fas', 'cart-shopping']" />
              <span>Order</span>
            </router-link>
          </li>
          <li class="sidebar-item" :class="currentRoute == 'transaksi' ? 'active' : ''">
            <router-link :to="{ name: 'transaksi' }" class="sidebar-link">
              <font-awesome-icon :icon="['fas', 'cash-register']" />
              <span>Transaksi</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link :to="{ name: 'client' }" class="sidebar-link">
              <font-awesome-icon :icon="['fas', 'users']" />
              <span>Client</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link :to="{ name: 'pegawai' }" class="sidebar-link">
              <font-awesome-icon :icon="['fas', 'users']" />
              <span>Pegawai</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link :to="{ name: 'jenis' }" class="sidebar-link">
              <font-awesome-icon :icon="['fas', 'folder']" />
              <span>Jenis</span>
            </router-link>
          </li>
          <li class="sidebar-item" :class="currentRoute == 'paket' ? 'active' : ''">
            <router-link :to="{ name: 'paket' }" class="sidebar-link">
              <font-awesome-icon :icon="['fas', 'folder']" />
              <span>Paket</span>
            </router-link>
          </li>
          <li class="sidebar-title">Mnage akun</li>
          <li class="sidebar-item">
            <router-link :to="{ name: 'akun' }" class="sidebar-link">
              <font-awesome-icon :icon="['fas', 'user']" />
              <span>Akun</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const currentRoute = useRouter().currentRoute.value.name
</script>
