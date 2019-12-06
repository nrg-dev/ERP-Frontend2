import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryaddComponent } from './categoryadd/categoryadd.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'categoryadd', component: CategoryaddComponent },

];

@NgModule({
  declarations: [CategoryaddComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes) 

  ]
})
export class CategoryproductModule { }
