import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PettycashaddComponent } from './pettycashadd/pettycashadd.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'pettycashadd', component: PettycashaddComponent },

];

@NgModule({
  declarations: [PettycashaddComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes) 

  ]
})
export class FinanceModule { }
