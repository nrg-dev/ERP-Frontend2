import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-all-emp-report',
  templateUrl: './all-emp-report.component.html',
  styleUrls: ['./all-emp-report.component.css']
})
export class AllEmpReportComponent implements OnInit {

  model:any ={};
  public empPreviewdiv=false;
  public empreportdetails=false;

  displayedColumns: string[] = ['EmployeeName','Empcode'];
  dataSource1: MatTableDataSource<any>;
  empDetailsList: any;

  displayedColumns1: string[] = ['Date','Checkin','Checkout'];
  dataSource2: MatTableDataSource<any>;
  empAbsetList: any;

  @ViewChild('sortCol1',{static:false}) sortCol1: MatSort;
  @ViewChild('sortCol2',{static:false}) sortCol2: MatSort;

  constructor() { 
    const purchasedata = require("../../EmpReportTable.json");
      this.empDetailsList=purchasedata;
      this.dataSource1 = new MatTableDataSource(this.empDetailsList);
      this.dataSource1.sort = this.sortCol1;

    const purchasedata1 = require("../../EmpAbsentcardTable.json");
      this.empAbsetList=purchasedata1;
      this.dataSource2 = new MatTableDataSource(this.empAbsetList);
      this.dataSource2.sort = this.sortCol2;
  }

  ngOnInit() {
  }
  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  absentCardDetails(empcode: string){
    this.empPreviewdiv=true;
    this.empreportdetails=false;
    for(let i=0;i<this.empDetailsList.length;i++){
      if(this.empDetailsList[i].empcode==empcode){
        this.model.employeeName = this.empDetailsList[i].employeeName;
        this.model.empcode = this.empDetailsList[i].empcode;
        this.model.rank = this.empDetailsList[i].rank;
        this.model.phone = this.empDetailsList[i].phone;
        this.model.email = this.empDetailsList[i].email;
        this.model.join = this.empDetailsList[i].join;
        this.model.status = this.empDetailsList[i].status;
      }
    }
  }

  empdailyreportcall(date: string){
    this.empreportdetails=true;
    for(let j=0;j<this.empAbsetList.length;j++){
      if(this.empAbsetList[j].date==date){
        this.model.date = this.empAbsetList[j].date;
      }
    }
  }

}
