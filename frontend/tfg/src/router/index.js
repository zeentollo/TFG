import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'iniciar',
    component: () => import('../views/IniciarView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/seleccionar',
    name: 'seleccionar',
    component: () => import('../views/SeleccionarView.vue')
  },{
    path: '/hombre',
    name: 'hombre',
    component: () => import('../views/HombreView.vue')
  },
  {
    path: '/mujer',
    name: 'mujer',
    component: () => import('../views/MujerView.vue')
  },
  {
    path: '/ropa',
    name: 'ropa',
    component: () => import('../views/RopaView.vue')
  },
  {
    path: '/compra',
    name: 'compra',
    component: () => import('../views/CompraView.vue')
  },
  {
    path: '/pago',
    name: 'pago',
    component: () => import('../views/PagoView.vue')
  },
  {
    path: '/factura',
    name: 'factura',
    component: () => import('../views/FacturaView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
