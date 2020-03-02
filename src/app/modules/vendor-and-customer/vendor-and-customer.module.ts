import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VendorAndCustomerRoutingModule } from "./vendor-and-customer-routing.module";
import { VendorAndCustomerComponent } from "./components/vendor-and-customer/vendor-and-customer.component";
import { CustomMaterialModule } from "src/app/core/material.module";
import { VendorListComponent } from "./components/vendor-list/vendor-list.component";
import { VendorDetailComponent } from "./components/vendor-detail/vendor-detail.component";
import { CustomerListComponent } from "./components/customer-list/customer-list.component";
import { CustomerDetailComponent } from "./components/customer-detail/customer-detail.component";
import { CoreModule } from "../core/core.module";

@NgModule({
  declarations: [
    VendorAndCustomerComponent,
    VendorListComponent,
    VendorDetailComponent,
    CustomerListComponent,
    CustomerDetailComponent
  ],
  imports: [
    CommonModule,
    VendorAndCustomerRoutingModule,
    CoreModule,
    CustomMaterialModule
  ]
})
export class VendorAndCustomerModule {}
