import { Component, OnInit,ViewChild } from '@angular/core';
import { MenuItem } from '../menuItem.model';
import { SubMenuItem } from '../subMenuItem.model';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule, Routes, Router ,ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
menuItems: MenuItem[];
menuItemsIcons:MenuItem[];
@ViewChild('sidenav',{ read: true, static: false }) sidenav: MatSidenav;

  public menu1 = false;
  public notSelected=true;
  //private count=0;
  static showParent: any;
  constructor( private router: Router , public route: ActivatedRoute) { 
    //this.count=route.firstChild.children.length;
    
    route.url.subscribe(() => {
      console.log("test 1 -->"+route.firstChild.children.length);
      console.log("test 2 -->"+route.children.length);

     });
  }


  ngOnInit() {
    //this.router.navigate(['/dashboard']);
    /* var subItemsArray: SubMenuItem[] = [
      new SubMenuItem("New","dashboard"),
      new SubMenuItem("View","employeelist"),
    ] */

    this.menuItems = [
      new MenuItem("DashBoard","/landingpage"),
      new MenuItem("Employment","employeelist"),
      new MenuItem("Vendor & Customer","vendoradd"),
      new MenuItem("Category & Product","categoryadd"),
      new MenuItem("Purchase","purchaseadd"),
      new MenuItem("Sales","salesorder"),
      new MenuItem("Finance","pettycashadd"),
      new MenuItem("Stock","stockadd"),
      new MenuItem("Report","allreport"),
      new MenuItem("User Management","usermgtadd"),
      new MenuItem("Log Out","login"),

    ]


    this.menuItemsIcons = [
      new MenuItem("./assets/images/dashboard.png","/landingpage"),
      new MenuItem("./assets/images/employee.png","employeelist"),
      new MenuItem("./assets/images/vendor-customer.png", "Customervendoradd"),
      new MenuItem("./assets/images/category-product.png", "Productcategoryadd"),
      new MenuItem("./assets/images/circle-cropped.png","purchaseadd"),
      new MenuItem("./assets/images/sales.png","salesorder"),
      new MenuItem("./assets/images/finance.png","pettycashadd"),
      new MenuItem("./assets/images/stock.png","stockadd"),
      new MenuItem("./assets/images/reports.png","allreport"),
      new MenuItem("./assets/images/usermgt.png","usermgtadd"),
      new MenuItem("./assets/images/logout.png","login"),


/*
new MenuItem("home","/landingpage"),
new MenuItem("./assets/images/employee.png","employeelist"),
new MenuItem("person", "Customervendoradd"),
new MenuItem("home", "Productcategoryadd"),
new MenuItem("shopping_cart","purchaseadd"),
new MenuItem("home","salesorder"),
new MenuItem("home","pettycashadd"),
new MenuItem("home","stockadd"),
new MenuItem("home","allreport"),
new MenuItem("contacts","usermgtadd"),
new MenuItem("home","login"),

*/
    ]

  }

  showDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

}
