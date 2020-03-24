import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {
  PurchaseAddComponent,
  Status
} from "../purchaseadd/purchaseadd.component";

@Component({
  selector: 'app-purchaselist',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent  implements OnInit  {
  purchaseOrderList: any;
  dialogConfig = new MatDialogConfig();
  prodArr     =  [];
  isCreateReturn: boolean = false;
  isDeleteButton: boolean = false;
  isCreateInvoice: boolean = false;

  constructor( 
    private purchaseService:PurchaseService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ) { 
  }

  ngOnInit() {
    this.getPurchaseOrderLists();
  }
  
  getDeleteButtonStyle() {
    if (!this.isDeleteButton) {
      let myStyles = {
        'color': 'gray',
        'background': '#1A2D39',
        'border':'1px solid #1A2D39'
      };
    return myStyles;
  }
}  

getCreateReturnStyle() {
  if (!this.isCreateReturn) {
    let myStyles = {
      'color': 'gray',
      'background': '#1A2D39',
      'border':'1px solid #1A2D39'
    };
  return myStyles;
}
}  

getCreateInvoiceStyle() {
  if (!this.isCreateInvoice) {
    let myStyles = {
      'color': 'gray',
      'background': '#1A2D39',
      'border':'1px solid #1A2D39'
    };
  return myStyles;
}
}  
  getPurchaseOrderLists(){
    this.purchaseService.getPurchaseOrderLists()
    .subscribe(res => { 
      this.purchaseOrderList = res;
      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });
      }
    );
  }
  
  rowSelected(index: number, item: any, isChecked: boolean) {
    if (isChecked) {
      this.prodArr.push(item);
    } else {
      this.prodArr.splice(index);
    }
    console.log('prodArr', this.prodArr)
}

  addPurchaseOrder(){
    //this.successdialog = 'block';

    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(PurchaseAddComponent,{
      panelClass: 'addpromotion'
     // data: {dialogTitle: "hello", dialogText: "text"},
    })
    .afterClosed().subscribe(result => {
      this.getPurchaseOrderLists ();
    });
    
  }
  
}
