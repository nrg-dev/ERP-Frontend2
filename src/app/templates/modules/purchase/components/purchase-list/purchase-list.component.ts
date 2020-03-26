import { Component, OnInit, AfterViewInit } from '@angular/core';
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
export class PurchaseListComponent  implements OnInit, AfterViewInit  {
  purchaseOrderList: any;
  dialogConfig = new MatDialogConfig();
  prodArr     =  [];
  isCheckedArr     =  [];
  vendorArr     =  [];
  isCreateReturn: boolean = false;
  isDeleteButton: boolean = false;
  isCreateInvoice: boolean = false;
  isShowEditDelete = [];
  isAddPurchaseOrder: boolean = false;
  isVendorErrMsg: boolean = false;

  constructor( 
    private purchaseService:PurchaseService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ) { 
  }

  ngOnInit() {
    this.getPurchaseOrderLists();
  }
  
  ngAfterViewInit() {
    setTimeout(function () {
      (<HTMLElement>document.querySelector('.mat-drawer-content')).style.overflow = 'inherit';
    }, 300);
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

getAddPurchaseOrderStyle() {
  if (this.isAddPurchaseOrder) {
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
      item.indexVal = index;
      this.prodArr.push(item);
      this.isCheckedArr.push({checked: true, indexVal:index});
      this.vendorArr.push(item.vendorname);
      this.isShowEditDelete[index] = false;
    } else {
      this.isCheckedArr.forEach((item, indexCheck) => {
        if (item.indexVal === index) {
          this.isCheckedArr.splice(indexCheck, 1);
        }
      });

      this.prodArr.forEach((item, indexCheck) => {
        if (item.indexVal === index) {
          this.prodArr.splice(indexCheck, 1);
        }
      });
      this.vendorArr.splice(index);
    }

    if (this.prodArr.length > 0) {
      this.isAddPurchaseOrder = true;
      this.prodArr.forEach((item, index) => {
        const status = item.status;
        const vendorName = item.vendorname;
        if (this.prodArr.length > 1) {
          if (status !== 'Invoiced') {
            if (vendorName !== this.vendorArr[index - 1]) {
               this.isCreateInvoice = false;
               this.isVendorErrMsg  = true;
            } else { 
              this.isDeleteButton = true;
              this.isCreateInvoice = true;
              this.isVendorErrMsg  = false;
            }
          } else {
            this.isDeleteButton = false;
            this.isCreateInvoice = false;
          }
        } else {
          this.isDeleteButton = false;
          this.isVendorErrMsg  = false;
          if (status === 'Open' && this.isCheckedArr[0].checked) {
            this.isCreateInvoice = true;
          } else {
            this.isCreateInvoice = false;
          }
          if (status === 'Invoiced' && this.isCheckedArr[0].checked) {
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
    this.isAddPurchaseOrder = false; 
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

  mouseEnter(index: number, status: string) {
    if (this.isCheckedArr.length === 0 && status === 'Open') { 
      this.isShowEditDelete[index] = true;
    }
  }

  mouseLeave(index: number, status: string) {
    if (this.isCheckedArr.length === 0 && status === 'Open') {
      this.isShowEditDelete[index] = false;
    }
  }
  
}
