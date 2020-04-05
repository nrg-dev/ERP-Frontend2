import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnDestroy
} from "@angular/core";

import { MatSnackBar } from "@angular/material/snack-bar";
import { Employee } from "./employee-list.model";
import { EmployeeDetailComponent } from "../employee-detail/employee-detail.component";
import { EmployeeService } from "../../services/employee.service";
import { AlertService } from "src/app/core/common/_services/index";
import { PrintDialogService } from "src/app/core/services/print-dialog/print-dialog.service";
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { EmployeeAddComponent } from "../employee-add/employee-add.component";
import { CommonService } from "../../../../../core/common/_services/common.service";
import {formatDate } from '@angular/common';

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"]
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employeesDS: any;
  employees: MatTableDataSource<Employee>;
  employee;
  dialogConfig = new MatDialogConfig();
  showHideDailyReport = [];
  getDailyReportDetail: any;
  isShowHideAbsent = [];
  getAbsentDetail: any;
  isShowHideCheckinCheckout = [];
  isAbsentMouseover = [];
  todayTime: any;
  
  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private printDialogService: PrintDialogService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public commonService: CommonService
  ) {
    
  }

  ngOnInit() { 
    this.allemplist();
    this.removeScrollBar();
  }

  printPage(data) {
    this.printDialogService.openDialog(data);
  }

  allemplist() {
    this.employeeService.load().subscribe(
      (data: Employee[]) => { 
        this.employeesDS = data;
      },
      error => {
        setTimeout(() => {
          this.snackBar.open(
            "Network error: server is temporarily unavailable",
            "dismss",
            {
              panelClass: ["error"],
              verticalPosition: "top"
            }
          );
        });
      }
    );
  }

  deleteEmployee(employeecode: string) {
    this.employeeService.remove(employeecode).subscribe(
      data => {
        this.employee = data;
        if (this.employee.status == "Success") {
          setTimeout(() => {
            this.snackBar.open("Employee is deleted successfully", "", {
              panelClass: ["error"],
              verticalPosition: "top"
            });
          });
          this.allemplist();
          this.employees = new MatTableDataSource(this.employeesDS);
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
        } else {
          setTimeout(() => {
            this.snackBar.open(
              "Network error: server is temporarily unavailable",
              "",
              {
                panelClass: ["error"],
                verticalPosition: "top"
              }
            );
          });
        }
        this.allemplist();
      },
      error => {
        setTimeout(() => {
          this.snackBar.open(
            "Network error: server is temporarily unavailable",
            "",
            {
              panelClass: ["error"],
              verticalPosition: "top"
            }
          );
        });
      }
    );
  }

  applyFilter(filterValue: string) {
    this.employees.filter = filterValue.trim().toLowerCase();
    if (this.employees.paginator) {
      this.employees.paginator.firstPage();
    }
  }

  addEmployee() {
     let data = {};
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(EmployeeAddComponent,{
      panelClass: 'addpromotion',
      data: data,
    })
    .afterClosed().subscribe(result => {
      this.allemplist();
    });
    
  }

  ngOnDestroy(){
    (<HTMLElement>document.querySelector('.mat-drawer-content')).style.overflow = 'auto';
  }

  removeScrollBar() {
    setTimeout(function () {
        (<HTMLElement>document.querySelector('.mat-drawer-content')).style.overflow = 'inherit';
      }, 300);
  }

  dailyReport(index: number, item: any) { 
    this.showHideDailyReport = [];
    this.isShowHideAbsent = [];
    this.isShowHideCheckinCheckout = [];
    this.showHideDailyReport[index] = true;
    item.date = this.commonService.getTodayDate();
    this.employeeService.getDailyReportLists(item).subscribe((res: any) => {
      if (res.length > 0) { 
        this.getDailyReportDetail = res[0];
      }
    })
  }

  closePopup(value: boolean, index, type: string) {
    if (type === 'report') {
      this.showHideDailyReport[index] = value;
    } else if (type === 'absence') {
      this.isShowHideAbsent[index] = value;
    } else {
      this.isShowHideCheckinCheckout[index] = value;
    }
  }

  absentPopup(index: number, item: any) { 
    this.isShowHideAbsent = [];
    this.showHideDailyReport = [];
    this.isShowHideCheckinCheckout = [];
    this.isShowHideAbsent[index] = true;
    item.date = this.commonService.getTodayDate();
    this.getEmployeeAbsentDetail(item);
  }

  checkinCheckout(index: number, item: any) {
    this.todayTime = '';
    const currentDate = new Date();
    this.todayTime = currentDate;
    this.showHideDailyReport = [];
    this.isShowHideAbsent = [];
    this.isShowHideCheckinCheckout = [];
    this.isShowHideCheckinCheckout[index] = true;
    this.getEmployeeAbsentDetail(item);
  }

  getEmployeeAbsentDetail(item: any) {
    this.getAbsentDetail = undefined;
    item.date = this.commonService.getTodayDate();
    this.employeeService.getAbsentLists(item).subscribe((res: any) => { 
      if (res.length > 0) { 
        this.getAbsentDetail = res[0];
      }
    })
  }

  absentMouseover(index: number, item: any) { 
    this.isAbsentMouseover = [];
    item.date = this.commonService.getTodayDate();
    this.employeeService.getAbsentLists(item).subscribe((res: any) => { 
      if (res.length > 0) { 
        this.getAbsentDetail = res[0];
        if (this.getAbsentDetail.absent === 'yes') {
          this.isAbsentMouseover[index] = true;
        } else {
          this.isAbsentMouseover[index] = false;
        }
      } else {
        this.isAbsentMouseover[index] = false;
      }
    }) 
  }

  enableAbsentIcon(value: boolean, index: number) {
    this.isAbsentMouseover[index] = value;
  }
}
