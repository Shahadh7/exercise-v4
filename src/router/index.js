import { createRouter, createWebHistory } from 'vue-router'

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
      children: [
        {
          path: 'basic-details',
          name: 'Profile',
          component: () => import('@/views/profile/ProfileView.vue'),
        },
        {
          path: 'edit',
          name: 'EditProfile',
          component: () => import('@/views/profile/EditProfileView.vue'),
        },
        {
          path: 'additional-details',
          name: 'AdditionalDetails',
          component: () => import('@/views/profile/AdditionalDetailsView.vue'),
        },
        {
          path: 'spouse-details',
          name: 'SpouseDetails',
          component: () => import('@/views/profile/SpouseDetailsView.vue'),
        },
        {
          path: 'personal-preferences',
          name: 'PersonalPreferences',
          component: () => import('@/views/profile/PreferencesView.vue'),
        },
        {
          path: '/home',
          name: 'home',
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

export default router
