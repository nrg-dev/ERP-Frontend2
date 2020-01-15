import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { User } from 'src/app/_models';
import { AlertService } from 'src/app/_services/index';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {
  user:User;
  model: any = {};
  public empdetails = false;
  public empeditdetails = false;
  public absentdiv = false;
  message=null;
  mainmessage=null;
  successdialog = 'none';
  updatesuccessdialog = 'none';
  absentmarkdialog = 'none';
  employeeList : any ={};
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();
  dtOptions: DataTables.Settings = {};

  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  displayedColumns: string[] = ['code','name','rank','contactNumber'];

  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;

 /* employeeList : any = 
   [ 
    {
      empCode:'NRG1',
      name :'Alex Ubalton',
      rank: 'CTO',
      contactNumber : '+91 6385662312'
    },
    {
      empCode:'NRG2',
      name :'Magin',
      rank: 'CEO',
      contactNumber : '+61 87654321'
    },
    {
      empCode:'NRG3',
      name :'Hendry',
      rank: 'Manager',
      contactNumber : '+61 43232134',
    },
    {
      empCode:'NRG4',
      name :'Rema',
      rank: 'Executive',
      contactNumber : '+61 43232134'
    },
    {
      empCode:'NRG5',
      name :'Mahesh Kumar',
      rank: 'Branch Manager',
      contactNumber : '+61 43232134'
    },
    {
      empCode:'NRG6',
      name :'Muth Raj',
      rank: 'Sales Officer',
      contactNumber : '+61 43232134'
    },
    {
      empCode:'NRG7',
      name :'Preethi Thanga',
      rank: 'Human Resource',
      contactNumber : '+61 43232134'
    },
    {
      empCode:'NRG8',
      name :'Danial',
      rank: 'Engineer',
      contactNumber : '+61 43232134'
    },
    {
      empCode:'NRG9',
      name :'Pease RJ',
      rank: 'Officer',
      contactNumber : '+61 43232134',
    },
    {
      empCode:'NRG10',
      name :'Ram Pretheep',
      rank: 'Project Manager',
      contactNumber : '+60 43232134'
    },
    {
      empCode:'NRG11',
      name :'employee 8',
      rank: 'Branch Manager',
      contactNumber : '+63 43232134'
    },
    {
      empCode:'NRG12',
      name :'Jackson Due',
      rank: 'Senior Manager',
      contactNumber : '+62 43232134'
    },
  ]; */

  emptempid = null;

  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService
  ) { 
    const data = require("../employee.json");
    this.employeeList=data;

    this.dataSource = new MatTableDataSource(this.employeeList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    /*this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    }*/
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  employeeDetails(empCode:string){
    if(this.emptempid!==null){
      document.getElementById(this.emptempid).style.backgroundColor='#1a2932';
      this.emptempid=null;
    } 
    this.emptempid = empCode;
    //document.getElementById(this.emptempid).style.backgroundColor='#2F4756';
    this.empdetails = true;
    this.empeditdetails = false;
    this.absentdiv = false;

    if(empCode == "NRG1"){
      this.model.empCode = this.employeeList[0].empCode;
      this.model.name = this.employeeList[0].name;
      this.model.rank = this.employeeList[0].rank;
      this.model.contactNumber = this.employeeList[0].contactNumber;
    }else if(empCode == "NRG2"){
      this.model.empCode = this.employeeList[1].empCode;
      this.model.name = this.employeeList[1].name;
      this.model.rank = this.employeeList[1].rank;
      this.model.contactNumber = this.employeeList[1].contactNumber;
    }
    else if(empCode == "NRG3"){
      this.model.empCode = this.employeeList[2].empCode;
      this.model.name = this.employeeList[2].name;
      this.model.rank = this.employeeList[2].rank;
      this.model.contactNumber = this.employeeList[2].contactNumber;
    }
    else if(empCode == "NRG4"){
      this.model.empCode = this.employeeList[3].empCode;
      this.model.name = this.employeeList[3].name;
      this.model.rank = this.employeeList[3].rank;
      this.model.contactNumber = this.employeeList[3].contactNumber;
    }else if(empCode == "NRG5"){
      this.model.empCode = this.employeeList[4].empCode;
      this.model.name = this.employeeList[4].name;
      this.model.rank = this.employeeList[4].rank;
      this.model.contactNumber = this.employeeList[4].contactNumber;
    }
    else if(empCode == "NRG6"){
      this.model.empCode = this.employeeList[5].empCode;
      this.model.name = this.employeeList[5].name;
      this.model.rank = this.employeeList[5].rank;
      this.model.contactNumber = this.employeeList[5].contactNumber;
    }
    else if(empCode == "NRG7"){
      this.model.empCode = this.employeeList[6].empCode;
      this.model.name = this.employeeList[6].name;
      this.model.rank = this.employeeList[6].rank;
      this.model.contactNumber = this.employeeList[6].contactNumber;
    }
    else if(empCode == "NRG8"){
      this.model.empCode = this.employeeList[7].empCode;
      this.model.name = this.employeeList[7].name;
      this.model.rank = this.employeeList[7].rank;
      this.model.contactNumber = this.employeeList[7].contactNumber;
    }
    else if(empCode == "NRG9"){
      this.model.empCode = this.employeeList[8].empCode;
      this.model.name = this.employeeList[8].name;
      this.model.rank = this.employeeList[8].rank;
      this.model.contactNumber = this.employeeList[8].contactNumber;
    }
    else if(empCode == "NRG10"){
      this.model.empCode = this.employeeList[9].empCode;
      this.model.name = this.employeeList[9].name;
      this.model.rank = this.employeeList[9].rank;
      this.model.contactNumber = this.employeeList[9].contactNumber;
    }

    else if(empCode == "NRG11"){
      this.model.empCode = this.employeeList[10].empCode;
      this.model.name = this.employeeList[10].name;
      this.model.rank = this.employeeList[10].rank;
      this.model.contactNumber = this.employeeList[10].contactNumber;
    }
    else if(empCode == "NRG12"){
      this.model.empCode = this.employeeList[11].empCode;
      this.model.name = this.employeeList[11].name;
      this.model.rank = this.employeeList[11].rank;
      this.model.contactNumber = this.employeeList[11].contactNumber;
    }
  }

  edit(){
    this.empdetails = false;
    this.empeditdetails = true;
    this.absentdiv = false;
  }

  setEmployeeUpdate(){    
    this.mainmessage="Employee Data is Successfully Updated...";

    this.empdetails = true;
    this.empeditdetails = false;
    this.absentdiv = false;
    this.updatesuccessdialog = 'block';
    setTimeout(() => {
      this.updatesuccessdialog = 'none';
    }, 1500);
  }

  cancelEdit(){
    this.empdetails = true;
    this.empeditdetails = false;
    this.absentdiv = false;
  }

  delete(){
    this.message="Deleted Successfully."
    this.mainmessage="Deleted."

    this.empeditdetails = false;
    this.absentdiv = false;
    this.successdialog = 'block';
    setTimeout(() => {
      this.successdialog = 'none';
      this.empdetails = false;
    }, 1500);
  }

  absent(){
    this.absentdiv = true;
    this.empdetails = false;
    this.empeditdetails = false;
  }

  upload(date:string){
    if(this.model.status == "absent"){
      this.mainmessage="Absent Details was Successfully Saved...";
    }else if(this.model.status == "check In"){
      this.mainmessage="CheckIn Details was Successfully Saved...";
    }else if(this.model.status == "check Out"){
      this.mainmessage="CheckOut Details was Successfully Saved...";
    }else  if(this.model.status == null){
      this.mainmessage="Please Choose check in / early check out / absent button.";
    }

    this.empdetails = false;
    this.empeditdetails = false;
    this.absentmarkdialog = 'block';
    setTimeout(() => {
      this.absentmarkdialog = 'none';
      this.absentdiv = false;
    }, 1500);
  }

}