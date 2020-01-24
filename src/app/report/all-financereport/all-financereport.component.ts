import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-all-financereport',
  templateUrl: './all-financereport.component.html',
  styleUrls: ['./all-financereport.component.css']
})
export class AllFinancereportComponent implements OnInit {

  model:any ={};
  public financeList : any;

  displayedColumns: string[] = ['Date','Category','Description','Debit','Credit'];
  dataSource: MatTableDataSource<any>;

  constructor() {
    const purchasedata = require("../../AllFinanceReporttable .json");
    this.financeList=purchasedata;
    this.dataSource = new MatTableDataSource(this.financeList);
   }

  ngOnInit() {
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
