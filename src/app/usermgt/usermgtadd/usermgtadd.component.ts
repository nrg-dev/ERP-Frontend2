import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usermgtadd',
  templateUrl: './usermgtadd.component.html',
  styleUrls: ['./usermgtadd.component.css']
})
export class UsermgtaddComponent implements OnInit {

  tempid=null;
  public componentdetails=false;
  public categorydetails=false;

  masterlist:  any =[
    {
      number:'01',
      name:'HRD',
    },
    {
      number:'02',
      name:'SALES MANAGER',
    },
    {
      number:'03',
      name:'ADMINISTRATOR',
    },
    {
      number:'04',
      name:'WAREHOUSE CHIEF',
    },
  ];

  constructor() { }

  ngOnInit() {
  }
  mainlList(number: string){
    if(this.tempid!==null){
      document.getElementById(this.tempid).style.backgroundColor='#243641';
      document.getElementById(this.tempid).style.border='none';
    }
    this.tempid=number;
  document.getElementById(this.tempid).style.border='5px solid #7C868D';

  if(number=='01'){
    this.componentdetails=true;
    this.categorydetails=false;
  }
  if(number=='02'){
    this.componentdetails=false;
    this.categorydetails=false;
  }
  if(number=='03'){
    this.componentdetails=false;
    this.categorydetails=false;
  }
  if(number=='04'){
    this.componentdetails=false;
    this.categorydetails=false;
  }
  }

  emplyeedetails(){
    this.categorydetails=true;
  }

}
