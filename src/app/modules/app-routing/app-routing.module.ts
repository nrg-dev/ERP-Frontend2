import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";

import { LandingpageComponent } from "src/app/landingpage/landingpage.component";
import { LoginComponent } from "src/app/login/login.component";

// Modules for lazyloading
import { EmployeeModule } from "src/app/employee/employee.module";
import { VendorcustomerModule } from "src/app/vendorcustomer/vendorcustomer.module";
import { CategoryproductModule } from "src/app/categoryproduct/categoryproduct.module";
import { PurchaseModule } from "src/app/purchase/purchase.module";
import { SalesModule } from "src/app/sales/sales.module";
import { FinanceModule } from "src/app/finance/finance.module";
import { StockModule } from "src/app/stock/stock.module";
import { ReportModule } from "src/app/report/report.module";
import { UsermgtModule } from "src/app/usermgt/usermgt.module";
import { PlaceholderComponent } from "../core/components/placeholder/placeholder.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: { title: "Login Component" }
  },
  {
    path: "",
    component: PlaceholderComponent,
    children: [
      {
        path: "",
        component: LandingpageComponent,
        data: { title: "Landing Component" }
      },
      {
        path: "employment",
        loadChildren: () =>
          import("./../../employee/employee.module").then(m => EmployeeModule)
      },
      {
        path: "vendor-and-customer",
        loadChildren: () =>
          import("./../../vendorcustomer/vendorcustomer.module").then(
            m => VendorcustomerModule
          )
      },
      {
        path: "category-and-product",
        loadChildren: () =>
          import("./../../categoryproduct/categoryproduct.module").then(
            m => CategoryproductModule
          )
      },
      {
        path: "purchase",
        loadChildren: () =>
          import("./../../purchase/purchase.module").then(m => PurchaseModule)
      },
      {
        path: "sales",
        loadChildren: () =>
          import("./../../sales/sales.module").then(m => SalesModule)
      },
      {
        path: "finance",
        loadChildren: () =>
          import("./../../finance/finance.module").then(m => FinanceModule)
      },
      {
        path: "stock",
        loadChildren: () =>
          import("./../../stock/stock.module").then(m => StockModule)
      },
      {
        path: "report",
        loadChildren: () =>
          import("./../../report/report.module").then(m => ReportModule)
      },
      {
        path: "user-management",
        loadChildren: () =>
          import("./../../usermgt/usermgt.module").then(m => UsermgtModule)
      }
    ]
  },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}