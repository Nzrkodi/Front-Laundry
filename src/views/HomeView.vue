<template>
  <div id="sidebar" class='active'>
    <div class="sidebar-wrapper active">
      <div class="sidebar-header">
        <img src="../assets/images/logo.svg" alt="no logo" srcset="">
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
  <div id="main">
    <nav class="navbar navbar-header navbar-expand navbar-light">
      <a class="sidebar-toggler" href="#"><span class="navbar-toggler-icon"></span></a>
      <button class="btn navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav d-flex align-items-center navbar-light ms-auto">
          <li class="dropdown">
            <a href="#" data-bs-toggle="dropdown" class="nav-link dropdown-toggle nav-link-lg nav-link-user">
              <div class="avatar me-1">
                <img src="../assets/images/avatar/avatar-s-1.png" alt="" srcset="">
              </div>
              <div class="d-none d-md-block d-lg-inline-block">Hi, Saugi</div>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
              <a class="dropdown-item" href="#"> Account</a>
              <a class="dropdown-item" href="#"> Settings</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#"> Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <div class="main-content container-fluid">
      <div class="page-title">
        <h3>Dashboard</h3>
        <p class="text-subtitle text-muted">A good dashboard to display your statistics</p>
      </div>
      <section class="section">
      </section>
    </div>

    <footer>
      <div class="footer clearfix mb-0 text-muted">
        <div class="float-start">
          <p>2022 &copy; Voler</p>
        </div>
        <div class="float-end">
          <p>Crafted with <span class='text-danger'></span> by <a
              href="https://saugi.me">Saugi</a></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>