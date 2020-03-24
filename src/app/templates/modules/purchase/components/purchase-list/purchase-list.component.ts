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

  constructor( 
    private purchaseService:PurchaseService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ) { 
  }

  ngOnInit() {
    this.getPurchaseOrderLists();
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
  rowSelected(productcode:string){
    console.log("Selected code-->"+productcode);
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
