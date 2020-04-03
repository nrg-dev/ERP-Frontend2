import { MenuItem } from "../../components/sidebar-nav/sidebar-nav.model";

export const abc = 5;

export const SidenavItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "assets/images/dashboard.png",
    path: "/",
    childern: [],
    submenu: false
  },
  {
    id: "employment",
    label: "Employees",
    icon: "assets/images/employee.png",
    path: "/employment",
    submenu: false,
    childern: []
  },
  {
    id: "vendorAndCustomer",
    label: "Vendors",
    icon: "assets/images/vendor-customer.png",
    path: "/vendor-and-customer",
    childern: [{
      id: "vendors",
      label: "Vendor",
      path: "/vendor-and-customer/vendor",
     },
     {
      id: "customers",
      label: "Customer",
       path: "/vendor-and-customer/customer",
     }],
    submenu: true
  },
 
  {
    id: "purchase",
    label: "Purchases",
    icon: "assets/images/circle-cropped.png",
    path: "/purchase",
    childern: [{
      id: "purchase-order",
      label: "Orders",
      path: "/purchase",
     },
     {
      id: "purchase-invoice",
      label: "Invoices",
      path: "invoice",
      }, {
        id: "purchase-invoice",
        label: "Returns",
        path: "invoice",
      }],
    submenu: true
  },
  {
    id: "categoryAndProduct",
    label: "Stock",
    icon: "assets/images/category-product.png",
    path: "/category-and-product",
    childern: [],
    submenu: false
  },
  {
    id: "sales",
    label: "Sales",
    icon: "assets/images/sales.png",
    path: "/sales",
    childern: [{
      id: "sales-order",
      label: "Orders",
      path: "/sales",
     },
     {
      id: "sales-invoice",
      label: "Invoices",
      path: "invoice",
     },
      {
        id: "sales-invoice",
        label: "Returns",
        path: "invoice",
      }
    ],
    submenu: true
  },
  /*{
    id: "finance",
    label: "Finance",
    icon: "assets/images/finance.png",
    path: "/finance"
  },
  {
    id: "stock",
    label: "Stock",
    icon: "assets/images/stock.png",
    path: "/stock"
  },
  {
    id: "report",
    label: "Report",
    icon: "assets/images/reports.png",
    path: "/report"
  },
  {
    id: "userManagement",
    label: "User Management",
    icon: "assets/images/usermgt.png",
    path: "/user-management"
  },*/
  // {
  //   id: "logout",
  //   label: "Log Out",
  //   icon: "assets/images/logout.png",
  //   path: "/login",
  //   childern: [],
  //   submenu: false
  // }
];
