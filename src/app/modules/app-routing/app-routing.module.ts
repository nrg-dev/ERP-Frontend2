import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LandingpageComponent } from "src/app/landingpage/landingpage.component";
import { LoginComponent } from "src/app/login/login.component";

const routes: Routes = [
  //{ path: '', component: FirstComponent, data: { title: 'First Component' } },
  // { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard Component' } },
  {
    path: "login",
    component: LoginComponent,
    data: { title: "Login Component" }
  },
  {
    path: "",
    component: LandingpageComponent,
    data: { title: "Landing Component" },
    children: [
      /*{ path: '', loadChildren: () => EmployeeModule },
      { path: '', loadChildren: () => VendorcustomerModule },
      { path: '', loadChildren: () => CategoryproductModule },
      { path: '', loadChildren: () => PurchaseModule },
      { path: '', loadChildren: () => SalesModule },
      { path: '', loadChildren: () => FinanceModule },
      { path: '', loadChildren: () => StockModule },
      { path: '', loadChildren: () => ReportModule },
      { path: '', loadChildren: () => UsermgtModule }*/
      { path: "", loadChildren: "./employee/employee.module#EmployeeModule" }
      // { path: '', loadChildren: './vendorcustomer/vendorcustomer.module#VendorcustomerModule'  },
      // { path: '', loadChildren: './categoryproduct/categoryproduct.module#CategoryproductModule' },
      // { path: '', loadChildren: './purchase/purchase.module#PurchaseModule'  },
      // { path: '', loadChildren: './sales/sales.module#SalesModule'   },
      // { path: '', loadChildren: './finance/finance.module#FinanceModule'  },
      // { path: '', loadChildren: './stock/stock.module#StockModule'  },
      // { path: '', loadChildren: './report/report.module#ReportModule'  },
      // { path: '', loadChildren: './usermgt/usermgt.module#UsermgtModule'  }
    ]
  },

  { path: "**", redirectTo: "login" }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
