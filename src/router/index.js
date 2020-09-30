import Vue from "vue";
import VueRouter from "vue-router";

import Login from '../views/login'
import AdminDashboard from '../views/dashboard/index'
import ResolvePayment from '../views/dashboard/admin/resolvePayment';
import ResolveUssd from '../views/dashboard/admin/resolveUssd';
import VoucherMonitor from '../views/dashboard/admin/voucherMonitor';
import PEFDashboard from '../views/dashboard/admin/pefDashboard';
import ListOfCompanies from '../views/dashboard/ListOfCompanies/index';
import EditCompanies from '../views/dashboard/ListOfCompanies/edit_companies';
import CreateCompanies from '../views/dashboard/ListOfCompanies/create_companies';

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
        path: "/Companies",
        name: "list_of_companies",
        component: ListOfCompanies,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/edit_companies",
        name: "edit_companies",
        component: EditCompanies,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/create_companies",
        name: "create_companies",
        component: CreateCompanies,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/Admin",
        name: "adminDashboard",
        component: AdminDashboard,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/Admin/resolvePayment",
        name: "resolvePayment",
        component: ResolvePayment,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/Admin/resolveUssd",
        name: "resolveUssd",
        component: ResolveUssd,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/voucherMonitor",
        name: "voucherMonitor",
        component: VoucherMonitor,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/pefDashboard",
        name: "pefDashboard",
        component: PEFDashboard,
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

