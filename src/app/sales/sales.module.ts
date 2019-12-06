import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesorderComponent } from './salesorder/salesorder.component';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageComponent } from '../landingpage/landingpage.component';
import { SalesinvoiceComponent } from './salesinvoice/salesinvoice.component';
import { SalesreturnComponent } from './salesreturn/salesreturn.component';
import { SalesreportComponent } from './salesreport/salesreport.component';

const routes: Routes = [
      { path: 'salesorder', component: SalesorderComponent },
      { path: 'salesinvoice', component: SalesinvoiceComponent },
      { path: 'salesreturn', component: SalesreturnComponent },
      { path: 'salesreport', component: SalesreportComponent }
];


@NgModule({
  declarations: [SalesorderComponent, SalesinvoiceComponent, SalesreturnComponent, SalesreportComponent],
  imports: [
    //CommonModule,RouterModule.forRoot(routes)  
    CommonModule,RouterModule.forChild(routes)  

  ],
  exports: [RouterModule]

})



export class SalesModule { }
