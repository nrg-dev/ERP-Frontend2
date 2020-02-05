import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Sales, User } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.css']
})
export class SalesreportComponent implements OnInit {
  model: any ={};
  sales:Sales;
  public salesList : any;
  public salesReportList : any = {} ;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  //displayedColumns: string[] = ['No','SoInvoice','soDate','customer','Total'];
  displayedColumns: string[] = ['SoInvoice','soDate','customer','Total'];
  dataSource: MatTableDataSource<any>;
  
  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private salesService: SalesService
  ) {
    this.salesService.load().subscribe(res => { 
      this.salesList = res;
      this.dataSource = new MatTableDataSource(this.salesList);
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
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
    this.salesService.load().subscribe(res => { 
      this.salesList = res;
      for(let i=0;i<this.salesList.length; i++){
        if(this.salesList[i].invoicenumber == invoicenumber){
          this.model.invoicenumber = invoicenumber;
          this.model.invoicedate = this.salesList[i].invoicedate;
          this.model.customername = this.salesList[i].customername;
          this.model.totalqty = this.salesList[i].totalqty;
          this.model.totalitem = this.salesList[i].totalitem;
          this.model.totalprice = this.salesList[i].totalprice;
          this.model.deliveryprice = this.salesList[i].deliveryprice;
          this.model.totalAmount = Number.parseInt(this.salesList[i].deliveryprice) + Number.parseInt(this.salesList[i].totalprice);
        }
      }
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
    this.salesService.get(invoicenumber)
    .subscribe(
      data => {
        this.salesReportList = data;
        for(let j=0;j<this.salesReportList.length; j++){
          this.model.itemname = this.salesReportList[j].itemname;
        }
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }


}
