import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryaddComponent, AddpromotionComponent, DiscounteditComponent, DiscountdeleteComponent, CategoryeditdeleteComponent, AddnewcategoryComponent, AddnewproductComponent ,ProductviewComponent, ProducteditComponent} from './categoryadd/categoryadd.component';
import { Routes, RouterModule } from '@angular/router';
import { MatDialogModule, MatDialog, MatFormFieldModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import {
  MatAutocompleteModule,
  MatBadgeModule, 
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';


const routes: Routes = [
  { path: 'categoryadd', component: CategoryaddComponent },

];

@NgModule({
  declarations: [AddnewcategoryComponent,CategoryaddComponent,CategoryeditdeleteComponent,AddpromotionComponent,DiscounteditComponent,DiscountdeleteComponent,AddnewproductComponent,ProductviewComponent,ProducteditComponent],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatPaginatorModule,
    MatDialogModule,
    CommonModule,RouterModule.forChild(routes) ,
  ],
  entryComponents: [AddnewcategoryComponent,AddpromotionComponent,CategoryeditdeleteComponent,DiscounteditComponent,DiscountdeleteComponent,AddnewproductComponent,ProductviewComponent,ProducteditComponent],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, direction: 'ltr'}}
  ]
})
export class CategoryproductModule { 
  constructor(private dialog: MatDialog) {}
}
 