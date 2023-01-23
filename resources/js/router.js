import { createRouter, createWebHistory } from "vue-router";
import store from "./store";
import Home from "./pages/home.vue";
import Login from "./pages/login.vue";
import Register from "./pages/register.vue";
import Dashboard from "./pages/dashboard.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { guest: true },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { guest: true },
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requireAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requireAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.guest)) {
        if (store.getters.isLoggedIn) {
            next("/dashboard");
            return;
        }
        next();
    } else {
        next();
    }
});

export default router;
