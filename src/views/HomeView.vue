<template>
  
  <SideBar/>
  <div id="main">
    <NavBar/>

    <div class="main-content container-fluid">
      <div class="page-title">
        <h3>Dashboard</h3>
        <p class="text-subtitle text-muted">A good dashboard to display your statistics</p>
      </div>
      <section class="section">
      </section>
    </div>

  <Footer/>
  </div>
</template>

<script setup>
import SideBar from './skelton/SideBar.vue'
import NavBar from './skelton/NavBar.vue'
import Footer from './skelton/Footer.vue'
</script>