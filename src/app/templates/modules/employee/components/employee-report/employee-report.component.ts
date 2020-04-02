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
import { CommonService } from "../../../../../core/common/_services/common.service";

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
  @Input() getDailyReportDetail: any;
  
  constructor(
    private employeeService: EmployeeService,
    private ts: TranslateService,
    private snackBar: MatSnackBar,
    public commonService: CommonService
  ) {
    
  }

  ngOnInit() { 
    setTimeout(() => {
      this.model.report = this.getDailyReportDetail !== undefined ? this.getDailyReportDetail.report: '';

    }, 1200);
       
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  dailyReportClose() { 
    this.closeDailyReport.emit(false);
  }

  saveDailyReport() {
    this.model.employeecode = this.dailyReportItem.employeecode;
    this.model.type = this.getDailyReportDetail !== undefined ? 'update':'save';
    let msg = ''; 
    if (this.getDailyReportDetail === undefined) {
      this.model.date = this.commonService.getTodayDate();
      this.employeeService.saveDailyReport(this.model).subscribe((res: any) => {
        msg = 'Daily report has been added Successfully';
        this.commonService.getSuccessErrorMsg(res,msg);
        if (res === null) {
          this.dailyReportClose();
        }
      });
    } else {
      this.employeeService.updateDailyReport(this.model).subscribe((res: any) => {
        msg = 'Daily report has been updated Successfully';
        this.commonService.getSuccessErrorMsg(res,msg);
        if (res === null) {
          this.dailyReportClose();
        }
      });
    }
   
  }
}
