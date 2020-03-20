import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 

// Components
import { CategoryItemComponent, AddpromotionComponent, DiscounteditComponent, DiscountdeleteComponent, CategoryeditdeleteComponent, AddnewcategoryComponent, AddnewproductComponent ,ProductviewComponent, ProducteditComponent, AllproducteditComponent, CategorytableComponent} from './categoryitem/categoryitem.component';

const routes: Routes = [
  {
      path: '',
      component: CategoryItemComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryProductRoutingModule {}
