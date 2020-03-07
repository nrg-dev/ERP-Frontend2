import { NgModule } from "@angular/core";
import { MatMomentDateModule } from "@angular/material-moment-adapter";

import {
  MatDatepickerModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatTableModule,
  MatTabsModule,
  MatListModule,
  MatDialogModule
} from "@angular/material";

@NgModule({
  imports: [
    MatDatepickerModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatListModule,
    MatMomentDateModule,
    MatDialogModule
  ],
  exports: [
    MatDatepickerModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatListModule,
    MatMomentDateModule,
    MatDialogModule
  ]
})
export class CustomMaterialModule {}
