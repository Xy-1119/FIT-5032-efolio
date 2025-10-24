import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import AddBookView from '../views/AddBookView.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue' 
import GetBookCountView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'

const routes = [
  {
    path: '/',
    name: 'Signin',
    component: FirebaseSigninView   
  },
   {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI 
  },
    {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView  
  },
   {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component:GetBookCountView   
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/addbook',
    name: 'Addbook',
    component: AddBookView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView   
  },
  {
    path: '/register',
    name: 'Register',
    component: FirebaseRegisterView 
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), 
  routes
})

export default router
