import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Modules
import { EmployeeRoutingModule } from "./employee-routing.module";
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
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Services
import { EmployeeService } from "./services/employee.service";

// Components
import { EmployeedataComponent } from "./components/employeedata/employeedata.component";
import { EmployeeComponent } from "./components/employee/employee.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { EmployeeAddComponent } from "./components/employee-add/employee-add.component";
import { EmployeeAbsenceComponent } from "./components/employee-absence/employee-absence.component";
import { EmployeeContractTemplateComponent } from "./components/employee-contract-template/employee-contract-template.component";
import { EmployeeReportComponent } from "./components/employee-report/employee-report.component";
import { EmployeeDetailComponent } from "./components/employee-detail/employee-detail.component";

@NgModule({
  declarations: [
    EmployeedataComponent,
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeeAbsenceComponent,
    EmployeeContractTemplateComponent,
    EmployeeReportComponent,
    EmployeeDetailComponent
  ],
  imports: [
    EmployeeRoutingModule,
    FormsModule,
    CommonModule,
    MatTabsModule,
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
    MatPaginatorModule,
    DataTablesModule.forRoot()
  ],
  providers: [EmployeeService]
})
export class EmployeeModule {}
