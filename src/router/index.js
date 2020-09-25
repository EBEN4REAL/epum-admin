import Vue from "vue";
import VueRouter from "vue-router";

import Login from '../views/login'
import AdminDashboard from '../views/dashboard/index'
import ResolvePayment from '../views/dashboard/admin/resolvePayment';
import ResolveUssd from '../views/dashboard/admin/resolveUssd';

Vue.use(VueRouter);

let routes = [
    {
        path: "/",
        name: "login",
        component: Login,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/admin",
        name: "adminDashboard",
        component: AdminDashboard,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/resolvePayment",
        name: "resolvePayment",
        component: ResolvePayment,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/resolveUssd",
        name: "resolveUssd",
        component: ResolveUssd,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  });



  
  export default router

