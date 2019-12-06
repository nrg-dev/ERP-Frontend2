import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockaddComponent } from './stockadd/stockadd.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'stockadd', component: StockaddComponent },

];


@NgModule({
  declarations: [StockaddComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes) 

  ]
})
export class StockModule { }
