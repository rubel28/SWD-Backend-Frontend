import { createRouter, createWebHistory } from 'vue-router';

import store from '../store';

// Vue.use(VueRouter);
// import { createApp } from 'vue';
// const app = createApp();
// app.use(createRouter);

const routes = [
    { path: '/',redirect:'/dashboard' },
    //Auth    
    { path: '/auth/login', name: 'Login',
        component: () => import('../views/backend/auth/login'),
        meta: { layout: 'auth', isGuest: true, accessGuard: 'home.can' } },

    //dashboard    
    { path: '/dashboard', name: 'Home',
        component: () => import('../views/backend/dashboard/index1.vue'),
        meta: { requiresAuth: true } },

    //User Manage
    {   path: '/users',
        name: 'users',
        component: () => import('../views/backend/user/list'),
        meta: { requiresAuth: true, accessGuard: 'user.can'}
    },
    {   path: '/user/add',
        name: 'user-add',
        component: () => import('../views/backend/user/add'),
        meta: { requiresAuth: true }
    },
    {   path: '/user/login-history',
        name: 'login-history',
        component: () => import('../views/backend/user/user_manage/login_history'),
        meta: { requiresAuth: true }
    },
    // Roles and Permission
    {
        path: '/roles',
        name: 'roles',
        component: () => import('../views/backend/user/role/list'),
        meta: { requiresAuth: true }
    },
    {   path: '/role/add',
        name: 'role-add',
        component: () => import('../views/backend/user/role/add'),
        meta: { requiresAuth: true }
    },
    // Utility settings
    // country
    {
        path: '/country',
        name: 'country',
        component: () => import('../views/backend/utility/country/list'),
        meta: { requiresAuth: true }
    },
    {
        path: '/country/add',
        name: 'country.add',
        component: () => import('../views/backend/utility/country/add'),
        meta: { requiresAuth: true }
    },
    {
        path: '/country/:id/edit',
        name: 'country.edit',
        component: () => import('../views/backend/utility/country/edit'),
        meta: { requiresAuth: true }
    },
    // province
    {
        path: '/province',
        name: 'province',
        component: () => import('../views/backend/utility/province/list'),
        meta: { requiresAuth: true }
    },
    // City
    {
        path: '/city',
        name: 'city',
        component: () => import('../views/backend/utility/city/list'),
        meta: { requiresAuth: true }
    },
    // bank
    {
        path: '/bank',
        name: 'bank',
        component: () => import('../views/backend/utility/bank/list'),
        meta: { requiresAuth: true }
    },
    {
        path: '/bank/:id/preview',
        name: 'bank.preview',
        component: () => import('../views/backend/utility/bank/preview'),
        meta: { requiresAuth: true }
    },
    // bank
    {
        path: '/branch',
        name: 'branch',
        component: () => import('../views/backend/utility/branch/list'),
        meta: { requiresAuth: true }
    },
    //Logout
    {
        path: '/logout',
        name: 'logout',
        component: () => import('../views/backend/auth/logout')
    },

    //Error page
    {
        path:'/error404',
        name: 'notFound',
        component: () => import('../views/backend/error/error404'),
        meta: { layout: 'auth' }
    },
    {
        path:'/:pathMatch(.*)*',
        name: 'error404',
        component: () => import('../views/backend/error/error404'),
        meta: { layout: 'auth' }
    },


];

const router = new createRouter({
    // mode: 'history',
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    
    if (to.meta && to.meta.layout && to.meta.layout == 'auth') {
        store.commit('setLayout', 'auth');
    }else if (to.meta && to.meta.layout && to.meta.layout == 'error') {
        store.commit('setLayout', 'error');
    }
    else {
        store.commit('setLayout', 'app');
    }
    if (to.meta.requiresAuth && !store.state.login.user.token) {
        next({name:'Login'});
    } else if (store.state.login.user.token && to.meta.isGuest){
        next({name:'Home'});
    }else{
        //if(to.meta.accessGuard && store.state.route_permission.includes(to.meta.accessGuard)){
            //next({name:'Home'});
        //}else{
            //next(true);            
        //}
        next(true);
    }
    //next(true)

});

export default router;
