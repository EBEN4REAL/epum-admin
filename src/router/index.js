import Vue from "vue";
import VueRouter from "vue-router";

import Login from '../views/login'
import AdminDashboard from '../views/dashboard/index'
import ResolvePayment from '../views/dashboard/admin/resolvePayment';
import ResolveUssd from '../views/dashboard/admin/resolveUssd';
import VoucherMonitor from '../views/dashboard/admin/voucherMonitor';
import PEFDashboard from '../views/dashboard/admin/pefDashboard';
import ManageRoles from '../views/dashboard/admin/manageRoles';
import ListOfCompanies from '../views/dashboard/ListOfCompanies/index';
import EditCompanies from '../views/dashboard/ListOfCompanies/edit_companies';
import CreateCompanies from '../views/dashboard/ListOfCompanies/create_companies';
import CompanyDetails from '../views/dashboard/ListOfCompanies/companyDetails';
import ManageUsers from '../views/dashboard/admin/ManageUsers/manageUsers';
import EditUser from '../views/dashboard/admin/ManageUsers/editUser';
import SalesRep from '../views/dashboard/ListOfCompanies/sales_rep';
import MailRecipient from '../views/dashboard/ListOfCompanies/mail_recipient'; 
import MapuserToBranch from '../views/dashboard/admin/ManageUsers/mapUserToBranch';
import MapuserToDealer from '../views/dashboard/admin/ManageUsers/mapUserToDealer';
import MapUserToSalesRep from '../views/dashboard/admin/ManageUsers/mapUserToSalesRep';
import MapUserToCompany from '../views/dashboard/admin/ManageUsers/mapUserToCompany';
import MapUserToRole from '../views/dashboard/admin/ManageUsers/MapUserToRole';

import Branches from '../views/dashboard/ListOfCompanies/branches';
import CreateBranch from '../views/dashboard/ListOfCompanies/create_branch';

import Gateway from '../views/dashboard/devices/gateway';
import POS from '../views/dashboard/devices/pos';

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
        path: "/map_user_to_role",
        name: "map_user_to_role",
        component: MapUserToRole,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/map_user_to_comapny",
        name: "map_user_to_comapny",
        component: MapUserToCompany,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/map_user_sales_rep",
        name: "map_user_sales_rep",
        component: MapUserToSalesRep,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/map_user_dealer",
        name: "map_user_dealer",
        component: MapuserToDealer,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/map_user_branch",
        name: "map_user_branch",
        component: MapuserToBranch,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/edit_user",
        name: "edit_user",
        component: EditUser,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/manage_users",
        name: "manage_users",
        component: ManageUsers,
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
        path: "/company_details",
        name: "company_details",
        component: CompanyDetails,
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
        path: "/sales_rep",
        name: "sales_rep",
        component: SalesRep,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/mail_recipient",
        name: "mail_recipient",
        component: MailRecipient,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/branches",
        name: "branches",
        component: Branches,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/create_branch",
        name: "create_branch",
        component: CreateBranch,
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
        path: "/Admin/manageRoles",
        name: "manageRoles",
        component: ManageRoles,
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
    {
        path: "Device/gateway",
        name: "gateway",
        component: Gateway,
        meta: { 
            authorize: true,
            authRoles: ['admin']
        }
    },
    {
        path: "/pos",
        name: "pos",
        component: POS,
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

