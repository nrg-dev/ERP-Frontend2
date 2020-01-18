import { Component, OnInit, ViewChild ,QueryList ,ElementRef, Inject } from '@angular/core';
import { User } from 'src/app/_models';
import { AlertService } from 'src/app/_services/index';
import { Router } from '@angular/router';
import { StockService } from '../stock.service';
import { Stock } from 'src/app/_models/stock';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
 

@Component({
  selector: 'app-stockadd',
  templateUrl: './stockadd.component.html',
  styleUrls: ['./stockadd.component.css']
})
export class StockaddComponent implements OnInit {
  model: any = {};
  user:User;
  stock:Stock;
  stockInList: any ={};
  stockOutList: any ={};
  productList: any ={};
  categoryList: any = {};
  viewMode: any = {};
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  displayedColumns: string[] = ['Date','Category','ProductCategory','ProductName','Qty','recentStock'];
  
  displayedColumns1: string[] = ['Date','StockCategory','ProductCategory','ProductName','Qty','RecentStock'];
  dataSource: MatTableDataSource<any>;
  dataSource1: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatPaginator,{ static: true }) paginator1: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;


  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private stockService: StockService 
  ) {

    
    const stockIndata = require("../../stockIndata.json");
    this.stockInList=stockIndata;

    this.dataSource = new MatTableDataSource(this.stockInList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    const data = require("../../stockOutdata.json");
    this.stockOutList=data;

    this.dataSource1 = new MatTableDataSource(this.stockOutList);
    this.dataSource1.paginator = this.paginator1;
    this.dataSource1.sort = this.sort;


  }
  

  ngOnInit() {
    this.firstTabShow();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource1.paginator = this.paginator1;
    this.dataSource1.sort = this.sort;

    this.productList = ['Mobile', 'Computer', 'Cloths', 'TV'];
    this.categoryList = ['Electronic', 'Manufactorning', 'Institue', 'Mining'];
  }
  
  firstTabShow(){
    this.viewMode = 'tab1';
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyStockOutFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  saveStockOut(){
    
  }
}
