import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import 'perfect-scrollbar'
import './assets/css/app.css'
import './assets/js/app'
import './assets/js/main'

import 'izitoast/dist/css/iziToast.css'
import 'izitoast/dist/js/iziToast.js'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import '@fortawesome/fontawesome-svg-core/styles.css';

library.add(fas);

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router)

app.mount('#app')
