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
        <div class="row" v-if="data">
          <div class="col-lg-6">
            <div class="card">
              <div class="card-head">Total Order</div>
              <div class="card-body"><h5>{{ data.total_order }}</h5></div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card">
              <div class="card-head">Total Transaksi</div>
              <div class="card-body"><h5>{{ data.total_transaksi }}</h5></div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card">
              <div class="card-head">Total Klien</div>
              <div class="card-body"><h5>{{ data.total_client }}</h5></div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card">
              <div class="card-head">Total Pendapatan</div>
              <div class="card-body">
                <h5 v-for="(item, index) in data.total_keuntungan" :key="index">{{ item.total_harga }}</h5>
                <h5 v-for="(item, index) in data.total_keuntungan" :key="index">{{ item.total_kembali }}</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  <Footer/>
  </div>
</template>

<script setup>
import SideBar from '../skelton/SideBar.vue'
import NavBar from '../skelton/NavBar.vue'
import Footer from '../skelton/Footer.vue'
import { onMounted, ref } from 'vue';
import Dashboard from '../../utils/Dashboard';

const data = ref()

const getData = () => {
  Dashboard.countData()
  .then((res) => {
    let item = res.data.data
    data.value = item

    console.log(data.value);
  })
  .catch((err) => {
    console.log(err);
  })
}

onMounted(() => {
  getData()
})
</script>