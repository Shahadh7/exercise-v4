import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import axios from '@/axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/components/layouts/GuestLayout.vue'),
      children: [
        {
          path: '',
          name: 'Login',
          component: () => import('@/views/auth/LoginView.vue'),
        },
      ],
    },
    {
      path: '/register',
      component: () => import('@/components/layouts/GuestLayout.vue'),
      children: [
        {
          path: '',
          name: 'Register',
          component: () => import('@/views/auth/RegisterView.vue'),
        },
      ],
    },
    {
      path: '/profile',
      component: () => import('@/components/layouts/AuthenticatedLayout.vue'),
      redirect: '/profile/basic-details',
      meta: { requiresAuth: true },
      children: [
        {
          path: 'basic-details',
          name: 'Profile',
          meta: { requiresAuth: true },
          component: () => import('@/views/profile/ProfileView.vue'),
        },
        {
          path: 'basic-details/edit',
          name: 'EditProfile',
          meta: { requiresAuth: true },
          component: () => import('@/views/profile/EditProfileView.vue'),
        },
        {
          path: 'additional-details',
          name: 'AdditionalDetails',
          meta: { requiresAuth: true },
          component: () => import('@/views/profile/AdditionalDetailsView.vue'),
        },
        {
          path: 'additional-details/edit',
          name: 'EditAdditionalDetails',
          meta: { requiresAuth: true },
          component: () => import('@/views/profile/EditAdditionalDetails.vue'),
        },
        {
          path: 'spouse-details',
          name: 'SpouseDetails',
          meta: { requiresAuth: true },
          component: () => import('@/views/profile/SpouseDetailsView.vue'),
        },
        {
          path: 'spouse-details/edit',
          name: 'EditSpouseDetails',
          meta: { requiresAuth: true },
          component: () => import('@/views/profile/EditSpouseDetails.vue'),
        },
        {
          path: 'personal-preferences',
          name: 'PersonalPreferences',
          meta: { requiresAuth: true },
          component: () => import('@/views/profile/PreferencesView.vue'),
        },
        {
          path: 'personal-preferences/edit',
          name: 'EditPreferences',
          meta: { requiresAuth: true },
          component: () => import('@/views/profile/EditPreferences.vue'),
        },
        {
          path: '/home',
          name: 'home',
          meta: { requiresAuth: true },
          component: () => import('@/views/HomeView.vue'),
        },
      ],
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/login',
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const token = Cookies.get('auth_token')

  if (!token) {
    if (authRequired || requiresAuth) {
      return next('/login')
    }
    return next()
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  try {
    const response = await axios.get('/api/user')

    if (response.data) {
      if (to.path === '/login' || to.path === '/register') {
        return next('/profile')
      }
      return next()
    }
  } catch (err) {
    Cookies.remove('auth_token')
    delete axios.defaults.headers.common['Authorization']

    if (err.response?.status === 401 || err.response?.status === 403) {
      if (authRequired || requiresAuth) {
        return next('/login')
      }
    }

    if (authRequired || requiresAuth) {
      return next('/login')
    }

    return next()
  }
})
export default router
