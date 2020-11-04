import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/login";
import AdminDashboard from "../views/dashboard/index";
import ResolvePayment from "../views/dashboard/admin/resolvePayment";
import ResolveUssd from "../views/dashboard/admin/resolveUssd";
import VoucherMonitor from "../views/dashboard/admin/voucherMonitor";
import PEFDashboard from "../views/dashboard/admin/pefDashboard";
import BranchDetails from "../views/dashboard/ListOfCompanies/branchDetails";
import ListOfCompanies from "../views/dashboard/ListOfCompanies/index";
import CreateCompanies from "../views/dashboard/ListOfCompanies/create_companies";
import NewCompanyDetails from "../views/dashboard/ListOfCompanies/company_details";
import ManageUsers from "../views/dashboard/admin/ManageUsers/manageUsers";
import UserDetails from "../views/dashboard/admin/ManageUsers/userDetails";
import EditUser from "../views/dashboard/admin/ManageUsers/editUser";
import SalesRep from "../views/dashboard/ListOfCompanies/sales_rep";
import MailRecipient from "../views/dashboard/ListOfCompanies/mail_recipient";
import MapuserToBranch from "../views/dashboard/admin/ManageUsers/mapUserToBranch";
import MapuserToDealer from "../views/dashboard/admin/ManageUsers/mapUserToDealer";
import MapUserToSalesRep from "../views/dashboard/admin/ManageUsers/mapUserToSalesRep";
import MapUserToCompany from "../views/dashboard/admin/ManageUsers/mapUserToCompany";
import MapUserToRole from "../views/dashboard/admin/ManageUsers/MapUserToRole";
import Branches from "../views/dashboard/ListOfCompanies/branches";
import DealerBranches from "../views/dashboard/ListOfCompanies/dealerBranches";
import CreateDealerBranch from "../views/dashboard/ListOfCompanies/createDealerBranch";
import CreateBranch from "../views/dashboard/ListOfCompanies/create_branch";
import EditBranch from "../views/dashboard/ListOfCompanies/editBranch";
import Transactions from "../views/dashboard/ListOfCompanies/transactions";
import BranchMailRecipent from "../views/dashboard/ListOfCompanies/branchMail_recipent";
import ManageRoles from "../views/dashboard/admin/manageRoles";
import CreateRoles from "../views/dashboard/ListOfRoles/create_roles";
import EditRoles from "../views/dashboard/ListOfRoles/edit_roles";
import Dealers from "../views/dashboard/Dealers/dealers";
import CreateDealer from "../views/dashboard/Dealers/createDealer";
import EditDealers from "../views/dashboard/Dealers/editDealers";
import DealerDetails from "../views/dashboard/Dealers/dealerDetails";
import AuditSales from "../views/dashboard/admin/Audit.vue";
import BranchAuditSales from "../views/dashboard/admin/branchAuditSales.vue";
import InstalledPumps from "../views/dashboard/admin/Pumps/installedPumps";
import PumpDetails from "../views/dashboard/admin/Pumps/pumpDetails";
import PumpTransactions from "../views/dashboard/admin/Pumps/pumpTransactions";
import AddPump from "../views/dashboard/admin/Pumps/addPump";
import AddTank from "../views/dashboard/Tank/addTank";
import InstalledTanks from "../views/dashboard/Tank/installedTanks";
import TankTransaction from "../views/dashboard/Tank/tankTransaction";
import EditTank from "../views/dashboard/Tank/editTank";
import TankDipping from "../views/dashboard/Tank/tankDipping";
import ReFilledTanks from "../views/dashboard/Tank/reFilledTanks";
import OutstandingPayments from "../views/dashboard/outstandingPayments/index";
import MakePayments from "../views/dashboard/outstandingPayments/outstandingPayments";
import WalletTransactions from "../views/dashboard/outstandingPayments/walletTransactions";
import PumpStatus from "../views/dashboard/devices/pumpStatus";
import EditPumpStatus from "../views/dashboard/devices/editPumpStatus";
import Devices from "../views/dashboard/devices/devices";
import DumpData from "../views/dashboard/devices/dumpData";
import EditDevices from "../views/dashboard/devices/editDevices";
import DeviceConsole from "../views/dashboard/devices/deviceConsole";
import DeviceDetails from "../views/dashboard/devices/deviceDetails";
import DevicesOffline from "../views/dashboard/devices/devices_offline";
import DevicesOutOfReach from "../views/dashboard/devices/devices_out_of_reach";
import DevicesNotPushingEp2 from "../views/dashboard/devices/devices_not_pushing_ep2";
import AddDevice from "../views/dashboard/devices/addDevice";
import PumpVariance from "../views/dashboard/admin/Pumps/pump_variance_report";
import TankSales from "../views/dashboard/admin/tankSales";
import ExtendVoucher from "../views/dashboard/admin/extendVoucher";

Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: "/tank-sales",
    name: "tank_sales",
    component: TankSales,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/pump-variance",
    name: "pump_variance_report",
    component: PumpVariance,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/devices_not_pushing_ep2",
    name: "devices_not_pushing_ep2",
    component: DevicesNotPushingEp2,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/audit-sales",
    name: "audit_sales",
    component: AuditSales,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/addDevice",
    name: "addDevice",
    component: AddDevice,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/user_details",
    name: "user_details",
    component: UserDetails,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },

  {
    path: "/device_offline",
    name: "devices_offline",
    component: DevicesOffline,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/devices_out_of_reach",
    name: "devices_out_of_reach",
    component: DevicesOutOfReach,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/devices",
    name: "devices",
    component: Devices,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/editDevices",
    name: "editDevices",
    component: EditDevices,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/dump-data",
    name: "dumpData",
    component: DumpData,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/deviceDetails",
    name: "deviceDetails",
    component: DeviceDetails,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/deviceConsole",
    name: "deviceConsole",
    component: DeviceConsole,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/map_user_to_role",
    name: "map_user_to_role",
    component: MapUserToRole,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/map_user_to_comapny",
    name: "map_user_to_comapny",
    component: MapUserToCompany,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/map_user_sales_rep",
    name: "map_user_sales_rep",
    component: MapUserToSalesRep,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/map_user_dealer",
    name: "map_user_dealer",
    component: MapuserToDealer,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/map_user_branch",
    name: "map_user_branch",
    component: MapuserToBranch,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/edit_user",
    name: "edit_user",
    component: EditUser,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/manage_users",
    name: "manage_users",
    component: ManageUsers,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/Companies",
    name: "list_of_companies",
    component: ListOfCompanies,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/create_companies",
    name: "create_companies",
    component: CreateCompanies,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/sales_rep",
    name: "sales_rep",
    component: SalesRep,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/mail_recipient",
    name: "mail_recipient",
    component: MailRecipient,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/branches",
    name: "branches",
    component: Branches,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/create_dealer_branch",
    name: "create_dealer_branch",
    component: CreateDealerBranch,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  
  {
    path: "/dealer_branches",
    name: "dealer_branches",
    component: DealerBranches,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/create_branch",
    name: "create_branch",
    component: CreateBranch,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/editBranch",
    name: "editBranch",
    component: EditBranch,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/transactions",
    name: "transactions",
    component: Transactions,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/branchMail_recipent",
    name: "branchMail_recipent",
    component: BranchMailRecipent,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/Admin",
    name: "adminDashboard",
    component: AdminDashboard,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/Admin/resolvePayment",
    name: "resolvePayment",
    component: ResolvePayment,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/Admin/resolveUssd",
    name: "resolveUssd",
    component: ResolveUssd,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/Admin/manageRoles",
    name: "manageRoles",
    component: ManageRoles,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/create_roles",
    name: "create_roles",
    component: CreateRoles,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/edit_roles",
    name: "edit_roles",
    component: EditRoles,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/voucherMonitor",
    name: "voucherMonitor",
    component: VoucherMonitor,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/pefDashboard",
    name: "pefDashboard",
    component: PEFDashboard,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/pump_status",
    name: "pump_status",
    component: PumpStatus,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
 
  {
    path: "/editPumpStatus",
    name: "editPumpStatus",
    component: EditPumpStatus,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/dealers",
    name: "dealers",
    component: Dealers,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/dealers/editDealers",
    name: "editDealers",
    component: EditDealers,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/dealers/dealerDetails",
    name: "dealerDetails",
    component: DealerDetails,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/createDealer",
    name: "createDealer",
    component: CreateDealer,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
      path: "/installedPumps",
      name: "installedPumps",
      component: InstalledPumps,
      meta: {
          authorize: true,
          authRoles: ['Admin']
      }
  },
  {
    path: "/pumpDetails",
    name: "pumpDetails",
    component: PumpDetails,
    meta: {
        authorize: true,
        authRoles: ['Admin']
    }
  },
  {
    path: "/pump-transactions",
    name: "pumpTransactions",
    component: PumpTransactions,
    meta: {
        authorize: true,
        authRoles: ['Admin']
    }
  },
{
  path: "/addPump",
  name: "addPump",
  component: AddPump,
  meta: {
      authorize: true,
      authRoles: ['Admin']
  }
},
{
  path: "/addTank",
  name: "addTank",
  component: AddTank,
  meta: {
      authorize: true,
      authRoles: ['Admin']
  }
},
{
  path: "/tankTransaction",
  name: "tankTransaction",
  component: TankTransaction,
  meta: {
      authorize: true,
      authRoles: ['Admin']
  }
},
{
  path: "/editTank",
  name: "editTank",
  component: EditTank,
  meta: {
      authorize: true,
      authRoles: ['Admin']
  }
},
{
  path: "/tankDipping",
  name: "tankDipping",
  component: TankDipping,
  meta: {
      authorize: true,
      authRoles: ['Admin']
  }
},
{
  path: "/reFilledTanks",
  name: "reFilledTanks",
  component: ReFilledTanks,
  meta: {
      authorize: true,
      authRoles: ['Admin']
  }
},
{
  path: "/branchDetails",
  name: "branchDetails",
  component: BranchDetails,
  meta: {
      authorize: true,
      authRoles: ['Admin']
  }
},
{
  path: "/installedTanks",
  name: "installedTanks",
  component: InstalledTanks,
  meta: {
      authorize: true,
      authRoles: ['Admin']
  }
},
{
  path: "/outstanding-payments",
  name: "outstandingPayments",
  component: OutstandingPayments,
  meta: {
      authorize: true,
      authRoles: ['Admin']
  }
},
{
  path: "/make-payments",
  name: "makePayments",
  component: MakePayments,
  meta: {
      authorize: true,
      authRoles: ['Admin']
  }
},
{
  path: "/wallet-transactions",
  name: "walletTransactions",
  component: WalletTransactions,
  meta: {
      authorize: true,
      authRoles: ['Admin']
  }
},
{
  path: "/extendVoucher",
  name: "extendVoucher",
  component: ExtendVoucher,
  meta: {
      authorize: true,
      authRoles: ['Admin']
  }
},
{
  path: "/newCompanyDetails",
  name: "newCompanyDetails",
  component: NewCompanyDetails,
  meta: {
      authorize: true,
      authRoles: ['Admin']
  }
},
{
  path: "/branchAuditSales",
  name: "branchAuditSales",
  component: BranchAuditSales,
  meta: {
      authorize: true,
      authRoles: ['Admin']
  }
},

];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((rec) => rec.meta.authorize)) {
    // Authorized Pages will he handled here
    if (localStorage.getItem("adminUserDetails") === null) {
      // There is no logged in user, go back to Login (and redirect to intended page after successfull login)
      next({ name: "login", params: { nextUrl: to.fullPath } });
    } else {
      let user = JSON.parse(localStorage.getItem("adminUserDetails"));

      // Company Admin
      if (to.matched.some((rec) => rec.meta.authRoles.includes("Admin"))) {
        if (
          user.roles.includes("Super Admin") ||
          user.roles.includes("Admin")
        ) {
          next();
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some((rec) => rec.meta.guest)) {
    //Guest Pages are Handled here e.g. Login
    if (localStorage.getItem("adminUserDetails") === null) {
      next();
    } else {
      let user = JSON.parse(localStorage.getItem("adminUserDetails"));
      if (user.roles.includes("Super Admin") || user.roles.includes("Admin")) {
        next({ name: "adminDashboard" });
      }
    }
  } else {
    // Free pages are handled here
    next();
  }
});

export default router;
