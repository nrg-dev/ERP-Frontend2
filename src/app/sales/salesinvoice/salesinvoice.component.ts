import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Sales, User } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { SalesService } from '../sales.service';

//---------- View Invoice Calling -----------
@Component({
  selector: 'viewInvoice',
  styleUrls: ['./viewInvoice.css'],
  templateUrl: './viewInvoice.html', 
})
export class ViewInvoice {
  model: any ={};
  sales: Sales;
  public salesViewList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  constructor(
    private salesService: SalesService,
    private dialog: MatDialog,
    private alertService: AlertService,

    public dialogRef: MatDialogRef<ViewInvoice>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {  
    this.model.invoiceNumber = this.data.invoiceNumber;
    const salesdata = require("../../salesdata.json");
    this.salesViewList = salesdata;
  }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
//---------- Edit Invoice Calling -----------
@Component({
  selector: 'editinvoice',
  styleUrls: ['./editinvoice.css'],
  templateUrl: './editinvoice.html', 
})

export class EditInvoice {
  model: any ={};
  public salesEditList : any;
  public productList : any;
  public categoryList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  constructor(
    private salesService: SalesService,
    private dialog: MatDialog,
    private alertService: AlertService,

    public dialogRef: MatDialogRef<EditInvoice>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {  
    this.model.invoiceNumber = this.data.invoiceNumber;
    this.productList = ['Mobile', 'Computer', 'Cloths', 'TV'];
    this.categoryList = ['Electronic', 'Manufactorning', 'Institue', 'Mining'];
    const salesdata = require("../../salesdata.json");
    this.salesEditList=salesdata;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  public deleteSalesInvoice(){
    this.alertService.success("Successfully Deleted.");
    setTimeout(() => {
      this.alertService.clear();
    }, 2000);
   
  }

  saveInvoice(){
    this.alertService.success("Successfully Saved.");
    setTimeout(() => {
      this.alertService.clear();
    }, 2000);
  }

  cancelInvoice(){
    alert("-- Cancel Invoice --");
  }

}
//-------- Delete Calling ---------
@Component({
  selector: 'deleteDialog',
  styleUrls: ['./deleteDialog.css'],
  templateUrl: './deleteDialog.html', 
})
export class DeleteDialog {
  model: any ={};
  constructor(
    private salesService: SalesService,
    private dialog: MatDialog,
    private alertService: AlertService,

    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {  
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
//------ Filter Calling --------
@Component({
  selector: 'filter',
  styleUrls: ['./filter.css'],
  templateUrl: './filter.html', 
})
export class Filter {
  model: any = {};
  constructor(
    public dialogRef: MatDialogRef<Filter>,
    ) {
      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  apply(){

  }
}

@Component({
  selector: 'app-salesinvoice',
  templateUrl: './salesinvoice.component.html',
  styleUrls: ['./salesinvoice.component.css']
})
export class SalesinvoiceComponent implements OnInit {
  sales:Sales;
  model: any ={};
  public salesList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  displayedColumns: string[] = ['Date','Invoice Number','ProductName','name','quantity','deliveryCost','netAmount','status','Action'];

  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private salesservice: SalesService,
  ) { 
    const salesdata = require("../../salesdata.json");
    this.salesList=salesdata;

    this.dataSource = new MatTableDataSource(this.salesList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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

  openfilter(): void { 
    const dialogRef = this.dialog.open(Filter, {
    width: '60%',
    //  data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }  

  public viewinvoice(invoiceNumber:string){
    console.log("Invoice Number  --->"+invoiceNumber);
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(ViewInvoice,{
      panelClass: 'viewInvoice',
      data: "invoiceNumber",
      height: '80%'
    }).afterClosed().subscribe(result => {
      // this.refresh();
    });
  }

  public editinvoice(invoiceNumber:string){
    console.log("Invoice Number  --->"+invoiceNumber);
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(EditInvoice,{
      panelClass: 'editInvoice',
      data: "invoiceNumber",
      height: '80%'
    }).afterClosed().subscribe(result => {
      // this.refresh();
    });
  }

  public deleteSale(){
    this.alertService.success("Deleted Successfully");
    setTimeout(() => {
      this.alertService.clear();
    }, 2000);
  }

}
