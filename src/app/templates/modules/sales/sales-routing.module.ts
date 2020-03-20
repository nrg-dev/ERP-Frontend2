import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SalesComponent } from './components/sales/sales.component';
import { SalesinvoiceComponent } from './components/salesinvoice/salesinvoice.component';

// const routes: Routes = [
//   { path: "", component: SalesComponent, pathMatch: "full" }
// ];
const routes: Routes = [
  {
      path: '',
      component: SalesComponent,
      pathMatch: 'full'
  },
  {
    path: 'invoice',
    component: SalesinvoiceComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}
