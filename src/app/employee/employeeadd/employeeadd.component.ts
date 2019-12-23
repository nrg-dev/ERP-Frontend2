import { Component, OnInit } from '@angular/core';
//import { LandingpageComponent } from 'src/app/landingpage/landingpage.component';
import { Subject } from 'rxjs';
//import { LandingpageComponent } from '../../landingpage/landingpage.component';
import { User } from 'src/app/_models';


@Component({
  selector: 'app-employeeadd',
  templateUrl: './employeeadd.component.html',
  styleUrls: ['./employeeadd.component.css']
})
export class EmployeeaddComponent implements OnInit {
  public static showParent: Subject<any> = new Subject();
  //notSelected: boolean;
  user:User;
  model: any = {};
  successdialog = 'none';
  mainmessage = null;
  rank='Employee Rank';
  employeeReg : any = [ 
    {
      name :'Employee Name',
      rank:'Employee Rank',
      phonenumber : 'Phone Number',
      contractnumber : 'Contract Number ',
      address : 'Address',
      country :  'Indonesia',
      city : 'Jakarta',
      email : 'Email',
      emergencynumber : 'Emergency Number',
      dob : 'Date of Birth',
      npwp : 'NPWP Number',
      bpjs : 'BPJS',
      monthlysalary : 'Monthly Salary',
      workHour : 'Work Hour',
      annualLeave : 'Annual Leave',
    }];
  constructor() {
   // alert("test");
    //this.notSelected = false;
    //LandingpageComponent.showParent.subscribe(res => {
      //this.notSelected = false; // show parent component
   //})
 
   
   }

  ngOnInit() {
    //this.notSelected = false;
    //localStorage.setItem("notSelected","false");
  }

  saveEmployee(){
    this.mainmessage = "Successfully Saved."
    this.successdialog = 'block';
    setTimeout(() => {
      this.successdialog = 'none';
    }, 1500);
  }

  cancelEmployee(){
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
