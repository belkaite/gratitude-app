import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import NoteView from '@/views/NoteView.vue'
import TipView from '@/views/TipView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: 'login' },
    { path: '/home', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/notes', name: 'notes', component: NoteView },
    { path: '/tips', name: 'tips', component: TipView },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
  ],
})

export default router
