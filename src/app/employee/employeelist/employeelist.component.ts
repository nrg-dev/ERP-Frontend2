import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';

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

  employeeList : any = [ 
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
  ];

  emptempid = null;

  constructor() { }

  ngOnInit() {

  }

  employeeDetails(empCode:string){
    if(this.emptempid!==null){
      document.getElementById(this.emptempid).style.backgroundColor='white';
      this.emptempid=null;
    }
    this.emptempid = empCode;
    document.getElementById(this.emptempid).style.backgroundColor='#DDEDF9';
    this.empdetails = true;
    this.empeditdetails = false;

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
  }

  setEmployeeUpdate(){
    alert("Employee Code ---->"+this.model.empCode);
    alert("Employee Name ---->"+this.model.name);
    alert("Employee Rank ---->"+this.model.rank);
    alert("Employee Phone ---->"+this.model.contactNumber);
    alert("Employee Address ---->"+this.model.address);
    alert("Employee EmailId ---->"+this.model.emailID);
    alert("Employee Birth ---->"+this.model.dob);
    alert("Employee JoinDate ---->"+this.model.joinDate);
    alert("Employee Contract ---->"+this.model.contactNumber);
    alert("Employee Npwp ---->"+this.model.npwpNumber);
    alert("Employee BPJS ---->"+this.model.bpjsNumber);
    alert("Employee MonthlySalary ---->"+this.model.monthlySalary);
    alert("Employee OvertimeSalary ---->"+this.model.overtimeSalary);
    alert("Employee Work Hour ---->"+this.model.workHour);
    alert("Employee AnnualLeave ---->"+this.model.annualLeave);
    alert("Employee AbsentDeduction ---->"+this.model.absentDeduction);
  }

  cancelEdit(){
    this.empdetails = true;
    this.empeditdetails = false;
  }

}