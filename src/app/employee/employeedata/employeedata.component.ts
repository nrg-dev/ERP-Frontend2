import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { User, Employee } from 'src/app/_models';
import { AlertService } from 'src/app/_services/index';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employeedata',
  templateUrl: './employeedata.component.html',
  styleUrls: ['./employeedata.component.css']
})
export class EmployeedataComponent implements OnInit {

  model: any = {};
  employeeList : any ={};
  public empdetails = false;
  public empeditdetails = false;
  public absentdiv = false;
  public employeelist= true;
 

  displayedColumns: string[] = ['code','name','rank','contactNumber','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private employeeService:EmployeeService,
  ) { }

  ngOnInit() {
    this.allemplist();
  }
  
  allemplist(){
    this.employeeService.load()
    .subscribe(
      data => {
        this.employeeList = data;
        console.log("employee code -->"+this.employeeList[0].employeecode);
        this.dataSource = new MatTableDataSource(this.employeeList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
      }
    );
  }

  employeeDetails(employeecode:string){
    this.empdetails = true;
    this.employeelist=false;
    this.empeditdetails = false;
    this.absentdiv = false;

    for(let i=0;i<this.employeeList.length;i++){
      if(this.employeeList[i].employeecode==employeecode){
        this.model.employeecode = this.employeeList[i].employeecode;
        this.model.name = this.employeeList[i].name;
        this.model.rank = this.employeeList[i].rank;
        this.model.phonenumber = this.employeeList[i].phonenumber;
        this.model.address = this.employeeList[i].address;
        this.model.email = this.employeeList[i].email;
        this.model.dob = this.employeeList[i].dob;
        this.model.addeddate = this.employeeList[i].addeddate;
        this.model.contractnumber = this.employeeList[i].contractnumber;
        this.model.npwp = this.employeeList[i].npwp;
        this.model.bpjs = this.employeeList[i].bpjs;
        this.model.workHour = this.employeeList[i].workHour;
        this.model.annualLeave = this.employeeList[i].annualLeave;
        this.model.monthlysalary = this.employeeList[i].monthlysalary;
      }
    }

    
  }

  emplistback(){
    this.employeelist=true;
    this.empdetails = false;
    this.empeditdetails = false;
  }
addemployeeback(){}
absenceback(){}
contracttemplateback(){}
empreportback(){}

edit(){
  this.empeditdetails = true;
  this.empdetails = false;
  this.employeelist=false;
  this.absentdiv = false;
}
}
