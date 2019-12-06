import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseaddComponent } from './purchaseadd/purchaseadd.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'purchaseadd', component: PurchaseaddComponent },

];


@NgModule({
  declarations: [PurchaseaddComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes) 

  ]
})
export class PurchaseModule { }
