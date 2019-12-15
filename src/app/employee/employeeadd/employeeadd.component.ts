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
  employeeReg : any = [ 
    {
      code:'Employe code',
      name :'Employee Name',
      phonenumber : 'Phone Number',
      mobilenumber : 'Mobile Number',
      address : 'Address',
      country :  'Indonesia',
      city : 'Jakarta',
      email : 'Email',
      emergencynumber : 'Emergency Number',
      dob : 'Date of Birth',
      rank:'Rank'
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

  

}
