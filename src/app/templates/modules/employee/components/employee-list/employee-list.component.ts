import {
  Component,
  OnInit,
  ViewChild,
  Input,
  SimpleChanges,
  OnChanges,
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

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"]
})
export class EmployeeListComponent implements OnInit, OnChanges,OnDestroy {
  @Input() tabChange: boolean = false;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  // To get the child component reference after *ngIf
  private employeeDetail: EmployeeDetailComponent;
  @ViewChild(EmployeeDetailComponent, { static: false }) set content(
    content: EmployeeDetailComponent
  ) {
    setTimeout(() => {
      this.employeeDetail = content;
    }, 0);
  }

  chosenEmployeeCode: any;
  searchText: string;
  showDetail: boolean = false;
  // employeesDS: Employee[];
  employeesDS: any;
  employees: MatTableDataSource<Employee>;
  employee;
  displayedColumns: string[] = [
    "code",
    "name",
    "rank",
    "contactNumber",
    "action"
  ];
  dialogConfig = new MatDialogConfig();
  showHideDailyReport = [];
  getDailyReportDetail: any;
  isShowHideAbsent = [];
  getAbsentDetail: any;
  isShowHideCheckinCheckout = [];
  
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log("employee tab -->" + changes.tabChange.currentValue);
    if (changes.tabChange) {
      this.allemplist();
      this.showDetail = false;
      if (this.employees) {
        this.employees.paginator = this.paginator;
      }
    }
  }

  printPage(data) {
    this.printDialogService.openDialog(data);
  }

  toggleEmployeeDetailView(employeeCode?, edit?) {
    this.showDetail = !this.showDetail;
    this.employee = undefined;
    if (employeeCode) {
      this.chosenEmployeeCode = employeeCode;

      setTimeout(() => {
        if (edit && this.employeeDetail) {
          this.employeeDetail.isEditMode = true;
        }
      }, 50);
    }
  }

  //  deleteEmployee(employeeCode: string) {
  //   this.employeesDS = this.employeesDS.filter(
  //     employee => employee.employeecode !== employeeCode
  //    );
  //    this.employees.data = this.employeesDS;
  //  }

  allemplist() {
    this.employeeService.load().subscribe(
      (data: Employee[]) => { 
        this.employeesDS = data;
        this.employees = new MatTableDataSource(this.employeesDS);
        this.employees.paginator = this.paginator;
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
        this.getDailyReportDetail = res[0];console.log('getDailyReportDetail', this.getDailyReportDetail)
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
    this.showHideDailyReport = [];
    this.isShowHideAbsent = [];
    this.isShowHideCheckinCheckout = [];
    this.isShowHideCheckinCheckout[index] = true;
    this.getEmployeeAbsentDetail(item);
  }

  getEmployeeAbsentDetail(item: any) {
    this.employeeService.getAbsentLists(item).subscribe((res: any) => { 
      if (res.length > 0) { 
        this.getAbsentDetail = res[0];
      }
    })
  }
}
