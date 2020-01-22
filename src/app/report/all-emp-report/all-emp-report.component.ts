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

  displayedColumns: string[] = ['EmployeeName','Empcode'];
  dataSource: MatTableDataSource<any>;
  empDetailsList: any;

  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;

  constructor() { 
    const purchasedata = require("../../EmpReportTable.json");
      this.empDetailsList=purchasedata;
      this.dataSource = new MatTableDataSource(this.empDetailsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  ngOnInit() {
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  absentCardDetails(empcode: string){
    this.empPreviewdiv=true;
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

}
