import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Purchase, User } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { PurchaseService } from '../purchase.service';


@Component({
  selector: 'app-purchasereport',
  templateUrl: './purchasereport.component.html',
  styleUrls: ['./purchasereport.component.css']
})
export class PurchasereportComponent implements OnInit {
  purchse:Purchase;
  model: any ={};
  public purchaseList : any = {};
  public purchaseReportList : any = {} ;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  //displayedColumns: string[] = ['No','PoInvoice','poDate','vendor','Total'];
  displayedColumns: string[] = ['PoInvoice','poDate','vendor','Total'];

  dataSource: MatTableDataSource<any>;
  
  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private purchaseservice: PurchaseService,
  ) {

    this.purchaseservice.load().subscribe(res => { 
      this.purchaseList = res;
      this.dataSource = new MatTableDataSource(this.purchaseList);
      },
      error => {
          alert('Error !!!!');
      }
    );


   }

  ngOnInit() {
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getReportDetails(invoicenumber:number){
    this.purchaseservice.load().subscribe(res => { 
      this.purchaseList = res;
      for(let i=0;i<this.purchaseList.length; i++){
        if(this.purchaseList[i].invoicenumber == invoicenumber){
          this.model.invoicenumber = invoicenumber;
          this.model.invoicedate = this.purchaseList[i].invoicedate;
          this.model.vendorname = this.purchaseList[i].vendorname;
          this.model.totalqty = this.purchaseList[i].totalqty;
          this.model.totalitem = this.purchaseList[i].totalitem;
          this.model.totalprice = this.purchaseList[i].totalprice;
          this.model.deliveryprice = this.purchaseList[i].deliveryprice;
          this.model.totalAmount = this.purchaseList[i].deliveryprice + this.purchaseList[i].totalprice;
        }
      }
      },
      error => {
          alert('Error !!!!');
      }
    );
    this.purchaseservice.get(invoicenumber)
    .subscribe(
      data => {
        this.purchaseReportList = data;
        for(let j=0;j<this.purchaseReportList.length; j++){
          this.model.itemname = this.purchaseReportList[j].itemname;
        }
      },
      error => {
          alert('Error !!!!');
      }
    );
  }

}
