import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
        meta: { title: 'B-FIT Sports & Supplements — Premium Athletic Wear' }
    },
    {
        path: '/shop',
        name: 'Shop',
        component: () => import('../views/ShopView.vue'),
        meta: { title: 'Shop — B-FIT Sports & Supplements' }
    },
    {
        path: '/shop/:category',
        name: 'ShopCategory',
        component: () => import('../views/ShopView.vue'),
        meta: { title: 'Shop — B-FIT Sports & Supplements' }
    },
    {
        path: '/product/:slug',
        name: 'ProductDetail',
        component: () => import('../views/ProductDetailView.vue'),
        meta: { title: 'Product — B-FIT Sports & Supplements' }
    },
    {
        path: '/offers',
        name: 'Offers',
        component: () => import('../views/OffersView.vue'),
        meta: { title: 'Offers & Deals — B-FIT Sports & Supplements' }
    },
    {
        path: '/wishlist',
        name: 'Wishlist',
        component: () => import('../views/WishlistView.vue'),
        meta: { title: 'Wishlist — B-FIT Sports & Supplements' }
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/CartView.vue'),
        meta: { title: 'Cart — B-FIT Sports & Supplements' }
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('../views/CheckoutView.vue'),
        meta: { title: 'Checkout — B-FIT Sports & Supplements' }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue'),
        meta: { title: 'Login — B-FIT Sports & Supplements' }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/RegisterView.vue'),
        meta: { title: 'Create Account — B-FIT Sports & Supplements' }
    },
    {
        path: '/account',
        name: 'Account',
        component: () => import('../views/AccountView.vue'),
        meta: { title: 'My Account — B-FIT Sports & Supplements' }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/ContactView.vue'),
        meta: { title: 'Contact Us — B-FIT Sports & Supplements' }
    },
    {
        path: '/order-success',
        name: 'OrderSuccess',
        component: () => import('../views/OrderSuccessView.vue'),
        meta: { title: 'Order Confirmed — B-FIT Sports & Supplements' }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/NotFoundView.vue'),
        meta: { title: '404 — B-FIT Sports & Supplements' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        if (to.hash) return { el: to.hash, behavior: 'smooth' }
        return { top: 0, behavior: 'smooth' }
    }
})

router.afterEach((to) => {
    if (to.meta?.title) {
        document.title = to.meta.title
    }
})

export default router
