import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-all-purchasereport',
  templateUrl: './all-purchasereport.component.html',
  styleUrls: ['./all-purchasereport.component.css']
})
export class AllPurchasereportComponent implements OnInit {

  public purchaseList : any;
  public purchaseorderhide=false;
  model:any ={};

  displayedColumns: string[] = ['No','PoInvoice','poDate','vendor','Total'];
  dataSource: MatTableDataSource<any>;
  
  constructor() { 
    const purchasedata = require("../../purchasereportdata.json");
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
  
  purchaseorderdivcall(invoicenumber: string){
    this.purchaseorderhide=true;
    for(let i=0;i<this.purchaseList.length;i++){
      if(this.purchaseList[i].invoiceNumber==invoicenumber){
        this.model.invoiceNumber = this.purchaseList[i].invoiceNumber;
        this.model.poDate = this.purchaseList[i].poDate;
        this.model.vendorName1 = this.purchaseList[i].vendorName;
        this.model.subTotal = this.purchaseList[i].subTotal;
      }
    }
  }
}
