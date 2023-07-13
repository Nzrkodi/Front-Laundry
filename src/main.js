import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import 'perfect-scrollbar'
import './assets/css/app.css'
import './assets/js/app'
import './assets/js/main'

const app = createApp(App)

app.use(router)

app.mount('#app')
