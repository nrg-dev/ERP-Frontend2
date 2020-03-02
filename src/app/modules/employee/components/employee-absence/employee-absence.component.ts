import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-absence',
  templateUrl: './employee-absence.component.html',
  styleUrls: ['./employee-absence.component.scss']
})
export class EmployeeAbsenceComponent implements OnInit {

  displayedColumns: string[] = ['EmployeeName','Empcode'];
  dataSource: MatTableDataSource<any>;
  empDetailsList: any;
  employeeList : any ={};
  model: any = {};

  constructor( private employeeService:EmployeeService,) { }

  ngOnInit() {
    this.employeeService.load()
    .subscribe(
      data => {
        this.employeeList = data;
        console.log("employee code -->"+this.employeeList[0].employeecode);
        this.dataSource = new MatTableDataSource(this.employeeList);
      },
      error => {
        //this.alertService.error("Network error: server is temporarily unavailable");
      }
    );
    this.dataSource = new MatTableDataSource(this.employeeList);
  }

}
