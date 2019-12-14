import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeaddComponent } from './employeeadd/employeeadd.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EmployeereportComponent } from './employeereport/employeereport.component';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeindexComponent } from './employeeindex/employeeindex.component';
import { MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { EmployeealertComponent } from './employeealert/employeealert.component';


const routes: Routes = [
  { path: 'employeeindex', component: EmployeeindexComponent },
  { path: 'employeeadd', component: EmployeeaddComponent },
  { path: 'employeelist', component: EmployeelistComponent },
  { path: 'employeereport', component: EmployeereportComponent },
  { path: 'employeealert', component: EmployeealertComponent }
];


@NgModule({
  declarations: [EmployeeaddComponent, EmployeelistComponent, EmployeereportComponent, EmployeeindexComponent, EmployeealertComponent],
  imports: [
    FormsModule,
    CommonModule,MatTabsModule,RouterModule.forChild(routes) 
  ]
})
export class EmployeeModule { }
