import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendoraddComponent } from './vendoradd/vendoradd.component';
import { Routes, RouterModule } from '@angular/router';
import { CustomeraddComponent } from './customeradd/customeradd.component';
import { CustvendorindexComponent } from './custvendorindex/custvendorindex.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from'@angular/common/http';



const routes: Routes = [
  { path: 'vendoradd', component: VendoraddComponent },
  { path: 'customeradd', component: CustomeraddComponent },
  { path: 'custvendorindex', component: CustvendorindexComponent },

];


@NgModule({
  declarations: [VendoraddComponent, CustomeraddComponent, CustvendorindexComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes) 

  ]
})
export class VendorcustomerModule { }
