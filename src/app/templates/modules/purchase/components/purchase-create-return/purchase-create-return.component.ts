import { Component, Inject, OnChanges, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from '@angular/material';
import { MatSnackBar } from "@angular/material/snack-bar";
import { PurchaseService } from "../../services/purchase.service";


@Component({
  selector: 'app-purchase-create-return',
  templateUrl: './purchase-create-return.component.html',
  styleUrls: ['./purchase-create-return.component.scss']
})
export class PurchaseCreateReturnComponent implements OnInit {
  model:any = {};
  btnsave:string = "Create";
  paymentType:string;
  returnType:string;
  quantity:number;

  public itemstatuserror = false;
  public paymentTypeerrors = false;

  constructor(    
    public dialogRef: MatDialogRef<PurchaseCreateReturnComponent>,
    @Inject(MAT_DIALOG_DATA) public data, 
    private purchaseService:PurchaseService,
    private snackBar: MatSnackBar
  ) { 
      this.model.vendorname = this.data.vendorname;
      this.model.vendorcode = this.data.vendorcode;
      this.model.productname = this.data.productname;
      this.model.invqty = this.data.invqty;
      this.model.date = this.data.date;
      this.model.subtotal = this.data.subtotal;
    }

  ngOnInit() {
    this.itemstatuserror = false;
    this.paymentTypeerrors = false;
  }

  getPrice(quantity:number){
    let price = this.model.subtotal/quantity;
    if(this.model.quantity > this.model.invqty){
      setTimeout(() => {
        this.snackBar.open(
          "Qty cannot be more than Invoiced Qty.",
          "dismss",
          {
            panelClass: ["warning"],
            verticalPosition: "top",
          }
        );
      });
    }
    if(price == Infinity){
      this.model.price = 0;
    }else{
      this.model.price = price;
    }
  }

  close() {
    this.dialogRef.close();
  }

  getPaymentValid(paymentType:string){
    if(paymentType == null){
      this.paymentTypeerrors = true;
    }else{
      this.paymentTypeerrors = false;
    }
  }

  getItemValid(itemstatus:string){
    if(itemstatus == null){
      this.itemstatuserror = true;
    }else{
      this.itemstatuserror = false;
    }
  }

  addReturn() {
    if(this.model.itemstatus == null){
      console.log("ItemStatus not chosen");
      this.itemstatuserror = true;
    }
    if(this.model.paymentType == null){
      console.log("Payment not chosen");
      this.paymentTypeerrors = true;
    }else{
      const invoice = {
        "createddate": new Date().toJSON().slice(0, 10).split('-').reverse().join('/'),
        "invoicedqty": this.model.invqty,
        "vendorcode" : this.model.vendorcode,
        "vendorname" : this.model.vendorname,
        "itemname" : this.model.productname,
        "itemStatus" : this.model.itemstatus,
        "returnStatus" : this.model.paymentType,
        "qty" : this.model.quantity,
        "invoiceddate" : this.model.date,
        "price" : this.model.price
      }
      this.purchaseService.createReturn(invoice).subscribe(
        (respose) => {
          if (respose === null) {
            setTimeout(() => {
              this.snackBar.open(
                "Purchase Return Created Successfully",
                "dismss",
                {
                  panelClass: ["success"],
                  verticalPosition: "top",
                }
              );
  
            });
            this.close();
          }
        },
        (error) => {
          setTimeout(() => {
            this.snackBar.open(
              "Network error: server is temporarily unavailable",
              "dismss",
              {
                panelClass: ["error"],
                verticalPosition: "top",
              }
            );
          });
        }
      );
    }
  }

}
