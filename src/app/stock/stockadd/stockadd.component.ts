import { Component, OnInit, ViewChildren,ViewChild ,QueryList ,ElementRef, Inject } from '@angular/core';
import { User } from 'src/app/_models';
import { AlertService } from 'src/app/_services/index';
import { Router } from '@angular/router';
import { StockService } from '../stock.service';
import { Stock } from 'src/app/_models/stock';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { PurchaseService } from '../../purchase/purchase.service';
//import *  as  XLSX from 'xlsx';

@Component({
  selector: 'viewStockIn',
  styleUrls: ['./viewStockIn.css'],
  templateUrl: './viewStockIn.html', 
})
export class ViewStockIn {
  model: any ={};
  public productList : any;
  public statusList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  public fullStock = false;
  public partialStock = false;

  public priceArray : any = [];
  public descriptionArray : any = [];
  constructor(
    private purchaseService: PurchaseService,
    private dialog: MatDialog,
    private alertService: AlertService,

    public dialogRef: MatDialogRef<ViewStockIn>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    {  
      this.model.invoiceNumber = this.data.invoice;
      this.model.stockStatus = this.data.status;
      if(this.model.stockStatus == "FullStockIn"){
        this.fullStock = true;
        this.partialStock = false;
      }if(this.model.stockStatus == "PartialStockIn"){
        this.fullStock = false;
        this.partialStock = true;
      }
      //this.editDetails(this.model.invoiceNumber);
      this.statusList = ['Pending','On Progress','Success'];
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}

@Component({
  selector: 'viewStock',
  styleUrls: ['./viewStock.css'],
  templateUrl: './viewStock.html', 
})
export class ViewStock {
  model: any ={};
  stock: Stock;
  public stockViewList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  dataSource6: MatTableDataSource<any>;
  displayColumns6: string[] = ['No','LastAction','Date','Qty+','Qty-','DmgQtyTotal','QtyTotal'];
  
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  
  constructor(
    private stockService: StockService,
    private dialog: MatDialog,
    private alertService: AlertService,

    public dialogRef: MatDialogRef<ViewStock>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {  
      const stockdata = require("../../stockViewData.json");
      this.stockViewList=stockdata;
      this.dataSource6 = new MatTableDataSource(this.stockViewList);
    }

  ngOnInit() {
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  applyStockViewFilter(filterValue: string) {
    this.dataSource6.filter = filterValue.trim().toLowerCase();
    if (this.dataSource6.paginator) {
      this.dataSource6.paginator.firstPage();
    }
  }

  closeStock(){
    this.dialogRef.close();
  }
  
}

@Component({
  selector: 'app-stockadd',
  templateUrl: './stockadd.component.html',
  styleUrls: ['./stockadd.component.css']
})
export class StockaddComponent implements OnInit {
  model: any = {};
  user:User;
  stock:Stock = new Stock;
  stockInList: any ={};
  stockOutList: any ={};
  stockReturnList: any = {};
  stockDamageList: any = {};
  stockReportList: any = {};
  invoiceList: any = {};
  productList: any = {};
  categoryList: any = {};
  prodCategoryList: any = {};
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  //@ViewChild('clinicagReport') clinicagReport: ElementRef;  

  hBColumns: string[] = ['Date','Category','ProductCategory','ProductName','Qty','recentStock'];
  sBColumns: string[] = ['Date','StockCategory','ProductCategory','ProductName','Qty','RecentStock'];
  thirdColumns: string[] = ['Date','StockReturnCategory','ProductCategory','ProductName','Qty','currentStatus'];
  //fourthColumns: string[] = ['Date','ProductCategory','ProductName','Qty','Origin','status']
  fourthColumns: string[] = ['Date','ProductCategory','ProductName','Qty','status']
  fifthColumns: string[] = ['ItemCode','Category','ProductName','Vendor','ReadyStock','DamagedStock','LastUpdate','Action'];
  
  dataSource1: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  dataSource3: MatTableDataSource<any>;
  dataSource4: MatTableDataSource<any>;
  dataSource5: MatTableDataSource<any>;

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private stockService: StockService ,
    private purchaseService: PurchaseService
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

    this.stockReturnLoad();
    
    this.stockDamageload();   

    const stockReportdata = require("../../stockReportdata.json");
    this.stockReportList=stockReportdata;
    this.dataSource5 = new MatTableDataSource(this.stockReportList);
 
  }
  
  ngAfterViewInit(){
    this.dataSource1.paginator = this.paginator.toArray()[0];
    this.dataSource1.sort = this.sort.toArray()[0];

    this.dataSource2.paginator = this.paginator.toArray()[1];
    this.dataSource2.sort = this.sort.toArray()[1];

    this.dataSource3.paginator = this.paginator.toArray()[2];
    this.dataSource3.sort = this.sort.toArray()[2];

    this.dataSource4.paginator = this.paginator.toArray()[3];
    this.dataSource4.sort = this.sort.toArray()[3];

  }
  ngOnInit() {
    this.getInvoiceList();
    this.getProductList();
    this.getcategoryList();
    this.prodCategoryList = ['Mobile-Electronic', 'Computer-Manufactorning', 'Cloths-Institue', 'TV-Mining'];
  }

  getInvoiceList(){
    this.stockService.loadInvoice()
    .subscribe(res => { 
      this.invoiceList = res;
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  viewInvoice(){
    console.log("Payment Option -->"+this.model.paymentOption);
    console.log("Invoice Number --->"+this.model.invoiceNumber);
    console.log("Edit Invoice Number  --->"+this.model.invoiceNumber);
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(ViewStockIn,{
      panelClass: 'editInvoice',
      data: { invoice: this.model.invoiceNumber, status: this.model.paymentOption },
      height: '80%'
    }).afterClosed().subscribe(result => {
      // this.refresh();
    });
  }

  stockReturnLoad(){
    this.stockService.loadReturn().subscribe(res => { 
      this.stockReturnList = res;
      this.dataSource3 = new MatTableDataSource(this.stockReturnList);
      this.dataSource3.paginator = this.paginator.toArray()[2];
      this.dataSource3.sort = this.sort.toArray()[2]; 
    },
    error => {
      setTimeout(() => {
        this.alertService.error("Network error: server is temporarily unavailable");
      }, 2000);
    }
  );
  }

  stockDamageload(){
    this.stockService.loadDamage().subscribe(res => { 
        this.stockDamageList = res;
        this.dataSource4 = new MatTableDataSource(this.stockDamageList);
        this.dataSource4.paginator = this.paginator.toArray()[3];
        this.dataSource4.sort = this.sort.toArray()[3];
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }


  getcategoryList(){
    this.purchaseService.loadCategory()
    .subscribe(res => { 
      this.categoryList = res;
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  getProductList(){
    this.purchaseService.loadItem()
    .subscribe(res => { 
      this.productList = res;
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
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
    console.log("stockOut Category --->"+this.model.stockOutCategory);
    console.log("product Name --->"+this.model.productName);
    console.log("Product category --->"+this.model.category);
    console.log("Quantity --->"+this.model.quantity);
    console.log("stockDate --->"+this.model.stockDate);
    this.model.addedDate = '';
    this.model.stockOutCategory = '';
    this.model.productName = '';
    this.model.category = '';
    this.model.quantity = '';
    this.model.stockDate = '';
  }

  applyStockReturnFilter(filterValue: string) {
    this.dataSource3.filter = filterValue.trim().toLowerCase();
    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
  }

  stockReturnDetails(invoiceNumber: string){
    this.model.addedDate = '';
    this.model.productName = '';
    this.model.category = '';
    this.model.quantity = '';
    for(let j=0; j<this.stockReturnList.length; j++){
      if(this.stockReturnList[j].invoiceNumber == invoiceNumber){
        this.model.stockDate = this.stockReturnList[j].poDate;
        this.model.returncategory = this.stockReturnList[j].returnCategory;
        this.model.productName = this.stockReturnList[j].productName;
        this.model.category = this.stockReturnList[j].category;
        this.model.quantity = this.stockReturnList[j].quantity;
        this.model.currentStatus = this.stockReturnList[j].status;
        this.model.invoiceNumber = this.stockReturnList[j].invoiceNumber;
        this.model.vendorName = this.stockReturnList[j].vendorName;
      }
    }
  }

  saveStockReturn(){
    console.log("Added Date --->"+this.model.stockDate);
    console.log("stock Returncategory --->"+this.model.returncategory);
    console.log("product Name --->"+this.model.productName);
    console.log("Product category --->"+this.model.category);
    console.log("Quantity --->"+this.model.quantity);
    console.log("current Status --->"+this.model.currentStatus);
    console.log("Vendor Name --->"+this.model.vendorName);
    console.log("ID --->"+this.model.invoiceNumber);
    this.stockService.saveStockReturn(this.model)
    .subscribe(
      data => {
        this.stock = data; 
        if(this.stock.status=="success"){
          this.alertService.success("Saved Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
          this.model.stockDate = '';
          this.model.returncategory = '';
          this.model.productName = '';
          this.model.category = '';
          this.model.quantity = '';
          this.model.currentStatus = '';
          this.model.vendorName = '';
          this.stockReturnLoad();
        } 
        if(this.stock.status=="failure"){
          this.alertService.success("not Saved");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
        }
      },
      error => {
        this.alertService.success("Serve Error ");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
      }
    ); 
    
  }

  applyStockDamageFilter(filterValue: string) {
    this.dataSource4.filter = filterValue.trim().toLowerCase();
    if (this.dataSource4.paginator) {
      this.dataSource4.paginator.firstPage();
    }
  }

  stockDamageDetails(stockDamageCode: string){
    for(let j=0; j<this.stockDamageList.length; j++){
      if(this.stockDamageList[j].stockDamageCode == stockDamageCode){
        this.stock.stockDate = this.stockDamageList[j].stockDate;
        this.stock.productName = this.stockDamageList[j].productName;
        this.stock.category = this.stockDamageList[j].category;
        this.stock.quantity = this.stockDamageList[j].quantity;
        this.stock.itemStatus = this.stockDamageList[j].currentStatus;
        this.stock.stockDamageCode = this.stockDamageList[j].stockDamageCode;
        this.stock.vendorName = this.stockDamageList[j].vendorName;
      }
    }
  }

  saveStockDamage(){
    console.log("Added Date --->"+this.stock.stockDate);
    console.log("product Name --->"+this.stock.productName);
    console.log("Quantity --->"+this.stock.quantity);
    console.log("Status --->"+this.stock.itemStatus);
    console.log("ID --->"+this.stock.stockDamageCode);
    this.stock.currentStatus = this.stock.itemStatus;
    this.stockService.update(this.stock)
    .subscribe(
      data => {
        this.stock = data; 
        if(this.stock.status=="success"){
          this.alertService.success("Updated Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
          this.stockDamageload();
        } 
        if(this.stock.status=="failure"){
          this.alertService.success("not Updated");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
        }
      },
      error => {
        this.alertService.success("Serve Error ");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
      }
    ); 
  }

  addStockDamage(){
    console.log("Product Category -->"+this.model.category);
    console.log("Product Name -->"+this.model.productName);
    console.log("Quantity -->"+this.model.quantity);
    console.log("Date -->"+this.model.stockDate);
    console.log("Status -------->"+this.model.currentStatus);
    this.stockService.save(this.model)
    .subscribe(
      data => {
        this.stock =   data; 
        if(this.stock.status=="success"){
          this.alertService.success("Saved Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
          this.model.stockDate = '';
          this.model.productName = '';
          this.model.category = '';
          this.model.quantity = '';
          this.model.currentStatus = '';
          this.stockDamageload();
        } 
        if(this.stock.status=="failure"){
          this.alertService.success("not saved");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
        }
      },
      error => {
        this.alertService.success("Serve Error ");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
      }
    );  
   
  }

  applyStockReportFilter(filterValue: string) {
    this.dataSource5.filter = filterValue.trim().toLowerCase();
    if (this.dataSource5.paginator) {
      this.dataSource5.paginator.firstPage();
    }
  }

  viewStock(){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(ViewStock,{
      panelClass: 'viewStock',
      data: "id",
      height: '80%'
    }).afterClosed().subscribe(result => {
    });
  }

  searchStockReport(){
    console.log("Product and Category Name -->"+this.model.productCategory);
    console.log("Stock Date ------>"+this.model.stockDate);

  }

  print(){
    //window.print();
    /*const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.clinicagReport.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
    XLSX.writeFile(wb, 'clinicAgentReport.xlsx'); */
  }
}
