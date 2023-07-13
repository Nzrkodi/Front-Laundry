<template>
    <SideBar />
    <div id="main">
        <NavBar />

        <div class="main-content container-fluid">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h4>Tabel Cuci Satuan</h4>
                        <p class="text-subtitle text-primary">
                            Tabel laundry yaitu tabel dimana menampung semua data laundry client
                        </p>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class='breadcrumb-header'>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Table</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            <!--  Inverse table start -->
            <div class="row" id="table-inverse">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title float-start">Data Cuci Satuan</h4>
                            <button class=" float-end btn btn-primary btn-sm">Tambah Data</button>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-light mb-0">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>Harga</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="text-bold-500">Michael Right</td>
                                            <td>$15/hr</td>
                                            <td class="text-bold-500">UI/UX</td>
                                            <td>
                                                <a href="" class="btn btn-outline-primary"
                                                    style="margin-right: 0.5rem;">Edit</a>
                                                <a href="" class="btn btn-outline-danger">Delete</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>
  
<script setup>
import SideBar from '../skelton/SideBar.vue'
import NavBar from '../skelton/NavBar.vue'
import Footer from '../skelton/Footer.vue'
</script>