import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { EmployeeService } from "../../services/employee.service";
import { MatSnackBar } from "@angular/material";
import { CommonService } from "../../../../../core/common/_services/common.service";
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from "src/app/core/common/_services/index";

@Component({
  selector: "app-employee-detail",
  templateUrl: "./employee-detail.component.html",
  styleUrls: ["./employee-detail.component.scss"]
})
export class EmployeeDetailComponent implements OnInit {
  
  attendanceDetails = [];
  employeeDet: any;
  events: string[] = [];
  model: any = {};
  
   constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private router: Router,
    private snackBar: MatSnackBar,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private sanitizer:DomSanitizer
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.viewEmployee(params.id);
    });
    // setTimeout(function () {
    //   (<HTMLElement>document.querySelector('#date-picker')).click();
    // }, 500);
  }

  viewEmployee(empCode: string) {
    this.employeeService.getEmployeeDetail(empCode).subscribe((res: any) => {
      if (res.length > 0) {
        this.employeeDet = res[0];
        const item = {date:this.commonService.getTodayDate(),type:'M',employeecode: empCode};
        this.employeeService.getAbsentLists(item).subscribe((data: any) => { 
          if (data.length > 0) { 
            this.attendanceDetails = data;
          }
        })
        
      }
    });
  }
  
  showDailyReport() { 
    setTimeout(function () { 
      (<HTMLElement>document.querySelector('.mat-icon-button')).click();
      (<HTMLElement>document.querySelector('.mat-calendar')).style.width = '300px';
      (<HTMLElement>document.querySelector('.mat-calendar')).style.height = '0px';
      (<HTMLElement>document.querySelector('.mat-icon-button ')).style.visibility = 'hidden';
     }, 500);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>,picker) {
    this.events.push(`${type}: ${event.value}`); 
    console.log('test', `${type}: ${event.value}`);
    (<HTMLElement>document.querySelector('.mat-datepicker-popup')).style.pointerEvents = 'initial !important';
    //picker.open();
    console.log('picker', picker)
  }

  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.employeeDet.cardImageBase64);
  }

  deleteEmployee(employeecode: string) {
    this.employeeService.remove(employeecode).subscribe(
      data => {
        this.model = data;
        setTimeout(() => {
          this.snackBar.open("Employee is deleted successfully", "", {
            panelClass: ["error"],
            verticalPosition: "top"
          });
        });
        setTimeout(() => {
          this.alertService.clear();
        }, 1500);
        this.router.navigate(['/employment']);
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

}
