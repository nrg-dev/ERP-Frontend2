import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllreportComponent } from './allreport/allreport.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'allreport', component: AllreportComponent },

];



@NgModule({
  declarations: [AllreportComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes) 

  ]
})
export class ReportModule { }
