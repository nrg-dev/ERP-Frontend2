import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 

// Components
import { EmployeeComponent } from "./components/employee/employee.component";
import { EmployeeAddComponent } from "./components/employee-add/employee-add.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";

const routes: Routes = [
  {
      path: '',
      component: EmployeeListComponent,
      pathMatch: 'full'
  },
  {
    path: 'addEmployee',
    component: EmployeeAddComponent
}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
