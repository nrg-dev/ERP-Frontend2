import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 

// Components
import { UserManagementComponent } from "./components/usermgt/usermgt.component";

const routes: Routes = [
  {
      path: '',
      component: UserManagementComponent,
      pathMatch: 'full'
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMgtRoutingModule {}
