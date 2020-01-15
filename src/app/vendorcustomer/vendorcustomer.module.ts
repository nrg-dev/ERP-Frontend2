import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendoraddComponent } from './vendoradd/vendoradd.component';
import { Routes, RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from'@angular/common/http';
import { VencustAlertComponent } from './vencust-alert/vencust-alert.component';

import {CdkStepperModule} from '@angular/cdk/stepper';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { VendorService } from './vendor.service';
import { CustomerService } from './customer.service';



const routes: Routes = [
  { path: 'vendoradd', component: VendoraddComponent },


];


@NgModule({
  declarations: [
    VendoraddComponent, 
 
    VencustAlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    CdkStepperModule,
    RouterModule.forChild(routes) 

  ],
  providers: [CustomerService,VendorService],

})
export class VendorcustomerModule { }
