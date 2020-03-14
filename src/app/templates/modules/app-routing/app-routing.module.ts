import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";

import { LandingpageComponent } from "../../landingpage/landingpage.component";
import { LoginComponent } from "../../login/login.component";

// Modules for lazyloading
import { EmployeeModule } from "src/app/templates/modules/employee/employee.module";
import { CategoryproductModule } from "src/app/categoryproduct/categoryproduct.module";
import { FinanceModule } from "src/app/finance/finance.module";
import { ReportModule } from "src/app/report/report.module";
import { UsermgtModule } from "src/app/usermgt/usermgt.module";
import { PlaceholderComponent } from "../../../core/components/placeholder/placeholder.component";
import { VendorAndCustomerModule } from "../vendor-and-customer/vendor-and-customer.module";
import { PurchaseModule } from "../purchase/purchase.module";
import { SalesModule } from "../sales/sales.module";

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
        pathMatch: "full",
        component: LandingpageComponent,
        data: { title: "Landing Component" }
      },
      {
        path: "employment",
        loadChildren: () =>
          import("../employee/employee.module").then(
            (m) => m.EmployeeModule)
      },
      {
        path: "vendor-and-customer",
        loadChildren: () =>
          import("./../../modules/vendor-and-customer/vendor-and-customer.module"
          ).then(
            (m) => m.VendorAndCustomerModule)
      },
      {
        path: "category-and-product",
        loadChildren: () =>
          import("./../../../categoryproduct/categoryproduct.module").then(
            (m) => m.CategoryproductModule
          )
      },
      {
        path: "purchase",
        loadChildren: () =>
          import("./../../modules/purchase/purchase.module").then(
            (m) => m.PurchaseModule
          )
      },
      {
        path: "sales",
        loadChildren: () =>
          import("./../../modules/sales/sales.module").then(
            (m) => m.SalesModule)
      },
      {
        path: "finance",
        loadChildren: () =>
          import("./../../../finance/finance.module").then(
            (m) => m.FinanceModule)
      },
     
      {
        path: "report",
        loadChildren: () =>
          import("./../../../report/report.module").then(
            (m) => m.ReportModule)
      },
      {
        path: "user-management",
        loadChildren: () =>
          import("./../../../usermgt/usermgt.module").then(
            (m) => m.UsermgtModule)
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
