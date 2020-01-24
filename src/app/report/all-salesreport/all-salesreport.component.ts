import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-all-salesreport',
  templateUrl: './all-salesreport.component.html',
  styleUrls: ['./all-salesreport.component.css']
})
export class AllSalesreportComponent implements OnInit {
  public purchaseList : any;
  public salesorderhide=false;
  model:any ={};

  displayedColumns: string[] = ['No','SoInvoice','soDate','customer','Total'];
  dataSource: MatTableDataSource<any>;
  
  constructor() { 
    const purchasedata = require("../../salesreportdata.json");
    this.purchaseList=purchasedata;
    this.dataSource = new MatTableDataSource(this.purchaseList);
  }

  ngOnInit() {
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  salesorderdivcall(invoicenumber: string){
    this.salesorderhide=true;
    for(let i=0;i<this.purchaseList.length;i++){
      if(this.purchaseList[i].invoiceNumber==invoicenumber){
        this.model.invoiceNumber = this.purchaseList[i].invoiceNumber;
        this.model.soDate = this.purchaseList[i].soDate;
        this.model.customerName1 = this.purchaseList[i].customerName;
        this.model.subTotal = this.purchaseList[i].subTotal;
      }
    }
  }
}
