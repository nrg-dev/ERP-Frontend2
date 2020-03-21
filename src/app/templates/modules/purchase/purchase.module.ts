import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
  MatTreeModule
} from "@angular/material";
import { CustomMaterialModule } from "src/app/core/material.module";
import { CoreModule } from "../../../core/core.module";
import { PurchaseRoutingModule } from "./purchase-routing.module";
import { PurchaseComponent } from "./components/purchase/purchase.component";
import {
  PurchaseAddComponent,
  Status
} from "./components/purchaseadd/purchaseadd.component";
import {
  PurchaseInvoiceComponent,
  ViewInvoice,
  EditInvoice,
  Filter
} from "./components/purchase-invoice/purchase-invoice.component";
import { PurchaseService } from "./services/purchase.service";
import { PurchaseReturnComponent } from "./components/purchase-return/purchase-return.component";
import { PurchasereportComponent } from "./components/purchasereport/purchasereport.component";
import { PurchaseListComponent } from "./components/purchase-list/purchase-list.component";

@NgModule({
  declarations: [
    PurchaseComponent,
    PurchaseAddComponent,
    PurchaseInvoiceComponent,
    ViewInvoice,
    EditInvoice,
    Status,
    Filter,
    PurchaseReturnComponent,
    PurchasereportComponent,
    PurchaseListComponent
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    CoreModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTableModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
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
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatPaginatorModule
  ],
  providers: [PurchaseService],
  entryComponents: [ViewInvoice, EditInvoice, Status, Filter]
})
export class PurchaseModule {}
