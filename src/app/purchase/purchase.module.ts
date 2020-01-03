import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseaddComponent,Status } from './purchaseadd/purchaseadd.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../_directives';
import { PurchaseInvoiceComponent, EditInvoice } from './purchase-invoice/purchase-invoice.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatTableModule
} from '@angular/material';

const routes: Routes = [
  { path: 'purchaseadd', component: PurchaseaddComponent },
  { path: 'purchase-invoice', component: PurchaseInvoiceComponent },


];


@NgModule({
  declarations: [PurchaseaddComponent,AlertComponent,EditInvoice,Status, PurchaseInvoiceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatTableModule,
    RouterModule.forChild(routes) 

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [EditInvoice,Status],

})
export class PurchaseModule { }
