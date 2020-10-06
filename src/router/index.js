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
import CompanyDetails from '../views/dashboard/ListOfCompanies/companyDetails';
import ManageUsers from '../views/dashboard/admin/ManageUsers/manageUsers';
import UserDetails from '../views/dashboard/admin/ManageUsers/userDetails';
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


import ManageRoles from '../views/dashboard/admin/manageRoles';
import CreateRoles from '../views/dashboard/ListOfRoles/create_roles';
import EditRoles from '../views/dashboard/ListOfRoles/edit_roles';

import Gateway from '../views/dashboard/devices/gateway';
import POS from '../views/dashboard/devices/pos';
import DevicesOffline from '../views/dashboard/devices/devices_offline';
import DevicesOutOfReach from '../views/dashboard/devices/devices_out_of_reach';
import DevicesNotPushingEp2 from '../views/dashboard/devices/devices_not_pushing_ep2';

Vue.use(VueRouter);

let routes = [
    {
        path: "/",
        name: "login",
        component: Login,
        meta: {
            guest: true
        }
    },
    {
        path: "/devices_not_pushing_ep2",
        name: "devices_not_pushing_ep2",
        component: DevicesNotPushingEp2,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/user_details",
        name: "user_details",
        component: UserDetails,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    
    {
        path: "/device_offline",
        name: "devices_offline",
        component: DevicesOffline,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/devices_out_of_reach",
        name: "devices_out_of_reach",
        component: DevicesOutOfReach,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    
    {
        path: "/map_user_to_role",
        name: "map_user_to_role",
        component: MapUserToRole,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/map_user_to_comapny",
        name: "map_user_to_comapny",
        component: MapUserToCompany,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/map_user_sales_rep",
        name: "map_user_sales_rep",
        component: MapUserToSalesRep,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/map_user_dealer",
        name: "map_user_dealer",
        component: MapuserToDealer,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/map_user_branch",
        name: "map_user_branch",
        component: MapuserToBranch,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/edit_user",
        name: "edit_user",
        component: EditUser,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/manage_users",
        name: "manage_users",
        component: ManageUsers,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/Companies",
        name: "list_of_companies",
        component: ListOfCompanies,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/company_details",
        name: "company_details",
        component: CompanyDetails,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/edit_companies",
        name: "edit_companies",
        component: EditCompanies,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/create_companies",
        name: "create_companies",
        component: CreateCompanies,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/sales_rep",
        name: "sales_rep",
        component: SalesRep,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/mail_recipient",
        name: "mail_recipient",
        component: MailRecipient,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/branches",
        name: "branches",
        component: Branches,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/create_branch",
        name: "create_branch",
        component: CreateBranch,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/Admin",
        name: "adminDashboard",
        component: AdminDashboard,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/Admin/resolvePayment",
        name: "resolvePayment",
        component: ResolvePayment,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/Admin/resolveUssd",
        name: "resolveUssd",
        component: ResolveUssd,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/Admin/manageRoles",
        name: "manageRoles",
        component: ManageRoles,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/create_roles",
        name: "create_roles",
        component: CreateRoles,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/edit_roles",
        name: "edit_roles",
        component: EditRoles,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/voucherMonitor",
        name: "voucherMonitor",
        component: VoucherMonitor,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/pefDashboard",
        name: "pefDashboard",
        component: PEFDashboard,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "Device/gateway",
        name: "gateway",
        component: Gateway,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
    {
        path: "/pos",
        name: "pos",
        component: POS,
        meta: { 
            authorize: true,
            authRoles: ['Admin']
        }
    },
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});


router.beforeEach((to, from, next) => {
    if(to.matched.some(rec => rec.meta.authorize)){
        // Authorized Pages will he handled here
        if(localStorage.getItem("adminUserDetails") === null){
            // There is no logged in user, go back to Login (and redirect to intended page after successfull login)
            next({name: 'login', params: {nextUrl: to.fullPath}});
        }
        else{
            let user = JSON.parse(localStorage.getItem("adminUserDetails"));
  
            // Company Admin
            if(to.matched.some(rec => rec.meta.authRoles.includes('admin') )){  
                if(user.roles.includes("Super Admin") || user.roles.includes("Admin"))
                {
                    next()
                }
            }
            else{
                next();
            }
        }
    }
    else if(to.matched.some(rec => rec.meta.guest)){
        //Guest Pages are Handled here e.g. Login
        if(localStorage.getItem("adminUserDetails") === null){
            next();
          }
          else{
              let user = JSON.parse(localStorage.getItem("adminUserDetails"));
              if(user.roles.includes("Super Admin") || user.roles.includes("Admin"))
              {
                  next({ name: 'adminDashboard'});
              }
           }
    }
    else{
        // Free pages are handled here
        next();
    }
  });
  


  
  export default router

