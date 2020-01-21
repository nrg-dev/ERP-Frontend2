import { Component, OnInit, ViewChildren ,QueryList ,ElementRef, Inject } from '@angular/core';
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
  stockReturnList: any = {};
  productList: any ={};
  categoryList: any = {};
  viewMode: any = {};
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  hBColumns: string[] = ['Date','Category','ProductCategory','ProductName','Qty','recentStock'];
  
  sBColumns: string[] = ['Date','StockCategory','ProductCategory','ProductName','Qty','RecentStock'];
  thirdColumns: string[] = ['Date','StockReturnCategory','ProductCategory','ProductName','Qty','currentStatus'];
  dataSource1: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  dataSource3: MatTableDataSource<any>;

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private stockService: StockService 
  ) {

    
    const stockIndata = require("../../stockIndata.json");
    this.stockInList=stockIndata;

    this.dataSource1 = new MatTableDataSource(this.stockInList);
    this.dataSource1.paginator = this.paginator.toArray()[0];
    this.dataSource1.sort = this.sort.toArray()[0];
   
    const data = require("../../stockOutdata.json");
    this.stockOutList=data;

    this.dataSource2 = new MatTableDataSource(this.stockOutList);
    this.dataSource2.paginator = this.paginator.toArray()[1];
    this.dataSource2.sort = this.sort.toArray()[1];
  
    const stockReturndata = require("../../stockReturndata.json");
    this.stockReturnList=stockReturndata;
    this.dataSource3 = new MatTableDataSource(this.stockReturnList);
    this.dataSource3.paginator = this.paginator.toArray()[2];
    this.dataSource3.sort = this.sort.toArray()[2];
 
  }
  
  ngAfterViewInit(){
    this.dataSource1.paginator = this.paginator.toArray()[0];
    this.dataSource1.sort = this.sort.toArray()[0];

    this.dataSource2.paginator = this.paginator.toArray()[1];
    this.dataSource2.sort = this.sort.toArray()[1];

    this.dataSource3.paginator = this.paginator.toArray()[2];
    this.dataSource3.sort = this.sort.toArray()[2];
  }
  ngOnInit() {
    this.productList = ['Mobile', 'Computer', 'Cloths', 'TV'];
    this.categoryList = ['Electronic', 'Manufactorning', 'Institue', 'Mining'];
  }

  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  applyStockOutFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  saveStockOut(){
    
  }

  applyStockReturnFilter(filterValue: string) {
    this.dataSource3.filter = filterValue.trim().toLowerCase();
    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
  }

  stockReturnDetails(id: string){
    for(let j=0; j<this.stockReturnList.length; j++){
      if(this.stockReturnList[j].id == id){
        this.model.addedDate = this.stockReturnList[j].addedDate;
        this.model.stockReturncategory = this.stockReturnList[j].stockReturncategory;
        this.model.productName = this.stockReturnList[j].productName;
        this.model.category = this.stockReturnList[j].category;
        this.model.quantity = this.stockReturnList[j].quantity;
        this.model.currentStatus = this.stockReturnList[j].currentStatus;
        this.model.id = this.stockReturnList[j].id;
        this.model.vendorName = this.stockReturnList[j].vendorName;
      }
    }
  }
}
