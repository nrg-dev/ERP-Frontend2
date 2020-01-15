import { Component, OnInit, Inject } from '@angular/core';
import {  ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { Purchase } from 'src/app/_models/purchase';
 

@Component({
  selector: 'app-stockadd',
  templateUrl: './stockadd.component.html',
  styleUrls: ['./stockadd.component.css']
})
export class StockaddComponent implements OnInit {
  displayedColumns: string[] = ['Productcode', 'ProductName','Discount','DiscountTime','Qty','Price','editdelete'];
  purchase: Purchase;
  public dataDiscountList : any;
  isDtInitialized:boolean = false;

  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
  constructor() {
    const purchasedata = require("../../discountdata.json");
      this.dataDiscountList=purchasedata;

      this.dataSource = new MatTableDataSource(this.dataDiscountList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
  
  public polist: string [];  

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
