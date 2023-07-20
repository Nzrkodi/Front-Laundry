<template>
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
              <!-- <img src="../../assets/images/avatar/avatar-s-1.png" alt="" srcset="">/ -->
            </div>
            <div class="d-none d-md-block d-lg-inline-block">Hi, Saugi</div>
            <a role="button" class="ms-5" @click="logout">Logout</a>
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
</template>
<script setup>
import { onMounted } from 'vue';
import Other from '../../utils/Other';
import { useRouter } from 'vue-router'

// Pusher.logToConsole = true;

// const pusher = new Pusher('35f1b0843bf6b5e60bd9', {
//   cluster: 'ap1'
// });

const getNotif = () => {
  // Lakukan subscribe ke channel yang diinginkan
  const channel = pusher.subscribe('order-notif');

  // Tangkap event yang diterima dari channel
  channel.bind('send-notif', (data) => {
    // Manipulasi data notifikasi sesuai kebutuhan
    Other.toastSuccess({
      type: "success",
      title: data.message,
      msg: "anda memiliki notifikasi"
    })

    console.log('ini notif', data);
  });
}

const router = useRouter()

const logout = () => {
  Other.sweetAlertQuestion({
    title: "Logout?",
    msg: "Anda ingin logout",
    confirmMsg: "Logout",
    callback: () => {
      localStorage.clear()
      router.push('/login')
    }
  })
}

onMounted(() => {
  // getNotif();
});
</script>