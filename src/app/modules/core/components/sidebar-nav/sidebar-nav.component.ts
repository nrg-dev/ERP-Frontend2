import { Component, OnInit } from "@angular/core";
import { MenuItem } from "./sidebar-nav.model";
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: "app-sidebar-nav",
  templateUrl: "./sidebar-nav.component.html",
  styleUrls: ["./sidebar-nav.component.scss"]
})
export class SidebarNavComponent implements OnInit {
  menuItems: MenuItem[];
  constructor() {}

  ngOnInit() {
    this.menuItems = [
      new MenuItem(
        "dashboard",
        "Dashboard",
        "assets/images/dashboard.png",
        "/"
      ),
      new MenuItem(
        "employeedata",
         "Employment",
         "./assets/images/employee.png",
         "/employeedata"
      ),
      new MenuItem(
        "vendoradd",
         "Vendor & Customer",
         "./assets/images/vendor-customer.png",
         "/vendoradd"
      ),
      new MenuItem(
        "categoryitem",
         "Category & Product",
         "./assets/images/category-product.png",
         "/categoryitem"
      ),
      new MenuItem(
        "purchase",
         "Purchase",
         "./assets/images/circle-cropped.png",
         "/purchaseadd"
      ),
      new MenuItem(
        "sales",
         "Sales",
         "./assets/images/sales.png",
         "/salesorder"
      ),
      new MenuItem(
        "finance",
         "Finance",
         "./assets/images/finance.png",
         "/pettycashadd"
      ),
      new MenuItem(
        "stock",
         "Stock",
         "./assets/images/stock.png",
         "/stockadd"
      ),
      new MenuItem(
        "report",
         "Report",
         "./assets/images/reports.png",
         "/allreport"
      ),
      new MenuItem(
        "user management",
         "User Management",
         "./assets/images/usermgt.png",
         "/usermgtadd"
      ),



    ];
  }
}
