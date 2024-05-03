import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/pages',
    component: () => import('@/views/pages/Index'),
    children: [
      {
        name: 'Login',
        path: 'login',
        component: () => import('@/views/pages/Login'),
      },
      {
        name: 'Lock',
        path: 'lock',
        component: () => import('@/views/pages/Lock'),
      },
      {
        name: 'Register',
        path: 'register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/views/dashboard/Index'),

    // meta: {
    //   requiresAuth: true,
    // },
    children: [
      {
        name: 'Dashboard',
        path: '',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/dashboard/Dashboard'),
      },
      {
        name: 'Secciónes',
        path: 'seccion',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/sicfo/seccionCap'),
      },
      {
        name: 'Ordenes de Compras',
        path: 'orders',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/sicas/ordenes_compra'),
      },
      {
        name: 'Modulo de Precaptura',
        path: 'precaptura',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/solicitud/preCaptura'),
      },
      {
        name: 'Solicitud de Pagos',
        path: 'captura',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/solicitud/CapInicial'),
      },
      {
        name: 'Firmas Presupuesto',
        path: 'firmasol',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/solicitud/firmaSolicita'),
      },
      {
        name: 'Firmas Administrador',
        path: 'firmaaut',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/solicitud/firmaAutoriza'),
      },
      {
        name: 'Pagos Tesoreria',
        path: 'pagos',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/solicitud/pagos'),
      },
      {
        name: 'Ejercido',
        path: 'ejercido',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/solicitud/ejercido'),
      },
      {
        name: 'Envio a Contabilidad',
        path: 'devengado',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/solicitud/devengado'),
      },
      {
        name: 'Consulta de Solicitudes',
        path: 'consulta',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/solicitud/consulta'),
      },
      {
        name: 'Catalogo de Acciones',
        path: 'acciones',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/catalogos/acciones'),
      },
      {
        name: 'Eventos',
        path: 'eventos',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/catalogos/programas'),
      },
      {
        name: 'Ciudadanos',
        path: 'ciudadanos',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/catalogos/ciudadanos'),
      },
      {
        name: 'Licitaciones',
        path: 'crealicita',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/sicfo/creaLicitacion.vue'),
      },
        {
        name: 'Convocatorias',
        path: 'viewConvo',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/sicfo/publicacionView.vue'),
      },
      {
        name: 'Administración de Sistemas',
        path: 'sistema',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/catalogos/sistema'),
      },
      {
        name: 'Administración de Usuarios',
        path: 'usuarios',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/catalogos/usuario'),
      },
      {
        name: 'Catálogo de Empleados',
        path: 'empleados',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/catalogos/empleado'),
      },
      {
        name: 'Catálogo de Tipos',
        path: 'tipos',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/catalogos/tipo'),
      },
      {
        name: 'Catálogo de Contratistas',
        path: 'contratistas',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/catalogos/contratista'),
      },
      /*       {
        name: 'Catálogo de Retenciones',
        path: 'admon/retencion',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/catalogos/retencion'),
      },
 */ {
        name: 'Catálogo de Afianzadoras',
        path: 'afianzadoras',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/catalogos/afianzadoras'),
      },
      {
        name: 'Colonias y Localidades',
        path: 'colonias-localidad',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/catalogos/colonias'),
      },
      {
        name: 'Perfil de Usuario',
        path: 'pages/user',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/dashboard/pages/UserProfile'),
      },
      {
        name: 'Catálogo de Vehículos',
        path: 'vehiculos',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/catalogos/sica/vehiculo'),
      },
      {
        name: 'Catálogo de Productos',
        path: 'productos',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/catalogos/sica/productos'),
      },
      {
        name: 'Catálogo de Conceptos de Comite',
        path: 'comcomite',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/catalogos/sica/comcomite'),
      },
    ],
  },

  {
    path: '*',
    component: () => import('@/views/pages/Index'),
    children: [
      {
        name: '404 Error',
        path: '',
        component: () => import('@/views/pages/Error'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if (to.meta.requiresAuth && !loggedIn) {
    next('/pages/login')
  } else {
    next()
  }
})

export default router
