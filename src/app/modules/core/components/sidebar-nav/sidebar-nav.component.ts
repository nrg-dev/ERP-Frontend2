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
        "dashboard",
        "Dashboard",
        "assets/images/dashboard.png",
        "/"
      ),
      new MenuItem("dashboard", "Dashboard", "assets/images/dashboard.png", "/")
    ];
  }
}
