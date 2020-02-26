import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./modules/app-routing/app-routing.module";
import { CoreModule } from "./modules/core/core.module";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavigationComponent } from "./navigation/navigation.component";

import { CustomMaterialModule } from "./core/material.module";

import { LoginComponent } from "./login/login.component";
import { LandingpageComponent } from "./landingpage/landingpage.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SalesModule } from "./sales/sales.module";
import { EmployeeModule } from "./employee/employee.module";
import { VendorcustomerModule } from "./vendorcustomer/vendorcustomer.module";
import { CategoryproductModule } from "./categoryproduct/categoryproduct.module";
import { PurchaseModule } from "./purchase/purchase.module";
import { FinanceModule } from "./finance/finance.module";
import { StockModule } from "./stock/stock.module";
import { UsermgtModule } from "./usermgt/usermgt.module";
import { ReportModule } from "./report/report.module";
import { AlertComponent } from "./_directives/index";
import {
  AlertService,
  AuthenticationService,
  UserService
} from "./_services/index";

import { MatDialogModule, MatFormFieldModule } from "@angular/material";

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
import { MatMomentDateModule } from "@angular/material-moment-adapter";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    LandingpageComponent,
    DashboardComponent,
    AlertComponent
  ],

  imports: [
    AppRoutingModule,
    CoreModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
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

    CustomMaterialModule,
    EmployeeModule,
    VendorcustomerModule,
    CategoryproductModule,
    PurchaseModule,
    SalesModule,
    FinanceModule,
    StockModule,
    ReportModule,
    UsermgtModule,
    MatDialogModule,
    //FontAwesomeModule.forRoot()
    MatMomentDateModule
  ],
  providers: [AlertService, AuthenticationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
