import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit, AfterViewInit {

  model: any = {};
  constructor( 
    private employeeService: EmployeeService,   
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EmployeeAddComponent>
    ) { }

  ngOnInit() {
    this.addEmplyeeFields();
  }

  ngAfterViewInit() {
    (<HTMLElement>document.querySelector('.mat-dialog-container')).style.background = 'inherit';
   }

  cancelEmployee(){}
  saveEmployee() { 
    this.employeeService.save(this.model)
      .subscribe(
        data => {
          setTimeout(() => {
            this.snackBar.open("Employee created Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
          this.addEmployeeClose();
          this.employeeService.load();
        },
        error => {
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });  
        }
      );
  }

  addEmployeeClose() {
    this.dialogRef.close();
  }

  addEmplyeeFields() {
    this.model.name = '';
    this.model.rank = '';
    this.model.phonenumber = '';
    this.model.address = '';
    this.model.email = '';
    this.model.dob = '';
    this.model.contractnumber = '';
    this.model.npwp = '';
    this.model.bpjs = '';
    this.model.monthlysalary = '';
    this.model.workHour = '';
    this.model.annualLeave = '';
  }
}
