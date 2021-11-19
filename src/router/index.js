import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import todo from "../views/todo";
import Account from "../views/Account";
import Logout from "../components/Logout";
import store from "../store/index"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/todo',
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/todo',
        name: 'todo',
        component: todo,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/Account',
        name: 'Account',
        component: Account,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.loggedIn) {
            next({
                name: 'Account',
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.loggedIn) {
            next({
                name: 'todo',
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
