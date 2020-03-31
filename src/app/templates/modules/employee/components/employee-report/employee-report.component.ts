import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  MatDialog,
  MatDialogConfig,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { EmployeeService } from "../../services/employee.service";
import { TranslateService } from "src/app/core/services/translate/translate.service";
import { formatDate } from '@angular/common';

@Component({
  selector: "app-employee-report",
  templateUrl: "./employee-report.component.html",
  styleUrls: ["./employee-report.component.scss"]
})
export class EmployeeReportComponent implements OnInit {
  displayedColumns: string[] = ["EmployeeName", "Empcode"];
  dataSource: MatTableDataSource<any>;
  empDetailsList: any;
  employeeList: any = {};
  model: any = {};
  searchText:string;

  // TODO : Move the models out
  employees: { name: string; code: number }[];
  absentCardDetails: {
    date: string;
    checkIn: string;
    checkInReason: string;
    checkOut: string;
    checkoutReason: string;
  }[];
  previewDetails;
  @Output() closeDailyReport: EventEmitter<any> = new EventEmitter<any>();
  currentDate = new Date();
  todayDate: any;
  @Input() dailyReportItem: any;
  
  constructor(
    private employeeService: EmployeeService,
    private ts: TranslateService,
    private snackBar: MatSnackBar
  ) {
    this.todayDate = formatDate(this.currentDate, 'dd/MMM/yyy', 'en-US');
  }

  ngOnInit() { 
    this.model.report = '';
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  dailyReportClose() { 
    this.closeDailyReport.emit(false);
  }

  saveDailyReport() {
    this.model.employeecode = this.dailyReportItem.employeecode;
    this.model.type = 'save';
    this.model.date = this.todayDate;
    this.employeeService.saveDailyReport(this.model).subscribe((res: any) => {
      if (res === null) {
        setTimeout(() => {
          this.snackBar.open("Daily report has been added Successfully", "dismss", {
            panelClass: ["success"],
            verticalPosition: 'top'      
          });
        });
        this.dailyReportClose();
      } else if (res === 500) {
        setTimeout(() => {
          this.snackBar.open("Internal server error", "dismss", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });
      } else {
        setTimeout(() => {
          this.snackBar.open("Bad request error", "dismss", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });
      }
       error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });
  }
    });
  }
}
