import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Purchase, User } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
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
  public purchaseList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  displayedColumns: string[] = ['No','PoInvoice','poDate','vendor','Total'];

  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private purchaseservice: PurchaseService,
  ) {
    const purchasedata = require("../../purchasereportdata.json");
    this.purchaseList=purchasedata;

    this.dataSource = new MatTableDataSource(this.purchaseList);
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


}
