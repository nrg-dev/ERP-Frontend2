import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/_models';
import { AlertService } from 'src/app/_services/index';
import { StockService } from '../stock.service';
import { Purchase } from 'src/app/_models/purchase';
 

@Component({
  selector: 'app-stockadd',
  templateUrl: './stockadd.component.html',
  styleUrls: ['./stockadd.component.css']
})
export class StockaddComponent implements OnInit {
  model: any = {};
  user:User;
  stockInList: any ={};
  viewMode: any = {};

  
  constructor(
    private alertService: AlertService 
  ) {
    const purchasedata = require("../../discountdata.json");
    this.stockInList=purchasedata;

  }
  

  ngOnInit() {
    this.firstTabShow();
  }
  
  firstTabShow(){
    this.viewMode = 'tab1';
  }

}
