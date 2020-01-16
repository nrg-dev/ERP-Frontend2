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
  public purchaseList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  displayedColumns: string[] = ['No','SoInvoice','soDate','customer','Total'];
  dataSource: MatTableDataSource<any>;
  
  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private salesService: SalesService
  ) {
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

}
