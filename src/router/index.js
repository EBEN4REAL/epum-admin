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
import CheckPumpSales from "../views/dashboard/admin/check_pump_sales";
import UsersEdit from "../views/dashboard/admin/ManageUsers/usersEdit";
import UserDetails from "../views/dashboard/admin/ManageUsers/user_details";
import SalesRep from "../views/dashboard/ListOfCompanies/sales_rep";
import MailRecipient from "../views/dashboard/ListOfCompanies/mail_recipient";
import MapUserToSalesRep from "../views/dashboard/admin/ManageUsers/mapUserToSalesRep";
import Branches from "../views/dashboard/ListOfCompanies/branches";
import DealerBranches from "../views/dashboard/ListOfCompanies/dealerBranches";
import PosTerminals from "../views/dashboard/ListOfCompanies/posTerminals";
import CreateTerminal from "../views/dashboard/ListOfCompanies/createTerminal";
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
import TankCalibration from "../views/dashboard/Tank/tankCalibration";
import CalibrationVolume from "../views/dashboard/Tank/calibrationVolume";
import InstalledTanks from "../views/dashboard/Tank/installedTanks";
import TankTransaction from "../views/dashboard/Tank/tankTransaction";
import EditTank from "../views/dashboard/Tank/editTank";
import UpdateTankstatus from "../views/dashboard/Tank/updateTankStatus";
import TankDipping from "../views/dashboard/Tank/tankDipping";
import ReFilledTanks from "../views/dashboard/Tank/reFilledTanks";
import TanksFilled from "../views/dashboard/Tank/tankFilled";
import OutstandingPayments from "../views/dashboard/outstandingPayments/index";
import MakePayments from "../views/dashboard/outstandingPayments/outstandingPayments";
import WalletTransactions from "../views/dashboard/outstandingPayments/walletTransactions";
import PumpStatus from "../views/dashboard/devices/pumpStatus";
import EditPumpStatus from "../views/dashboard/devices/editPumpStatus";
import Devices from "../views/dashboard/devices/devices";
import DumpData from "../views/dashboard/devices/dumpData";
import DumpDataTanks from "../views/dashboard/devices/dumpDataTanks";
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

// Inovoice management
// import Products from "../views/Invoices/Products/products";
// import AddProduct from "../views/Invoices/Products/addProducts";
// import Invoice from "../views/Invoices/Invoice/index";
// import Invoices from "../views/Invoices/Invoice/invoices";
// import AutoSubscription from "../views/Invoices/Invoice/autoSubscription";
// import InvoiceDetails from "../views/Invoices/Invoice/invoiceDetails";

const Products = () => import('../views/dashboard/Invoices/Products/products.vue')
const Taxes = () => import('../views/dashboard/Invoices/Products/taxes.vue')
const AddProduct = () => import('../views/dashboard/Invoices/Products/addProducts.vue')
const Invoice = () => import('../views/dashboard/Invoices/Invoice/index.vue')
const Invoices = () => import('../views/dashboard/Invoices/Invoice/invoices.vue')
const AutoSubscription = () => import('../views/dashboard/Invoices/Invoice/autoSubscription.vue')
const InvoiceDetails = () => import('../views/dashboard/Invoices/Invoice/invoiceDetails.vue')

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
    path: "/auto-subscription",
    name: "auto_subscription",
    component: AutoSubscription,
    meta: {
        authorize: true,
        authRoles: ['Admin']
    }
  },
  {
    path: "/invoice-details",
    name: "invoice_details",
    component: InvoiceDetails,
    meta: {
        authorize: true,
        authRoles: ['Admin']
    }
  },
  {
    path: "/invoices",
    name: "invoices",
    component: Invoices,
    meta: {
        authorize: true,
        authRoles: ['Admin']
    }
  },
  {
    path: "/invoice",
    name: "invoice",
    component: Invoice,
    meta: {
        authorize: true,
        authRoles: ['Admin']
    }
  },
  {
    path: "/add-product",
    name: "add_product",
    component: AddProduct,
    meta: {
        authorize: true,
        authRoles: ['Admin']
    }
  },
  {
    path: "/taxes",
    name: "taxes",
    component: Taxes,
    meta: {
        authorize: true,
        authRoles: ['Admin']
    }
  },
  {
    path: "/products",
    name: "products",
    component: Products,
    meta: {
        authorize: true,
        authRoles: ['Admin']
    }
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
    path: "/check-pump-sales",
    name: "check_pump_sales",
    component: CheckPumpSales,
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
    path: "/tank-calibration",
    name: "tank_calibration",
    component: TankCalibration,
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
    path: "/update-tank-status",
    name: "update_tank_status",
    component: UpdateTankstatus,
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
    path: "/pumps-dump-data",
    name: "dumpData",
    component: DumpData,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/tanks-dump-data",
    name: "dumpDataTanks",
    component: DumpDataTanks,
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
    path: "/map_user_sales_rep",
    name: "map_user_sales_rep",
    component: MapUserToSalesRep,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/calibration-volume",
    name: "calibrationVolume",
    component: CalibrationVolume,
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
    path: "/pos-terminals",
    name: "pos_terminals",
    component: PosTerminals,
    meta: {
      authorize: true,
      authRoles: ["Admin"],
    },
  },
  {
    path: "/create-terminal",
    name: "create_terminal",
    component: CreateTerminal,
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
{
  path: "/usersEdit",
  name: "usersEdit",
  component: UsersEdit,
  meta: {
      authorize: true,
      authRoles: ['Admin']
  }
},
{
  path: "/tanks-filled",
  name: "tanksFilled",
  component: TanksFilled,
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
