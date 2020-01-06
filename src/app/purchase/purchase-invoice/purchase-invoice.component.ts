import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Purchase } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'editinvoice',
  styleUrls: ['./editinvoice.css'],
  templateUrl: './editinvoice.html', 
})
export class EditInvoice {


  constructor(
    public dialogRef: MatDialogRef<EditInvoice>,
    ) {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateDelete(){
  console.log("updateDelete");
  }
}

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
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
  styleUrls: ['./purchase-invoice.component.css']
})
export class PurchaseInvoiceComponent implements OnInit {
  purchse:Purchase;
  model: any ={};
  public purchaseList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  displayedColumns: string[] = ['category','invoiceNumber','productName','name','quantity',
  'subTotal','deliveryCost','netAmount','status'];
 

  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
  
  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private purchaseservice: PurchaseService,
  ) { 
    const purchasedata = require("../../purchasedata.json");

    this.purchaseList=purchasedata;

    console.log("data3 -->"+this.purchaseList[2].addedDate);


    /* 

    this.purchaseservice.load().subscribe(res => { 
      this.purchaseList = res;
         //  console.log("data2 -->"+this.purchaseList[1].purchaseorder["vendorName"].values);
           console.log("data3 -->"+this.purchaseList[2].purchaseorder.category);
           console.log("speasifc data  -->");
           console.log("data4 -->"+this.purchaseList[0]);
           console.log("data5 -->"+this.purchaseList[1]);
           console.log("data6 -->"+this.purchaseList[2]);

          // console.log("data2 -->"+this.purchaseList[0].purchaseorder);
           //console.log("data3 -->"+this.purchaseList[0].purchaseorder[0]);

          // console.log("data4 -->"+data);


        },
        error => {
            alert('Error !!!!');
        }
    );
 
*/
    this.dataSource = new MatTableDataSource(this.purchaseList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  public polist: string [];

  ngOnInit() {
   
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  public editinvoice(){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(EditInvoice,{
    //  data: {dialogTitle: "hello", dialogText: "text"},
      data: "issueId",
      height: '80%'
    }).afterClosed().subscribe(result => {
    // this.refresh();
    });;
}

}
