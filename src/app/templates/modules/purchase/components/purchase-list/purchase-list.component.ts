import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-purchaselist',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent  implements OnInit  {
  purchaseOrderList: any;

  constructor( 
    private purchaseService:PurchaseService,
    private snackBar: MatSnackBar
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
  
}
