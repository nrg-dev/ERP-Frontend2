import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorAndCustomerRoutingModule } from './vendor-and-customer-routing.module';
import { VendorAndCustomerComponent } from './components/vendor-and-customer/vendor-and-customer.component';


@NgModule({
  declarations: [VendorAndCustomerComponent],
  imports: [
    CommonModule,
    VendorAndCustomerRoutingModule
  ]
})
export class VendorAndCustomerModule { }
