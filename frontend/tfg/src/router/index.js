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
    component: () => import('../views/SeleccionarView.vue'),
    meta: { requiresAuth: true }
  },{
    path: '/hombre',
    name: 'hombre',
    component: () => import('../views/HombreView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/mujer',
    name: 'mujer',
    component: () => import('../views/MujerView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/ropa',
    name: 'ropa',
    component: () => import('../views/RopaView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/compra',
    name: 'compra',
    component: () => import('../views/CompraView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pago',
    name: 'pago',
    component: () => import('../views/PagoView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/factura',
    name: 'factura',
    component: () => import('../views/FacturaView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404View.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
