import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockaddComponent } from './stockadd/stockadd.component';
import { Routes, RouterModule } from '@angular/router';
import {DataTablesModule} from 'angular-datatables';

const routes: Routes = [
  { path: 'stockadd', component: StockaddComponent },

];


@NgModule({
  declarations: [StockaddComponent],
  imports: [
    CommonModule,
    DataTablesModule.forRoot(),
    RouterModule.forChild(routes) 

  ]
})
export class StockModule { }
