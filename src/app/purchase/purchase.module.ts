import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseaddComponent } from './purchaseadd/purchaseadd.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../_directives';


const routes: Routes = [
  { path: 'purchaseadd', component: PurchaseaddComponent },

];


@NgModule({
  declarations: [PurchaseaddComponent,AlertComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes) 

  ]
})
export class PurchaseModule { }
