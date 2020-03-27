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
        'border':'1px solid #1A2D39',
        'display': 'none'
      };
    return myStyles;
  }
}  

getCreateReturnStyle() {
  if (!this.isCreateReturn) {
    let myStyles = {
      'color': 'gray',
      'background': '#1A2D39',
      'border':'1px solid #1A2D39',
      'display': 'none'
    };
  return myStyles;
}
}   

getCreateInvoiceStyle() {
  if (!this.isCreateInvoice) {
    let myStyles = {
      'color': 'gray',
      'background': '#1A2D39',
      'border':'1px solid #1A2D39',
      'display': 'none'
    };
  return myStyles;
}
}  

getAddPurchaseOrderStyle() {
  if (this.isAddPurchaseOrder) {
    let myStyles = {
      'color': 'gray',
      'background': '#1A2D39',
      'border':'1px solid #1A2D39',
      'display': 'none'
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
      this.vendorArr.push({vendorName: item.vendorname, indexVal:index});
      this.isShowEditDelete[index] = false;
    } else {
      this.removeItem(this.isCheckedArr, index, 'checked');
      this.removeItem(this.prodArr, index, 'product');
      this.removeItem(this.vendorArr, index, 'vendor');
    }

    if (this.prodArr.length > 0) {
      this.isAddPurchaseOrder = true;
      this.prodArr.forEach((item, index) => {
        const status = item.status;
        const vendorName = item.vendorname;
        if (this.prodArr.length > 1) {
          this.isCreateReturn = false;
          if (status !== 'Invoiced') {
            let getVendorName = '';
            this.vendorArr.forEach((item, indexCheck) => {
              if (indexCheck > 0) {
                getVendorName = this.vendorArr[indexCheck - 1].vendorName;
                if (vendorName !== getVendorName) {
                  this.isCreateInvoice = false;
                  this.isDeleteButton = false;
                  this.getErrorMsg(true);
                } else {
                  this.isDeleteButton = true;
                  this.isCreateInvoice = true;
                  this.isCreateReturn = false;
                  this.getErrorMsg(false);
                }
              }
             });
          } else {
            this.isDeleteButton = false;
            this.isCreateInvoice = false;
          }
        } else {
          this.isDeleteButton = false;
          this.getErrorMsg(false);
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

  getErrorMsg(isErrMsg: boolean) {
    console.log('isErrMsg', isErrMsg)
    if (isErrMsg) {
      setTimeout(() => {
        this.snackBar.open("Select only one vendor", "dismss", {
          panelClass: ["warn"],
          verticalPosition: 'top'      
        });
      });
    } else {
      return '';
    }
  }

  removeItem(isCheckedArr: any, index: number, type: string) {
    console.log('isCheckedArr', isCheckedArr)
    console.log('index12', index)
    isCheckedArr.forEach((item, indexCheck) => {
      console.log('indexVal', item.indexVal)
      console.log('index', index)
      if (item.indexVal === index) {
        isCheckedArr.splice(indexCheck, 1);
      }
    });

    if (type === 'checked') {
      this.isCheckedArr = isCheckedArr;
    } else if (type === 'product') {
      this.prodArr = isCheckedArr;
    } else {
      this.vendorArr = isCheckedArr;
    }
    
  }
 
}
