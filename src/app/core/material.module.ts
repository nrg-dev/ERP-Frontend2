import { NgModule } from "@angular/core";
import { MatMomentDateModule } from "@angular/material-moment-adapter";

import {
  MatDatepickerModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatTableModule,
  MatTabsModule,
  MatListModule
} from "@angular/material";

@NgModule({
  imports: [
    MatDatepickerModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatListModule,
    MatMomentDateModule
  ],
  exports: [
    MatDatepickerModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatListModule,
    MatMomentDateModule
  ]
})
export class CustomMaterialModule {}
