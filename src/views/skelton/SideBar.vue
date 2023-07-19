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
              <span>Dashboard</span>
            </router-link>

          </li>
          <li class="sidebar-title">Data</li>
          <li class="sidebar-item" :class="currentRoute == 'order' ? 'active' : ''">
            <router-link :to="{ name: 'order' }" class="sidebar-link">
              <span>Order</span>
            </router-link>
          </li>
          <li class="sidebar-item" :class="currentRoute == 'transaksi' ? 'active' : ''">
            <router-link :to="{ name: 'transaksi' }" class="sidebar-link">
              <span>Transaksi</span>
            </router-link>
          </li>
          <li class="sidebar-item" :class="currentRoute == 'jenis' ? 'active' : ''">
            <router-link :to="{ name: 'jenis' }" class="sidebar-link">
              <span>Jenis</span>
            </router-link>
          </li>
          <li class="sidebar-item" :class="currentRoute == 'paket' ? 'active' : ''">
            <router-link :to="{ name: 'paket' }" class="sidebar-link">
              <span>Paket</span>
            </router-link>
          </li>
          <li class="sidebar-title">Setup</li>
          <li class="sidebar-item">
            <a href="table.html" class="sidebar-link">
              <span>Report</span>
            </a>
          </li>
          <li class="sidebar-item">
            <a href="table.html" class="sidebar-link">
              <span>Manage Akun</span>
            </a>
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
