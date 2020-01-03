import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { User } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";

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
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
  styleUrls: ['./purchase-invoice.component.css']
})
export class PurchaseInvoiceComponent implements OnInit {
  user:User;
  model: any ={};
  public dataList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  displayedColumns: string[] = ['Added Date','Invoice Number','Product List','Vendor','Qty','SubTotal','DeliverCost','Total','Status'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
  
  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
  ) { 
    this.dataSource = new MatTableDataSource(this.dataList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
