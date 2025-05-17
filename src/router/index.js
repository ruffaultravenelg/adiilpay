import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [

        {
            path: '/',
            name: 'dashboard',
            component: () => import('../views/DashboardView.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('../views/LogoutView.vue'),
        },
        {
            path: '/create-organisation',
            name: 'create-organisation',
            component: () => import('../views/PageNotFound.vue'),
        },
        {
            path: '/cards',
            name: 'cards',
            component: () => import('../views/CardsView.vue'),
        },
        {
            path: '/card/:id',
            name: 'card',
            component: () => import('../views/CardView.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'page-not-found',
            component: () => import('../views/PageNotFound.vue'),
        },

    ],
})

export default router
