import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Produtos from '@/views/Produtos.vue'
import Movimentacoes from '@/views/Movimentacoes.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
    {
    path: '/produtos',
    name: 'produtos',
    component: Produtos,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/movimentacoes',
    name: 'movimentacoes',
    component: Movimentacoes,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
