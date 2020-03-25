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
  isCheckedArr     =  [];
  vendorArr     =  [];
  isCreateReturn: boolean = false;
  isDeleteButton: boolean = false;
  isCreateInvoice: boolean = false;
  isShowEditDelete = [];

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
      this.isCheckedArr.push(true);
      this.vendorArr.push(item.vendorname);
      this.isShowEditDelete.push(true);
    } else {
      this.prodArr.splice(index);
      this.isCheckedArr.splice(index);
      this.vendorArr.splice(index);
      this.isShowEditDelete.splice(index);
    }

    if (this.prodArr.length > 0) {
      this.prodArr.forEach((item, index) => {
        const status = item.status;
        const vendorName = item.vendorname;
        if (this.prodArr.length > 1) {
          if (status !== 'Invoiced') {
            if (vendorName !== this.vendorArr[index - 1]) {
               this.isCreateInvoice = false;
            } else { 
              this.isDeleteButton = true;
              this.isCreateInvoice = true;
            }
          } else {
            this.isDeleteButton = false;
            this.isCreateInvoice = false;
          }
        } else {
          this.isDeleteButton = false;
          if (status === 'Open' && isChecked) {
            this.isCreateInvoice = true;
          } else if (!this.isCheckedArr[index]){
            this.isCreateInvoice = false;
          }
          if (status === 'Invoiced' && isChecked) {
            this.isCreateReturn = true;
          } else {
            this.isCreateReturn = false;
          }
        }
    });
  } else {
    this.isCreateInvoice = false;
    this.isCreateReturn = false;
    this.isDeleteButton = false;
  }
    
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
