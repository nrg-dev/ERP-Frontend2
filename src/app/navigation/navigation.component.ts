import { Component, OnInit,ViewChild,HostListener } from '@angular/core';
import { MenuItem } from '../menuItem.model';
import { SubMenuItem } from '../subMenuItem.model';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule, Routes, Router ,ActivatedRoute} from "@angular/router";
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
 
  searchText:any;
  heroes = [
    { id: 11, name: 'CHanaka Nice', country: 'India' },
    { id: 12, name: 'MNarco' , country: 'USA'},

  ];
menuItems: MenuItem[];
menuItemsIcons:MenuItem[];
@ViewChild('sidenav',{ read: true, static: false }) sidenav: MatSidenav;

showToggle: string;
  mode: string;
  openSidenav:boolean;
  private screenWidth$ = new BehaviorSubject<number>
    (window.innerWidth);

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
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }

  ngOnInit() {
    this.getScreenWidth().subscribe(width => {
      if (width < 640) {
       this.showToggle = 'show';
       this.mode = 'over';
       this.openSidenav = false;
     }
     else if (width > 640) {
       this.showToggle = 'hide';
       this.mode = 'side';
       this.openSidenav = true;
     }
   });

   

    this.menuItems = [
      new MenuItem("DashBoard","/landingpage"),
      new MenuItem("Employment","employeelist"),
      //new MenuItem("TimeSheet","timesheet"),
      new MenuItem("Vendor & Customer","vendoradd"),
      new MenuItem("Category & Product","categoryadd"),
      new MenuItem("Purchase","purchaseadd"),
      new MenuItem("Sales","salesorder"),
      new MenuItem("Finance","pettycashadd"),
      new MenuItem("Stock","stockadd"),
      new MenuItem("Report","allreport"),
      new MenuItem("User Management","usermgtadd"),
      new MenuItem("Log Out","logout"),

      new MenuItem("",""),

    ]


    this.menuItemsIcons = [
      new MenuItem("./assets/images/dashboard.png","/landingpage"),
      new MenuItem("./assets/images/employee.png","employeelist"),
      //new MenuItem("./assets/images/employee.png","employeelist"),
      new MenuItem("./assets/images/vendor-customer.png", "Customervendoradd"),
      new MenuItem("./assets/images/category-product.png", "Productcategoryadd"),
      new MenuItem("./assets/images/circle-cropped.png","purchaseadd"),
      new MenuItem("./assets/images/sales.png","salesorder"),
      new MenuItem("./assets/images/finance.png","pettycashadd"),
      new MenuItem("./assets/images/stock.png","stockadd"),
      new MenuItem("./assets/images/reports.png","allreport"),
      new MenuItem("./assets/images/usermgt.png","usermgtadd"),
      new MenuItem("./assets/images/logout.png","login"),

      new MenuItem('./assets/images/null.png',""),


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
