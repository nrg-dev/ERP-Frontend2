import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 

// Components
import { FinanceComponent } from "./components/finance/finance.component";
import { PettycashlistComponent } from "./components/pettycashlist/pettycashlist.component";
import { AddPettycashComponent } from "./components/addpettycash/addpettycash.component";

const routes: Routes = [
  {
      path: '',
      component: FinanceComponent,
      pathMatch: 'full'
  },
  {
    path: 'finance',
    component: FinanceComponent,
  },
  {
    path: 'pettycashlist',
    component: PettycashlistComponent,
  },
  {
    path: 'addpettycash',
    component: AddPettycashComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule {}
