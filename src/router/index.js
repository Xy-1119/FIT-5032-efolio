import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import AddBookView from '../views/AddBookview.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue' 

const routes = [
  {
    path: '/',
    name: 'Signin',
    component: FirebaseSigninView   
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
  history: createWebHistory(),
  routes
})

export default router
