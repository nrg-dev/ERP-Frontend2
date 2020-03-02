import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Custom Modules
import { AppRoutingModule } from "./modules/app-routing/app-routing.module";
import { CoreModule } from "./modules/core/core.module";
import { CustomMaterialModule } from "./core/material.module";

import { AppComponent } from "./app.component";

import { LoginComponent } from "./login/login.component";
import { LandingpageComponent } from "./landingpage/landingpage.component";
import { EmployeeModule } from "./modules/employee/employee.module";
import { VendorcustomerModule } from "./vendorcustomer/vendorcustomer.module";
import { CategoryproductModule } from "./categoryproduct/categoryproduct.module";
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

import { DashboardWidgetComponent } from "./shared/components/dashboard-widget/dashboard-widget.component";
import { DataWidgetComponent } from "./shared/components/data-widget/data-widget.component";
import { NavigationComponent } from "./navigation/navigation.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingpageComponent,
    NavigationComponent,
    DashboardWidgetComponent,
    DataWidgetComponent
  ],

  imports: [
    AppRoutingModule,
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    CustomMaterialModule
  ],
  providers: [AlertService, AuthenticationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
