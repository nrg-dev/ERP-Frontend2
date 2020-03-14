import { Component, OnInit } from "@angular/core";
import { MenuItem } from "./sidebar-nav.model";
import { SidenavItems } from "src/app/config/sidenav.config";
import { Location } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-sidebar-nav",
  templateUrl: "./sidebar-nav.component.html",
  styleUrls: ["./sidebar-nav.component.scss"]
})
export class SidebarNavComponent implements OnInit {
  menuItems: MenuItem[];
  isExpanded: boolean = true;
  currentPath: string;

  constructor(location: Location, router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPath = location.path();
      }
    });
  }

  ngOnInit() {
    this.menuItems = SidenavItems;
  }
}
