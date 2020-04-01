import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VendorAndCustomerComponent } from "./components/vendor-and-customer/vendor-and-customer.component";
import { CustomerComponent } from "./components/customer/customer.component";

// const routes: Routes = [
//   { path: "", component: VendorAndCustomerComponent, pathMatch: "full" }
// ];
const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      redirectTo:'vendor'
  },

  {
    path: 'vendor',
    component: VendorAndCustomerComponent,
  },
 
  {
    path: 'customer',
    component: CustomerComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorAndCustomerRoutingModule {}
