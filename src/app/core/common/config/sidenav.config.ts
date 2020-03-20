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
    label: "Employment",
    icon: "assets/images/employee.png",
    path: "/employment",
    submenu: true,
    childern: [{
      id: "employee_list",
      label: "Employee List",
      path: "/employment",
     },
     {
      id: "add_employee",
      label: "Add New Employee",
      path: "addEmployee",
     }]
  },
  {
    id: "vendorAndCustomer",
    label: "Vendor & Customer",
    icon: "assets/images/vendor-customer.png",
    path: "/vendor-and-customer",
    childern: [{
      id: "vendor",
      label: "Vendor",
      path: "/vendor-and-customer",
     },
     {
      id: "customer",
      label: "Customer",
      path: "customer",
     }],
    submenu: true
  },
  {
    id: "categoryAndProduct",
    label: "Category & Product",
    icon: "assets/images/category-product.png",
    path: "/category-and-product",
    childern: [],
    submenu: false
  },
  {
    id: "purchase",
    label: "Purchase",
    icon: "assets/images/circle-cropped.png",
    path: "/purchase",
    childern: [{
      id: "purchase-order",
      label: "Purchase Order",
      path: "/purchase",
     },
     {
      id: "purchase-invoice",
      label: "Purchase Invoice",
      path: "invoice",
     }],
    submenu: true
  },
  {
    id: "sales",
    label: "Sales",
    icon: "assets/images/sales.png",
    path: "/sales",
    childern: [{
      id: "sales-order",
      label: "Sales Order",
      path: "/sales",
     },
     {
      id: "sales-invoice",
      label: "Sales Invoice",
      path: "invoice",
     }],
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
  {
    id: "logout",
    label: "Log Out",
    icon: "assets/images/logout.png",
    path: "/login",
    childern: [],
    submenu: false
  }
];
