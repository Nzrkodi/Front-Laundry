<template>
  <div id="sidebar" class='active'>
    <div class="sidebar-wrapper active">
      <div class="sidebar-header">
        <img src="../../assets/images/logo.svg" alt="no logo" srcset="">
      </div>
      <div class="sidebar-menu">
        <ul class="menu">
          <li class='sidebar-title'>Main Menu</li>
          <li class="sidebar-item active ">
            <a href="index.html" class='sidebar-link'>
              <span>Dashboard</span>
            </a>
          </li>
          <li class="sidebar-item  has-sub">
            <a href="#" class='sidebar-link'>
              <span>Data</span>
            </a>
            <ul class="submenu ">
              <li>
                <a href="form-element-input-group.html">Transaksi</a>
              </li>
              <li>
                <a href="form-element-select.html">Orders</a>
              </li>
              <li>
                <a href="form-element-radio.html">Detail Orders</a>
              </li>
              <li>
                <a href="form-element-checkbox.html">Jenis Paket</a>
              </li>
              <li>
                <a href="form-element-textarea.html">Cucian Satuan</a>
              </li>
            </ul>
          </li>
          <li class="sidebar-item  ">
            <a href="table.html" class='sidebar-link'>
              <span>Report</span>
            </a>
          </li>
          <li class="sidebar-item  has-sub">
            <a href="#" class='sidebar-link'>
              <span>Menage Akun</span>
            </a>
            <ul class="submenu ">
              <li>
                <a href="form-element-input-group.html">Client</a>
              </li>
              <li>
                <a href="form-element-select.html">Pegawai</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <button class="sidebar-toggler btn x"></button>
    </div>
  </div>
</template>
<script setup></script>