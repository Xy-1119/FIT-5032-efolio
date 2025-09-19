// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'

import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'


import './Firebase/init'        // 或：import { app as firebaseApp } from './firebase/init'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
app.mount('#app')
