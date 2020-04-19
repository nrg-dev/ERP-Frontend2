import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 

// Components
import { CategoryItemComponent, AddpromotionComponent, DiscounteditComponent, DiscountdeleteComponent, CategoryeditdeleteComponent, AddnewcategoryComponent, AddnewproductComponent ,ProductviewComponent, ProducteditComponent, AllproducteditComponent, CategorytableComponent} from './categoryitem/categoryitem.component';
import { UnitsComponent } from './units/units.component';
import { AddunitsComponent } from './addunits/addunits.component';

const routes: Routes = [
  {
      path: '',
      component: CategoryItemComponent,
      pathMatch: 'full'
  },
  {
    path: 'units',
    component: UnitsComponent,
    pathMatch: 'full'
},
{
  path: '/category-and-product/addunits',
  component: AddunitsComponent,
}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryProductRoutingModule {}
