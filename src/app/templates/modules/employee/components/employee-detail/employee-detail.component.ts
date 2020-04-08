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

@Component({
  selector: "app-employee-detail",
  templateUrl: "./employee-detail.component.html",
  styleUrls: ["./employee-detail.component.scss"]
})
export class EmployeeDetailComponent implements OnInit {
  
  attendanceDetails = [];
  employeeDet: any;

   constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.viewEmployee(params.id);
    });
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
  
}
